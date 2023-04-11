import styles from "./size-selector.module.scss";

const SizeSelector = ({
  theme,
  options,
  value,
  onChange = () => {},
  isGiftcard = false,
}) => {
  const labelMap = {
    Xsmall: "xs",
    Small: "s",
    Medium: "m",
    Large: "l",
    Xlarge: "xl",
    Xxlarge: "xxl",
    Xxxlarge: "xxxl",
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  };

  const borderCss =
    theme === "white" ? "2px solid #000" : "2px solid rgba(255, 255, 255, 0.9)";
  return (
    <div
      className={styles.sizeSelector}
      style={{ maxWidth: isGiftcard ? "90%" : "none" }}
    >
      <label>{isGiftcard ? "Amount:" : "Size:"}</label>
      {options.map((option, index) => {
        const { label, disabled, value: optionValue } = option;

        const containsRange = label.includes("-");

        if (label === "") {
          return null;
        }
        const styleOverride = {
          padding:
            labelMap[label] === "xxxl" ? "7px 5px 6px 5px" : "7px 0px 6px 0px",
          width: labelMap[label] === "xxxl" ? "auto" : "46px",
        };
        if (disabled) {
          return (
            <button
              disabled={disabled}
              className={optionValue === value?.value ? styles.selected : ""}
              onClick={() => {
                onChange(option);
              }}
              style={{
                ...styleOverride,
                width: labelMap[label] ? styleOverride.width : "auto",
                padding: labelMap[label]
                  ? styleOverride.padding
                  : "7px 10px 5px 10px",
              }}
              key={index}
            >
              {disabled && (
                <span
                  className={
                    containsRange
                      ? styles.sizeSelectorOptionRangeDisabled
                      : styles.sizeSelectorOptionDisabled
                  }
                  style={{
                    backgroundColor: "#686F66",
                  }}
                />
              )}
              <>{labelMap[label] || label}</>
            </button>
          );
        } else {
          return (
            <button
              className={optionValue === value?.value ? styles.selected : ""}
              onClick={() => {
                onChange(option);
              }}
              style={{
                border: borderCss,
                ...styleOverride,
                width: labelMap[label] ? styleOverride.width : "auto",
                padding: labelMap[label] ? styleOverride.padding : "7px 10px",
              }}
              key={index}
            >
              {disabled && (
                <span
                  className={
                    containsRange
                      ? styles.sizeSelectorOptionRangeDisabled
                      : styles.sizeSelectorOptionDisabled
                  }
                  style={{
                    backgroundColor: "#686F66",
                  }}
                />
              )}
              <>{labelMap[label] || label}</>
            </button>
          );
        }
      })}
    </div>
  );
};

export default SizeSelector;
