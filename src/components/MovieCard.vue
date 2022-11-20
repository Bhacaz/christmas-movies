<template>
  <div class="card" v-bind:ref="domId()">
    <header class="card-header">
      <p class="card-header-title">{{ movie.date }} décembre</p>
    </header>
    <div class="card-content" style="position: relative">
      <div class="movie-content" v-if="!showGift() || giftAnimation()">
        <div class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img :src="movie.poster" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-5">{{ movie.title }}</p>
            <p class="movie-info">{{ movie.release_year }}</p>
          </div>
        </div>
        <div class="source-container">
          <div
            class="source-box"
            v-for="source of movie.streamingOffers"
            :key="source.provider.id"
          >
            <a :href="source.offer.urls.standard_web" target="_blank">
              <img
                class="image is-52x52 logo"
                :src="source.provider.full_icon_url"
              />
            </a>
          </div>
        </div>
      </div>
      <div
        class="gift-box"
        :class="{ 'slide-out-top': giftAnimation() }"
        v-if="showGift()"
      >
        <img
          :class="{ 'fade-out': giftAnimation() }"
          src="~@/assets/img/gift.png"
          style="
            object-fit: fill;
            width: 100%;
            height: 22em;
            margin-bottom: -1em;
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: ["movie"],
  data() {
    return {
      showModal: false,
    };
  },
  mounted() {
    this.$refs[this.domId()].scrollIntoView({ behavior: "smooth" });
  },
  methods: {
    domId() {
      return "movie-" + this.movie.date;
    },
    december() {
      const d = new Date();
      // JS return month 0-11
      return d.getMonth() === 11;
    },
    date() {
      const d = new Date();
      return d.getDate();
    },
    showGift() {
      if (!this.december()) {
        return true;
      }

      return this.movie.date >= this.date();
    },
    giftAnimation() {
      if (!this.december()) {
        return false;
      }

      return this.movie.date === this.date();
    },
  },
};
</script>

<style>
.card {
  width: 20em;
  margin: 1.2em;
}

.card-content {
  min-height: 21em;
}

.media {
  min-height: 200px;
}

.tag {
  margin-left: 2px;
  margin-right: 2px;
}

.media-content {
  color: grey;
}

.card-header {
  background-color: #ff3c4a;
  font-family: "Courgette", cursive;
}

.card-header-title {
  text-align: center;
  width: 100%;
  display: block;
  box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.39);
}

.source-container {
  display: flex;
  justify-content: center;
}

.logo {
  border-radius: 10px;
}

.gift-box {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("~@/assets/img/wrap_gift.png");
  background-size: contain;
  /*height: 320px;*/
  /*background: radial-gradient(circle at center, #fff 20%, transparent 22%),#5EDEFF;*/
  /*background-size: 34px 34px;*/
  /*position: absolute;*/
  /*width: 100%;*/
  /*background-image: url("~@/assets/img/gift.jpg");*/
}

.card-content.gift-box {
  padding: 0;
}

.source-box {
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow: 6px 6px 12px #9f9f9f, -6px -6px 12px #ffffff;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.movie-info {
  font-size: smaller;
  font-weight: bold;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.is-52x52 {
  height: 52px;
  width: 52px;
}

.slide-out-top {
  animation: slide-out-top 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) 2.5s both;
}

@keyframes slide-out-top {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px);
    opacity: 0;
  }
}

.scale-out-center {
  animation: scale-out-center 0.5s ease-in-out 1.5s both;
}

@keyframes scale-out-center {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 1;
  }
}

.fade-out {
  animation: fade-out 1s ease-out 1s both;
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
