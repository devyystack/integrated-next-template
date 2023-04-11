import { useEffect } from 'react';
import Modal from 'simple-react-modal';
import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';

const Alert = ({ header, message, manual = false }) => {
  const { state, dispatch } = useStoreState();
  const override = { alertOpen: true, alertData: { header, message } };
  const { alertOpen, alertData = {} } = manual ? override : state;

  const {
    header: headerTxt = 'Header Here',
    message: messageTxt = null,
    buttonCta = 'Ok',
  } = alertData;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_ALERT' });
  };

  useEffect(() => {
    if (alertOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [alertOpen]);

  return (
    <Modal
      show={alertOpen}
      onClose={handleClose}
      closeOnOuterClick={true}
      style={{ background: 'rgba(0,0,0,0.5)' }} //overwrites the default background
      containerStyle={{
        margin: '3.5% auto 0% auto',
        width: '100%',
        maxWidth: '500px',
        backgroundColor: 'transparent',
        padding: 0,
        top: '40%',
        transform: 'translateY(-50%)',
      }}
    >
      <div className={styles.alert}>
        {/* <button className={styles.alertClose} onClick={handleClose}>
          <img draggable={false} src={closeButtonSrc} />
        </button> */}
        <h2>{headerTxt}</h2>
        {messageTxt && <p>{messageTxt}</p>}
        <button className={styles.alertDismiss} onClick={handleClose}>
          {buttonCta}
        </button>
      </div>
    </Modal>
  );
};

export default Alert;
