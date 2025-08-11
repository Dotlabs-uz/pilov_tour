import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locales = ["en", "ru", "uz"];
  const cookieStore = (await cookies()) as any;
  let locale = cookieStore.get("locale")?.value || "ru";
  if (!locales.includes(locale)) {
    locale = "ru";
  }
  return {
    locale,
    messages: (await import(`../langs/${locale}.json`)).default,
  };
});
