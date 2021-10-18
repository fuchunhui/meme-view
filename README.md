# meme-view
custom view for imeme.

文章详细介绍，详见[掘金-水鳜鱼肥](https://juejin.cn/post/7018395454962401288)

### 在线使用[meme-view](https://fuchunhui.github.io/meme-view/)

1. node server 部署在[vercel](https://vercel.com/)
2. server源码参见[meme](https://github.com/fuchunhui/meme)

### lib库使用方式
1. `npm install meme-view`
2. 引入

```
import imeme from 'meme-view';
import 'meme-view/dist/style.css';

const ele = document.getElementById('app') as Element;
imeme.load(ele, 'https://imeme.vercel.app');
```
