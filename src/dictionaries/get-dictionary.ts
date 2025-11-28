import 'server-only'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  ko: () => import('./ko.json').then((module) => module.default),
  ja: () => import('./ja.json').then((module) => module.default),
}

export const getDictionary = async (locale: keyof typeof dictionaries) => {
  return dictionaries[locale]()
}
