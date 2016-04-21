# slider
纯粹的轮播图插件,功能简单,100多行代码,依赖jQuery,支持require加载,同页面多次调用; 

[DEMO查看](http://buynao.github.io/slider/)

4个自定义的设置:
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
#####HTML结构#####
```
  <div class="banner">
    <ul>
      <li></li>
      ...
    </ul>
    <div class="navigation">  //如果不需要可以不添加
      <a href="javascript:;" class="prev">&lt;</a>
      <a href="javascript:;" class="next">&gt;</a>
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
      height: 自行设置(轮播图片高度);
  }
  .banner li{  
      float: left;
      height: 自行设置(轮播图片高度);
  }
  //如果li包含img图片,须自行设置图片宽高
  //img{
      width:100%;
  }
  //nav导航btn样式,须自行设置
  .nav{
      text-align: center;
      position: absolute;
      width: 100%;
      ...
      不需要的话,直接display:none;
      display:none;
  }
  .nav > a{
      display: inline-block;
      width,height;
      ...
  }
  //navigation左右方向样式,须自行设置,不需要的话,不用在html里添加结构;
  .navigation{
      position: absolute;
      ...
  }
  .navigation > a{
      position: absolute;
      ...     
  }
```
#####JS调用#####
```js
  $('.banner').slider();
```
