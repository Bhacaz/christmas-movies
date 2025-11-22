<template>
  <div class="movie-card-wrapper" :ref="domId()">
    <div class="date-badge">
      <span class="day">{{ movie.date }}</span>
      <span class="month">DÉC</span>
    </div>

    <div class="movie-card">
      <!-- Content -->
      <div class="movie-content">
        <div class="poster-container">
          <img
            loading="lazy"
            :src="movie.poster_path"
            :alt="movie.title"
            class="movie-poster"
          />
        </div>
        <div class="movie-details">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-year">
            {{ movie.release_date && movie.release_date.split("-")[0] }}
          </p>
          <div class="providers-list">
            <div
              class="provider-item"
              v-for="source of movie.providers"
              :key="source.provider_id"
            >
              <img
                loading="lazy"
                class="provider-logo"
                :src="source.logo_path"
                :alt="source.provider_name"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Gift Overlay -->
      <div
        class="gift-overlay"
        :class="{ unwrap: shouldUnwrap }"
        v-if="isGiftVisible"
      >
        <div class="gift-content">
          <GiftBox class="gift-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GiftBox from "./GiftBox.vue";

export default {
  name: "MovieCard",
  components: { GiftBox },
  props: ["movie"],
  data() {
    return {
      shouldUnwrap: false,
    };
  },
  computed: {
    isGiftVisible() {
      // Logic to determine if the gift box should be shown initially
      // If it's not December, show everything unwrapped (or maybe wrapped? let's stick to logic)
      // If it is December, show wrapped if date > today

      // For development/demo purposes, let's assume we want to see the wrapping
      // unless it's the specific day to unwrap.

      // Original logic:
      // if (!this.december()) return true; // Wait, original said if !december return true?
      // Let's look at original:
      // showGift() { return false; ... } -> disabled.
      // if (!this.december()) { return true; } -> If not december, show gift? That's weird. Maybe "waiting for december".

      // New Logic:
      // Always show gift if the date hasn't passed.
      // If date is today, animate unwrap.
      // If date is past, show unwrapped.

      const today = new Date();
      const currentMonth = today.getMonth(); // 0-11
      const currentDay = today.getDate();
      // If not December, maybe show all revealed? Or all hidden?
      // Let's assume we are in December for the app to make sense, or testing.
      // If we are not in December, let's just show them all revealed for now, or hidden?
      if (currentMonth !== 10) {
        // If not December, show as gift? Or revealed?
        // Let's say revealed for now.
        return false;
      }

      if (this.movie.date > currentDay) {
        return true; // Future date, keep wrapped
      } else if (this.movie.date === currentDay) {
        return true; // Today, will unwrap
      } else {
        return false; // Past date, revealed
      }
    },
  },
  mounted() {
    this.checkAnimation();
  },
  methods: {
    domId() {
      return "movie-" + this.movie.date;
    },
    checkAnimation() {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentDay = today.getDate();

      if (currentMonth === 10 && this.movie.date === currentDay) {
        // It's today! Unwrap it.
        setTimeout(() => {
          this.shouldUnwrap = true;
          // Scroll into view
          if (this.$refs[this.domId()]) {
            this.$refs[this.domId()].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.movie-card-wrapper {
  position: relative;
  margin: 2rem;
  width: 300px;
  perspective: 1000px;
}

.date-badge {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #d42426; /* Red */
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #f8b229; /* Gold */
  font-family: "Roboto", sans-serif;
}

.date-badge .day {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
}

.date-badge .month {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.movie-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  height: 450px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.poster-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-card:hover .movie-poster {
  transform: scale(1.05);
}

.movie-details {
  padding: 1.5rem;
  background: #fff;
  text-align: center;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #165b33; /* Green */
  margin-bottom: 0.5rem;
  font-family: "Courgette", cursive;
}

.movie-year {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.providers-list {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.provider-item {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.provider-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Gift Overlay */
.gift-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #165b33; /* Green */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  transition: transform 2.5s cubic-bezier(0.55, 0.085, 0.68, 0.53),
    opacity 1s ease-out 1.5s;
  transform-origin: top;
}

.gift-content {
  text-align: center;
  color: #fff;
  padding: 2rem;
}

.gift-icon {
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.gift-text {
  font-family: "Courgette", cursive;
  font-size: 1.2rem;
  color: #f8b229; /* Gold */
}

.gift-overlay.unwrap {
  transform: translateY(-150%) rotate(10deg);
  opacity: 0;
  pointer-events: none;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .movie-card-wrapper {
    width: 100%;
    max-width: 320px;
    margin: 1.5rem auto;
  }
}
</style>
