import { uniqBy } from 'lodash';
import {
  searchShopifyProductsByTitle,
  searchShopifyProductsByDescription,
} from '@/lib/shopify';

export default async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const { body } = req;
      const { q = null } = body;

      const { products: pByT } = await searchShopifyProductsByTitle(q);
      const { products: pByD } = await searchShopifyProductsByDescription(q);

      const aggregate = uniqBy(
        [...pByT, ...pByD].sort((a, b) => {
          return new Date(b.node.updatedAt) - new Date(a.node.updatedAt);
        }),
        'node.id'
      );
      res.status(200).send({
        success: true,
        query: q,
        count: aggregate.length,
        results: aggregate,
      });
      return resolve();
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
      return resolve();
    }
  });
};
