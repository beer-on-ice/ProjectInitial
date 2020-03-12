import Vue from 'vue'
import VueI18N from 'vue-i18n'

import cn from './cn'
import en from './en'
import { getLocale, saveLocale } from '@/utils/localStorage'

Vue.use(VueI18N)

const messages = {
  en: {
    ...en
  },
  cn: {
    ...cn
  }
}

let locale = getLocale()
if (!locale) {
  locale = 'cn'
  saveLocale(locale)
}

export default () => {
  return new VueI18N({
    locale,
    messages
  })
}
