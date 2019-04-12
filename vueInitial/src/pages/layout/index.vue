<template lang="pug">
  el-container
    el-header Header
    el-container
      el-aside(width='200px') Aside
      el-main
        Home
    el-footer Footer
</template>

<script>
import Home from 'pages/home'
export default {
	components: {
		Home
	}
}
</script>

<style lang="scss" scoped>
</style>
