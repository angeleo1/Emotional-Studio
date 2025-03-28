import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'ABOUT US': 'ABOUT US',
      'SERVICE': 'SERVICE',
      'BOOKING': 'BOOKING',
      'STORE': 'STORE',
      'GALLERY': 'GALLERY',
      'CONTACT': 'CONTACT',
      'SUPPORT': 'SUPPORT',
      'Emotional Studio': 'Emotional Studio'
    }
  },
  zh: {
    translation: {
      'ABOUT US': '关于我们',
      'SERVICE': '服务',
      'BOOKING': '预约',
      'STORE': '商店',
      'GALLERY': '画廊',
      'CONTACT': '联系我们',
      'SUPPORT': '支持',
      'Emotional Studio': '情感工作室'
    }
  }
}

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    })
}

export default i18n 