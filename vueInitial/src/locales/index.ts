import Vue from 'vue'
import VueI18N from 'vue-i18n'

import cn from './cn'
import en from './en'
import { getLocale, saveLocale } from '@/utils/storage/localStorage'

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

const I18N: Function = () => {
  return new VueI18N({
    locale,
    messages
  })
}

export default I18N
