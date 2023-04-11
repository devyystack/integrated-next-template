import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import ProductList from '@/components/product-list';
import { useRouter } from 'next/router';
import { getHeaderById, getFooterById, getOptions } from '@/lib/prismic';
import styles from '@scss/layout.module.scss';

function SearchPage({ navigation }) {
  const router = useRouter();
  const [data, setData] = useState({ results: [], count: 0, loading: true });
  const {
    query: { q },
  } = router;

  useEffect(() => {
    setData({ results: [], count: 0, loading: true });
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q,
      }),
    })
      .then((data) => data.json())
      .then(({ success, results, count }) => {
        if (success) {
          setData({ results, count, loading: false });
        }
      });
  }, [q]);

  return (
    <Layout navigation={navigation}>
      <div className={styles.layout}>
        <h2>
          Your search for: &ldquo;{q}&rdquo;
          {!data.loading && (
            <span>{data.count === 0 ? 'No' : data.count} products found</span>
          )}
        </h2>
        <ProductList products={data.results} loading={data.loading} />
      </div>
    </Layout>
  );
}

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

export default SearchPage;
