### 一、百度地图API接入

#### 1、搜索百度地图开发平台

#### 2、注册百度账号

#### 3、登陆并申请成为开发者

#### 4、在百度地图开发平台的首页选择控制台，在控制台中创建应用

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12430968/1625104469399-df72946b-5948-4590-88d5-a5110900cad7.png)

创建好应用以后就能在控制台我的应用中看到这个应用，其中最重要的是AK，这是百度地图分配给我们应用的一个专用的秘钥，必须使用秘钥才能访问百度地图API。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12430968/1625104554087-117a87b7-74e5-4fff-b329-79143dca84f4.png)

### 二、在HTML中使用百度地图API

#### 1、在html中引入百度地图js文件

```
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.0&type=webgl&ak=HG7mhBtwuAgzr3QGdZmdhWT2nco2o4N9"></script>
```

将ak后的值替换为我们自己的秘钥。

#### 2、在网页中定义一个DIV用于显示地图

显示地图的DIV一定要有id属性。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12430968/1625104866130-ced6c79c-e0cb-412c-ad4c-2e885223915e.png)

#### 3、在网页中显示地图

基础步骤：

```javascript
var map = new BMapGL.Map("container");          // 创建地图实例 
var point = new BMapGL.Point(116.404, 39.915);  // 通过地理位置的经纬度创建点坐标
map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
```

可选步骤：

```javascript
map.centerAndZoom(point, 15);                   // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(true);                //开启鼠标滚轮缩放
map.setMapType(BMAP_EARTH_MAP);                 // 设置地图类型为地球模式
```

#### 4、添加可选控件

```javascript
var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
map.addControl(scaleCtrl);
var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
map.addControl(zoomCtrl);
var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
map.addControl(cityCtrl);
var locationControl = new BMapGL.LocationControl();  // 添加定位控件
map.addControl(locationControl);
```

#### 5、定位功能

百度地图支持浏览器定位和IP定位，当浏览器定位失败时，会默认采用IP定位。浏览器定位更加精确，IP定位只能定位到大概位置。

百度地图自带定位控件没有使用IP定位

```javascript
//获取当前地理位置 将地图中心点移动到定位位置
var geolocation = new BMapGL.Geolocation();//创建定位对象
geolocation.getCurrentPosition(function (r) {//通过定位对象调用定位函数,回调函数形参r表示定位结果
  if (this.getStatus() == BMAP_STATUS_SUCCESS) {//如果定位成功
    var mk = new BMapGL.Marker(r.point);//创建标记,r是定位结果,r.point就是当前定位的地点
    map.addOverlay(mk);//将标记对象添加到地图上
    map.panTo(r.point);//将地图中心店移动到定位地点
    // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
  }
  else {
    alert('failed' + this.getStatus());
  }
});
```

#### 6、添加地图标记

```
  //给地图添加点击事件
map.addEventListener("click",function(e){
  //形参名称e地图点击事件的事件源
  //console.log(e.latlng.lng+","+e.latlng.lat);
  var mk = new BMapGL.Marker(e.latlng);//创建标记,r是定位结果,r.point就是当前定位的地点
  map.addOverlay(mk);//将标记对象添加到地图上
})
```

#### 7、给地图标记添加点击事件

```javascript
 //给地图添加点击事件
map.addEventListener("click",function(e){
  //形参名称e地图点击事件的事件源
  //console.log(e.latlng.lng+","+e.latlng.lat);
  var mk = new BMapGL.Marker(e.latlng);//创建标记,r是定位结果,r.point就是当前定位的地点
  mk.addEventListener("click",function(){//给标记添加点击事件
    console.log(this);//this指代标记
    //由于标记属于地图对象map的子标签，所以当我们点击标记时，会出现冒泡，map的点击事件也会触发
    //可以使用事件源对象的stopPropagation函数组织后续的事件冒泡
    event.stopPropagation();
  });
  map.addOverlay(mk);//将标记对象添加到地图上
})
```

#### 8、添加信息窗口

```javascript
//添加信息窗口（封装的函数）
function addInfoWindow(content,point,width,height,title) {
  //必要参数 content和point
  //content既可以是文本 也可以是标签
  //point是经纬度地理位置
  //后面3个参数是可选的
  var opts = {
    width: width,     // 信息窗口宽度
    height: height,    // 信息窗口高度
    title: title  // 信息窗口标题
  }
  var infoWindow = new BMapGL.InfoWindow(content, opts);  // 创建信息窗口对象
  map.openInfoWindow(infoWindow, point);        // 打开信息窗口
  //删除
  //map.closeInfoWindow();
}
```

#### 9、路径规划

驾车路径规划

```javascript
//驾车路径规划对象 
//该对象一定在地图加载出来以后再创建 一般放在创建好地图对象map以后 而且一个网页最好只能创建一次 否则将无法清除上一次的规划路径
driving = new BMapGL.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
//使用路径规划对象 查找路线
driving.clearResults();//从地图上清空上一次的规划路径
driving.search(startPoint, endPoint);//开始路径规划,传入开始点和结束点
```

公交路径规划

```javascript
//公交路径规划对象
//创建公交路径规划对象 一定在地图加载出来以后再创建 一般放在创建好地图对象map以后 而且一个网页最好只能创建一次 否则将无法清除上一次的规划路径
transit = new BMapGL.TransitRoute(map, {
  renderOptions: { map: map },
  onSearchComplete: function (results) {
    if (transit.getStatus() != BMAP_STATUS_SUCCESS) {
      return;
    }
    //alert(results.getNumPlans());//获取公交规划方案总数
    //在此处设计公交路径规划显示的html模板
    var output = '';
    for(var i=0;i<results.getNumPlans();i++){
      var plan = results.getPlan(i);
      output +='<div style="margin-top:5px; background-color:#CCC"><p>总时长:'+plan.getDuration(true)+'</p>';//获取时间
      output += '<p>总路程:'+plan.getDistance(true)+'</p>';  //获取距离
      output +=plan.getDescription(true)+"</div>";
    }
    $('#result').css('display', 'block');//#result 是我们自己定义的一个div 绝对定位 先隐藏起来 路径规划成功显示
    $('#result').html(output);// 将组装好的路径规划HTML标签模板放到#result div中显示出来
  },
});
transit.clearResults();//清空上次规划路径
transit.search(startPoint, endPoint);//公交路径规划
```

#### 10、正逆地址解析

根据经纬度查找位置

```javascript
// 创建地理编码实例      
var myGeo = new BMapGL.Geocoder();      
// 根据坐标得到地址描述    
myGeo.getLocation(经纬度坐标点, function(result){
    //funcation是一个回调函数 该回调函数在查找到了具体的地理信息之后才执行
    if (result){      
      alert(result.address);      
    }      
});
```

根据地理位置查询经纬度坐标

```javascript
//创建地址解析器实例
var myGeo = new BMapGL.Geocoder();
// 将地址解析结果显示在地图上，并调整地图视野
myGeo.getPoint(地址字符串（重庆市红旗河沟）, function(point){
    if(point){
        //point就是经纬度点
    }else{
        alert('您选择的地址没有解析到结果！');
    }
},可选参数)//可选参数传入城市名称 如果不传则在全球范围内查找 传入城市名称只在这个城市内查找
```