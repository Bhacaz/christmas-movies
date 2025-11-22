<template>
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    class="gift-box-svg"
  >
    <!-- Box Base -->
    <rect x="10" y="30" width="80" height="60" rx="2" fill="#D42426" />

    <!-- Vertical Ribbon -->
    <rect x="45" y="30" width="10" height="60" fill="#F8B229" />

    <!-- Lid -->
    <rect x="5" y="25" width="90" height="15" rx="2" fill="#E63946" />

    <!-- Lid Ribbon -->
    <rect x="45" y="25" width="10" height="15" fill="#F8B229" />

    <!-- Bow Left -->
    <path d="M 50 25 C 50 25 30 5 20 15 C 10 25 45 30 50 25" fill="#F8B229" />

    <!-- Bow Right -->
    <path d="M 50 25 C 50 25 70 5 80 15 C 90 25 55 30 50 25" fill="#F8B229" />
  </svg>
</template>

<script>
export default {
  name: "GiftBox",
};
</script>

<style scoped>
.gift-box-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}
</style>
