import { useState } from 'react';
import DownCarrot from './down-carrot';
import { RichText } from 'prismic-reactjs';
import AnimateHeight from 'react-animate-height';
import LinkResolver from '@/utils/link-resolver';
import styles from './tab.module.scss';

const Tab = ({ name, content, theme, text = null, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  const isEmpty = () => {
    if (text) {
      return false;
    }
    return RichText.asText(name) === '' || !RichText.asText(name);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  if (isEmpty()) {
    return null;
  }
  return (
    <div className={styles.tab}>
      <h2
        className={`${open ? styles.open : ''}`}
        onClick={toggleOpen}
        style={{
          borderColor:
            theme === 'black'
              ? 'rgba(255, 255, 255, 0.72)'
              : 'rgba(112, 112, 112, 0.22)',
        }}
      >
        {text ? name : <>{RichText.asText(name)}</>}
        <DownCarrot color={theme} />
      </h2>
      <div
        className={`${styles.tabTextWrap}`}
        style={{
          borderColor:
            theme === 'black'
              ? 'rgba(255, 255, 255, 0.72)'
              : 'rgba(112, 112, 112, 0.22)',
        }}
      >
        <AnimateHeight
          duration={500}
          height={open ? 'auto' : 0} // see props documentation below
        >
          {text ? (
            text
          ) : (
            <RichText render={content} linkResolver={LinkResolver} />
          )}
        </AnimateHeight>
      </div>
    </div>
  );
};

export default Tab;
