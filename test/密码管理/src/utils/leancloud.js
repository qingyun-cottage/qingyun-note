import * as AV from 'leancloud-storage';
import * as adapters from '@leancloud/platform-adapters-browser';

// 替换为你的LeanCloud应用凭证
const appId = 'scNZXR8FU0YqDTstfMXMZaSm-gzGzoHsz';
const appKey = '7Guet29fZtrGQQRZvUSyGEqW';
const serverURL = 'https://scnzxr8f.lc-cn-n1-shared.com';

// 初始化LeanCloud
AV.init({ 
  appId, 
  appKey, 
  serverURL 
}, adapters);

// 导出AV对象
export { AV };
