import { RichText } from 'prismic-reactjs';
import styles from './index.module.scss';

const ShippingTable = ({ data }) => {
  const {
    primary: { header },
  } = data;
  return (
    <section className={styles.shippingTable}>
      <RichText render={header} />
      <h3>Domestic</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <span>Mail Class</span>
              </p>
            </td>
            <td>
              <p>
                <span>Shipping Time</span>
              </p>
            </td>
            <td>
              <p>
                <span>Rates</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <span>First Class</span>
              </p>
            </td>
            <td>
              <p>
                <span> 3-7 Business Days</span>
              </p>
            </td>
            <td>
              <p>
                <span> $5 and up</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <span>Priority</span>
              </p>
            </td>
            <td>
              <p>
                <span>2-3 Business Days</span>
              </p>
            </td>
            <td>
              <p>
                <span>$8 and up</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>International</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <span>Mail Class</span>
              </p>
            </td>
            <td>
              <p>
                <span>Shipping Time</span>
              </p>
            </td>
            <td>
              <p>
                <span>Rates</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <span>First Class International</span>
              </p>
            </td>
            <td>
              <p>
                <span>7-20 Business Days</span>
              </p>
            </td>
            <td>
              <p>
                <span>$12 and up</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <span>International Priority</span>
              </p>
            </td>
            <td>
              <p>
                <span>6-10 Business Days</span>
              </p>
            </td>
            <td>
              <p>
                <span>$35 and up</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default ShippingTable;
