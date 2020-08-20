<template>
  <div class="mx-auto grid grid-cols-3">
    <img
      class="hidden lg:block col-span-3 w-2/5 m-16"
      src="../assets/img/map.png"
      alt=""
      srcset=""
    />
    <div
      class="p-3 col-span-3 m-16 grid grid-cols-1 lg:grid-cols-3 rounded-md"
      style="background-color: #29222f;"
    >
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {
    Card,
  },
  // data() {
  //   return {
  //     cssBg: {
  //       backgroundImage: `url(${require('@/assets/img/bg.png')})`,
  //     },
  //   }
  // },
  // :style="{ 'background-image': `url(${require('@/assets/img/bg.png')})` }"
}
</script>

<style></style>
