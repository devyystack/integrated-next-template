import Layout from '@/components/layout';
import CartFullPage from '@/components/cart-full-page';
import { getHeaderById, getFooterById, getOptions } from '@/lib/prismic';

function CartPage({ navigation }) {
  return (
    <Layout navigation={navigation}>
      <CartFullPage />
    </Layout>
  );
}

export default CartPage;

export async function getStaticProps() {
  const header = await getHeaderById('header');
  const footer = await getFooterById('footer');
  const options = await getOptions();

  return {
    props: {
      navigation: { header, footer, options },
    },
  };
}
