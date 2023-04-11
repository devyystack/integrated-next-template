import Layout from '@/components/layout';
// import StoreHeading from "@/components/StoreHeading";
// import ProductList from "@/components/product-list";
// import Marquee from "@/components/marquee";
// import { getAllProductsInCollection } from "@/lib/shopify";
import { getHeaderById, getFooterById, getOptions } from '@/lib/prismic';

function Custom404({ navigation }) {
  return (
    <Layout navigation={navigation}>
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>Page not found...</h2>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const header = await getHeaderById('header');
  const footer = await getFooterById('footer');
  const options = await getOptions();

  return {
    props: {
      navigation: { header, footer, options },
    },
  };
}

export default Custom404;
