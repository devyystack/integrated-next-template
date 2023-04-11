import styles from './index.module.scss';

const AfterPay = ({ price }) => {
  return (
    <div className={styles.afterpay}>
      <afterpay-placement
        style={{ margin: '5px 0' }}
        data-locale="en_US"
        data-currency="USD"
        data-amount={price}
      />
    </div>
  );
};

export default AfterPay;
