<template lang="pug">
div {{$t('test.title')}}
</template>

<script>
export default {
  mounted () {
    console.log(1)
    // this.$api.home.upload({ s: 1 }).then(res => console.log(res))
  }
}
</script>

<style lang="scss" scoped>
</style>
