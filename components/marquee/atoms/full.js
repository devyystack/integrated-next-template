import React from 'react';
import Link from 'next/link';
import arrowImgSrc from '@/images/arrow.png';
import Image from '@/components/image';
import VideoPlayer from '@/components/video-player';
import styles from './../index.module.scss';

const Full = ({ image, cta, text, link, videoId, alt }) => {
  return (
    <div className={styles.marqueeFull}>
      <Link href={link}>
        <div className={styles.marqueeText}>
          <span>{cta}</span>
          <h2
            dangerouslySetInnerHTML={{ __html: text.replace('\n', '<br/>') }}
          ></h2>
        </div>
        <img
          draggable={false}
          className={styles.marqueeArrow}
          src={arrowImgSrc}
        />
        {videoId ? (
          <VideoPlayer playbackId={videoId} />
        ) : (
          // <img className={styles.primary} draggable={false} src={image} />
          <Image
            className={styles.primary}
            src={image}
            layout="responsive"
            width={1500}
            height={613}
            alt={alt}
            draggable={false}
          />
        )}
      </Link>
    </div>
  );
};

export default Full;
