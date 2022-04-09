import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import languageDetector from "./languageDetector";

export const useRedirect = (to?: string) => {
  const router = useRouter();
  to = to || router.asPath;

  const detectedLng = languageDetector.detect();
  const finalUrl = "/" + detectedLng + to;

  // language detection
  useEffect(() => {
    if (to.startsWith("/" + detectedLng) && router.route === "/404") {
      // prevent endless loop
      router.replace("/" + detectedLng + router.route);
      return;
    }

    languageDetector.cache(detectedLng);
    router.replace(finalUrl);
  }, []);

  console.log(finalUrl, to);

  return (
    <>
      <Head>
        <meta http-equiv="refresh" content={`1; url = ${finalUrl}`} />
      </Head>
    </>
  );
};

export const Redirect = () => {
  useRedirect();
  return <></>;
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to?: string) => () => {
  useRedirect(to);
  return <></>;
};
