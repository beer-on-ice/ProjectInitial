import Vue from 'vue'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { Container } from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(Container)

Vue.component(CollapseTransition.name, CollapseTransition)
