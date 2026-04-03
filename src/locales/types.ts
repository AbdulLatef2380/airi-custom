import en from './en.json';

export type Translations = typeof en;

export type AvailableLanguage =
  | 'en'
  | 'ar'
  | 'fa'
  | 'he'
  | 'id'
  | 'ja'
  | 'ko'
  | 'ms'
  | 'ru'
  | 'zh';
