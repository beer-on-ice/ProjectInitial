<template lang="pug">
div Home
</template>

<script>
export default {
  mounted () {
    this.$api.upload({ s: 1 }).then(res => console.log(res))
    this.$api.proxy({ s: 1 }).then(res => console.log(res))
    this.$api.restfuls({ id: 1 }).then(res => console.log(res))
  }
}
</script>

<style lang="scss" scoped>
</style>
