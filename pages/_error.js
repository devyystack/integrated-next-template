import React from 'react';
import Alert from '@/components/alert';
import styles from '@/styles/error.module.scss';

function Error({ statusCode }) {
  return (
    <div className={styles.error}>
      <Alert
        header="Application Error"
        message={
          statusCode
            ? `An error ${statusCode} occurred on server.`
            : `An error occurred on client. Please contact us if you continue to see this.`
        }
        manual={true}
      />
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
