import { useState } from 'react';

import Loading from './loading';
import envelopeSrc from '@/images/ui-envelope.png';
import styles from './../index.module.scss';

const MailingList = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('Your email');
  const handleSubscribeFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) {
      return;
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then(({ success }) => {
        if (success) {
          setLoading(false);
          setLabel('You have been subscribed.');
          e.target.reset();
        }
      });
  };
  return (
    <>
      <form
        method="post"
        className={styles.footerMailingListFormEl}
        onSubmit={handleSubscribeFormSubmit}
      >
        <div className={styles.footerMailingListFormElInner}>
          <input
            type="email"
            id="email"
            placeholder={label}
            style={{
              ...(theme === 'white'
                ? { border: '1px solid #000', color: '#000' }
                : {
                    border: '1px solid #fff',
                    color: '#fff',
                    background: '#000',
                  }),
            }}
          />

          <button
            type="submit"
            style={{
              ...(theme === 'white'
                ? { color: 'white', backgroundColor: 'black' }
                : {
                    color: '#000',
                    border: '1px solid #fff',
                    background: '#fff',
                  }),
            }}
          >
            Subscribe
          </button>
        </div>
      </form>
    </>
  );
};

export default MailingList;
