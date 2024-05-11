import { Texts as TEXTS_EN_US } from "./app.texts-en_US";

export type TextsType = typeof TEXTS_EN_US;

const map = new Map<string, TextsType>();

map.set("en", TEXTS_EN_US);
map.set("en-US", TEXTS_EN_US);

export const TextsProvider = {
  get(lang = typeof navigator !== "undefined" ? navigator.language : "pt-BR") {
    return map.get(lang) ?? map.get(lang.substring(0, 2)) ?? TEXTS_EN_US;
  }
};
