import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useStoreState } from '@/utils/context/store';
import Layout from '@/components/layout';
import { get } from 'lodash';
import {
  getAllProducts,
  getProduct,
  getAllProductsByColor,
} from '@/lib/shopify';
import {
  getHeaderById,
  getFooterById,
  getProductDataByUid,
  getCollectionDataByUid,
  getOptions,
} from '@/lib/prismic';
import ProductDetail from '@/components/product-detail';

function ProductPage({
  slug,
  navigation,
  product,
  productsByColor,
  prismic,
  currentColor,
  collection,
}) {
  const { state, dispatch, methods } = useStoreState();
  const router = useRouter();

  const { productPageData } = state;
  const [liveData, setLiveData] = useState(null);
  const getProductCurrent = async (slug) => {
    const { variants } = await getProduct(slug);
    if (!variants) {
      return;
    }
    const { edges = [] } = variants;
    setLiveData(edges);
  };

  useEffect(() => {
    methods.loadProductDetailDataByUid(router.query.product);
    if (typeof window !== undefined) {
      window.onpopstate = (e, state) => {
        let url = location.href.split('/');
        if (url[3] === 'shop') {
          let uid = url[4];
          e.preventDefault();
          methods.loadProductDetailDataByUid(uid, 'back');
        } else window.history.back();
      };
    }
  }, [router.asPath]);

  return (
    <Layout navigation={navigation}>
      <ProductDetail
        liveData={liveData}
        productData={productPageData?.product}
        prismicData={productPageData?.prismic}
        collectionData={productPageData?.collection}
        currentColor={productPageData?.currentColor}
        productsByColor={productPageData?.productsByColor}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const LOAD = 200;
  let paths = [];
  const productSlugs = await getAllProducts(LOAD, null);

  let loadMore = productSlugs?.pageInfo?.hasNextPage
    ? productSlugs?.edges[49]?.cursor
    : false;

  paths = [...productSlugs?.edges];

  while (loadMore) {
    const additionalSlugs = await getAllProducts(LOAD, loadMore);
    if (!additionalSlugs) {
      break;
    }

    paths = [...paths, ...additionalSlugs?.edges];
    loadMore = additionalSlugs?.pageInfo?.hasNextPage
      ? additionalSlugs?.edges[LOAD - 1]?.cursor
      : false;
  }

  const p = paths.map((slug) => {
    return {
      params: {
        product: slug?.node?.handle,
        test: true,
        prismicUid: slug.node.product_cms_id?.value,
        currentColor: slug.node.product_color_name?.value,
      },
    };
  });

  return {
    paths: p,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { product = null } = params;

  const header = await getHeaderById('header');
  const footer = await getFooterById('footer');
  const options = await getOptions();

  const productData = await getProduct(product);

  if (productData.length === 0) {
    return {
      notFound: true,
    };
  }
  const prismicData = await getProductDataByUid(
    productData.product_cms_id?.value.trim()
  );

  const collectionsAvailable = get(productData, 'collections.edges', []).filter(
    ({ node }) => {
      return node.handle !== 'frontpage' && node.handle !== 'sale';
    }
  );

  const collectionData = await getCollectionDataByUid(
    get(collectionsAvailable, '[0].node.handle', null) ??
      get(collectionsAvailable, '[1].node.handle', null)
  );

  const currentColor = get(productData, 'product_color_name.value', null);

  const productsByColor = currentColor
    ? await getAllProductsByColor(currentColor.replace('-', ' '), 5)
    : null;

  //product, prismic, collection, productsByColor
  return {
    props: {
      slug: product,
      navigation: { header, footer, options },
      product: productData,
      productsByColor: productsByColor || null,
      prismic: prismicData,
      currentColor,
      collection: collectionData,
    },
  };
}

export default ProductPage;
