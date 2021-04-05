import React from "react";
import { useRouter } from "next/router";

export const getLocale = () => {
  const router = useRouter();
  const { pathname } = router;
  console.log("pathname", pathname);
  return pathname + "/";
};
