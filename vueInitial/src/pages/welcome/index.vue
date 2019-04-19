<template lang="pug">
div Home
</template>

<script>
export default {
  mounted () {
    this.$api.upload().then(res => console.log(res))
  }
}
</script>

<style lang="scss" scoped>
</style>
