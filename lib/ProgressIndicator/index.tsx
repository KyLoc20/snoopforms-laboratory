import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
/**
 * REMEMBER to import nprogress.css to _app.tsx
 */
export function useIndicatorOnChangeRoute() {
  const router = useRouter();
  useEffect(() => {
    NProgress.configure({ minimum: 0.4, showSpinner: false });
    const handleError = (err: { cancelled?: boolean }, url: string) => {
      if (err.cancelled) {
        //such as a series of quick clicks
        NProgress.done();
      }
    };
    const handleStart = (url: string) => {
      //NProgress.start();
      NProgress.inc(0.2);
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleError);
    return () => {
      NProgress.done();
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);
}
