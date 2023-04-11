import styles from "./../index.module.scss";

const CartItem = ({
  title,
  imgSrc,
  price,
  size,
  quantity,
  lineItemId,
  updateQuantityInCart,
  // removeFromCart,
}) => {
  const decrementQuantity = () => {
    const updatedQuantity = quantity - 1;
    updateQuantityInCart(lineItemId, updatedQuantity);
  };

  const incrementQuantity = () => {
    const updatedQuantity = quantity + 1;
    updateQuantityInCart(lineItemId, updatedQuantity);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemLeft}>
        <img src={imgSrc} alt={title} />
        {/* <button onClick={() => removeFromCart(lineItemId)}>Delete</button> */}
      </div>
      <div className={styles.cartItemRight}>
        <div className={styles.cartItemTitle}>
          <h3>{title}</h3>
          <span className={styles.cartItemPrice}>${price}</span>
        </div>
        <div className={styles.cartItemSize}>{size}</div>
        <div className={styles.cartItemUpdate}>
          <p>Quantity</p>
          <button
            className={styles.cartItemUpdateButton}
            onClick={() => decrementQuantity()}
          >
            -
          </button>
          <span className={styles.cartItemUpdateQuantity}>{quantity}</span>
          <button
            className={styles.cartItemUpdateButton}
            onClick={() => incrementQuantity()}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
