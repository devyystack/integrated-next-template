import React, { useEffect, useState, useRef } from 'react';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import useHover from '@/utils/hooks/use-hover';
import useHover from '@react-hook/hover';
import heroSrc from '@/images/hero.png';
import heroWhiteSrc from '@/images/hero-white.png';
import searchSrc from '@/images/ui-search.png';
import Banner from '@/components/banner';
import useWindowDimensions from '@/utils/hooks/screensize';
import { chunk } from 'lodash';
// import cartEmptySrc from '@/images/ui-cart-empty.png';
import CartIcon from './atoms/cart-icon';
import menuWhiteSrc from '@/images/ui-menu-white.png';
import menuSrc from '@/images/ui-menu.png';
import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';
import slugify from 'slugify';

const Header = ({ data = {} }) => {
  const router = useRouter();
  const searchInput = useRef();
  const hoverRef = useRef(null);
  const subHoverRef = useRef(null);
  // const [hoverRef, isHovered] = useHover();
  const isHovered = useHover(hoverRef, {});
  const subIsHovered = useHover(subHoverRef, {});
  // const [subHoverRef, subIsHovered] = useHover();
  const { state, dispatch } = useStoreState();
  const { menuOpen, vip = false, theme } = state;

  const {
    query: { q: userSearchedKey = null },
  } = router;
  const { header = {} } = data;
  const { primary, secondary } = header;

  const secondaryLinkGroups = chunk(secondary, 3);
  const { height, width } = useWindowDimensions();
  const searchWrapMarginRight = width > 767 ? '10px' : '0px';

  const [searchOpen, setSearchOpen] = useState(false);
  const [shopCollectionsOpen, setShopCollectionsOpen] = useState(false);

  const handleCartClick = (e) => {
    e.preventDefault();

    dispatch({ type: 'TOGGLE_CART' });
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchOpen(!searchOpen);
  };
  useEffect(() => {
    setTimeout(() => {
      searchInput.current.focus();
    }, 500);
  }, [searchOpen]);

  useEffect(() => {
    if (!userSearchedKey) {
      return;
    }
    setSearchOpen(true);
  }, [userSearchedKey]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: { q: searchInput.current.value },
    });
  };
  const handleMenuClick = () => {
    dispatch({ type: 'TOGGLE_MENU' });
  };
  const handleMenuClose = () => {
    dispatch({ type: 'CLOSE_MENU' });
  };

  const handleSubClick = () => {
    dispatch({ type: 'CLOSE_MENU' });
  };

  const secondaryEl = () => {
    if (!shopCollectionsOpen) {
      return null;
    }
    return (
      <>
        {secondaryLinkGroups &&
          secondaryLinkGroups.map((group, idx) => {
            return (
              <div key={idx} className={styles.headerSubNavigationGroup}>
                <ul>
                  {group &&
                    group.map(({ title, url }) => {
                      return (
                        <li key={slugify(RichText.asText(title))}>
                          <Link
                            href={RichText.asText(url)}
                            onClick={handleSubClick}
                          >
                            {RichText.asText(title)}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          })}
      </>
    );
  };
  return (
    <>
      {vip && <Banner text="VIP PRESALE ACCESS" data={vip} />}
      <header className={`${styles.header} ${styles[theme]}`}>
        <div className={`${styles.headerTop} ${styles[theme]}`}>
          <div className={styles.headerInner}>
            <Link href="/">
              <h1>
                {theme === 'black' ? (
                  <img
                    className={styles.headerHero}
                    draggable={false}
                    src={heroWhiteSrc}
                    alt="Laina Rauma"
                  />
                ) : (
                  <img
                    className={styles.headerHero}
                    draggable={false}
                    src={heroSrc}
                    alt="Laina Rauma"
                  />
                )}
              </h1>
            </Link>
            <div className={`${styles.headerMain} ${styles[theme]}`}>
              <ul>
                {primary &&
                  primary.map(({ title, url, highlight = false }) => {
                    const titleText = RichText.asText(title);
                    const urlText = RichText.asText(url);
                    const isActive = router.asPath === urlText;
                    if (titleText.toLowerCase() === 'shop') {
                      return (
                        <li
                          key={slugify(titleText)}
                          className={`${styles.sub} ${
                            highlight ? styles.highlight : ''
                          }`}
                          ref={hoverRef}
                        >
                          <Link href={urlText}>
                            <span>{titleText}</span>
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li
                        key={slugify(titleText)}
                        className={`${styles.sub} ${
                          isActive ? styles.active : ''
                        } ${highlight ? styles.highlight : ''}`}
                      >
                        <Link href={urlText}>
                          <span>{titleText}</span>
                        </Link>
                      </li>
                    );
                  })}
                {/* <li>
                  <button
                    onClick={() => {
                      dispatch({ type: 'TOGGLE_BG' });
                    }}
                  >
                    B/W
                  </button>
                </li> */}
              </ul>
            </div>
            <div className={styles.headerRight}>
              <div
                className={`${styles.headerSearchWrap} ${
                  theme === 'white'
                    ? styles.headerSearchWrapWhite
                    : styles.headerSearchWrapBlack
                }`}
                style={{
                  background: searchOpen ? 'white' : 'transparent',
                  marginRight: searchOpen ? '5px' : searchWrapMarginRight,
                }}
              >
                <button
                  onClick={handleSearchClick}
                  className={styles.headerSearch}
                  aria-label="Search Submit"
                  alt="Search Submit"
                >
                  {theme === 'black' && !searchOpen ? (
                    <img
                      draggable={false}
                      alt="Search Icon"
                      src="/icons/icon-search-white.svg"
                    />
                  ) : (
                    <img
                      draggable={false}
                      alt="Search Icon"
                      src="/icons/icon-search.svg"
                    />
                  )}
                </button>
                <div
                  className={`${styles.headerSearchContainer} ${
                    searchOpen ? styles.searchOpen : ''
                  }`}
                >
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="search"
                      ref={searchInput}
                      style={{
                        ...(theme === 'white' ? {} : { color: '#000' }),
                      }}
                      aria-label="Search Query"
                      alt="Search Query"
                      defaultValue={userSearchedKey}
                    />
                  </form>
                </div>
              </div>
              <button
                onClick={handleCartClick}
                className={styles.headerCart}
                aria-label="Open Cart"
                alt="Open Cart"
              >
                <CartIcon count={9} theme={theme} />
              </button>
              <button
                onClick={handleMenuClick}
                className={styles.headerMenu}
                aria-label="Toggle Menu"
                alt="Toggle Menu"
              >
                {theme === 'black' ? (
                  <img src={menuWhiteSrc} />
                ) : (
                  <img src={menuSrc} />
                )}
              </button>
            </div>
          </div>
        </div>
        {secondaryLinkGroups.length > 0 && (
          <div
            className={`${styles.headerSubNavigation} ${
              isHovered || subIsHovered ? styles.headerSubNavigationActive : ''
            }`}
          >
            <div ref={subHoverRef} className={styles.headerInner}>
              <ul>
                {secondaryLinkGroups &&
                  secondaryLinkGroups.map((group, idx) => {
                    return (
                      <div
                        key={idx}
                        className={styles.headerSubNavigationGroup}
                      >
                        {group &&
                          group.map(({ title, url }) => {
                            return (
                              <li
                                key={slugify(RichText.asText(title) || 'key')}
                              >
                                <Link href={RichText.asText(url)}>
                                  <span>{RichText.asText(title)}</span>
                                </Link>
                              </li>
                            );
                          })}
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
        <div
          className={styles.headerMobile}
          style={{
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'all' : 'none',
            background: theme === 'black' ? 'black' : 'white',
          }}
        >
          <ul>
            {primary &&
              primary.map(({ title, url }) => {
                const titleText = RichText.asText(title);
                const urlText = RichText.asText(url);
                const isActive = router.asPath === urlText;
                if (titleText.toLowerCase() === 'shop') {
                  return (
                    <li key={slugify(titleText)} className={styles.sub}>
                      <button
                        onClick={() => {
                          setShopCollectionsOpen(!shopCollectionsOpen);
                        }}
                      >
                        <a>{titleText}</a>
                      </button>
                      {secondaryEl()}
                    </li>
                  );
                }
                return (
                  <li
                    key={slugify(titleText)}
                    className={`${styles.sub} ${isActive ? styles.active : ''}`}
                  >
                    <Link href={urlText}>{titleText}</Link>
                  </li>
                );
              })}
            {/* <li>
              <button
                onClick={() => {
                  dispatch({ type: 'TOGGLE_BG' });
                }}
              >
                B/W
              </button>
            </li> */}
          </ul>
        </div>
      </header>
      {secondaryLinkGroups.length > 0 && (
        <div
          style={{
            opacity: isHovered || menuOpen || subIsHovered ? 1 : 0,
            pointerEvents: menuOpen ? 'all' : 'none',
          }}
          className={styles.headerBg}
          onClick={handleMenuClose}
        />
      )}
    </>
  );
};

export default Header;
