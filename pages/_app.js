import { useEffect } from 'react';
// import Layout from "@/components/layout";
import SEO from '@/components/seo';
import { StoreProvider } from '@/utils/context/store';
import '@/styles/transition.css';
import * as ga from '@/utils/ga';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

function App({ Component, pageProps, router }) {
  // restoreScrollPosition(router, '#scrolling-element');

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <StoreProvider>
      <SEO title="Laina Rauma Lingerie" />
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default App;
