import { useCallback } from 'react';
import { RichText } from 'prismic-reactjs';
import { useStoreState } from '@/utils/context/store';
import Countdown from 'react-countdown';
import styles from './index.module.scss';

const Banner = ({ text, data }) => {
  const { countdown, vip_banner_message } = data;
  const { methods } = useStoreState();

  if (Date.now() > countdown) {
    return null;
  }

  const leading = useCallback((int) => {
    return int >= 10 ? int : `0${int}`;
  }, []);

  const renderer = useCallback(({ hours, minutes, seconds }) => {
    return (
      <div className={styles.bannerTimer}>
        Sale Over in
        <span>
          {leading(hours)}
          <label>Hour{hours > 1 || hours === 0 ? 's' : ''}</label>
        </span>
        <span>
          {leading(minutes)}
          <label>Minutes</label>
        </span>
        <span>
          {leading(seconds)}
          <label>Seconds</label>
        </span>
      </div>
    );
  }, []);

  const exitVip = useCallback(() => {
    methods.clearVipCookie();
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.bannerInner}>
        <h2>
          <span>{RichText.asText(vip_banner_message)}</span>
        </h2>
        <div className={styles.bannerRight}>
          <Countdown date={countdown} renderer={renderer} />
          <button alt="Exit Presale" title="Exit Presale" onClick={exitVip}>
            <img draggable={false} src="/icons/icon-presale-close.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
