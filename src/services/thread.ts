"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale } from "../config";

const COOKIE_NAME = "AI_Session";

export async function getUserSession() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserSession(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
