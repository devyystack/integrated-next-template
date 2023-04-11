import Layout from '@/components/layout';
import LookbookGrid from '@/components/lookbook-grid';
// import ProductList from "@/components/product-list";
// import Marquee from "@/components/marquee";
// import { getAllProductsInCollection } from "@/lib/shopify";
import {
  getHeaderById,
  getFooterById,
  getAllLookbooks,
  getOptions,
} from '@/lib/prismic';

function LookbookPage({ navigation, lookbooks }) {
  return (
    <Layout navigation={navigation}>
      <LookbookGrid lookbooks={lookbooks} />
    </Layout>
  );
}

export async function getStaticProps() {
  const header = await getHeaderById('header');
  const footer = await getFooterById('footer');
  const options = await getOptions();
  const lookbooks = await getAllLookbooks();

  return {
    props: {
      lookbooks,
      navigation: { header, footer, options },
    },
  };
}

export default LookbookPage;
