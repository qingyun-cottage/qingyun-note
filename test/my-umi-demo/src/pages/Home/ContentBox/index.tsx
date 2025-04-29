import styles from './index.less';

const ContentBox = ({ isWelcome = false }) => {
  return isWelcome ? (
    <div className={styles.welcome_card}> 欢迎</div>
  ) : (
    <div className={styles.content_card}>内容</div>
  );
};

export default ContentBox;
