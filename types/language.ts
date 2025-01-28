export enum Language { EN = "en", HIN = "hin" }

export type LanguageState = {
    language: Language;
    setLanguage: (language: Language) => void;
};