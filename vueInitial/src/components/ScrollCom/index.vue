<template lang="pug">
.list-wrapper(ref="wrapper")
  .scroll-content
    div(ref="listWrapper")
      slot
    slot(
      name="pullup"
      :pullUpLoad="pullUpLoad"
      :isPullUpLoad="isPullUpLoad"
    )
      .pullup-wrapper(v-if="pullUpLoad")
        .before-trigger(v-if="!isPullUpLoad")
          span {{pullUpTxt}}
        .after-trigger(v-else)
          loading
  slot(
    name="pulldown"
    :pullDownRefresh="pullDownRefresh"
    :beforePullDown="beforePullDown"
    :isPullingDown="isPullingDown"
    :pullDownStyle="pullDownStyle"
    :bubbleY="bubbleY"
  )
    .pulldown-wrapper(
      v-if="pullDownRefresh"
      ref="pulldown"
      :style="pullDownStyle"
    )
      .before-trigger(v-if="beforePullDown")
        bubble(:y="bubbleY")
      .after-trigger(v-else)
        .loading(v-if="isPullingDown")
          loading
        div(v-else)
          span {{refreshTxt}}
</template>

<script>
import BScroll from 'better-scroll'
import Loading from '@/components/Loading'
import Bubble from '@/components/Bubble'

// const getRect = el => {
//   if (el instanceof window.SVGElement) {
//     let rect = el.getBoundingClientRect()
//     return {
//       top: rect.top,
//       left: rect.left,
//       width: rect.width,
//       height: rect.height
//     }
//   } else {
//     return {
//       top: el.offsetTop,
//       left: el.offsetLeft,
//       width: el.offsetWidth,
//       height: el.offsetHeight
//     }
//   }
// }

/*
  * 接受的 pullDownRefresh
  pullDownRefreshObj: {
    threshold: parseInt(this.pullDownRefreshThreshold),
    stop: parseInt(this.pullDownRefreshStop)
  }
  * 接受的 pullUpLoadObj
		pullUpLoadObj: {
      threshold: parseInt(this.pullUpLoadThreshold),
      txt: {
        more: this.pullUpLoadMoreTxt,
        noMore: this.pullUpLoadNoMoreTxt
      }
    }
*/

export default {
  components: {
    Loading,
    Bubble
  },
  data () {
    return {
      pullUpDirty: true, // 是否有更多数据标识
      isPullUpLoad: false, // 是否上拉了
      isPullingDown: false, // 是否下拉了
      beforePullDown: true,
      isRebounding: false,
      pullDownStyle: '',
      bubbleY: 0
    }
  },
  props: {
    // 父组件传递过来的上拉刷新参数
    pullUpLoad: {
      type: null,
      default: false
    },
    // 父组件传递过来的下拉刷新参数
    pullDownRefresh: {
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
  created () {
    this.pullDownInitTop = -50
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
				(this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) ||
				'正在加载...'

      const noMoreTxt =
				(this.pullUpLoad &&
					this.pullUpLoad.txt &&
					this.pullUpLoad.txt.noMore) ||
				'暂无更多数据'

      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt () {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || '刷新成功'
    }
  },
  methods: {
    // better-scroll的初始化
    _initScroll () {
      if (!this.$refs.wrapper) return

      // if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
      //   this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper)
      //     .height + 1}px`
      // }

      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh: this.pullDownRefresh
      })

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    _initPullUpLoad () {
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= this.scroll.maxScrollY + 50) {
          this.isPullUpLoad = true
          this.$emit('scrollToEnd')
        }
      })
    },
    _initPullDownRefresh () {
      this.scroll.on('pullingDown', pos => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pulldown')
      })

      this.scroll.on('scroll', pos => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 -
						(this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _reboundPullDown () {
      const { stopTime = 600 } = this.pullDownRefresh
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown () {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
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
    // 代理better-scroll的scrollTo方法
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 代理better-scroll的scrollToElement方法
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    // 代理better-scroll的finishPullUp方法
    finishPullUp () {
      this.isPullUpLoad = false
      this.scroll && this.scroll.finishPullUp()
    },
    finishPullDown () {
      this.isPullingDown = false
      this._reboundPullDown().then(() => {
        this._afterPullDown()
      })
    },
    // 重新计算，保证滚动效果以及显示文案的正常
    forceUpdate (dirty) {
      this.pullUpDirty = dirty
      if (this.pullUpLoad && this.isPullUpLoad) {
        this.finishPullUp()
        this.refresh()
      } else if (this.pullDownRefresh && this.isPullingDown) {
        this.finishPullDown()
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
.list-wrapper {
	position: relative;
	height: 100%;
	overflow: hidden;
	.scroll-content {
		position: relative;
		z-index: 1;
	}
}
.pulldown-wrapper {
	position: absolute;
	width: 100%;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all;
	.after-trigger {
		margin-top: 10px;
	}
}
.pullup-wrapper {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16px 0;
}
</style>
