import Vue from 'vue'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { Container, Header, Aside, Main, Footer } from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.component(CollapseTransition.name, CollapseTransition)
