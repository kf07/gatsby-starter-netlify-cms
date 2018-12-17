---
templateKey: blog-post
title: autoprefixerのautoplaceについて
date: 2018-12-17T02:41:42.625Z
description: |
  autoprefixerのautoplaceについて解説していきます
tags:
  - CSS3
  - Grid
  - gulp
image: /img/css3.jpg
---
autoprefixerのアップデートでGridのIEの自動配置に対応されました。
autoprefixerのオプションを"autoplace"にすることで対応することができます。

（例）gulpの設定
```:javascript
gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    .pipe(postcss([
      autoprefixer({
        browsers: ["last 2 versions", "ie >= 11", "Android >= 4"],
        cascade: false,
        grid: 'autoplace' //IE自動配置対応
      }),
    ]))
    .pipe(gulp.dest('./dist/assets/css'))
});
```


### ここでは、autoplaceに対応している書き方と、対応していない書き方があるので紹介していきます。

#### 対応

①grid-template-rows,grid-template-columnsを指定
```
.grid {
  display: grid;
  grid-template-rows: repeat(3,250px);
  grid-template-columns: repeat(3,1fr);
  gap: 10px;
}
```

#### 非対応

②grid-templateでrid-template-rows,grid-template-columnsを指定
```
.grid {
  display: grid;
  grid-template: repeat(3,250px) / repeat(3,1fr);
  gap: 10px;
}
```

③grid-template-rows,grid-template-columns,grid-template-areasを指定
```
.grid {
  display: grid;
  grid-template-rows: repeat(3, 250px);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'grid1 grid1 grid2'
    'grid3 grid4 grid4'
    'grid5 grid6 grid6';
  gap: 10px;
}
```

④grid-templateでgrid-template-rows,grid-template-columns,grid-template-areasを指定
```
.grid {
  display: grid;
  grid-template:
    'grid1 grid1 grid2　250px'
    'grid3 grid4 grid4 250px'
    'grid5 grid6 grid6 250px'
    / 1fr 1fr 1fr;
  gap: 10px;
}

```

grid-templateでの指定、area名での指定には対応していません。  
対応している書き方で書いた場合は以下のようなCSSに変換され、IEの自動配置に対応しています。
```:css
.grid {
	display: -ms-grid;
	display: grid;
	gap: 10px;
	-ms-grid-columns: 1fr 10px 1fr 10px 1fr;
	grid-template-columns: repeat(3, 1fr);
	-ms-grid-rows: 250px 10px 250px 10px 250px;
	grid-template-rows: repeat(3, 250px);
}

.grid > *:nth-child(1) {
	-ms-grid-row: 1;
	-ms-grid-column: 1;
}

.grid > *:nth-child(2) {
	-ms-grid-row: 1;
	-ms-grid-column: 3;
}

.grid > *:nth-child(3) {
	-ms-grid-row: 1;
	-ms-grid-column: 5;
}

.grid > *:nth-child(4) {
	-ms-grid-row: 3;
	-ms-grid-column: 1;
}

.grid > *:nth-child(5) {
	-ms-grid-row: 3;
	-ms-grid-column: 3;
}

.grid > *:nth-child(6) {
	-ms-grid-row: 3;
	-ms-grid-column: 5;
}

.grid > *:nth-child(7) {
	-ms-grid-row: 5;
	-ms-grid-column: 1;
}

.grid > *:nth-child(8) {
	-ms-grid-row: 5;
	-ms-grid-column: 3;
}

.grid > *:nth-child(9) {
	-ms-grid-row: 5;
	-ms-grid-column: 5;
}
```
また、nth-childで変換することで自動配置を再現しているため、Gridの本来の自動配置はできません。  
例えば、1つだけ位置を指定して、残りを自動配置のようなことはできません。  

全て自動配置
```:html
<div class="grid">
  <div class="grid__item1">1</div>
  <div class="grid__item2">2</div>
  <div class="grid__item3">3</div>
  <div class="grid__item4">4</div>
  <div class="grid__item5">5</div>
  <div class="grid__item6">6</div>
  <div class="grid__item7">7</div>
  <div class="grid__item8">8</div>
  <div class="grid__item9">9</div>
</div>
```
```:scss
.grid {
  display: grid;
  grid-template-rows: repeat(3, 250px);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
//わかりやすいようにグリッドアイテムに色指定
.grid__item1 {
  background-color: blue;
}
.grid__item2 {
  background-color: red;
}
.grid__item3 {
  background-color: green;
}
.grid__item4 {
  background-color: brown;
}
.grid__item5 {
  background-color: orange;
}
.grid__item6 {
  background-color: pink;
}
.grid__item7 {
  background-color: gold;
}
.grid__item8 {
  background-color: purple;
}
.grid__item9 {
  background-color: silver;
}

```
全てのグリッドアイテムを自動配置する場合はIEを含めて全てのブラウザで自動配置をすることができます。
![autoplace自動配置](/img/grid_autoplace.png)

item1のみ位置を指定して、ほかのグリッドアイテムを自動配置
```:scss
.grid__item1 {
  grid-column: 2/3;
  grid-row: 2/3;
}
```
IE以外のブラウザでは、Gridの本来の自動配置通り、item1が指定した位置に配置されて、item2～item9が左上から自動配置されます。
![1のみ位置を指定](/img/grid_autoplace01.png)

しかしIEでは、nth-childで変換して自動配置を再現しているだけなので、特に指定していないときと同じになります。
![1のみ位置を指定 IE](/img/grid_autoplace02.png)

### 結論
#### グリッドアイテムを1つでも位置を指定する場合
grid-templateで記述して、グリッドアイテムをそれぞれ位置を指定する  
※areaで指定しないとgapの変換がちゃんとできない
```:scss
.grid {
  display: grid;
  grid-template:
    'grid1 grid2 grid3　250px'
    'grid4 grid5 grid6 250px'
    'grid7 grid8 grid9 250px'
    / 1fr 1fr 1fr;
  gap: 10px;
}

.grid__item1 {
 grid-area: grid1;
}
//grid__item2以降も置きたい場所を指定していく

```

#### グリッドアイテムの位置を特に指定しない場合
grid-template-columns,grid-template-rowsを指定して、autoplaceで変換して対応する

```:scss
.grid {
  display: grid;
  grid-template-rows: repeat(3, 250px);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```
いくつか位置指定してほかのグリッドアイテムを自動配置したい場合もありますが、現状ではIE対応できないようです。
