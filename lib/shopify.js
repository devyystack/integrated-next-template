const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN;
const collection = process.env.SHOPIFY_COLLECTION;

async function callShopify(query) {
  const fetchUrl = `https://${domain}/api/2021-01/graphql.json`;

  const fetchOptions = {
    endpoint: fetchUrl,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    );
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Could not fetch products!');
  }
}

export async function getAllProducts(first = 50, cursor = null) {
  let add = ``;
  if (cursor) {
    add = `, after: "${cursor}"`;
  }

  const query = `{
    products(first: ${first} ${add}) {
      pageInfo {
        hasNextPage,
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          handle
          collections(first: 1) {
            edges {
              node {
                id
                handle
              }
            }
          }
          totalInventory
          product_cms_id: metafield(namespace: "accentuate", key: "product_cms_uid") {
            value
          }
          product_color_name: metafield(namespace: "accentuate", key: "product_color_name") {
            value
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                price
                currentlyNotInStock
                compareAtPrice
              }
            }
          }
          totalInventory
        }
      }
    }
  }`;

  const response = await callShopify(query);

  return response.data?.products;
}

export async function getAllProductsByColor(color = '', first = 50) {
  const query = `{
      products(query: "title:*${color}*", first: ${first}) {
        edges {
          node {
            id
            title
            handle
            totalInventory
            collections(first: 1) {
              edges {
                node {
                  id
                  handle
                }
              }
            }
            images(first: 250) {
              edges {
                node {
                  id
                  originalSrc
                  height
                  width     
                  altText             
                }
              }
            }
          }
        }
      }}`;

  const response = await callShopify(query);

  return response.data?.products?.edges;
}

export async function getAllCollections() {
  const query = `{ 
    collections(first:250) {
      edges {
        node {
           id
           handle
           title
           description
        }
      }
    }  
  }`;
  const response = await callShopify(query);

  return response?.data?.collections?.edges;
}

export async function getCollectionByUid(uid) {
  const query = `{
    collectionByHandle(handle: "${uid}") {
      id
      title
      description
      handle
    }
  }`;
  const response = await callShopify(query);

  return response?.data?.collectionByHandle
    ? response?.data?.collectionByHandle
    : null;
}

export async function getAllProductsInCollection(collectionSlug = null) {
  const query = `{
      collectionByHandle(handle: "${collectionSlug || collection}") {
        id
        title
        products(first: 250) {
          edges {
            node {
              id
              title
              description
              handle
              publishedAt
              totalInventory
              images(first: 250) {
                edges {
                  node {
                    id
                    originalSrc
                    height
                    width     
                    altText             
                  }
                }
              }
              product_cms_id: metafield(namespace: "accentuate", key: "product_cms_uid") {
                value
              }
              product_color_name: metafield(namespace: "accentuate", key: "product_color_name") {
                value
              }
              variants(first: 250) {
                edges {
                  node {
                    id
                    title
                    price
                    currentlyNotInStock
                    compareAtPrice
                  }
                }
              }
            }
          }
        }
      }
    }`;
  const response = await callShopify(query);

  const allProducts = response.data?.collectionByHandle?.products?.edges
    ? response.data?.collectionByHandle?.products?.edges
    : [];

  return allProducts;
}

export async function getProductSlugs() {
  const query = `{
      collectionByHandle(handle: "${collection}") {
        products(first: 250) {
          edges {
            node {
              handle     
              product_cms_id: metafield(namespace: "accentuate", key: "product_cms_uid") {
                value
              }
              product_color_name: metafield(namespace: "accentuate", key: "product_color_name") {
                value
              }         
            }
          }
        }
      }
    }`;
  const response = await callShopify(query);

  const slugs = response.data?.collectionByHandle?.products?.edges
    ? response.data?.collectionByHandle?.products?.edges
    : [];

  return slugs;
}

export async function getProduct(handle) {
  const query = `{
      productByHandle(handle: "${handle}") {
        id
        title
        handle
        description
        totalInventory
        collections(first: 10) {
          edges {
            node {
              id
              handle
              title
            }
          }
        }
        images(first: 250) {
          edges {
            node {
              id
              originalSrc
              height
              width     
              altText             
            }
          }
        }
        product_cms_id: metafield(namespace: "accentuate", key: "product_cms_uid") {
          value
        }
        product_color_name: metafield(namespace: "accentuate", key: "product_color_name") {
          value
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price
              available
              compareAtPrice
            }
          }
        }
      }
    }`;
  const response = await callShopify(query);

  const product = response.data?.productByHandle
    ? response.data?.productByHandle
    : [];

  return product;
}

export async function createCheckout(id, quantity) {
  const query = `mutation 
      {
        checkoutCreate(input: {
          lineItems: [{ variantId: "${id}", quantity: ${quantity} }]
        }) {
          checkout {
             id
             webUrl
             lineItems(first: 250) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `;
  const response = await callShopify(query);

  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const formattedLineItems = lineItems.map((item) => {
    return `{
      variantId: "${item.variantId}",
      quantity:${item.quantity}
    }`;
  });

  const query = `mutation 
      {
        checkoutLineItemsReplace(lineItems: [${formattedLineItems}], checkoutId: "${id}") {
          checkout {
             id
             webUrl
             lineItems(first: 250) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `;
  const response = await callShopify(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export async function searchShopifyProductsByTitle(string) {
  const query = `{
    products(first: 50, query: "title:'${string}", sortKey: CREATED_AT){
      edges {
        node {
          id
          handle
          title
          description
          updatedAt
          totalInventory
          images(first: 2) {
            edges {
              node {
                originalSrc
              }
            }
          }
        }
      }
    }
  }`;
  const {
    data: {
      products: { edges = [] },
    },
  } = await callShopify(query);

  return { products: edges };
}

export async function searchShopifyProductsByDescription(string = '') {
  const query = `{
    products(first: 50, query: "description:'${string}", sortKey: CREATED_AT){
      edges {
        node {
          id
          handle
          title
          description
          updatedAt
          totalInventory
          images(first: 20) {
            edges {
              node {
                originalSrc
              }
            }
          }
        }
      }
    }
  }`;
  const {
    data: {
      products: { edges = [] },
    },
  } = await callShopify(query);

  return { products: edges };
}
