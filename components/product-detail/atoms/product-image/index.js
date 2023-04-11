import React, { useState, useEffect, useRef } from 'react';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import Image from '@/components/image';
import placeholder from '@/images/placeholder.png';
import Slider from 'react-slick';
import { useStoreState } from '@/utils/context/store';
import ImageZoom from 'react-image-zooom';
import { getSizedImageUrl } from '@shopify/theme-images';
import styles from './index.module.scss';

function ProductImage({ images = [], prismicData }) {
  const desktopSlider = useRef();
  const verticalSlider = useRef();
  const router = useRouter();

  const { state } = useStoreState();
  const { vip, theme } = state;

  const [imageIndex, setImageIndex] = useState(0);
  const [mainImg, setMainImg] = useState(images[0]?.node);
  const productKey = get(prismicData, '_meta.uid');

  const totalImages = images.length;

  function NextArrowBtn(props) {
    const { className, style, onClick } = props;
    return (
      <button onClick={onClick} className={className} style={style}>
        <img draggable={false} src="/icons/image-arrow-right-active.svg" />
      </button>
    );
  }

  function PrevArrowBtn(props) {
    const { className, style, onClick } = props;
    return (
      <button onClick={onClick} className={className} style={style}>
        <img draggable={false} src="/icons/image-arrow-left-active.svg" />
      </button>
    );
  }

  const mobileSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const tabletSliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const verticalSliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 3,
    vertical: true,
    verticalSwiping: false,
  };

  const desktopSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    draggable: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true,
    afterChange: function (currentSlide) {
      goToVerticalSlide(currentSlide);
    },
    nextArrow: <NextArrowBtn />,
    prevArrow: <PrevArrowBtn />,
  };

  const goPrev = () => {
    desktopSlider.current?.slickPrev();
  };
  const goNext = () => {
    desktopSlider.current?.slickNext();
  };

  const goToSlide = (index) => {
    desktopSlider.current?.slickGoTo(index);
  };

  const goToVerticalSlide = (index) => {
    verticalSlider.current?.slickGoTo(index);
  };

  return (
    <React.Fragment>
      <style type="text/css">
        {`.slick-track {
            max-height: 100vh;
          }

          .slick-slide {
            height: auto;
          }`}
      </style>
      <div>
        <div className={styles.productImagesMobile}>
          <Slider {...mobileSliderSettings}>
            {images &&
              images.map(({ node }, idx) => {
                const { originalSrc, altText } = node;
                if (!originalSrc) {
                  return null;
                }
                return (
                  <Image
                    key={idx}
                    src={`https:${getSizedImageUrl(originalSrc, 'grande')}`}
                    alt={altText}
                    layout="responsive"
                    width={80}
                    height={92}
                    draggable={false}
                  />
                );
              })}
          </Slider>
        </div>
      </div>
      <div className={styles.productImages}>
        <div className={styles.productImagesList}>
          <Slider {...verticalSliderSettings} ref={verticalSlider}>
            {images &&
              images.map(({ node }, idx) => {
                const { originalSrc, altText, id } = node;
                if (!originalSrc) {
                  return null;
                }
                return (
                  <div
                    key={id}
                    className={styles.productImagesListItem}
                    onClick={() => {
                      goToSlide(idx);
                    }}
                  >
                    <Image
                      src={`https:${getSizedImageUrl(originalSrc, 'medium')}`}
                      alt={altText}
                      layout="responsive"
                      width={80}
                      height={92}
                      // draggable={false}
                    />
                  </div>
                );
              })}
          </Slider>
        </div>
        <div className={styles.productImagesHighlight}>
          <div
            className={styles.productImagesHighlightInner}
            style={{
              borderColor:
                theme === 'black' ? 'white' : 'rgb(112, 112, 112, 0.22)',
            }}
          >
            <div className={styles.productImagesHighlightContent}>
              <Slider
                className="slick-large"
                ref={desktopSlider}
                {...desktopSettings}
              >
                {images &&
                  images.map(({ node }) => {
                    const { originalSrc, altText, id } = node;
                    return (
                      <div key={id}>
                        <img
                          src="/icons/image-zoom-icon.svg"
                          className="zoom"
                        />
                        <ImageZoom
                          key={id}
                          style={{ minHeight: '80vh' }}
                          zoom="200"
                          src={originalSrc}
                          alt={altText}
                          width={920}
                          height={'100%'}
                        />
                      </div>
                    );
                  })}
              </Slider>
            </div>
            <img src={placeholder} />
          </div>
          <div className={styles.productImagesTabletList}>
            <Slider {...tabletSliderSettings}>
              {images &&
                images.map(({ node }, idx) => {
                  const { originalSrc, altText, id } = node;
                  return (
                    <div
                      key={id}
                      className={styles.productImagesTabletListItem}
                      onClick={() => {
                        goToSlide(idx);
                      }}
                    >
                      <Image
                        src={`https:${getSizedImageUrl(originalSrc, 'medium')}`}
                        alt={altText}
                        layout="responsive"
                        width={80}
                        height={92}
                        draggable={false}
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductImage;
