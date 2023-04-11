import React from 'react';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import heroSrc from '@/images/hero.png';
import heroWhiteSrc from '@/images/hero-white.png';
import MailingList from './atoms/mailing-list';
import instagramSrc from '@/images/ui-instagram.png';
import twitterSrc from '@/images/ui-twitter.png';
import facebookSrc from '@/images/ui-facebook.png';
import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';

const Footer = ({ data = {} }) => {
  const { state, dispatch } = useStoreState();
  const { menuOpen, vip = false, theme } = state;

  const { footer = {} } = data;
  const { primary } = footer;

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <ul className={styles.footerNav}>
        {primary &&
          primary.map((item, idx) => {
            const { title, url } = item;
            return (
              <li key={idx}>
                <Link href={RichText.asText(url)}>
                  {RichText.asText(title)}
                </Link>
              </li>
            );
          })}
      </ul>
      <div className={styles.footerInner}>
        <div className={styles.footerHero}>
          <Link href="/" name="Return Home" aria-label="Return Home">
            <img
              className={styles.footerHeroEl}
              draggable={false}
              alt="Laina Rauma Lingerie Logo"
              src={theme === 'white' ? heroSrc : heroWhiteSrc}
            />
          </Link>
        </div>
        <div className={styles.footerCenter}>
          <h2>Subscribe and get 10% off</h2>
          <div className={styles.footerMailingList}>
            <MailingList theme={theme} />
          </div>
        </div>
        <div className={styles.footerRight}>
          <h2>Follow @LainaRauma</h2>
          <ul className={styles.footerSocials}>
            <li className={styles.footerSocialsItem}>
              <a
                href="https://instagram.com/lainarauma"
                name="Instagram"
                aria-label="Instagram"
                target="_blank"
              >
                {theme === 'white' ? (
                  <img
                    draggable={false}
                    src="/icons/icon-instagram-black.svg"
                    alt="Instagram Icon"
                  />
                ) : (
                  <img
                    draggable={false}
                    src="/icons/icon-instagram-white.svg"
                    alt="Instagram Icon"
                  />
                )}
              </a>
            </li>
            <li
              className={styles.footerSocialsItem}
              style={{ position: 'relative', top: '3px' }}
              name="Twitter"
              aria-label="Twitter"
            >
              <a href="https://twitter.com/lainarauma" target="_blank">
                {theme === 'white' ? (
                  <img
                    draggable={false}
                    alt="Twitter Icon"
                    src="/icons/icon-twitter-black.svg"
                  />
                ) : (
                  <img
                    draggable={false}
                    alt="Twitter Icon"
                    src="/icons/icon-twitter-white.svg"
                  />
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <strong
        style={{
          color:
            theme === 'white'
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <span>&copy;2022 Laina Rauma Lingerie</span> |{' '}
        <span>
          Site by:{' '}
          <a target="_blank" href="https://www.letsbuild.la">
            Let's Build
          </a>
        </span>
      </strong>
    </footer>
  );
};

export default Footer;
