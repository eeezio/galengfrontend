<template>
  <div id="app">
    <Title></Title>
  </div>
</template>
<script>
import Title from "./components/Title";

export default {
  name: 'App',
  components: {
    Title
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
