<template>
  <div id="app">
    <PageWrapper>
      <router-view />
    </PageWrapper>
  </div>
</template>

<script>
import PageWrapper from "./components/PageWrapper.vue";

export default {
  name: "App",
  components: {
    PageWrapper,
  },
};
</script>

<style src="./assets/tailwind.css">
