import down_icon from '@/assets/imgs/chevron-down.svg';
import default_avatar from '@/assets/imgs/default-avatar.png';
import delete_icon from '@/assets/imgs/delete.svg';
import loginout_icon from '@/assets/imgs/login-out.svg';
import mega_logo from '@/assets/imgs/mega.svg';
import retract_icon from '@/assets/imgs/menu-fold.svg';
import expand_icon from '@/assets/imgs/menu-unfold.svg';
import message_icon from '@/assets/imgs/message-plus.svg';

import { createContext, useContext, useState } from 'react';
import styles from './index.less';

const UserContent = createContext<UserInfo>({
  username: 'Admin',
  avatar: default_avatar,
});

// 定义 UserInfo 类型
interface UserInfo {
  username: string;
  avatar?: string; // 可选字段
}

const UserSider = () => {
  // 展开状态
  const [expand, setExpand] = useState(true);
  // 切换展开收起
  const toggleExpand = () => {
    console.log('toggleExpand');
    setExpand(!expand);
  };
  // 新建会话
  const createNewChat = () => {
    console.log('新建会话');
  };
  // 对话列表
  // 假数据
  const chatListDataTest = [
    {
      title: '今天',
      chats: [
        {
          id: 1,
          chatTitle: '常规脚本生成',
        },
      ],
    },
    {
      title: '1天前',
      chats: [
        {
          id: 2,
          chatTitle: '常规脚本生成',
        },
        {
          id: 3,
          chatTitle: '常规移液脚本生成',
        },
        {
          id: 4,
          chatTitle: 'woklist 脚本生成',
        },
        {
          id: 5,
          chatTitle: '常规脚本生成',
        },
      ],
    },
  ];
  const [chatList, setChatList] = useState(chatListDataTest);

  //
  const [activeId, setActiveId] = useState('3');

  // 用户信息
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: 'Admin',
    avatar: '',
  });

  // 用户卡片
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  function closeUserCard() {
    setIsUserCardOpen(false);
    window.removeEventListener('click', closeUserCard);
  }
  // 打开UserCard
  const openUserCard = () => {
    setIsUserCardOpen(true);
    setTimeout(() => {
      window.addEventListener('click', closeUserCard);
    });
  };

  return (
    <UserContent.Provider value={userInfo}>
      <div
        className={[styles.user_sider, expand ? styles.to_expand : null].join(
          ' ',
        )}
      >
        <div className={styles.expand}>
          <div className={styles.header}>
            <div className={styles.title_box}>
              <img src={mega_logo} alt="" />
              <span>Auflo Agent</span>
            </div>
            <div className={styles.icon_btn_box} onClick={toggleExpand}>
              <img src={expand_icon} alt="" />
            </div>
          </div>
          <div className={styles.btn_box}>
            <div className={styles.normal_btn} onClick={createNewChat}>
              <img src={message_icon} alt="" />
              <span>新建任务</span>
            </div>
          </div>
          <div className={styles.content}>
            <ChatList list={chatList} activeId={activeId} />
          </div>
          <div className={styles.user_box}>
            {isUserCardOpen && <UserCard />}
            <div className={styles.cursor_box} onClick={openUserCard}>
              <UserAvatar />
              <span className={styles.user_name}>{userInfo.username}</span>
              <img className={styles.icon} src={down_icon} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.retract}>
          <div className={styles.header}>
            <div className={styles.icon_btn_box} onClick={toggleExpand}>
              <img src={retract_icon} alt="" />
            </div>
          </div>
          <div className={styles.btn_box}>
            <div className={styles.small_btn} onClick={createNewChat}>
              <img src={message_icon} alt="" />
            </div>
          </div>
          <div className={styles.content}></div>
          <div className={styles.user_box}>
            {isUserCardOpen && <UserCard />}
            <div className={styles.cursor_box} onClick={openUserCard}>
              <UserAvatar />
            </div>
          </div>
        </div>
      </div>
    </UserContent.Provider>
  );
};

function ChatList({ list, activeId }: { list: any[]; activeId: string }) {
  return (
    <>
      {list.map((item, index) => {
        return (
          // chat_list_item
          <div key={index} className={styles.chat_list_item}>
            <div className={styles.chat_title}>{item.title}</div>
            <div className={styles.list}>
              {item.chats.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className={[
                      styles.item,
                      activeId == item.id ? styles.active : '',
                    ].join(' ')}
                  >
                    <span>{item.chatTitle}</span>
                    <img className={styles.delete} src={delete_icon} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function UserCard() {
  const userInfo = useContext(UserContent);
  console.log('userInfo', userInfo);

  return (
    // 取消点击事件冒泡
    <div className={styles.user_card} onClick={(e) => e.stopPropagation()}>
      <div className={styles.top}>
        <div className={styles.bg_img}></div>
        <div className={styles.info}>
          <UserAvatar />
          <span>{userInfo.username}</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.btn}>
          <img src={loginout_icon} alt="" />
          <span>退出登陆</span>
        </div>
      </div>
    </div>
  );
}

function UserAvatar({ src }: { src?: string }) {
  const { avatar } = useContext(UserContent);
  return (
    <div className={styles.user_avatar}>
      <img src={src || avatar || default_avatar} alt="" />
    </div>
  );
}

export default UserSider;
