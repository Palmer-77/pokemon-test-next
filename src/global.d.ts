import { MergeDeep } from "type-fest";

import en from "./locales/messages/en.json";
import th from "./locales/messages/th.json";

export type I18nMessages = MergeDeep<typeof en, typeof th>;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends I18nMessages {}
}
