import Vue from 'vue'
import VueI18N from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'

import cn from './cn'
import en from './en'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import { getLocale, saveLocale } from 'utils/localStorage'

Vue.use(VueI18N)

const messages = {
  en: {
    ...en,
    ...enLocale
  },
  cn: {
    ...cn,
    ...zhLocale
  }
}

let locale = getLocale()
if (!locale) {
  locale = 'cn'
  saveLocale(locale)
}
const i18n = new VueI18N({
  locale,
  messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
