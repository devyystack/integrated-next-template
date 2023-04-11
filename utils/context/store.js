import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { setCookie, deleteCookie, getCookies } from 'cookies-next';
import { saveLocalData } from '@/utils/helpers';

import Client from 'shopify-buy';

// This is the default settings for your chat app.
const storeData = {
  cookiesLoaded: false,
  productPageData: null,
  filters: [],
  colorFilter: null,
  cartOpen: false,
  menuOpen: false,
  filterOpen: false,
  sizeChartOpen: false,
  loading: true,
  checkout: null,
  vip: false,
  theme: 'white',
  consent: false,
  alertOpen: false,
  alertData: {},
};

const client = Client.buildClient({
  storefrontAccessToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
  domain: `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
});

export const StoreContext = createContext();

// The functions below are accessible through passing parameters to a dispatch function always accessible in our components.
export const storeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT': {
      return { ...state, alertOpen: true, alertData: action.payload };
    }
    case 'CLOSE_ALERT': {
      return { ...state, alertOpen: false, alertData: {} };
    }
    case 'SET_PRODUCT_DATA': {
      return { ...state, productPageData: action.payload };
    }
    case 'SET_COOKIES_LOADED': {
      return { ...state, cookiesLoaded: true };
    }
    case 'SET_CONSENT': {
      return { ...state, consent: action.payload, cookiesLoaded: true };
    }
    case 'TOGGLE_CART': {
      return { ...state, cartOpen: !state.cartOpen };
    }
    case 'CLOSE_MENU': {
      return { ...state, menuOpen: false };
    }
    case 'TOGGLE_MENU': {
      return { ...state, menuOpen: state.menuOpen === false };
    }
    case 'CLOSE_CART': {
      return { ...state, cartOpen: false };
    }
    case 'OPEN_SIZE_CHART': {
      return { ...state, sizeChartOpen: true };
    }
    case 'CLOSE_SIZE_CHART': {
      return { ...state, sizeChartOpen: false };
    }
    case 'OPEN_MAILING_LIST': {
      return { ...state, mailingListOpen: true };
    }
    case 'CLOSE_MAILING_LIST': {
      return { ...state, mailingListOpen: false };
    }
    case 'TOGGLE_FILTER': {
      return { ...state, filterOpen: !state.filterOpen };
    }
    case 'CLOSE_FILTER': {
      return { ...state, filterOpen: false };
    }
    case 'START_LOADING': {
      return { ...state, loading: true };
    }
    case 'STOP_LOADING': {
      return { ...state, loading: false };
    }
    case 'SET_CHECKOUT': {
      return { ...state, checkout: action.payload };
    }
    case 'ADD_FILTER': {
      return { ...state, filters: [...state.filters, action.payload] };
    }
    case 'REMOVE_FILTER': {
      return {
        ...state,
        filters: [
          ...state.filters.filter((filter) => {
            return filter !== action.payload;
          }),
        ],
      };
    }
    case 'SET_COLOR_FILTER': {
      return { ...state, colorFilter: action.payload };
    }

    case 'SET_VIP': {
      return { ...state, vip: action.payload };
    }
    case 'CLEAR_VIP': {
      return { ...state, vip: null };
    }
    case 'TOGGLE_BG': {
      return { ...state, theme: state.theme === 'black' ? 'white' : 'black' };
    }
    default: {
      return state;
    }
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, storeData);

  const initialize = async () => {
    const isBrowser = typeof window !== 'undefined';

    const cookies = getCookies();
    const { lrvip } = cookies;

    setTimeout(() => {
      if (lrvip) {
        const parseVipData = JSON.parse(unescape(lrvip));
        if (parseVipData.validated) {
          dispatch({ type: 'SET_VIP', payload: parseVipData });
        }
      }
    }, 1000);

    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null;

    const saveCheckoutIDtoLocalStorage = (checkout) => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id);
      }
    };
    const createNewCheckout = async () => {
      const checkout = await client.checkout.create();
      dispatch({ type: 'SET_CHECKOUT', payload: checkout });
      saveCheckoutIDtoLocalStorage(checkout);
    };
    const fetchCheckout = (id) => client.checkout.fetch(id);

    if (existingCheckoutID) {
      try {
        const checkout = await fetchCheckout(existingCheckoutID);
        if (!checkout.completedAt) {
          dispatch({ type: 'SET_CHECKOUT', payload: checkout });
        } else {
          localStorage.setItem('shopify_checkout_id', null);
          createNewCheckout();
        }
      } catch (e) {
        createNewCheckout();
      }
    } else {
      createNewCheckout();
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const methods = {
    setVipCookie: (data) => {
      setCookie('lrvip', data, { path: '/', maxAge: 60 * 60 * 3 });
    },
    clearVipCookie: () => {
      dispatch({ type: 'CLEAR_VIP' });
      deleteCookie('lrvip', { path: '/', maxAge: 60 * 60 * 3 });
    },
    addToCart: async (newItem) => {
      dispatch({ type: 'START_LOADING' });

      const lineItemsToAdd = [
        {
          variantId: newItem.variantId,
          quantity: parseInt(newItem.variantQuantity, 10),
        },
      ];
      await client.checkout
        .addLineItems(state.checkout.id, lineItemsToAdd)
        .then((res) => {
          dispatch({ type: 'SET_CHECKOUT', payload: res });
        });
      dispatch({ type: 'TOGGLE_CART' });
      dispatch({ type: 'STOP_LOADING' });
    },
    removeFromCart: async (id) => {
      dispatch({ type: 'START_LOADING' });
      await client.checkout
        .removeLineItems(state.checkout.id, [id])
        .then((res) => {
          dispatch({ type: 'SET_CHECKOUT', payload: res });
        });
      dispatch({ type: 'STOP_LOADING' });
    },
    updateQuantityInCart: async (lineItemId, quantity) => {
      dispatch({ type: 'START_LOADING' });
      const lineItemsToUpdate = [
        { id: lineItemId, quantity: parseInt(quantity, 10) },
      ];
      await client.checkout
        .updateLineItems(state.checkout.id, lineItemsToUpdate)
        .then((res) => {
          dispatch({ type: 'SET_CHECKOUT', payload: res });
        });
      dispatch({ type: 'STOP_LOADING' });
    },
    loadProductDetailDataByUid: (uid, loadingType) => {
      if (!uid) {
        return;
      }
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => {
          return data.json();
        })
        .then(({ payload }) => {
          if (payload?.product) {
            dispatch({ type: 'SET_PRODUCT_DATA', payload });
            if (loadingType === 'new')
              window.history.pushState(
                { uid },
                'New Page Title',
                `/shop/${uid}`
              );
          } else {
            dispatch({
              type: 'SET_ALERT',
              payload: {
                header: 'Not Available',
                message: 'This product or color is no longer available.',
              },
            });
          }
        });
    },
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, methods }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreState = () => {
  return useContext(StoreContext);
};
