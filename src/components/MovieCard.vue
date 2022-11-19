<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ movie.date }} décembre</p>
    </header>
    <div class="card-content" v-if="showMovie()">
      <!--      @click="showModal = !showModal"-->
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img :src="movie.poster" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5">{{ movie.title }}</p>
          <p class="movie-info">{{ movie.release_year }}</p>
          <!--          <p>-->
          <!--            <span v-if="movie.user_rating" class="tag is-info">{{-->
          <!--              movie.user_rating-->
          <!--            }}</span>-->
          <!--            <span v-if="movie.critic_score" class="tag is-primary">{{-->
          <!--              movie.critic_score-->
          <!--            }}</span>-->
          <!--          </p>-->
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
    <div class="card-content gift-box" v-if="!showMovie()">
      <img
        src="~@/assets/img/gift.png"
        style="object-fit: fill; width: 100%; height: 21em"
      />
    </div>
  </div>

  <!--  <div class="modal" :class="{ 'is-active': showModal }">-->
  <!--    <div class="modal-background" @click="showModal = !showModal"></div>-->
  <!--    <div class="modal-card">-->
  <!--      <header class="modal-card-head">-->
  <!--        <p class="modal-card-title">{{ movie.title }}</p>-->
  <!--        <button-->
  <!--          class="delete"-->
  <!--          aria-label="close"-->
  <!--          @click="showModal = !showModal"-->
  <!--        ></button>-->
  <!--      </header>-->
  <!--      <section class="modal-card-body">-->
  <!--        <article class="media">-->
  <!--          <figure class="media-left">-->
  <!--            <p class="image is-128x128">-->
  <!--              <img :src="movie.imdb_data.poster" />-->
  <!--            </p>-->
  <!--          </figure>-->
  <!--          <div class="media-content">-->
  <!--            <p class="movie-info">{{ movie.plot_overview }}</p>-->
  <!--            <p class="movie-info">{{ movie.release_date }}</p>-->
  <!--            <p class="movie-info">{{ movie.runtime_minutes }} minutes</p>-->
  <!--          </div>-->
  <!--        </article>-->
  <!--        <div class="source-container">-->
  <!--          <div-->
  <!--            class="source-box"-->
  <!--            v-for="source of movie.sources"-->
  <!--            :key="source.info.id"-->
  <!--          >-->
  <!--            <a :href="source.web_url" target="_blank">-->
  <!--              <img class="image is-32x32 logo" :src="source.info.logo_100px" />-->
  <!--            </a>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </section>-->
  <!--    </div>-->
  <!--  </div>-->
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
  methods: {
    showMovie() {
      const d = new Date();
      const date = d.getDate();
      if (this.movie.date === 1) {
        return true;
      }
      return date >= this.movie.date;
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
  background-color: #fe757f33;
  height: 320px;
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
</style>
