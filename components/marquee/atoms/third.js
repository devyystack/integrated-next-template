import React from 'react';
import Link from 'next/link';
import Image from '@components/image';
import arrowImgSrc from '@images/arrow.png';
import styles from './../index.module.scss';

const Third = ({ image, cta, text, link = '/', alt }) => {
  const showUi = cta && text;
  return (
    <div className={styles.marqueeThird}>
      <Link href={link}>
        {showUi && (
          <>
            <div className={styles.marqueeText}>
              <span>{cta}</span>
              <h2
                dangerouslySetInnerHTML={{
                  __html: (text || '').replace('\n', '<br/>'),
                }}
              ></h2>
            </div>
          </>
        )}
        {showUi && (
          <img
            draggable={false}
            className={styles.marqueeArrow}
            src={arrowImgSrc}
          />
        )}
        <Image
          className={styles.primary}
          src={image}
          fill
          fillstyle={{
            objectFit: 'cover',
          }}
          alt={alt}
          draggable={false}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          viewBox="0 0 800 1014"
        >
          <g stroke="#EEEEEE" stroke-width="1">
            <rect width="800" height="1014" stroke="none" />
            <rect x="0.5" y="0.5" width="800" height="1014" fill="#EEEEEE" />
          </g>
        </svg>
      </Link>
    </div>
  );
};

export default Third;
