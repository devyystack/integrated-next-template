import React from 'react';
import { RichText } from 'prismic-reactjs';
import Full from './atoms/full';
import Third from './atoms/third';
import Half from './atoms/half';
import styles from './index.module.scss';

const Marquee = ({ data }) => {
  const { fields } = data;
  const rows = [];
  let rowIndex = 0;
  fields.forEach((field, index) => {
    const { new_row } = field;
    if (index === 0) {
      rows[rowIndex] = [field];
    } else if (index > 0 && new_row) {
      rowIndex++;
      rows[rowIndex] = [field];
    } else {
      rows[rowIndex].push(field);
    }
  });
  return (
    <section className={styles.marquee}>
      <div className={styles.marqueeInner}>
        {rows &&
          rows.map((items, idx) => {
            return (
              <div key={idx} className={styles.marqueeRow}>
                {items &&
                  items.map((item, idx) => {
                    const { layout } = item;
                    switch (layout) {
                      case 'Full':
                        return (
                          <Full
                            key={idx}
                            image={item.image.url}
                            text={RichText.asText(item.header)}
                            cta={RichText.asText(item.call_to_action)}
                            link={RichText.asText(item.url)}
                            videoId={RichText.asText(item.video_id)}
                            alt={RichText.asText(item.image_alt)}
                          />
                        );

                      case 'Third':
                        return (
                          <Third
                            key={idx}
                            image={item.image.url}
                            text={RichText.asText(item.header)}
                            cta={RichText.asText(item.call_to_action)}
                            link={RichText.asText(item.url)}
                            videoId={RichText.asText(item.video_id)}
                            alt={RichText.asText(item.image_alt)}
                          />
                        );

                      case 'Half':
                        return (
                          <Half
                            key={idx}
                            image={item.image.url}
                            text={RichText.asText(item.header)}
                            cta={RichText.asText(item.call_to_action)}
                            link={RichText.asText(item.url)}
                            videoId={RichText.asText(item.video_id)}
                            alt={RichText.asText(item.image_alt)}
                          />
                        );
                    }
                  })}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Marquee;
