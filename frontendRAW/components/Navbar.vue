<template>
  <!-- #29222F -->
  <!-- #EFEBFF white -->
  <div class="grid grid-cols-2 text-center shadow-md pb-3 lg:pb-1 navbar">
    <div
      class="col-span-2 lg:col-span-1 mx-auto mb-2 lg:mb-0 lg:flex lg:items-center"
    >
      <img class="w-12 mx-auto my-4 lg:mx-2" src="../assets/img/logo.png" />
      <span class="font-semibold text-3xl block">Mano Aloe Support Squad</span>
    </div>
    <ul
      class="col-span-2 lg:col-span-1 text-xs font-thin flex items-center mx-auto"
    >
      <li>Home</li>
      <li>Game</li>
      <li>Credit</li>
      <li>
        <button class="bg-white rounded-full shadow-sm">
          <svg
            class="w-8 fill-current twitter"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style>
.navbar {
  background-color: #29222f;
}
li {
  @apply inline mx-2;
}
.twitter {
  color: #fd418d;
}
</style>
