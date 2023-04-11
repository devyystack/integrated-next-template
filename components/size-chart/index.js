import { useEffect } from 'react';
import Modal from 'simple-react-modal';
import closeButtonSrc from '@/images/ui-close.png';
import { useStoreState } from '@/utils/context/store';
import styles from './index.module.scss';

const SizeChart = () => {
  const { state, dispatch } = useStoreState();
  const { sizeChartOpen } = state;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_SIZE_CHART' });
  };

  useEffect(() => {
    if (sizeChartOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [sizeChartOpen]);

  return (
    <Modal
      show={sizeChartOpen}
      onClose={handleClose}
      closeOnOuterClick={true}
      style={{ background: 'rgba(0,0,0,0.4)' }} //overwrites the default background
      containerStyle={{
        margin: '3.5% auto 0% auto',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'transparent',
        padding: 0,
      }}
    >
      <div className={styles.sizeChart}>
        <button className={styles.sizeChartClose} onClick={handleClose}>
          <img draggable={false} src={closeButtonSrc} />
        </button>
        <h2>Size Guide</h2>
        <div>
          <table className={styles.sizeChartTable}>
            <tr>
              <th>Size</th>
              <th className={styles.sizeChartTableBgBlack}>Bust</th>
              <th className={styles.sizeChartTableBgBlack}>Waist</th>
              <th className={styles.sizeChartTableBgBlack}>Hips</th>
            </tr>
            <tr>
              <td className={styles.sizeChartLabel} rowSpan={2}>
                X-Small
              </td>
              <td className={styles.sizeChartTableGrayOne}>32</td>
              <td className={styles.sizeChartTableGrayTwo}>24</td>
              <td className={styles.sizeChartTableGrayThree}>34</td>
            </tr>
            <tr>
              <td className={styles.sizeChartTableGrayOne}>33</td>
              <td className={styles.sizeChartTableGrayTwo}>25</td>
              <td className={styles.sizeChartTableGrayThree}>35</td>
            </tr>
            <tr>
              <td className={styles.sizeChartLabel} rowSpan={2}>
                Small
              </td>
              <td className={styles.sizeChartTableGrayOne}>34</td>
              <td className={styles.sizeChartTableGrayTwo}>26</td>
              <td className={styles.sizeChartTableGrayThree}>36</td>
            </tr>
            <tr>
              <td className={styles.sizeChartTableGrayOne}>35</td>
              <td className={styles.sizeChartTableGrayTwo}>27</td>
              <td className={styles.sizeChartTableGrayThree}>37</td>
            </tr>
            <tr>
              <td className={styles.sizeChartLabel} rowSpan={2}>
                Medium
              </td>
              <td className={styles.sizeChartTableGrayOne}>36</td>
              <td className={styles.sizeChartTableGrayTwo}>28</td>
              <td className={styles.sizeChartTableGrayThree}>38</td>
            </tr>
            <tr>
              <td className={styles.sizeChartTableGrayOne}>37</td>
              <td className={styles.sizeChartTableGrayTwo}>29</td>
              <td className={styles.sizeChartTableGrayThree}>39</td>
            </tr>
            <tr>
              <td className={styles.sizeChartLabel} rowSpan={2}>
                Large
              </td>
              <td className={styles.sizeChartTableGrayOne}>38½</td>
              <td className={styles.sizeChartTableGrayTwo}>30½</td>
              <td className={styles.sizeChartTableGrayThree}>40½</td>
            </tr>
            <tr>
              <td className={styles.sizeChartTableGrayOne}>40</td>
              <td className={styles.sizeChartTableGrayTwo}>32</td>
              <td className={styles.sizeChartTableGrayThree}>42</td>
            </tr>
            <tr>
              <td className={styles.sizeChartLabel} rowSpan={2}>
                X-Large
              </td>
              <td className={styles.sizeChartTableGrayOne}>40½</td>
              <td className={styles.sizeChartTableGrayTwo}>32½</td>
              <td className={styles.sizeChartTableGrayThree}>40½</td>
            </tr>
            <tr>
              <td className={styles.sizeChartTableGrayOne}>42</td>
              <td className={styles.sizeChartTableGrayTwo}>34</td>
              <td className={styles.sizeChartTableGrayThree}>44</td>
            </tr>
            <tr>
              <td className={styles.sizeChartLabel} rowSpan={2}>
                XX-Large
              </td>
              <td className={styles.sizeChartTableGrayOne}>44</td>
              <td className={styles.sizeChartTableGrayTwo}>34½</td>
              <td className={styles.sizeChartTableGrayThree}>44½</td>
            </tr>
            <tr>
              <td className={styles.sizeChartTableGrayOne}>44</td>
              <td className={styles.sizeChartTableGrayTwo}>36</td>
              <td className={styles.sizeChartTableGrayThree}>46</td>
            </tr>
          </table>
          <legend>
            <h3>How to measure</h3>
            BUST: Measure around the fullest part of your chest.
            <br />
            WAIST: Measure around the narrowest part of your waistline.
            <br />
            HIPS: Measure around the fullest part of your hip & rear while
            standing with your feet together.
          </legend>
        </div>
      </div>
    </Modal>
  );
};

export default SizeChart;
