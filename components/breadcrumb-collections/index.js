import Link from 'next/link';
import { titleCaseString } from '@/utils/functions';
import { useStoreState } from '@/utils/context/store';
import carrotSrc from '@/images/ui-carrot.png';
// import FilterFlag from "./atoms/filter-flag";
import styles from './index.module.scss';

const BreadcrumbCollections = ({ collectionData = {} }) => {
  const { title } = collectionData || {};
  const { state, dispatch } = useStoreState();

  const { filters = [], colorFilter } = state;

  const filtersActive = filters.length > 0 || colorFilter;

  const handleFilterClick = () => {
    dispatch({ type: 'TOGGLE_FILTER' });
  };
  return (
    <section className={styles.breadcrumb}>
      <ul className={styles.breadcrumbList}>
        <li>
          <Link href="/shop">Shop</Link>
          <img className={styles.breadcrumbCarrot} src={carrotSrc} />
        </li>
        {collectionData && <li>{titleCaseString(title)}</li>}
      </ul>
      <div className={styles.breadcrumbFilters}>
        <button onClick={handleFilterClick}>
          {filtersActive ? 'Filters Applied' : 'All Filters'}
        </button>
        {/* {filtersActive && (
          <div className={styles.breadcrumbFiltersResults}>
            <label>{products.length} Products Filtered</label>
            <ul>
              {filters.map((filter, idx) => {
                return <FilterFlag key={idx} filter={filter} />;
              })}
            </ul>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default BreadcrumbCollections;
