import { useStoreState } from '@/utils/context/store';
import closeSrc from '@/images/ui-close.png';
import styles from './../index.module.scss';

const FilterFlag = ({ filter }) => {
  const { dispatch } = useStoreState();
  const removeFilter = () => {
    dispatch({ type: 'REMOVE_FILTER', payload: filter });
  };
  return (
    <li className={styles.breadcrumbFilterFlag}>
      <span>{filter}</span>
      <button
        onClick={removeFilter}
        aria-label="Remove Filter"
        name="Remove Filter"
      >
        <img draggable={false} alt="Remove Icon" src={closeSrc} />
      </button>
    </li>
  );
};

export default FilterFlag;
