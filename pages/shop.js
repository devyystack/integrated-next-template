import Layout from '@/components/layout';
// import StoreHeading from "@/components/StoreHeading";
import BreadcrumbCollections from '@/components/breadcrumb-collections';
import ProductList from '@/components/product-list';
// import Marquee from "@/components/marquee";
import { getCollectionByUid, getAllProductsInCollection } from '@/lib/shopify';
import {
  getHeaderById,
  getFooterById,
  getCollectionDataByUid,
  getOptions,
} from '@/lib/prismic';

function CollectionPage({
  navigation,
  products,
  collection = {},
  collectionData = {},
}) {
  return (
    <Layout navigation={navigation} collectionData={collectionData}>
      <BreadcrumbCollections collectionData={collection} products={products} />
      <ProductList products={products} collectionData={collectionData} />
    </Layout>
  );
}

export async function getStaticProps() {
  const collectionName = 'deep-sweet';
  const products = await getAllProductsInCollection(collectionName);
  const collection = await getCollectionByUid(collectionName);
  const collectionData = await getCollectionDataByUid(collectionName);
  const header = await getHeaderById('header');
  const footer = await getFooterById('footer');
  const options = await getOptions();

  return {
    props: {
      navigation: { header, footer, options },
      products,
      collection,
      collectionData,
    },
  };
}

export default CollectionPage;
