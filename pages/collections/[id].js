import Head from 'next/head';
import Layout from '@/components/layout';
// import StoreHeading from "@/components/StoreHeading";
import BreadcrumbCollections from '@/components/breadcrumb-collections';
import ProductList from '@/components/product-list';
// import Marquee from "@/components/marquee";
import {
  getAllCollections,
  getCollectionByUid,
  getAllProductsInCollection,
} from '@/lib/shopify';
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
      <Head>
        <title>{collection?.title} | Laina Rauma Lingerie</title>
      </Head>
      <BreadcrumbCollections collectionData={collection} products={products} />
      <ProductList products={products} collectionData={collectionData} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const products = await getAllProductsInCollection(params.id);
  const collection = await getCollectionByUid(params.id);
  const collectionData = await getCollectionDataByUid(params.id);
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

export async function getStaticPaths() {
  const collections = await getAllCollections();
  const paths = collections.map((collection) => {
    return { params: { id: collection.node.handle } };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export default CollectionPage;
