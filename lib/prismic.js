import Prismic from 'prismic-javascript';

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.cdn.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.cdn.prismic.io/graphql`;
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error('Failed to fetch API');
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getHeaderById(id) {
  const data = await fetchAPI(`{
    header(uid: "${id}", lang: "en-us") {
      primary {
        title
        url
        highlight
      }
      secondary {
        title
        url
      }
    }
  }  
  `);
  return data;
}

export async function getOptions() {
  const data = await fetchAPI(`{
    options(uid: "options", lang: "en-us") {
      title
      headline
      image
      call_to_action
    }
  }  
  `);
  return data;
}

export async function getFooterById(id) {
  const data = await fetchAPI(`{
    footer(uid: "${id}", lang: "en-us") {
      primary {
        title
        url
      }
    }
  }  
  `);
  return data;
}

export async function getLookbookById(uid) {
  const data = await fetchAPI(`{
    lookbook (uid: "${uid}", lang: "en-us"){
      title
      cover
      images {
        fullsize
        mobile
        description
      }
    }
  }`);
  return data?.lookbook;
}

export async function getCollectionDataByUid(uid) {
  const data = await fetchAPI(`{
    collection(uid: "${uid}", lang: "en-us"){
      title
      grid_size
      colors {
        uid
        color_uid
        name
        color
        text
      }
      tabs {
        name
        content
      }
      sizes {
        size
        label
      }
    }
  }`);
  return data?.collection;
}

export async function getProductDataByUid(uid) {
  const data = await fetchAPI(`{
    product(uid: "${uid}", lang: "en-us") {
          _meta {
            uid
          }
          title
          shopify_links {
            uid
            color_uid
            name
            color
            text
          }
        }
  }`);
  return data?.product;
}

export async function getPageById(id) {
  const data = await fetchAPI(`{
        page(uid: "${id}", lang: "en-us") {
          title
          body {
            __typename
            ... on PageBodyMarquee {
              fields {
                image
                video_id
                header
                call_to_action
                layout
                image_alt
                new_row
                url
              }
            }
            ... on PageBodyText {
              primary {
                text
              }
            }
            ... on PageBodyTable {
              primary {
                header
              }
            }
            ... on PageBodyFaq {
              type
              label
              primary {
                headline
              }
              fields {
                question
                answer
              }
            }
          }
        }
      }`);
  return data.page;
}

export async function getAllLookbooks() {
  const data = await fetchAPI(
    `{
      allLookbooks(sortBy: date_DESC) {
        edges {
          node {
            _meta {
              id
              uid
            }
            title
            date
            cover
          }
        }
      }
    }`
  );

  return data.allLookbooks?.edges;
}

export async function getVipData() {
  const data = await fetchAPI(
    `{
      presale(uid: "presale", lang: "en-us") {
        title
        activated
        customer_code
        countdown
        vip_banner_message
      }
    }`
  );

  return data.presale;
}

export async function getAllPostsForHome(previewData) {
  const data = await fetchAPI(
    `
    query {
      allPosts(sortBy: date_DESC) {
        edges {
          node {
            date
            title
            content
            coverimage
            excerpt
            author {
              ...on Author {
                name
                picture
              }
            }
            _meta {
              uid
            }
          }
        }
      }
    }
  `,
    { previewData }
  );

  return data.allPosts.edges;
}

export async function getPostAndMorePosts(slug, previewData) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String!, $lang: String!) {
    post(uid: $slug, lang: $lang) {
      title
      content
      date
      coverimage
      author {
        ...on Author {
          name
          picture
        }
      }
      _meta {
        uid
      }
    }

   morePosts: allPosts(sortBy: date_DESC, first: 3) {
      edges {
        node {
          title
          content
          date
          coverimage
          excerpt
          author {
            ...on Author {
              name
              picture
            }
          }
          _meta {
            uid
          }
        }
      }
    }
  }
  `,
    {
      previewData,
      variables: {
        slug,
        lang: API_LOCALE,
      },
    }
  );

  data.morePosts = data.morePosts.edges
    .filter(({ node }) => node._meta.uid !== slug)
    .slice(0, 2);

  return data;
}
