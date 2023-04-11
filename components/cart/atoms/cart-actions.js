import { useRouter } from 'next/router';
import styles from './../index.module.scss';

const CartActions = ({ totalPrice = '0.00', openCheckout }) => {
  const router = useRouter();

  const handleViewCart = (e) => {
    e.preventDefault();
    router.push('/cart');
  };

  console.log('totalPrice', totalPrice);
  return (
    <div className={styles.cartActions}>
      <h2>
        Estimated Total{' '}
        <span className={styles.cartActionsTotal}>
          {totalPrice?.amount
            ? `$${parseFloat(totalPrice.amount).toFixed(2)}`
            : 'Loading'}
        </span>
      </h2>
      <div className={styles.cartActionsSub}>
        Shipping, taxes, and discounts codes
        <br />
        calculated at checkout.
      </div>
      <div className={styles.cartActionsButtons}>
        <button onClick={openCheckout}>Checkout</button>
        <button className={styles.invert} onClick={handleViewCart}>
          View Shopping Cart
        </button>
      </div>
    </div>
  );
};

export default CartActions;
