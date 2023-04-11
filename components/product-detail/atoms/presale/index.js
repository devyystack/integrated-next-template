import { useState, useCallback, useRef, useEffect } from 'react';
import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';

const Presale = ({ countdown = null, successFunc = () => {} }) => {
  const field = useRef();
  const [error, setError] = useState('null');
  const [open, setOpen] = useState(false);
  const { methods, state, dispatch } = useStoreState();
  const { theme } = state;
  useEffect(() => {
    if (field.current) {
      field.current.focus();
    }
  }, [open]);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!field.current.value) {
      setError('Required field');
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/vip/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: field.current.value }),
    })
      .then((data) => {
        return data.json();
      })
      .then(async (envelope) => {
        const { success, validated, error, remaining } = envelope;
        if (remaining <= 0) {
          successFunc();
        } else if (success && validated) {
          methods.setVipCookie(envelope);
          dispatch({ type: 'SET_VIP', payload: envelope });
          successFunc();
        } else if (error) {
          setError(error);
        }
      });
  }, []);

  const handleStart = useCallback(() => {
    return setOpen(true);
  }, []);
  const handleMailingList = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: 'OPEN_MAILING_LIST' });
  }, []);
  return (
    <div className={styles.presale}>
      {open ? (
        <form onSubmit={handleSubmit} className={styles.presaleForm}>
          <div className={styles.presaleField}>
            <input type="text" ref={field} placeholder="Enter code" />
            <button type="submit">Submit</button>

            <div className={styles.presaleFieldError}>
              <span style={{ opacity: error == 'null' ? 0 : 1 }}>
                <img src="/icons/icon-warning-alt.svg" />
                {error}
              </span>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.presaleSignup}>
          <button onClick={handleStart}>I have a presale code</button>
          <h2>
            <a href="#" onClick={handleMailingList}>
              {theme === 'white' ? (
                <img src="/icons/icon-envelope.svg" />
              ) : (
                <img src="/icons/icon-envelope-white.svg" />
              )}
            </a>
            <div>
              <a href="#" onClick={handleMailingList}>
                Join the mailing list
              </a>{' '}
              to receive updates on
              <br />
              upcoming presale events and more.
            </div>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Presale;
