import Layout from '@/components/layout';
import ModuleRenderer from '@/components/module-renderer';
import {
  getPageById,
  getHeaderById,
  getFooterById,
  getOptions,
} from '@/lib/prismic';

function FaqPage({ navigation, page }) {
  return (
    <Layout navigation={navigation}>
      <ModuleRenderer modules={page} />
    </Layout>
  );
}

export async function getStaticProps() {
  const header = await getHeaderById('header');
  const footer = await getFooterById('footer');
  const options = await getOptions();
  const page = await getPageById('returns-exchanges');

  return {
    props: {
      page,
      navigation: { header, footer, options },
    },
  };
}

export default FaqPage;
