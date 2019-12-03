<template lang="pug">
div {{$t('test.title')}}
  //- svg-icon(iconClass="apple")
  ul
    li 1
</template>

<script>
export default {
  mounted () {
    console.log(1123)
    // this.$api.home.upload({ s: 1 }).then(res => console.log(res))
  }
}
</script>

<style lang="scss" scoped>
li {
  font-size: $width;
}
</style>
