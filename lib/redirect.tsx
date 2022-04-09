import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import languageDetector from "./languageDetector";

export const useRedirect = (to?: string) => {
  const router = useRouter();
  to = to || router.asPath;

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect();
    if (to.startsWith("/" + detectedLng) && router.route === "/404") {
      // prevent endless loop
      router.replace("/" + detectedLng + router.route);
      return;
    }

    languageDetector.cache(detectedLng);
    router.replace("/" + detectedLng + to);
  });

  return (
    <>
      <Head>
        <meta http-equiv="refresh" content={`2; url = ${to}`} />
      </Head>
    </>
  );
};

export const Redirect = () => {
  return useRedirect();
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to?: string) => () => {
  return useRedirect(to);
};
