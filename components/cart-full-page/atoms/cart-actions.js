import styles from './../index.module.scss';

const CartActions = ({ totalPrice, openCheckout }) => {
  return (
    <div className={styles.cartActions}>
      <h2>
        Estimated Total{' '}
        <span className={styles.cartActionsTotal}>${totalPrice}</span>
      </h2>
      <div className={styles.cartActionsSub}>
        Shipping, taxes, and discounts codes
        <br />
        calculated at checkout.
      </div>
      <div className={styles.cartActionsButtons}>
        <button onClick={openCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartActions;
