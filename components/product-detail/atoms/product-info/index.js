import { useEffect, useState, useCallback, createRef } from 'react';
import Price from '@/components/price';
import signer from 'nacl-signature';
import { RichText } from 'prismic-reactjs';
import { useStoreState } from '@/utils/context/store';
import ColorPicker from '@/components/color-picker';
import Loading from './../loading';
import Countdown from 'react-countdown';
import SizeSelector from './atoms/size-selector';
import Presale from './../presale';
import { objectWithoutProperties } from '@/utils/helpers';
import { titleCaseString } from '@/utils/functions';
import Tab from './atoms/tab';
import AfterPay from '@/components/after-pay';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';

const PlaceholderLoading = dynamic(() => import('react-placeholder-loading'), {
  ssr: false,
});

function ProductInfo({ liveData, variants = [] }) {
  const timer = createRef();
  const { state, methods, dispatch } = useStoreState();

  const productPageData = state.productPageData ? state.productPageData : {};

  const {
    product = {},
    prismic: prismicData = {},
    collectionData = {},
    currentColor = {},
  } = productPageData;
  const { title = null, handle = null, description = null } = product;

  const price = product?.variants?.edges[0].node.price || null;
  const originalPrice = product?.variants?.edges[0].node.compareAtPrice || null;

  const onSale = originalPrice !== null && originalPrice > price;

  const [soldOut, setSoldout] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(price);
  const [{ activated, countdown, countdownInt }, setPresale] = useState({
    activated: null,
    countdown: null,
  });
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const { vip, theme } = state;
  const isGiftcard = handle === 'gift-card';

  const { shopify_links = [] } = prismicData || {};

  const { tabs = [] } = collectionData || {};

  const colors = shopify_links.map((link) => {
    const { color, text, name, uid } = link;
    return {
      uid: RichText.asText(uid),
      name: RichText.asText(name),
      hex: color,
      text: text,
    };
  });

  const colorSelectedIndex = shopify_links.findIndex(({ color_uid }) => {
    return RichText.asText(color_uid) === currentColor;
  });

  const [options, setOptions] = useState(
    (liveData !== null ? liveData : variants).map((variant) => {
      return {
        value: variant.node.id,
        label: titleCaseString(variant.node.title),
        disabled: !variant.node.available,
      };
    })
  );
  const handleAddToCart = () => {
    methods.addToCart({
      productTitle: title,
      productHandle: handle,
      variantId: selectedVariant.node.id,
      variantPrice: selectedVariant.node.price,
      variantTitle: selectedVariant.node.title,
      variantQuantity: 1,
    });
  };
  const setSize = (option) => {
    setSelectedOption(option);

    if (isGiftcard) {
      setDisplayPrice(option.label.replace('$', ''));
    }
    variants.some((variant) => {
      if (variant.node.id === option.value) {
        setSelectedVariant(variant);
        return true;
      }
    });
  };

  const handleSizeChart = useCallback(() => {
    dispatch({ type: 'OPEN_SIZE_CHART' });
  }, []);
  const hasColors = colors.length > 0;

  useEffect(() => {
    setDisplayPrice(price);
  }, [price]);

  useEffect(() => {
    setOptions(
      variants.map((variant) => {
        return {
          value: variant.node.id,
          label: titleCaseString(variant.node.title),
          disabled: !variant.node.available,
        };
      })
    );
    const index = (liveData !== null ? liveData : variants).findIndex(
      ({ node }) => {
        return node.available === true;
      }
    );

    setSelectedVariant(variants[index]);
    setSelectedOption(options[index]);
  }, [variants, liveData]);

  const changeProductColor = useCallback(() => {
    setSelectedOption(options[0]);
  }, []);

  const callVip = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/vip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((envelope) => {
        const { success, signature } = envelope;
        if (success) {
          if (
            signer.verify(
              JSON.stringify(objectWithoutProperties(envelope, ['signature'])),
              signature,
              process.env.NEXT_PUBLIC_KEY_PUBLIC
            )
          ) {
            const { activated, countdown, countdownInt, remaining } = envelope;
            setPresale({ activated, countdown, countdownInt });
            if (activated && remaining > 0) {
              timer.current = window.setTimeout(
                callVip,
                (remaining + 2) * 1000
              );
            }
          }
        }
      });
  };

  // VIP Sales
  useEffect(() => {
    callVip();
    return () => {
      window.clearTimeout(timer.current);
    };
  }, []);

  const handleVipAuthenticate = useCallback(() => {
    setPresale(false);
  }, []);

  const handleBorderAdd = () => {};

  const AddToCart = () => {
    const needsBorder =
      colors[colorSelectedIndex]?.hex === '#000000' && theme === 'black';

    return (
      <div className={styles.productInfoActions}>
        <button
          style={{
            backgroundColor: colors[colorSelectedIndex]?.hex || '#000',
            color: colors[colorSelectedIndex]?.text || '#fff',
            border: needsBorder
              ? '1px solid rgba(255, 255, 255, 0.72)'
              : '1px solid transparent',
          }}
          onClick={handleAddToCart}
          disabled={soldOut || selectedVariant === null}
        >
          Add to Cart
        </button>
      </div>
    );
  };

  const leading = (int) => {
    return int >= 10 ? int : `0${int}`;
  };

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {leading(hours)}:{leading(minutes)}:{leading(seconds)}
      </span>
    );
  };

  return (
    <div className={styles.productInfo}>
      <div className={styles.productInfoHeader}>
        <>
          {countdownInt > new Date().getTime() && (
            <div className={styles.productInfoPresale}>
              <strong>presale</strong>
              {vip ? (
                <span>
                  Time remaining:{' '}
                  <Countdown date={countdown} renderer={renderer} />
                </span>
              ) : (
                <span>
                  This product will be available in{' '}
                  <Countdown date={countdown} renderer={renderer} />
                </span>
              )}
            </div>
          )}
        </>
        <h2>
          <>{title ? <>{title}</> : <>&nbsp;</>}</>
        </h2>

        <div
          className={styles.productInfoPrice}
          style={{
            borderColor:
              theme === 'white'
                ? 'rgba(112, 112, 112, 0.22)'
                : `rgba(255, 255, 255, 0.72)`,
          }}
        >
          <>
            <h2>
              <>
                {price ? (
                  <>
                    <span className={styles.productInfoPriceValue}>
                      ${Math.round(displayPrice)}
                    </span>
                    {originalPrice && onSale && (
                      <span className={styles.productInfoOriginalPriceValue}>
                        ${Math.round(originalPrice)}
                      </span>
                    )}
                  </>
                ) : (
                  <>&nbsp;</>
                )}
              </>
            </h2>
          </>
          {price ? (
            <div style={{ margin: '20px 0 0px 0' }}>
              <AfterPay price={displayPrice} />
            </div>
          ) : (
            <div style={{ margin: '20px 0 0 0' }} />
          )}
        </div>
      </div>
      {hasColors && (
        <div className={styles.productInfoColor}>
          <label>Color: {colors[colorSelectedIndex]?.name}</label>
          <ColorPicker
            name="color"
            options={colors}
            current={colorSelectedIndex}
            colorSelectedIndex={colorSelectedIndex}
            changeProductColor={changeProductColor}
          />
        </div>
      )}
      <div>
        <div className={styles.productInfoSize}>
          <div
            className={styles.productInfoSizeActions}
            style={{ visibility: isGiftcard ? 'hidden' : 'visible' }}
          >
            <button onClick={handleSizeChart}>
              {theme === 'white' ? (
                <img src="/icons/icon-size-guide.svg" />
              ) : (
                <img src="/icons/icon-size-guide-white.svg" />
              )}
              Size Guide
            </button>
          </div>
          <SizeSelector
            options={options}
            theme={theme}
            onChange={setSize}
            value={selectedOption}
            isGiftcard={isGiftcard}
          />
        </div>
        {vip || isGiftcard ? (
          <AddToCart />
        ) : (
          <>
            {activated === null ? (
              <Loading />
            ) : (
              <>
                {activated === true ? (
                  <Presale
                    successFunc={handleVipAuthenticate}
                    countdown={countdown}
                  />
                ) : (
                  <AddToCart />
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className={styles.productInfoTabs}>
        <Tab
          name="Product Description"
          text={
            <p>
              {description ? (
                description
              ) : (
                <>
                  {[null, null, null, null].map(() => {
                    return (
                      <div style={{ margin: '15px 0' }}>
                        <PlaceholderLoading
                          shape="rect"
                          width={'100%'}
                          height={14}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </p>
          }
          theme={theme}
          defaultOpen={true}
        />
        {tabs &&
          tabs.map(({ name, content }, idx) => {
            return (
              <Tab name={name} content={content} theme={theme} key={idx} />
            );
          })}
      </div>
    </div>
  );
}

export default ProductInfo;
