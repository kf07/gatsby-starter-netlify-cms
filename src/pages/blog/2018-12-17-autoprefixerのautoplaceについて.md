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
nth-childで変換しているので、Gridの本来の自動配置の挙動はできません。
例えば、1つだけ位置を指定して、残りを自動配置することはできません。
なので、autoprefixerのautoplaceが有効なのはを特に指定せず全て自動配置する場合のみになると思います。

