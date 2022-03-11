# Animation动画

## 什么是动画？

"小人书"就很好的诠释了什么是动画，只要翻页的速度足够快，画面切换足够流畅，这就形成了动画。而每一页都是一个关键的动作或者场景，因此每一页就称为**关键帧**，而每一秒我们能翻的页数越多，那么画面越流畅，我们把每一秒切换图片的数量称为**帧数**。

![](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/zhangrui/20210224224910.gif)



## 完成自动播放的动画方式：

1. 编写JavaScript脚本来完成动画
2. 可以使用flash技术完成动画的设计
3. 可以借助某些动画标签，比如marquee
4. h5中提供了canvas技术（绘图技术）来完成动画的设计
5. **CSS3提供的animation动画，可以完成动画的自动播放** 

## animation动画的基本使用

- css3动画通过`animation`来控制
- 步骤：
    1. 利用`@keyframes`来定义动画所有的关键帧，并且取名
    2. 给使用动画的盒子添加`animation`属性，来指定我们动画的名字和执行的时间

## animation关键帧

- 将动画拆分为多个步骤，每个步骤就是关键帧，多个步骤连接起来，形成一个完整动画
- css3 animation里面使用关键帧：需要定义关键帧

### 定义关键帧

- 语法：

    ```css
    @keyframes 动画的名称{
        from{
            //动画开始的状态
        }
        to{
            //动画结束的状态
        }
    }
    也可以使用百分比，当动画执行到某个百分比时，是什么状态
    @keyframes 动画名称{
        0%{
            
        }
       20%{
            
        }
        100%{
            
        }
    }
    
    使用动画
    animation：动画的名称 动画的时长；
    ```

    ​     0%代表from，to代表100%

    - 每一帧动画的执行时间和两帧之间动画百分比有关，跨度越大，分配的时间越多
    - 时间计算公式：总的时间*两帧跨度的百分比

## 动画的属性控制（速度、方向等）

- 用于控制动画中的速度，播放次数、方向等操作

- 基本属性

    - `anination-name`:动画的名称
    - `animation-duration`:动画的执行时长
    - `animation-timing-function`:控制动画的执行速度
        - ease：默认值  低速开始，然后变快，以低速结束
        - linear：匀速
        - ease-in
        - ease-out
        - ease-in-out
        - cubic-bezier（x1，y1，x2，y2）
    - `animation-delay`:动画的延迟时间，默认0s
    - `animation-iteration-count`:控制动画的执行次数
        - n 代表数字，定义动画播放多少次
        - `infinite`:无限次播放
    - `animation-direction`:控制动画的播放方向
        - normal：默认值，动画正向播放
        - reverse：动画反向播放
        - alternate：方向为：去正往反，来回执行。最后回到初始位置
        - alternate-reverse：与alternate相反。最后回到初始位置
    - `aniamtion-fill-mode`：设置第一帧或最后一帧是否作用在元素上
        - `forwards`:将最后一帧作用在元素上
        - `backwards`:恢复初始设置
        - `both`:将第一帧和最后一帧同时作用在元素上
    - `animation-paly-state`：控制动画播放与否（一般配合hover使用）
        - running：正常播放
        - paused：暂停

- 复合属性

    ```css
     animation: name duration timing-function delay iteration-count direction fill-mode;
    ```

    - 复合属性写两个时间，前面代表执行时间，后面代表延迟时间
    
- 案例：

- 
     
     ```
     <style>
            body{
                background-image: url("image/photo.jpg");
                background-repeat: no-repeat;
                background-size: cover;
                /* overflow: hidden; */
                margin: 0;
            }
            body,html{
                height: 100%;
            }
            div{
                position: absolute;
                top: 0;
                left: 0;
                width: 3300px;
                height: 100%;
                background-size: contain;
                background-repeat:repeat-x;
                animation:move 20s infinite linear;
            }
            .fog1{
                background-image: url("image/fog-1.png");
        
            }
            .fog2{
                background-image: url("image/fog-2.png");
            }
        
            @keyframes move {
                0%{
                    left: 0px;
                }
                100%{
                    left: -1580px;
                }
           }
       </style>
    </head>
    <body>
        <div class="fog1"></div>
        <div class="fog2"></div>
    </body>
    ```


## 练习

### 骰子动画

### 加载动画

​	![image-20200916161000663](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210628145803.png)

```
<style>
    #loading {
        background-color: #374140;
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 1;
        top: 0px;
    }

    #loading-center {
        width: 100%;
        height: 100%;
        position: relative;
    }

    #loading-center-absolute {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 150px;
        width: 150px;
        margin-top: -75px;
        margin-left: -75px;
    }

    .object {
        width: 20px;
        height: 20px;
        background-color: #FFF;
        float: left;
        margin-right: 20px;
        border-radius: 50%;
    }

    #object_one{
        /* animation复合属性 */
        animation: load 1.5s infinite;
    }
    #object_two{
        /* animation复合属性 */
        animation: load 1.5s infinite;
        animation-delay: 0.25s;  
    }
    #object_three{
        /* animation复合属性 */
        animation: load 1.5s infinite;
        animation-delay: 0.5s;  
    }

    /* 
    关键帧
    */
    @keyframes load{
        0%{
            transform: scale(1);
        }
        100%{
            transform: scale(0);
        }
    }
</style>

<div id="loading">
    <div id="loading-center">
        <div id="loading-center-absolute">
            <div class="object" id="object_one"></div>
            <div class="object" id="object_two"></div>
            <div class="object" id="object_three"></div>
        </div>
    </div>
</div>
```

**轮播图**

### banner动画

![image-20200916194913762](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210628145809.png)