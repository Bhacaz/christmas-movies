<template>
  <div class="movie-card-wrapper" :id="domId()">
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
        <div class="gift-flap flap-left"></div>
        <div class="gift-flap flap-right"></div>
        <div class="gift-ribbon ribbon-horizontal"></div>
        <div class="gift-ribbon ribbon-vertical"></div>
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
    this.setupObserver();
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    domId() {
      return "movie-" + this.movie.date;
    },
    setupObserver() {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentDay = today.getDate();

      if (currentMonth === 10 && this.movie.date === currentDay) {
        const options = {
          root: null,
          rootMargin: "-20% 0px -20% 0px",
          threshold: 0.1,
        };

        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.shouldUnwrap = true;
              this.observer.disconnect();
            }
          });
        }, options);

        const el = this.$el;
        if (el) {
          this.observer.observe(el);
        }
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow: hidden;
}

.gift-flap {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  background: #165b33; /* Green */
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  border-bottom: 4px solid #124a2a;
}

.flap-left {
  left: 0;
  transform-origin: left;
  border-right: 1px solid #124a2a;
}

.flap-right {
  right: 0;
  transform-origin: right;
  border-left: 1px solid #124a2a;
}

/* Ribbons */
.gift-ribbon {
  position: absolute;
  background: #f8b229; /* Gold */
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.ribbon-horizontal {
  top: 50%;
  left: 0;
  width: 100%;
  height: 40px;
  transform: translateY(-50%);
  transform-origin: right center;
}

.ribbon-vertical {
  left: 50%;
  top: 0;
  height: 100%;
  width: 40px;
  transform: translateX(-50%);
  transform-origin: top center;
}

.gift-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #fff;
  padding: 2rem;
  transition: transform 0.8s ease-in, opacity 0.8s ease-in;
}

.gift-icon {
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.3));
}

.gift-text {
  font-family: "Courgette", cursive;
  font-size: 1.2rem;
  color: #f8b229; /* Gold */
}

/* Unwrap Animation Sequence */

/* 1. Gift Icon: Spin and minimize (0s - 0.8s) */
.gift-overlay.unwrap .gift-content {
  transform: scale(0) rotate(720deg);
  opacity: 0;
}

/* 2. Ribbons: Disappear (0.8s - 1.4s) */
.gift-overlay.unwrap .ribbon-vertical {
  transform: translateX(-50%) scaleY(0);
  opacity: 0;
  transition-delay: 0.8s;
}

.gift-overlay.unwrap .ribbon-horizontal {
  transform: translateY(-50%) scaleX(0);
  opacity: 0;
  transition-delay: 0.8s;
}

/* 3. Flaps: Open (1.4s - 2.2s) */
.gift-overlay.unwrap .flap-left {
  transform: translateX(-100%);
  transition-delay: 1.4s;
}

.gift-overlay.unwrap .flap-right {
  transform: translateX(100%);
  transition-delay: 1.4s;
}

.gift-overlay.unwrap {
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
