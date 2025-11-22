require 'bundler/inline'
require 'uri'

gemfile do
  gem 'faraday'
  gem 'activesupport', require: 'active_support/all'
  gem 'json'
  gem 'csv'
end

data = CSV.read('movies_all.csv', headers: true)
movies = []

data = data.select { |row| row['included'] == true.to_s }

selected, to_sample = data.partition { |row| row['most'] == true.to_s }

# 24 films

selected.concat to_sample.sample(24 - selected.size)

class Tmdb
  def get_movie(id)
    url = URI("https://api.themoviedb.org/3/movie/#{id}?language=fr-CA")
    puts id
    response = request(url)
    response['poster_path'] = image_url(response['poster_path'])
    response['backdrop_path'] = image_url(response['backdrop_path'])
    response['providers'] = get_watch_providers(id)
    response
  end

  def get_watch_providers(id)
    url = URI("https://api.themoviedb.org/3/movie/#{id}/watch/providers")
    response = request(url).dig('results', 'CA') || {}
    providers = (response['flatrate'] || []).concat(response['ads'] || [])
    providers.each do |provider|
      provider['logo_path'] = image_url(provider['logo_path'])
    end
    providers
  end

  private

  def image_url(path)
    "https://image.tmdb.org/t/p/original#{path}"
  end

  def request(url)
    response = Faraday.get(url.to_s) do |req|
      req.headers['Authorization'] = "Bearer #{File.read('../tmp/api_key.txt')}"
      req.headers['accept'] = 'application/json'
    end
    puts response.status
    if response.status != 200
      raise "Error fetching data from TMDB API: #{response.status} - #{response.body}"
    end

    JSON.parse(response.body)
  end
end

c = Tmdb.new

selected.each do |row|
  movie = c.get_movie(row['tmdb_id'])
  movies << movie
end

movies = movies.shuffle
current_year = Time.now.year

final_result = []
(0..23).each do |index|
    movie = movies.pop
    movie['date'] = index + 1
  final_result << movie
end

File.write('../src/models/movies.json', JSON.pretty_generate(final_result))
