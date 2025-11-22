<template>
  <section id="header-hero" class="hero">
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
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
#header-hero {
  /*https://app.haikei.app/*/
  background-image: url("~@/assets/img/img.png");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;
}

.hero-body {
  padding-top: 6rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
}

.main-title {
  font-family: "Courgette", cursive;
  font-size: 4rem;
  color: #fff;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
}

.year-subtitle {
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  color: #f8b229; /* Gold */
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 5px;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  .year-subtitle {
    font-size: 1.5rem;
  }
}
</style>
