import { titleCaseString } from '@/utils/functions';
import { getSizedImageUrl } from '@shopify/theme-images';
import styles from './../index.module.scss';

const CartItem = ({
  title,
  imgSrc,
  price,
  size,
  quantity,
  lineItemId,
  updateQuantityInCart,
  removeFromCart,
}) => {
  const decrementQuantity = () => {
    const updatedQuantity = quantity - 1;
    updateQuantityInCart(lineItemId, updatedQuantity);
  };

  const incrementQuantity = () => {
    const updatedQuantity = quantity + 1;
    updateQuantityInCart(lineItemId, updatedQuantity);
  };

  const processAbbreviations = (string) => {
    return string
      .replace('XSMALL', 'XS')
      .replace('SMALL', 'S')
      .replace('MEDIUM', 'M')
      .replace('LARGE', 'L')
      .replace('XLARGE', 'XL')
      .replace('XXLARGE', 'XXL')
      .replace('XSMALL - MEDIUM', 'XS-M')
      .replace('LARGE - XXLARGE', 'L-XXL');
  };

  const titles = title.split('//');

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemLeft}>
        <img
          draggable={false}
          src={getSizedImageUrl(imgSrc, 'medium')}
          alt={title}
        />
      </div>
      <div className={styles.cartItemRight}>
        <h3>
          <span>{titles[0]}</span>
          <strong>${price}</strong>
        </h3>
        <h4>
          {size ? (
            <span style={{ marginRight: '10px' }}>{`${processAbbreviations(
              size
            )}`}</span>
          ) : (
            ``
          )}
          {titleCaseString(titles[1])}{' '}
        </h4>
        <div className={styles.cartItemRightActions}>
          <div className={styles.cartItemUpdate}>
            <label>Qty</label>
            <div className={styles.cartItemQuantity}>
              <button
                className={styles.cartItemUpdateButton}
                onClick={() => incrementQuantity()}
                aria-label="Add 1"
                name="Add 1"
              >
                <img draggable={false} alt="Add 1" src="/icons/icon-plus.svg" />
              </button>
              <span className={styles.cartItemUpdateQuantity}>{quantity}</span>
              <button
                className={styles.cartItemUpdateButton}
                onClick={() => decrementQuantity()}
                aria-label="Remove 1"
                name="Remove 1"
              >
                <img
                  draggable={false}
                  alt="Remove 1"
                  src="/icons/icon-minus.svg"
                />
              </button>
            </div>
          </div>
          {/* <select>
            <option>Size</option>
          </select> */}
          <button onClick={() => removeFromCart(lineItemId)}>
            <img
              draggable={false}
              alt="Delete Item"
              aria-label="Delete Item"
              src="/icons/icon-delete.svg"
            />
            <span>Delete</span>
          </button>
        </div>
        {/* <div className={styles.cartItemSize}>{size}</div> */}
      </div>
    </div>
  );
};

export default CartItem;
