module.exports = {
  fixLineBreaks: (input = "") => {
    return input.replace(/(?:\r\n|\r|\n)/g, "<br/>");
  },
  replaceNewLineWithBreakReturn: (input = "") => {
    return input.replace(/\n/g, "<br />");
  },
  truncateString: (str, num, tail = "") => {
    if (str.length <= num) {
      return str;
    }
    return `${str.slice(0, num)}${tail}`;
  },
  capitalize: (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  },
  titleCaseString: (text) => {
    return (text || "")
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  },
  formatCurrency(price) {
    return parseFloat(price).toFixed(2);
  },
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },
  isEmpty(value) {
    return !!value || value === "" || value === " ";
  },
  convertHex(hex, opacity) {
    const newHex = hex.replace("#", "");
    const r = parseInt(newHex.substring(0, 2), 16);
    const g = parseInt(newHex.substring(2, 4), 16);
    const b = parseInt(newHex.substring(4, 6), 16);

    const result = `rgba(${r},${g},${b},${opacity / 100})`;
    return result;
  },
  smarten(a) {
    let newA = a;
    newA = newA.replace(/(^|[-\u2014\s(["])'/g, "$1\u2018"); // opening singles
    newA = newA.replace(/'/g, "\u2019"); // closing singles & apostrophes
    newA = newA.replace(/(^|[-\u2014/[(\u2018\s])"/g, "$1\u201c"); // opening doubles
    newA = newA.replace(/"/g, "\u201d"); // closing doubles
    newA = newA.replace(/--/g, "\u2014"); // em-dashes
    return newA;
  },
  smartenObject(obj) {
    if (obj !== null && typeof obj === "object" && typeof obj !== "undefined") {
      return obj.map((span) => {
        if (!span.text) {
          return span;
        }
        let newText = span.text;
        newText = newText.replace(/(^|[-\u2014\s(["])'/g, "$1\u2018"); // opening singles
        newText = newText.replace(/'/g, "\u2019"); // closing singles & apostrophes
        newText = newText.replace(/(^|[-\u2014/[(\u2018\s])"/g, "$1\u201c"); // opening doubles
        newText = newText.replace(/"/g, "\u201d"); // closing doubles
        newText = newText.replace(/--/g, "\u2014"); // em-dashes
        return { ...span, text: newText };
      });
    }
    return obj;
  },
};
