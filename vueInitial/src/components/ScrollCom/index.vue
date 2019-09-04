<template lang="pug">
  .scroll-wrapper(ref="wrapper")
    div
      slot
      slot(name="pullup" :pullUpLoadObj="pullUpLoadObj")
        .pullup-wrapper(v-if="pullup")
          .before-trigger(v-if="!isPullUpLoad")
            span {{pullUpTxt}}
          .after-trigger(v-else)
            loading
</template>

<script>
import BScroll from 'better-scroll'
import Loading from '@/components/Loading'

export default {
  components: {
    Loading
  },
  data () {
    return {
      isPullUpLoad: false, // 是否上拉了
      pullUpDirty: true // 是否有更多数据标识
    }
  },
  props: {
    // 自定义上拉刷新的内容
    pullUpLoadObj: {
      type: null,
      default: false
    },
    /**
		 * 1 滚动的时候会派发scroll事件，会截流。
		 * 2 滚动的时候实时派发scroll事件，不会截流。
		 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
		 */
    probeType: {
      type: Number,
      default: 1
    },
    /**
		 * 点击列表是否派发click事件
		 */
    click: {
      type: Boolean,
      default: true
    },
    /**
		 * 是否开启横向滚动
		 */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
		 * 是否派发滚动事件
		 */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
		 * 列表的数据
		 */
    data: {
      type: Array,
      default: null
    },
    /**
		 * 是否派发滚动到底部的事件，用于上拉加载
		 */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
		 * 是否派发顶部下拉的事件，用于下拉刷新
		 */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
		 * 是否派发列表滚动开始的事件
		 */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
		 * 当数据更新后，刷新scroll的延时。
		 */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted () {
    setTimeout(() => {
      // 保证在DOM渲染完毕后初始化better-scroll
      this._initScroll()
    }, 20)
  },
  computed: {
    // 上拉刷新默认文案
    pullUpTxt () {
      const moreTxt =
				(this.pullUpLoadObj &&
					this.pullUpLoadObj.txt &&
					this.pullUpLoadObj.txt.more) ||
				'正在加载...'

      const noMoreTxt =
				(this.pullUpLoadObj &&
					this.pullUpLoadObj.txt &&
					this.pullUpLoadObj.txt.noMore) ||
				'暂无更多数据'

      return this.pullUpDirty ? moreTxt : noMoreTxt
    }
  },
  methods: {
    // better-scroll的初始化
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })
      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.isPullUpLoad = true
            this.$emit('scrollToEnd')
          }
        })
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchend', pos => {
          if (pos.y > 50) {
            this.$emit('pulldown')
          }
        })
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    // 代理better-scroll的disable方法
    disable () {
      this.scroll && this.scroll.disable()
    },
    // 代理better-scroll的enable方法
    enable () {
      this.scroll && this.scroll.enable()
    },
    // 代理better-scroll的refresh方法
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    // 代理better-scroll的destroy方法
    destroy () {
      this.scroll && this.scroll.destroy()
    },
    // 代理better-scroll的finishPullUp方法
    finishPullUp () {
      this.isPullUpLoad = false
      this.scroll && this.scroll.finishPullUp()
    },
    // 代理better-scroll的scrollTo方法
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 代理better-scroll的scrollToElement方法
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    // 重新计算，保证滚动效果以及显示文案的正常
    forceUpdate (dirty) {
      this.pullUpDirty = dirty
      if (this.pullup && this.isPullUpLoad) {
        this.finishPullUp()
        this.refresh()
      } else {
        this.refresh()
      }
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data (val) {
      if (!val.length) {
        setTimeout(() => {
          this.forceUpdate()
        }, this.refreshDelay)
      } else {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    }
  }
}
</script>

<style lang="scss" >
.scroll-wrapper {
	width: 100%;
	height: 100%;
	.pullup-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px 0;
	}
}
</style>
