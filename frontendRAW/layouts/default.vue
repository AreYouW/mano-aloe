<template>
  <div
    class="antialiased bg-local bg-contain bg-top md:bg-no-repeat index text-center"
  >
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>

<style>
body {
  background-color: #29222f;
  color: #efebff;
}
.index {
  background-image: url('../assets/img/bg.png');
}
</style>
