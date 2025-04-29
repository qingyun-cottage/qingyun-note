import classNames from 'classnames';
import { useRef } from 'react';
import styles from './index.less';
import LeftBox from './LeftBox';

const HomePage: React.FC = () => {
  const ref = useRef(null);
  return (
    <div ref={ref} className={classNames(styles.fullscreen, styles.animation)}>
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <LeftBox />
      </div>
      <div className={styles.rightBox}>
        <div>聊天盒子</div>
      </div>
    </div>
  </div>
  );
};

export default HomePage;
