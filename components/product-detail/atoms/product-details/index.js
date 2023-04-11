import { useState } from 'react';
import ProductInfo from './../product-info';
import styles from './index.module.scss';

function ProductDetails({
  liveData,
  productData,
  collectionData,
  prismicData,
  currentColor,
}) {
  // const [variantPrice, setVariantPrice] = useState(

  // );

  return (
    <div className={styles.productDetails}>
      <ProductInfo
        title={productData ? productData.title : null}
        handle={productData?.handle}
        variants={productData?.variants?.edges}
        prismicData={prismicData}
        currentColor={currentColor}
        description={productData?.description}
        price={productData?.variants?.edges[0].node.price || null}
        // setPriceFunc={setVariantPrice}
        liveData={liveData}
        collectionData={collectionData}
      />
    </div>
  );
}

export default ProductDetails;
