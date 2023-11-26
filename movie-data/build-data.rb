require 'uri'
require 'net/http'
require 'json'
require 'csv'


data = CSV.read('movies_all.csv', headers: true)
movies = []

data = data.select { |row| row['included'] == true.to_s }

selected, to_sample = data.partition { |row| row['most'] == true.to_s }

# 23 films
# 4 activités

selected.concat to_sample.sample(23 - 4 - selected.size)

class Tmdb
  def get_movie(id)
    url = URI("https://api.themoviedb.org/3/movie/#{id}?language=fr-CA")
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
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["accept"] = 'application/json'
    request["Authorization"] = 'Bearer tmp/api_key.txt'

    JSON.parse(http.request(request).read_body)
  end
end

c = Tmdb.new

selected.each do |row|
  movie = c.get_movie(row['tmdb_id'])
  movies << movie
end

activities = [
  {
    title: "Activité: Cuisiner des biscuits de Noël (et en donner à quelqu'un!)",
    poster_path: "https://www.supermarche-match.lu/uploads/recipes/images/_header/casey-chae-3DrCZblTGoQ-unsplash.jpg",
  },
  {
    title: "Activité: Préparer et boire un chocolat chaud extra guimauves",
    poster_path: "https://www.immersionvegetale.com/wp-content/uploads/2020/12/recette-chocolat-chaud-vegan-guimauve-1.jpg"
  },
  {
    title: "Activité: Dessert dans une tasse!",
    poster_path: "https://www.parfaitemamanimparfaite.com/wp-content/uploads/2022/11/AB18A838-7438-48CF-B626-D2038F7DD4B0-670x970.jpg"
  },
  {
    title: "Activité: Marche dehors pour regarder les décorations de noël et partager tes photos dans le groupe messenger",
    poster_path: "https://edito.seloger.com/sites/default/files/styles/480x/public/edito_migrate/article/image/maison-noel-lumineuse_0.jpg?itok=8oNciQ2-"
  }
]

movies.concat activities
movies = movies.shuffle
movies.each_with_index do |movie, index|
  movie['date'] = index + 1
end

File.write('../src/models/movies.json', JSON.pretty_generate(movies))
