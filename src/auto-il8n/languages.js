const languages = {

    ar: () => import("../../languages/ar.json"),
    en: () => import("../../languages/en.json"),
    es: () => import("../../languages/es.json"),
    fr: () => import("../../languages/fr.json"),
    hi: () => import("../../languages/hi.json"),
    it: () => import("../../languages/it.json"),
    ja: () => import("../../languages/ja.json"),
    ko: () => import("../../languages/ko.json"),
    nl: () => import("../../languages/nl.json"),
    pt: () => import("../../languages/pt.json"),
    ru: () => import("../../languages/ru.json"),
    "zh-CN": () => import("../../languages/zh-CN.json"),
    "zh-TW": () => import("../../languages/zh-TW.json")

};

export default languages;
