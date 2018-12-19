---
templateKey: blog-post
title: Gridのauto-fillでレスポンシブな記事一覧レイアウト
date: 2018-12-19T06:14:33.943Z
description: CSS Gridのauto-fillで記事一覧レイアウトをつくってみます
tags:
  - CSS3 Grid
image: /img/css3.jpg
---
↓こういうやつです  
![記事一覧例](/img/article_list01.png)

※IE非対応

Gridのauto-fillを使うことでメディアクエリなしでレスポンシブなレイアウトを作ることができます。

HTML

```html
<ul class="article__list">
  <li class="article__item">
    <a href="">
      <article>
        <h2 class="article__title"> タイトル</h2>
        <p class="article__text">テキストテキストテキストテキストテキストテキトテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
     </article>
    </a>
  </li>
<ul class="article__list">
  <li class="article__item">
    <a href="">
      <article>
        <h2 class="article__title"> タイトル</h2>
        <p class="article__text">テキストテキストテキストテキストテキストテキトテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
     </article>
    </a>
  </li><ul class="article__list">
  <li class="article__item">
    <a href="">
      <article>
        <h2 class="article__title"> タイトル</h2>
        <p class="article__text">テキストテキストテキストテキストテキストテキトテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
     </article>
    </a>
  </li><ul class="article__list">
  <li class="article__item">
    <a href="">
      <article>
        <h2 class="article__title"> タイトル</h2>
        <p class="article__text">テキストテキストテキストテキストテキストテキトテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
     </article>
    </a>
  </li>
</ul>
```

SCSS

```:scss
.article__list {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
  gap: 10px;
  padding: 20px;
  max-width: 1100px;
  margin: auto;
}


.article__item {
  border: 1px solid #000;
  a {
    display: block;
    height: 100%;
    padding: 20px;
    text-decoration: none;
  }
}

.article__title {
  font-size: 20px;
  margin: 0 0 10px;
}
```
