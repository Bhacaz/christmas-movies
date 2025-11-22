<template>
  <div class="home">
    <Header />
    <section
      class="section main-content"
      :style="{ paddingTop: `calc(3rem + ${headerHeight}px)` }"
    >
      <div id="movie-card-container">
        <MovieCard
          v-for="(movie, index) in movies"
          :key="movie.id"
          :movie="movie"
          :animation-index="index"
        />
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
      headerHeight: 0,
    };
  },
  created() {
    this.movies = Movies.sort((a, b) => {
      return a.date - b.date;
    });
  },
  mounted() {
    this.updateHeaderHeight();
    window.addEventListener("resize", this.updateHeaderHeight);
    this.scrollToCurrentDay();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateHeaderHeight);
  },
  methods: {
    updateHeaderHeight() {
      const header = document.getElementById("header-hero");
      if (header) {
        this.headerHeight = header.offsetHeight;
      }
    },
    scrollToCurrentDay() {
      const scrollLogic = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        // Check if it's December (11)
        if (currentMonth === 11) {
          const el = document.getElementById("movie-" + currentDay);
          if (el) {
            const header = document.getElementById("header-hero");
            let headerHeight = 0;
            if (header) {
              headerHeight = header.offsetHeight;
            }

            const elementRect = el.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const elementHeight = el.offsetHeight;

            const targetScrollY =
              absoluteElementTop +
              elementHeight / 2 -
              (viewportHeight + headerHeight) / 2;

            window.scrollTo({
              top: targetScrollY,
              behavior: "smooth",
            });
          }
        }
      };

      if (document.readyState === "complete") {
        scrollLogic();
      } else {
        window.addEventListener("load", scrollLogic);
      }
    },
  },
};
</script>

<style>
.home {
  min-height: 100vh;
}

.home::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/public/background.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
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
