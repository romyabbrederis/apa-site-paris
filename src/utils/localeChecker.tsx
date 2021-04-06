import React from "react";
import { useRouter } from "next/router";

export const getLocale = () => {
  const router = useRouter();
  const { pathname, locale } = router;
  return locale + pathname + "/";
};
