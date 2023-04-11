import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" id="scrolling-element">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;600;700&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            src="https://js.afterpay.com/afterpay-1.x.js"
            data-analytics-enabled
            async
          ></script>
          {/* <style type="text/css">
            {`
               ::-webkit-scrollbar {
                width: 10px;
                right: 10px;
              }
              ::-webkit-scrollbar-track {
                border-radius: 10px;
                background-color: transparent;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #000;
                border-right: 4px white solid;
                border-left: 4px white solid;
                background-clip: padding-box;
              }
            `}
          </style> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
