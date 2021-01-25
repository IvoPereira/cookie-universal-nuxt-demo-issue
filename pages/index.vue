<template>
  <div>
    <div v-if="loaded">
      <div class="content">Content</div>
    </div>
    <div v-else class="loading">Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
    }
  },
  created() {
    this.loaded = true
  },
}
</script>

<style lang="scss" scoped>
.loading {
  padding: 20px;
}
</style>
