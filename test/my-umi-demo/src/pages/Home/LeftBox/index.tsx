import ContentBox from '../ContentBox';
import UserSider from '../UserSider';
import styles from './index.less';

const LeftBox = () => {
  return (
    <div className={styles.basic_box}>
      <UserSider />
      <div className={styles.content_box}>
        <ContentBox isWelcome={true} />
      </div>
    </div>
  );
};

export default LeftBox;
