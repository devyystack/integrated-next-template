import { RichText } from "prismic-reactjs";
import styles from "./index.module.scss";

const Text = ({ data }) => {
  const {
    primary: { text },
  } = data;
  return (
    <section className={styles.text}>
      <RichText render={text} />
    </section>
  );
};

export default Text;
