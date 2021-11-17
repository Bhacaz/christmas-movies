<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">1er décembre</p>
    </header>
    <div class="card-content" @click="showModal = !showModal">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img
                :src="movie.imdb_data.poster"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5">{{movie.title}}</p>
          <p>{{movie.release_date}}</p>
          <p>
            <span class="tag is-info">{{movie.user_rating}}</span>
            <span class="tag is-primary">{{movie.critic_score}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="showModal = !showModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{movie.title}}</p>
        <button class="delete" aria-label="close" @click="showModal = !showModal"></button>
      </header>
      <section class="modal-card-body">
        <article class="media">
          <figure class="media-left">
            <p class="image is-128x128">
              <img :src="movie.imdb_data.poster">
            </p>
          </figure>
          <div class="media-content">
            <p>{{movie.plot_overview}}</p>
            <p>{{movie.release_date}}</p>
            <p>{{movie.runtime_minutes}} minutes</p>
          </div>
        </article>
        <div class="source-container">
          <span v-for="source of movie.sources" :key="source.info.id">
            <a :href="source.web_url" target="_blank">
              <img class="image is-64x64 logo" :src="source.info.logo_100px"/>
            </a>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: ["movie"],
  data() {
    return {
      showModal: false
    }
  }
};
</script>

<style>
.card {
  width: 20em;
  margin: 1.2em;
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
  background-color: #ff2f2abb;
}

.source-container {
  display: flex;
  justify-content: center;
}

.logo {
  border-radius: 10px;
}
</style>
