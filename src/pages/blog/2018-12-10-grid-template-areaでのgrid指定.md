---
templateKey: blog-post
title: grid-template-areaでのCSS Grid
date: 2018-12-10T08:51:34.840Z
description: css grid grid-template-areaでのgrid指定を書いていきます
tags:
  - CSS3
  - Grid
image: /img/css3.jpg
---
## grid-template-areas

前回の記事ではグリッドアイテムの配置を何番目から何番目まで〜という指定をしてきましたが、もっとわかりやすく指定することができます  
それがgrid-template-areasです  
grid-template-areasではそれぞれの**グリッドに名前**をつけて視覚的に指定することができます  
gird-template-columnsとgrid-template-rowsは今までと同じように指定します\
grid-template-areaの指定が他のCSSにはない書き方なので見慣れないかもしれないですが、慣れればわかりやすいと思います  

以下の指定の場合は  
上から1番目、左から1番目〜2番目のグリッドをitem1  
上から1番目、左から3番目のグリッドをitem2  
上から2番目、左から１番目のグリッドをitem3  
上から2番目、左から2番目、3番目のグリッドをitem4  
とそれぞれのグリッドに名前をつけています  
CSSの記述と実際のgridのセルが同じになっていて視覚的にわかりやすくなっていると思います。

```scss:
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 200px);
  grid-template-areas: 
    "item1 item1 item2"
    "item3 item4 item4"
}
```

![grid-area](/img/grid-area01.png)

そして名前をつけたグリッドにグリッドアイテムを配置していきます  
grid-area: 配置したいgrid-template-areaの名前  
で指定します

```html
<div class="grid">
　<div class="grid__item1">グリッド１</div>
　<div class="grid__item2">グリッド２</div>
　<div class="grid__item3">グリッド３</div>
　<div class="grid__item4">グリッド４</div>
</div>
```

```scss:
.grid__item1 {
  background-color: blue;
  grid-area: item1; //grid-template-areaで指定したitem1に配置
}

.grid__item2 {
  background-color: red;
  grid-area: item2; //grid-template-areaで指定したitem2に配置
}

.grid__item3 {
  background-color: pink;
  grid-area: item3; //grid-template-areaで指定したitem3に配置
}

.grid__item4 {
  background-color: gold;
  grid-area: item4; //grid-template-areaで指定したitem4に配置
}
```

![grid-areaでの配置](/img/grid-area02.png)

※gapのautoprefixerでのIE対応はgrid-template-areaでの配置じゃないと効かないので  
gapを使う場合はgrid-template-area、または後述するショートハンドのgrid-templateでの指定が必須になります


## grid-template
grid-templateでは、  
「grid-template-areas,gird-template-columns,gird-template-rows」をまとめて指定することができ、より視覚的に記述することができます  
```scss:
  //それぞれ別で指定
.grid {
  display: grid;
  grid-template-columns: 150px 350px 500px;
  grid-template-rows: 200px 400px;
  grid-template-areas:
    'item1 item1 item2'
    'item3 item4 item4';
}
///まとめて指定
.grid {
  display: grid;
  grid-template:
    'item1 item1 item2' 200px //areasの後にその行の高さ(rows)を指定
    'item3 item4 item4' 400px //areasの後にその行の高さ(rows)を指定
    / 150px 350px 500px;
    // その列の幅(columns)を指定　一番左から150px,350px,500px
}
```
![grid-areaでの配置](/img/grid-template01.jpg)


また、視覚的に並べることを目的としているため数値が同じ場合でもrepeat関数を使うことはできません
```scss:
//OK
.grid {
  display: grid;
  grid-template:
    'item1 item1 item2' 200px 
    'item3 item4 item4' 400px 
    / 200px 200px 200px; 
}

//NG
.grid {
  display: grid;
  grid-template:
    'item1 item1 item2' 200px
    'item3 item4 item4' 400px
    / repeat(3, 200px);　//repeat関数は使用不可
}
```
