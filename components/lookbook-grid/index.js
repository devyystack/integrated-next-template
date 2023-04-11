import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import Image from '@/components/image';
import styles from './index.module.scss';

const LookbookGrid = ({ lookbooks }) => {
  return (
    <section className={styles.lookbookGrid}>
      {lookbooks &&
        lookbooks.map((lookbook) => {
          const {
            node: { title, cover, _meta },
          } = lookbook;
          return (
            <div key={_meta.id} className={styles.lookbookGridItem}>
              <Link href={`/lookbook/${_meta.uid}`}>
                <h2>{RichText.asText(title)}</h2>
                <div className={styles.lookbookGridItemBg} />
                <Image
                  className={styles.primary}
                  src={cover.url}
                  layout="responsive"
                  width={cover.dimensions.width}
                  height={cover.dimensions.height}
                  draggable={false}
                />
              </Link>
            </div>
          );
        })}
    </section>
  );
};

export default LookbookGrid;
