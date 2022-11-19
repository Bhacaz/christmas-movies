import movies from "./movies.json";

export default class Movie {
  constructor(data, index) {
    this.title = data.title;
    this.date = index + 1;
    this.full_path = "https://www.justwatch.com" + data.full_path;
    this.short_description = data.short_description;
    this.release_year = data.release_year;
    this.poster = data.poster;
    this.backdrop = data.backdrop;
    this.streamingOffers = data.streamingOffers;
  }

  static fromJson() {
    return movies.map((movie, index) => new Movie(movie, index));
  }
}
