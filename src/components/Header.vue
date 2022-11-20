<template>
  <section id="header-hero" class="hero is-primary">
    <div class="hero-body">
      <p class="title">Christmas Movies 2021</p>
    </div>
    <ChristmasLights />
  </section>
</template>

<script>
import ChristmasLights from "../components/ChristmasLights";

export default {
  name: "Header",
  components: { ChristmasLights },
};
</script>

<style>
#header-hero {
  /*https://app.haikei.app/*/
  background-image: url("~@/assets/img/img.png");
  background-size: cover;
  /*background-color: #2fdb6a;*/
}

.hero-body {
  padding-top: 72px;
  padding-bottom: 72px;
  font-family: "Courgette", cursive;
}
</style>
