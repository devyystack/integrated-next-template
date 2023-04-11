import styles from './index.module.scss';

function Price({ currency, num }) {
  if (!num) {
    return null;
  }
  return (
    <div className={styles.price}>
      <span>
        {currency}
        {num}
      </span>
    </div>
  );
}

export default Price;
