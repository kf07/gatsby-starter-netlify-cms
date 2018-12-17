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

ここでは、autoplaceに対応している書き方と対応していない書き方があるので紹介していきます。

対応

①grid-template-rows,grid-template-columnsを指定

```
.grid {
  display: grid;
  grid-template-rows: repeat(3,250px);
  grid-template-columns: repeat(3,1fr);
  gap: 10px;
}
```

非対応

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

grid-templateでの指定、area名での指定には対応していないようです。  
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

nth-childで変換しているので、Gridの本来の自動配置と同じ挙動はできません。  
例えば、1つだけ位置を指定して、残りを自動配置することはできません。  
なので、autoprefixerのautoplaceが有効なのはを特に指定せず全て自動配置する場合のみになると思います。

以下のように指定すれば通常IEも含めてすべてのブラウザで左上から並べることできます。
```:html
<div class="grid">
  <div class="grid__item1"></div>
  <div class="grid__item2"></div>
  <div class="grid__item3"></div>
  <div class="grid__item4"></div>
  <div class="grid__item5"></div>
  <div class="grid__item6"></div>
  <div class="grid__item7"></div>
  <div class="grid__item8"></div>
  <div class="grid__item9"></div>
</div>
```

```:scss
.grid {
  display: grid;
  grid-template-rows: repeat(3, 250px);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 900px;
  margin: 60px auto 0;
}


//わかりやすいようにitem1から9まで適当に色つけ
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

![autoplaceで配置されたグリッド](/img/grid_autoplace.png)

しかし1だけ位置を指定してほかを自動配置することがIEではできません。
```:scss
//item1のみ位置指定
.grid__item1 {
  grid-column: 2/3;
  grid-row: 2/3;
}
```

IE以外ではグリッドの自動配置の本来の挙動通り、item1がrow,columnのグリッドライン2～3の位置に配置されて、それ以外のitem2～item9が左上から自動配置されます。  
![item1のみ位置を指定](/img/grid_autoplace01.png)  
しかしIEではnth-childで再現しているだけなので、指定する前と同じように、  
ただ左上から配置されるだけになります。  
![item1のみ位置を指定 IEの場合](/img/grid_autoplace02.png)

なので、ただ自動配置する場合は  
grid-template-rows,grid-template-columnsのみ指定して、autoplaceで変換   

1つでも位置を指定する場合は  
さっきの④の書き方のgrid-templateでgrid-template-areas,grid-template-rows,grid-template-columnsを一括指定して、全部のグリッドアイテムをそれぞれ位置を指定するのがいいと思います。
