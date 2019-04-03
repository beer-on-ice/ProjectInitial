<template lang="pug">
  el-container
    el-header Header
    el-container
      el-aside(width='200px') Aside
      el-main Main
    el-footer Footer
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	line-height: 60px;
}

.el-aside {
	background-color: #d3dce6;
	color: #333;
	text-align: center;
	line-height: 200px;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
	line-height: 160px;
}
</style>
