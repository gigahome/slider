# slider
试写轮播图插件,依赖jQuery,支持require加载,同页面多次调用; [DEMO](http://buynao.github.io/slider/)

暂时只向外暴露了4个接口:
```
  1. 自动播放
  2. 鼠标移入暂停轮播
  3. 两种常用的动画轮播方式：左滑动left和闪现fade
  4. 轮播间隔时间
  {
    autoplay : true,
    mouse: true,
    animate: 'fade',
    deplay : 5000
  }
```
###使用方法也非常简单###

#####HTML结构#####
```
  <div class="banner">
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="nav">
      <a></a>
      <a></a>
      <a></a>
    </nav>
  </div>
```
#####CSS基础样式#####
```
  .banner{
      width: 自行设置(轮播图片宽度); 
      position: relative; 
      overflow: hidden;
  }
  .banner>ul{
      position: relative;
  }
  .banner li{  
      float: left;
      height: 自行设置(轮播图片高度);
  }
  //如果li包含img图片,须自行设置图片宽高
  //nav导航btn样式,须自行设置
```
#####JS调用#####
```js
  $('.banner').slider();
```
