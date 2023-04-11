export function saveLocalData(cart, checkoutId, checkoutUrl) {
  localStorage.setItem(
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME,
    JSON.stringify([cart, checkoutId, checkoutUrl])
  );
}

function getLocalData() {
  return JSON.parse(
    localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME)
  );
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData();

  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]]);
    } else {
      setCart([localData[0]]);
    }
    setCheckoutId(localData[1]);
    setCheckoutUrl(localData[2]);
  }
}

export function objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}
