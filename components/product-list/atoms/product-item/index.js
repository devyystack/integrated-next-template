import React from 'react';
import Image from '@/components/image';
import { get } from 'lodash';
import { titleCaseString } from '@/utils/functions';
import Link from 'next/link';
import styles from './index.module.scss';

const ProductItem = ({ product }) => {
  const { title, variants, images, handle, totalInventory = 0 } = product;
  const price = get(variants, 'edges[0].node.price', '');
  const imageNode = get(images, 'edges[0].node', null);
  const colorName = get(product, 'product_color_name.value', null);
  const originalPrice = get(variants, 'edges[0].node.compareAtPrice', null);
  const onSale = originalPrice !== null && originalPrice > price;
  const soldOut = totalInventory === 0;
  const altText =
    imageNode.altText ?? colorName
      ? `${titleCaseString(title).split('//')[0].trim()} in ${titleCaseString(
          colorName
        ).replace('-', '')}`
      : titleCaseString(title).split('//')[0].trim();

  return (
    <div className={styles.product} alt={altText}>
      <Link href={`/shop/${handle}`} passHref>
        {onSale && <span className={styles.productOnSale}>Sale</span>}
        {soldOut && <span className={styles.productSoldOut}>Sold Out</span>}

        <div className={styles.productImage}>
          {imageNode && (
            <Image
              src={imageNode.originalSrc}
              alt={altText}
              layout="responsive"
              width={400}
              height={500}
            />
          )}
        </div>
      </Link>
      <Link href={`/shop/${handle}`} passHref>
        <h2>{titleCaseString(title).split('//')[0].trim()}</h2>
        {price && <span>${price}</span>}
      </Link>
    </div>
  );
};

export default ProductItem;
