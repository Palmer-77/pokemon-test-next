import { deepmerge } from "deepmerge-ts";
import { getRequestConfig } from "next-intl/server";

import { getUserLocale } from "./lib/i18n/getUserLocale";
import { I18nMessages } from "./global";

export const defaultLocale = "en";
export const supportedLocales = ["en", "th"];
export type Locale = (typeof supportedLocales)[number];

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  const baseMessages = (
    await import(`./locales/messages/${defaultLocale}.json`)
  ).default;
  const localeMessages = (await import(`./locales/messages/${locale}.json`))
    .default;

  const messages = deepmerge(baseMessages, localeMessages) as I18nMessages;

  return {
    locale,
    messages,
  };
});
