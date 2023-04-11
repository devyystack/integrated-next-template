import { getProduct, getAllProductsByColor } from '@/lib/shopify';
import { getProductDataByUid, getCollectionDataByUid } from '@/lib/prismic';
import { get } from 'lodash';

export default async function handler(req, res) {
  const { uid } = req.query;
  const productData = await getProduct(uid);
  const product = productData?.id ? productData : null;

  const currentColor = get(productData, 'product_color_name.value', null);

  const productsByColor = currentColor
    ? await getAllProductsByColor(currentColor.replace('-', ' '), 5)
    : null;

  const prismicData = await getProductDataByUid(
    productData.product_cms_id?.value.trim()
  );
  const prismic = prismicData;

  const collectionsAvailable = get(productData, 'collections.edges', []).filter(
    ({ node }) => {
      return node.handle !== 'frontpage' && node.handle !== 'sale';
    }
  );

  const collectionData = await getCollectionDataByUid(
    get(collectionsAvailable, '[0].node.handle', null) ??
      get(collectionsAvailable, '[1].node.handle', null)
  );
  const collection = collectionData;

  res.status(200).json({
    payload: { product, productsByColor, prismic, currentColor, collection },
  });
}
