<template>
  <div class="home">
    <Header />
    <section class="section">
      <div class="box bonus-movie">
        <div class="columns is-mobile">
          <img
            src="https://m.media-amazon.com/images/M/MV5BMGMzYmZmNjYtMTFmZS00ZGY4LWIwNWUtMzYwNjcyYTI4YTRmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
            style="height: 125px; margin: 1em"
          />
          <div class="column is-four-quarter">
            <div class="content">
              Bonus Movie: <strong>Spirited</strong> (2022)
            </div>
            <div class="content">
              <a
                href="https://plex.bhacaz.com/web/index.html#!/server/9dd2699f7cdb1babe626db5d8ddacbaf638ae519/details?key=%2Flibrary%2Fmetadata%2F3031&context=library%3Acontent.library~0~2"
                target="_blank"
              >
                <img
                  class="image is-52x52 logo"
                  src="https://images-na.ssl-images-amazon.com/images/I/3131ceEdnOL.jpg"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="movie-card-container">
        <MovieCard v-for="movie of movies" :key="movie.id" :movie="movie" />
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import Movie from "../models/movie";

export default {
  name: "Home",
  components: {
    Header,
    MovieCard,
  },
  data() {
    return {
      movies: [],
    };
  },
  created() {
    this.movies = Movie.fromJson();
  },
};
</script>

<style>
#movie-card-container {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
}

.bonus-movie {
  /*width: 25em;*/
}
</style>
