import { RichText } from 'prismic-reactjs';
import styles from './index.module.scss';

const Faq = ({ data }) => {
  const {
    primary: { headline },
    fields = [],
  } = data;

  return (
    <section className={styles.faq}>
      <RichText render={headline} />
      <div>
        <ul>
          {fields &&
            fields.map(({ question, answer }) => {
              return (
                <li>
                  <RichText render={question} />
                  <RichText render={answer} />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
