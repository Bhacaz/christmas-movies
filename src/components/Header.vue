<template>
  <section id="header-hero" class="hero" :class="{ shrunk: isShrunk }">
    <div class="hero-body">
      <h1 class="title main-title">Calendrier de l'Avent</h1>
      <p class="subtitle year-subtitle mt-4">{{ year }}</p>
    </div>
    <ChristmasLights />
  </section>
</template>

<script>
import ChristmasLights from "../components/ChristmasLights";

export default {
  name: "Header",
  components: { ChristmasLights },
  props: {
    initialShrunk: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      year: new Date().getFullYear(),
      isShrunk: this.initialShrunk,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (!this.initialShrunk) {
      this.handleScroll();
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isShrunk = window.scrollY > 50;
    },
  },
};
</script>

<style scoped>
#header-hero {
  /*https://app.haikei.app/*/
  background-image: url("~@/assets/img/img.png");
  background-size: cover;
  background-position: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  overflow: hidden;
  color: white;
  text-align: center;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.hero-body {
  padding-top: 6rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease-in-out;
}

#header-hero.shrunk .hero-body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.main-title {
  font-family: "Courgette", cursive;
  font-size: 4rem;
  color: #fff;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  transition: all 0.3s ease-in-out;
}

#header-hero.shrunk .main-title {
  font-size: 2rem;
  margin-bottom: 0;
}

.year-subtitle {
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  color: #f8b229; /* Gold */
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 5px;
  transition: all 0.3s ease-in-out;
}

#header-hero.shrunk .year-subtitle {
  font-size: 1.2rem;
  margin-top: 0 !important;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  .year-subtitle {
    font-size: 1.5rem;
  }

  #header-hero.shrunk .main-title {
    font-size: 1.5rem;
  }

  #header-hero.shrunk .year-subtitle {
    font-size: 1rem;
  }
}
</style>
