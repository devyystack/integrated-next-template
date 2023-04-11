import Link from 'next/link';
import cartEmptySrc from '@/images/ui-cart-empty-large.png';
import styles from './../index.module.scss';

const CartEmpty = () => {
  return (
    <div className={styles.cartContentsEmpty}>
      <img
        draggable={false}
        className={styles.cartContentsEmptyIcon}
        src={cartEmptySrc}
      />
      <h3>Your Cart is Empty.</h3>
      <Link href="/shop">Shop Now</Link>
    </div>
  );
};

export default CartEmpty;
