<template>
  <div class="home">
    <Header :initial-shrunk="shouldStartShrunk" />
    <section class="section main-content">
      <div id="movie-card-container">
        <MovieCard v-for="movie of movies" :key="movie.id" :movie="movie" />
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
// import Movie from "../models/movie";
import Movies from "../models/movies.json";

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
  computed: {
    shouldStartShrunk() {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentDay = today.getDate();

      // Check if it's November (10) and there is a movie for today
      if (currentMonth === 10) {
        return this.movies.some((movie) => movie.date === currentDay);
      }
      return false;
    },
  },
  created() {
    this.movies = Movies.sort((a, b) => {
      return a.date - b.date;
    });
  },
};
</script>

<style>
.home {
  min-height: 100vh;
  background-image: url("~@/assets/img/background.webp");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}

.main-content {
  padding: 3rem 1.5rem;
}

#movie-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Scrollbar styling for a nice touch */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #165b33;
}

::-webkit-scrollbar-thumb {
  background: #f8b229;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d42426;
}
</style>
