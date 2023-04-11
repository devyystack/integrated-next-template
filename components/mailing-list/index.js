import { useEffect, useRef, useState } from 'react';
import Modal from 'simple-react-modal';
import { RichText } from 'prismic-reactjs';
import Image from 'next/image';
import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';

const MailingList = ({ data = {} }) => {
  const { state, dispatch } = useStoreState();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('form');
  const form = useRef();
  const { mailingListOpen } = state;
  const { options = {} } = data;
  const { headline, image } = options;

  if (!image || !headline) {
    return null;
  }

  const handleClose = () => {
    setView('form');
    dispatch({ type: 'CLOSE_MAILING_LIST' });
  };

  useEffect(() => {
    if (mailingListOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [mailingListOpen]);

  const handleSubscribeFormSubmit = (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
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
        first_name: firstName,
        last_name: lastName,
        email_address: email,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then(({ success }) => {
        if (success) {
          setLoading(false);
          setView('success');
          e.target.reset();
        }
      });
  };
  return (
    <Modal
      show={mailingListOpen}
      onClose={handleClose}
      closeOnOuterClick={true}
      style={{ background: 'rgba(0,0,0,0.3)' }} //overwrites the default background
      containerStyle={{
        margin: '8% auto 7% auto',
        width: '100%',
        maxWidth: '620px',
        backgroundColor: 'transparent',
        padding: 0,
      }}
    >
      <div className={styles.mailingList}>
        <button
          className={styles.mailingListClose}
          onClick={handleClose}
          alt="Close"
          title="Close"
        >
          <img draggable={false} src={'/icons/icon-modal-close.svg'} />
        </button>
        <Image
          layout="responsive"
          draggable={false}
          src={image.url}
          width={520}
          height={279}
        />

        {view === 'form' && (
          <>
            <h2>{RichText.render(headline)}</h2>
            <form method="post" ref={form} onSubmit={handleSubscribeFormSubmit}>
              <div>
                <div className={styles.mailingListHalf}>
                  <input type="text" id="firstName" placeholder="First Name" />
                  <input type="text" id="lastName" placeholder="Last Name" />
                </div>
                <div className={styles.mailingListFull}>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                  />
                </div>
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </>
        )}
        {view === 'success' && (
          <div className={styles.mailingListSuccess}>
            <img src="/icons/icon-success.svg" />
            <h2>Thanks for signing up!</h2>
            <p>Check your inbox for more.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MailingList;
