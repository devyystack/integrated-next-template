import { RichText } from 'prismic-reactjs';
import ColorPicker from '@/components/color-picker';
import closeButtonSrc from '@/images/ui-close.png';
import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';

const Filters = ({ display = false, collectionData = {} }) => {
  const { state, dispatch } = useStoreState();
  // const [selectedFilter, setSelectedFilter] = useState();

  const handleFiltersClose = (e) => {
    e.preventDefault();
    dispatch({ type: 'CLOSE_FILTER' });
  };

  const { colorFilter, filters = [] } = state;

  const { colors = [], sizes = [] } = collectionData || {};

  const collectionColors = colors.map((link) => {
    const { color, text, name, uid } = link;
    return {
      uid: RichText.asText(uid),
      name: RichText.asText(name),
      hex: color,
      text: text,
    };
  });

  const colorSelectedIndex = colors.findIndex(({ color_uid }) => {
    return RichText.asText(color_uid) === colorFilter;
  });

  const displayColorPicker = collectionColors.length > 0;

  const handleSizeToggle = (e) => {
    if (e.target.checked) {
      dispatch({ type: 'ADD_FILTER', payload: e.target.value });
    } else {
      dispatch({ type: 'REMOVE_FILTER', payload: e.target.value });
    }
  };

  const handleSort = (_sortType) => {
    if (filters.indexOf(_sortType) > -1) {
      dispatch({ type: 'REMOVE_FILTER', payload: _sortType });
      return;
    }
    if (filters.indexOf('asc') > -1) {
      dispatch({ type: 'REMOVE_FILTER', payload: 'asc' });
    }
    if (filters.indexOf('desc') > -1) {
      dispatch({ type: 'REMOVE_FILTER', payload: 'desc' });
    }
    dispatch({ type: 'ADD_FILTER', payload: _sortType });
  };

  const handlenewest = () => {
    if (filters.indexOf('newest') > -1) {
      dispatch({ type: 'REMOVE_FILTER', payload: 'newest' });
    } else {
      dispatch({ type: 'ADD_FILTER', payload: 'newest' });
    }
  };

  return (
    <>
      <div
        className={`${styles.filters} ${display ? styles.filtersDisplay : ''}`}
      >
        <div className={styles.filtersHeader}>
          <h2>Filters</h2>
          <button onClick={handleFiltersClose} aria-label="Close" name="Close">
            <img draggable={false} alt="Close Icon" src={closeButtonSrc} />
          </button>
        </div>
        <div className={styles.filtersGroups}>
          {displayColorPicker && (
            <div className={styles.filtersGroup}>
              <h3>
                Colors
                <span />
              </h3>
              <div>
                <ColorPicker
                  name="color"
                  size="large"
                  options={collectionColors}
                  current={colorSelectedIndex}
                  colorSelectedIndex={colorSelectedIndex}
                  changeFunc={(value) => {
                    if (value === colorFilter) {
                      dispatch({ type: 'SET_COLOR_FILTER', payload: null });
                      return;
                    }
                    dispatch({ type: 'SET_COLOR_FILTER', payload: value });
                  }}
                />
              </div>
            </div>
          )}
          <div className={styles.filtersGroup}>
            <h3>
              Sizes
              <span />
            </h3>
            <div className={styles.filtersGroupList} style={{ columnCount: 3 }}>
              {sizes &&
                sizes.map(({ size, label }, idx) => {
                  const sizeKey = RichText.asText(size);
                  return (
                    <div className={styles.filtersItem} key={idx}>
                      <input
                        type="checkbox"
                        id={`size-${sizeKey}`}
                        name="size"
                        value={sizeKey}
                        checked={filters.indexOf(sizeKey) > -1}
                        onChange={handleSizeToggle}
                      />
                      <label htmlFor={`size-${sizeKey}`}>
                        <span className={styles.checkbox} />
                        {RichText.asText(label)}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.filtersGroup}>
            <h3>
              Other
              <span />
            </h3>
            <div className={styles.filtersGroupList} style={{ columnCount: 2 }}>
              <div className={styles.filtersItem}>
                <input
                  type="radio"
                  id="ascendingPrice"
                  name="priceSort"
                  onClick={() => handleSort('asc')}
                  checked={filters.indexOf('asc') > -1}
                  readOnly
                />
                <label htmlFor="ascendingPrice">
                  <span className={styles.radio} />
                  Ascending Price
                </label>
              </div>
              <div className={styles.filtersItem}>
                <input
                  type="radio"
                  id="descending-price"
                  name="priceSort"
                  onClick={() => handleSort('desc')}
                  checked={filters.indexOf('desc') > -1}
                  readOnly
                />
                <label htmlFor="descending-price">
                  <span className={styles.radio} />
                  Descending Price
                </label>
              </div>
              <div className={styles.filtersItem}>
                <input
                  type="checkbox"
                  id="newest"
                  name="newest"
                  checked={filters.indexOf('newest') > -1}
                  onChange={handlenewest}
                />
                <label htmlFor="newest">
                  <span className={styles.checkbox} />
                  Newest
                </label>
              </div>
              <div className={styles.filtersItem}>
                <input type="checkbox" id="bestSellers" name="bestSellers" />

                <label htmlFor="bestSellers">
                  <span className={styles.checkbox} />
                  Best Sellers
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          opacity: display ? 1 : 0,
          pointerEvents: display ? 'initial' : 'none',
          cursor: display ? 'pointer' : 'none',
        }}
        onClick={handleFiltersClose}
        className={styles.bg}
      />
    </>
  );
};

export default Filters;
