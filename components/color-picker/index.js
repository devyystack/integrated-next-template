import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';

const ColorPicker = ({
  name,
  size = 'small',
  options = [],
  current,
  changeFunc = null,
  changeProductColor,
}) => {
  const hasOptions = options.length > 0;
  const { methods } = useStoreState();

  return (
    <>
      {hasOptions && (
        <div
          className={`${styles.colorPicker} ${
            size === 'large' ? styles.colorPickerLarge : ''
          }`}
        >
          {options.map((option, idx) => {
            if (!option) {
              return null;
            }
            const { name: colorName, hex, uid } = option;
            const handleClick = (e) => {
              e.preventDefault();
              if (changeFunc) {
                e.preventDefault();
                changeFunc(uid);
                return;
              }
              changeProductColor();
              methods.loadProductDetailDataByUid(uid, 'new');
            };
            const handleKeyUp = (e) => {
              e.preventDefault();
              const { code } = e;
              if (code === 'Enter' || code === 'Space') {
                if (changeFunc) {
                  e.preventDefault();
                  changeFunc(uid);
                  return;
                }
                changeProductColor();
                methods.loadProductDetailDataByUid(uid, 'new');
              }
            };
            return (
              <label
                key={idx}
                alt={colorName}
                htmlFor={`option-${idx}`}
                className={styles.colorPickerOption}
                onClick={handleClick}
                onKeyUp={handleKeyUp}
                tabIndex={0}
              >
                <span
                  alt={colorName}
                  title={colorName}
                  className={`${styles.colorPickerOptionDot} ${
                    current === idx ? styles.colorPickerOptionDotActive : ''
                  }`}
                >
                  <span
                    title={colorName}
                    alt={colorName}
                    style={{ backgroundColor: hex }}
                  ></span>
                </span>
                <input
                  id={`option-${idx}`}
                  alt={colorName}
                  type="radio"
                  name={name}
                  className={styles.colorPickerOptionEl}
                />
              </label>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ColorPicker;
