import Link from 'next/link';
import cartEmptySrc from '@/images/ui-cart-empty-large.png';
import CartIcon from '@/components/header/atoms/cart-icon';
import styles from './../index.module.scss';

const CartEmpty = () => {
  return (
    <div className={styles.cartContentsEmpty}>
      <CartIcon height={60} width={62} />
      <h3>Your cart is empty.</h3>
      <Link href="/shop">Shop Now</Link>
    </div>
  );
};

export default CartEmpty;
