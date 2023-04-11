import Layout from '@/components/layout';
import ProductList from '@/components/product-list';
import ModuleRenderer from '@/components/module-renderer';
import { getAllProductsInCollection } from '@/lib/shopify';
import {
  getPageById,
  getHeaderById,
  getFooterById,
  getOptions,
  getCollectionDataByUid,
} from '@/lib/prismic';

function IndexPage({ navigation, page, products, collectionData }) {
  return (
    <Layout navigation={navigation}>
      <ModuleRenderer modules={page} />
      <ProductList collectionData={collectionData} products={products} />
    </Layout>
  );
}

export async function getStaticProps() {
  const collectionName = 'deep-sweet';
  const products = await getAllProductsInCollection(collectionName);
  const collectionData = await getCollectionDataByUid(collectionName);
  const header = await getHeaderById('header');
  const footer = await getFooterById('footer');
  const options = await getOptions();
  const page = await getPageById('homepage');

  return {
    props: {
      page,
      navigation: { header, footer, options },
      products,
      collectionData,
    },
  };
}

export default IndexPage;
