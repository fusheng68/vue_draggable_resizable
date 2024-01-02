import { createI18n } from "vue-i18n";
import EN from "./en";
import ZH from "./zh";
import JP from "./jp";
const messages = {
  zh: {
    ...ZH,
  },
  en: {
    ...EN,
  },
  jp: {
    ...JP,
  },
};
let language = localStorage.getItem('language')||'zh'
const i18n = createI18n({
  locale: language, // 设置当前语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages,
});

export default i18n;
