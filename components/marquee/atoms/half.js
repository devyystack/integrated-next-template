import React from 'react';
import Link from 'next/link';
import VideoPlayer from '@/components/video-player';
import Image from '@/components/image';
import arrowImgSrc from '@/images/arrow.png';
import styles from './../index.module.scss';

const Half = ({ image, cta, text, link, videoId, alt }) => {
  return (
    <div className={styles.marqueeHalf}>
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
          <Image
            className={styles.primary}
            src={image}
            layout="responsive"
            width={700}
            height={700}
            alt={alt}
            draggable={false}
          />
        )}
      </Link>
    </div>
  );
};

export default Half;
