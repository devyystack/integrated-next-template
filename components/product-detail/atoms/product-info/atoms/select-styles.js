const selectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    border: '1px solid black',
    outline: 'none',
    boxShadow: '0 !important',
    '&:hover': {
      border: '1px solid black',
    },
  }),
  indicatorContainer: (provided) => ({ ...provided, display: 'none' }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '11px',
    outline: 'none',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0',
    top: '-8px',
  }),
  menu: (provided, state) => ({
    ...provided,
    color: state.selectProps.menuColor,
    padding: 0,
    borderRadius: 0,
    outline: 'none',
  }),
  valueContainer: (provided) => {
    return {
      ...provided,
      textTransform: 'uppercase',
      fontSize: '11px',
      color: 'black',
    };
  },
  option: (provided, { isFocused, isSelected, isDisabled }) => {
    if (isDisabled) {
      return {
        ...provided,
        textTransform: 'uppercase',
        backgroundColor: isFocused ? 'black' : 'white',
        color: 'gray',
        cursor: 'not-allowed',
        fontSize: '11px',
      };
    }

    return {
      ...provided,
      backgroundColor: isFocused || isSelected ? 'black' : 'white',
      textTransform: 'uppercase',
      color: isFocused || isSelected ? 'white' : 'black',
      cursor: 'pointer',
      fontSize: '11px',
      ':active': {
        ...provided[':active'],
        color: !isDisabled ? (isSelected ? '#000' : '#fff') : undefined,
        backgroundColor: !isDisabled
          ? isSelected
            ? '#fff'
            : 'rgba(0,0,0,0.7)'
          : undefined,
      },
    };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export default selectStyles;
