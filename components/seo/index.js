import Head from 'next/head';

function SEO({ title }) {
  // customize meta properties
  // you can pass them as an argument like title in case you want to change for each page
  const description =
    'Luxe loungewear and lingerie designed by Laina Rauma. Made with love in Los Angeles.';
  const keywords =
    'womens lingerie, chaps, bralette, cropped vest, womens apparel, downtown los angeles';
  const siteURL = process.env.NEXT_PUBLIC_SITEURL;
  const twitterHandle = process.env.twitterHandle;
  const imagePreview = `${siteURL}/${process.env.siteImagePreviewUrl}`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta name="twitter:creator" content="@lainarauma" key="twhandle" />

      {/* Open Graph */}
      <meta property="og:url" content={siteURL} key="ogurl" />
      <meta property="og:image" content={imagePreview} key="ogimage" />
      <meta property="og:site_name" content={siteURL} key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <title>{title}</title>

      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
      /> */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}

export default SEO;
