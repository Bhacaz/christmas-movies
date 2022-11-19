<template>
  <div class="home">
    <Header />
    <section class="section">
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
</style>
