import Link from 'next/link';
import { titleCaseString } from '@/utils/functions';
import { get } from 'lodash';
import carrotSrc from '@/images/ui-carrot.png';
import carrotWhiteSrc from '@/images/ui-carrot-white.png';
import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';

const Breadcrumb = ({ productData = {} }) => {
  const { state } = useStoreState();
  const { title = '', collections } = productData;
  const { theme } = state;
  const collectionsAll = get(collections, 'edges', []).filter(({ node }) => {
    return node.handle !== 'frontpage';
  });
  const collection = get(collectionsAll, '[0].node');
  return (
    <section className={styles.breadcrumb}>
      <ul className={styles.breadcrumbList}>
        <li>
          <Link href="/shop">Shop</Link>
          {theme === 'black' ? (
            <img className={styles.breadcrumbCarrot} src={carrotWhiteSrc} />
          ) : (
            <img className={styles.breadcrumbCarrot} src={carrotSrc} />
          )}
        </li>
        {collection && (
          <li>
            <Link href={`/collections/${collection.handle}/`}>
              {titleCaseString(collection.title)}
            </Link>
            {theme === 'black' ? (
              <img className={styles.breadcrumbCarrot} src={carrotWhiteSrc} />
            ) : (
              <img className={styles.breadcrumbCarrot} src={carrotSrc} />
            )}
          </li>
        )}

        {title.includes('//') && (
          <li>{titleCaseString(title).split('//')[0]}</li>
        )}
        {!title.includes('//') && <li>{title}</li>}
      </ul>
    </section>
  );
};

export default Breadcrumb;
