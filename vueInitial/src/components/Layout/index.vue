<template lang="pug">
  el-container
    el-header Header
    el-container
      el-aside(width='200px') Aside
      el-main
        router-view
    el-footer Footer
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
