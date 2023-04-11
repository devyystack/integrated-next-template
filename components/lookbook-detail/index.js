import { RichText } from 'prismic-reactjs';
import Image from '@/components/image';
import styles from './index.module.scss';

const LookbookDetail = ({ lookbook }) => {
  const { title, images } = lookbook;
  return (
    <section className={styles.lookbookDetail}>
      <div className={styles.lookbookDetailInner}>
        <RichText render={title} />
        <div className={styles.lookbookDetailList}>
          {images &&
            images.map((image, index) => {
              const { fullsize } = image;

              return (
                <>
                  {fullsize && (
                    <div className={styles.lookbookDetailItem} key={index}>
                      <Image
                        src={fullsize.url}
                        layout="intrinsic"
                        width={fullsize.dimensions.width}
                        height={fullsize.dimensions.height}
                        draggable={false}
                      />
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default LookbookDetail;
