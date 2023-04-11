import ProductImage from './atoms/product-image';
import ProductDetails from './atoms/product-details';
import MoreProducts from './atoms/more-products';
import Breadcrumb from '@/components/breadcrumb';
import styles from './index.module.scss';

function ProductDetail({
  liveData,
  productData,
  collectionData,
  productsByColor,
  prismicData,
  currentColor,
}) {
  return (
    <>
      <Breadcrumb productData={productData} />
      <div className={styles.productDetail}>
        <ProductImage
          images={productData?.images?.edges}
          prismicData={prismicData}
        />
        <ProductDetails
          liveData={liveData}
          productData={productData}
          collectionData={collectionData}
          prismicData={prismicData}
          currentColor={currentColor}
        />
      </div>
      {productsByColor && <MoreProducts productsByColor={productsByColor} />}
    </>
  );
}

export default ProductDetail;
