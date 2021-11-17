<template>
  <div class="card">
    <!--    <div class="card-image">-->
    <!--      <figure class="image is-4by3">-->
    <!--        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">-->
    <!--      </figure>-->
    <!--    </div>-->
    <header class="card-header">
      <p class="card-header-title">1 décembre</p>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img
              src="https://m.media-amazon.com/images/M/MV5BNWNiNTczNzEtMjQyZC00MjFmLTkzMDMtODk4ZGMyZmE0N2E4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5">How the Grinch Stole Christmas</p>
          <p>1994</p>
          <p>
            <span class="tag is-warning">8.5</span>
          </p>
        </div>
      </div>

      <!--      <div class="content">-->
      <!--        <p class="title is-4">-->

      <!--        </p>-->
      <!--        <p>-->
      <!--          <span class="tag is-primary is-light">🤣 #Comedy</span>-->
      <!--          <span class="tag is-primary is-light">👨‍👩‍👧‍👧 #Family</span>-->
      <!--          <span class="tag is-primary is-light">✨ #Fantasy</span>-->
      <!--        </p>-->
      <!--        <p>-->
      <!--          On the outskirts of Whoville lives a green, revenge-seeking Grinch who plans to ruin Christmas for all of the citizens of the town.-->
      <!--        </p>-->
      <!--        <a href="#">#css</a> <a href="#">#responsive</a>-->
      <!--        <br>-->
      <!--        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
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
</style>
