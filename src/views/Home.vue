<template>
  <div class="home">
    <Header />
    <section class="section">
      <div id="movie-card-container">
        <MovieCard v-for="i of Array(20).fill()" key="i" />
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";

export default {
  name: "Home",
  components: {
    Header,
    MovieCard,
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
