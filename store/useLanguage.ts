import { create } from "zustand";

import { Language, LanguageState } from "@/types/language";
import { translations } from "@/languages";

export const useLanguage = create<LanguageState>((set) => ({
    language: Language.EN,
    setLanguage: (language: Language) => set({ language }),
})); 

export const useTranslation = () => {
    const { language } = useLanguage();
    return translations[language];
}