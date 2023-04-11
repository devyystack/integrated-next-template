import Link from 'next/link';
import styles from './index.module.scss';

const MoreProducts = ({ productsByColor }) => {
  if (productsByColor.length === 0 || productsByColor.length === 1) {
    return null;
  }
  return (
    <section className={styles.moreProducts}>
      <h2>You May Also Like</h2>
      <ul className={styles.moreProductsList}>
        {productsByColor &&
          productsByColor.map((product, idx) => {
            const {
              node: { title, images, handle },
            } = product;
            const image = images.edges[0]?.node?.originalSrc;
            return (
              <li key={idx} className={styles.moreProductsItem}>
                <Link href={`/shop/${handle}`}>
                  <div className={styles.moreProductsImage}>
                    <img draggable={false} alt={title} src={image} />
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default MoreProducts;
