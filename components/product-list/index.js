import React, { useState } from 'react';
// import Link from "next/link";
import InfiniteScroll from 'react-infinite-scroller';
import ProductItem from './atoms/product-item';
import { useStoreState } from '@/utils/context/store';
import { chunk } from 'lodash';
// import arrowBlackSrc from "@/images/arrow-black.png";
import styles from './index.module.scss';

const ProductList = ({
  products = [],
  loading,
  collectionData = {},
  stagePage = 1,
}) => {
  console.log('products', products);
  const { state } = useStoreState();
  const [page, setPage] = useState(1);
  const { colorFilter, filters } = state;

  const { grid_size = 4 } = collectionData || {};

  let grid_size_fixed = grid_size === null ? 5 : grid_size;

  const maxPages =
    grid_size_fixed !== null ? products.length / grid_size_fixed : 0;

  const loadFunc = () => {
    if (page >= maxPages || maxPages === 0) {
      return;
    }
    setPage(page + 1);
  };

  let filteredProducts = products
    .slice(0, page * grid_size_fixed)
    .filter((product) => {
      if (!colorFilter && filters.length === 0) {
        return true;
      }
      let colorShow = true;
      let filterShow = true;
      if (
        colorFilter &&
        product?.node?.product_color_name?.value !== colorFilter
      ) {
        colorShow = false;
      }
      if (
        filters.length > 0 &&
        (filters.indexOf('small') > -1 ||
          filters.indexOf('medium') > -1 ||
          filters.indexOf('large') > -1 ||
          filters.indexOf('xlarge') > -1 ||
          filters.indexOf('xxlarge') > -1)
      ) {
        filterShow = false;
        filters.map((filter) => {
          switch (filter) {
            case 'small':
              if (product?.node?.variants) {
                product.node.variants.edges.some((variant) => {
                  if (variant.node.title === 'SMALL') {
                    filterShow = true;
                    return true;
                  }
                });
              }
              break;
            case 'medium':
              if (product?.node?.variants) {
                product.node.variants.edges.some((variant) => {
                  if (variant.node.title === 'MEDIUM') {
                    filterShow = true;
                    return true;
                  }
                });
              }
              break;
            case 'large':
              if (product?.node?.variants) {
                product.node.variants.edges.some((variant) => {
                  if (variant.node.title === 'LARGE') {
                    filterShow = true;
                    return true;
                  }
                });
              }
              break;
            case 'xlarge':
              if (product?.node?.variants) {
                product.node.variants.edges.some((variant) => {
                  if (variant.node.title === 'XLARGE') {
                    filterShow = true;
                    return true;
                  }
                });
              }
              break;
            case 'xxlarge':
              if (product?.node?.variants) {
                product.node.variants.edges.some((variant) => {
                  if (variant.node.title === 'XXLARGE') {
                    filterShow = true;
                    return true;
                  }
                });
              }
              break;
            default:
              return true;
          }
        });
      }
      return filterShow && colorShow;
    });
  if (
    filteredProducts.length > 0 &&
    (filters.indexOf('asc') > -1 || filters.indexOf('desc') > -1)
  ) {
    if (filters.indexOf('asc') > -1) {
      filteredProducts.sort((a, b) => {
        return (
          a.node?.variants?.edges[0].node.price -
          b.node?.variants?.edges[0].node.price
        );
      });
    }
    if (filters.indexOf('desc') > -1) {
      filteredProducts.sort((a, b) => {
        return (
          b.node?.variants?.edges[0].node.price -
          a.node?.variants?.edges[0].node.price
        );
      });
    }
  }
  if (filteredProducts.length > 0 && filters.indexOf('newest') > -1) {
    filteredProducts.sort((a, b) => {
      return new Date(b.node?.publishedAt) - new Date(a.node?.publishedAt);
    });
  }
  // const productRows = chunk(filteredProducts, 5);

  return (
    <section className={styles.productList}>
      <InfiniteScroll
        pageStart={stagePage + 1}
        loadMore={loadFunc}
        hasMore={page >= maxPages ? false : true}
        loader={
          <div className={styles.productListLoader} key={0}>
            <span>Loading...</span>
          </div>
        }
      >
        {loading ? (
          <div className={styles.productListLoading}>Searching...</div>
        ) : (
          <ul className={`${styles.productListList}`}>
            {filteredProducts.length === 0 && (
              <div className={styles.productListNoResults}>
                <h2>No products found</h2>
              </div>
            )}
            <div
              className={`${styles.productListListRow} ${
                grid_size_fixed == 4 ? styles.productListListRowFour : ''
              } ${grid_size_fixed == 5 ? styles.productListListRowFive : ''}`}
            >
              {filteredProducts &&
                filteredProducts.map(({ node: product }, idx) => {
                  return <ProductItem key={idx} product={product} />;
                })}
            </div>
          </ul>
        )}
      </InfiniteScroll>
    </section>
  );
};

export default ProductList;
