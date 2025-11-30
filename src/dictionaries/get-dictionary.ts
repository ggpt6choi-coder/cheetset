import 'server-only'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  ko: () => import('./ko.json').then((module) => module.default),
  ja: () => import('./ja.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.en()
}
