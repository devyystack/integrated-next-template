import Layout from '@/components/layout';
import LookbookDetail from '@/components/lookbook-detail';
import {
  getHeaderById,
  getFooterById,
  getAllLookbooks,
  getLookbookById,
  getOptions,
} from '@/lib/prismic';

function LookbookPage({ navigation, lookbook }) {
  return (
    <Layout navigation={navigation}>
      <LookbookDetail lookbook={lookbook} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const header = await getHeaderById('header');
  const lookbook = await getLookbookById(params.uid);
  const options = await getOptions();
  const footer = await getFooterById('footer');

  return {
    props: {
      lookbook,
      navigation: { header, footer, options },
    },
  };
}

export default LookbookPage;

export async function getStaticPaths() {
  const lookbooks = await getAllLookbooks();

  return {
    paths: lookbooks.map((lookbook) => {
      return { params: { uid: lookbook.node._meta.uid } };
    }),
    fallback: false,
  };
}
