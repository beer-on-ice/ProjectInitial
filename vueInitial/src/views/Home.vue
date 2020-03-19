<template lang="pug">
  .home
    a-button(type="primary") {{ $t("test.title") }}
    div 123
</template>

<script>
import { Button, notification } from 'ant-design-vue'
import { mock } from '@/api/home'
export default {
  name: 'Home',
  components: { Button },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      // 请求示例
      try {
        const res = await mock({
          id: 1
        })
        const { code, data, msg } = res
        if (code === 200) {
          console.log('请求成功', data)
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        notification.error({ message })
      }
    }
  }
}
</script>

<style lang="stylus">
// 引入styl文件示例
// @import '~@/styles/_variables.styl'
.home
	div
		color $main_color
		width 375px
		height 200px
		background black
</style>
