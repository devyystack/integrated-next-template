import { useStoreState } from '@/utils/context/store';
import CartEmpty from './atoms/cart-empty';
import CartActions from './atoms/cart-actions';
import CartItem from './atoms/cart-item';
import styles from './index.module.scss';

const CartFullPage = ({ display = false }) => {
  const { state, methods } = useStoreState();

  const updateQuantityInCart = (lineItemId, quantity) => {
    methods.updateQuantityInCart(lineItemId, quantity);
  };

  const removeFromCart = (lineItemId) => {
    methods.removeFromCart(lineItemId);
  };

  const openCheckout = () => {
    window.open(state.checkout.webUrl, '_self');
  };

  const cartEmpty = state.checkout && state.checkout.lineItems.length === 0;

  return (
    <>
      <div className={`${styles.cart} ${display ? styles.cartDisplay : ''}`}>
        <div className={styles.cartHeader}>
          <h2>Shopping Cart</h2>
        </div>
        <div className={styles.cartColumns}>
          <div
            className={`${styles.cartContents} ${
              cartEmpty ? styles.empty : ''
            }`}
          >
            {cartEmpty && <CartEmpty />}
            {state.checkout && !cartEmpty && (
              <div className={styles.cartList}>
                {state.checkout.lineItems.map((line_item) => {
                  return (
                    <CartItem
                      key={line_item.id.toString()}
                      title={line_item.title}
                      size={line_item.variant.title}
                      imgSrc={
                        line_item.variant.image
                          ? line_item.variant.image.src
                          : ''
                      }
                      quantity={line_item.quantity}
                      price={(
                        line_item.quantity * line_item.variant.price?.amount
                      ).toFixed(2)}
                      lineItemId={line_item.id}
                      updateQuantityInCart={updateQuantityInCart}
                      removeFromCart={removeFromCart}
                    />
                  );
                })}
              </div>
            )}
          </div>
          {state.checkout && !cartEmpty && (
            <CartActions
              totalPrice={state.checkout.totalPrice}
              openCheckout={openCheckout}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CartFullPage;
