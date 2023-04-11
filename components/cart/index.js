import { useEffect } from 'react';
import closeButtonSrc from '@/images/ui-close.png';
import { useStoreState } from '@/utils/context/store';
import CartEmpty from './atoms/cart-empty';
import CartActions from './atoms/cart-actions';
import CartItem from './atoms/cart-item';
import styles from './index.module.scss';

const Cart = ({ display = false }) => {
  const { state, dispatch, methods } = useStoreState();
  const { cartOpen, checkout } = state;

  const handleCartClose = (e) => {
    e.preventDefault();
    dispatch({ type: 'CLOSE_CART' });
  };

  const updateQuantityInCart = (lineItemId, quantity) => {
    methods.updateQuantityInCart(lineItemId, quantity);
  };

  const removeFromCart = (lineItemId) => {
    methods.removeFromCart(lineItemId);
  };

  const openCheckout = () => {
    window.open(
      state.checkout.webUrl.replace(
        process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
        process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN_OVERRIDE
      ),
      '_self'
    );
  };

  useEffect(() => {
    if (cartOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [cartOpen]);

  const cartEmpty = checkout && checkout.lineItems.length === 0;

  return (
    <>
      <div className={`${styles.cart} ${display ? styles.cartDisplay : ''}`}>
        <div className={styles.cartHeader}>
          <h2>Shopping Cart</h2>
          <button
            onClick={handleCartClose}
            aria-label="Close Cart"
            name="Close Cart"
          >
            <img draggable={false} alt="Close Icon" src={closeButtonSrc} />
          </button>
        </div>
        <div className={styles.cartContents}>
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
                      line_item.variant.image ? line_item.variant.image.src : ''
                    }
                    quantity={line_item.quantity}
                    price={(
                      line_item.quantity * line_item.variant?.price.amount
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
      <div
        style={{
          opacity: display ? 1 : 0,
          pointerEvents: display ? 'initial' : 'none',
          cursor: display ? 'pointer' : 'none',
        }}
        onClick={handleCartClose}
        className={styles.bg}
      />
    </>
  );
};

export default Cart;
