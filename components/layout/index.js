import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Footer from '@/components/footer/index.js';
import Cart from '@/components/cart';
import Alert from '@/components/alert';
import Transition from '@/components/transition';
import Filters from '@/components/filters';
import { useStoreState } from '@/utils/context/store';
import SizeChart from '@/components/size-chart';
import MailingList from '@/components/mailing-list';
import styles from './style.module.scss';

const Header = dynamic(() => import('@/components/header'), { ssr: false });

function Layout({ children, navigation = {}, collectionData = {} }) {
  const { state, dispatch } = useStoreState();
  const router = useRouter();
  const { cartOpen, filterOpen, vip = false, theme } = state;
  const { header, footer, options } = navigation;

  const handleRouteChange = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  useEffect(() => {
    dispatch({ type: 'SET_COLOR_FILTER', payload: null });
    router.events.on('routeChangeStart', handleRouteChange);
  }, []);

  return (
    <>
      <div className={`${styles.layout} ${styles[theme]}`}>
        <Header data={header} />
        <main>
          <Transition>{children}</Transition>
        </main>
        <Footer data={footer} />
      </div>
      <Cart display={cartOpen} />
      <Filters display={filterOpen} collectionData={collectionData} />
      <SizeChart />
      <Alert />
      <MailingList data={options} />
    </>
  );
}

export default Layout;
