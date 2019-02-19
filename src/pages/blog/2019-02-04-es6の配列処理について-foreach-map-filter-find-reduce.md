---
templateKey: blog-post
title: ES6の配列処理について (forEach map filter find some every reduce)
date: 2019-02-04T07:33:17.462Z
description: 'ES6の配列処理について forEach,map,filter,find,reduce,some,everyの説明をしていきます'
tags:
  - JavaScript
image: /img/javascript.jpg
---
## forEach
配列の各要素に１回ずつ処理を実行する

```javascript
const products = [
  {
    name: 'きゅうり',
    type: '野菜'
  },
  {
    name: 'マグロ',
    type: '魚'
  },
  {
    name: 'キャベツ',
    type: '野菜'
  },
  {
    name: 'えび',
    type: '甲殻類'
  }
];

//products配列を1つずつconsole.logで出力
products.forEach(function(product){
  console.log(product)
});
```
結果
```
{name: "きゅうり", type: "野菜"}
{name: "マグロ", type: "魚"}
{name: "キャベツ", type: "野菜"}
{name: "えび", type: "甲殻類"}
```

## map
処理をして新しい配列をつくる

```javascript
const products = [
  {
    name: 'きゅうり',
    type: '野菜'
  },
  {
    name: 'マグロ',
    type: '魚'
  },
  {
    name: 'キャベツ',
    type: '野菜'
  },
  {
    name: 'えび',
    type: '甲殻類'
  }
];
//products配列のnameのみで配列を作成
const names =  products.map(function(product){
  return product.name;
});
```
結果
```
["きゅうり","マグロ","キャベツ","えび"]
```

## filter
条件に一致したもので新しく配列をつくる
```javascript
const products = [
  {
    name: 'きゅうり',
    type: '野菜'
  },
  {
    name: 'マグロ',
    type: '魚'
  },
  {
    name: 'キャベツ',
    type: '野菜'
  },
  {
    name: 'えび',
    type: '甲殻類'
  }
];
//typeが野菜のものだけで新しくyasaiProducts配列を作成
const yasaiProducts = products.filter(function(product){
  return product.type === "野菜"
});

console.log(yasaiProducts)
```

結果
```
[
　　　　{name: "きゅうり", type: "野菜"}
　　　　{name: "キャベツ", type: "野菜"}
]
```

## find
条件に一致する最初の要素を返す  
```javascript
const products = [
  {
    name: 'きゅうり',
    type: '野菜'
  },
  {
    name: 'マグロ',
    type: '魚'
  },
  {
    name: 'キャベツ',
    type: '野菜'
  },
  {
    name: 'えび',
    type: '甲殻類'
  }
];
//typeが野菜のものは2つあるが、findは最初の要素のみを返すため「きゅうり」の要素のみが返ってくる
const yasai = products.find(function(product){
  return product.type === '野菜'
})
console.log(yasai)
```
結果
```
{
  name: 'きゅうり',
  type: '野菜'
}
```

## some,every
someは配列の要素の1つ以上が条件を満たすとき「true」、1つも満たすものがなかったとき「false」を返す  
everyは配列の要素の全てが条件を満たすとき「true」、それ以外「false」を返す


some
```javascript
const numbers = [0,1,2,3,20];

const someNum = numbers.some(function(number){
  return number <= 10;
});
console.log(someNum);
```

結果  
10以下ではない数値(20)があるが1つ以上が10以下のためtrue
```
true
```

every
```javascript
const numbers = [0,1,2,3,20];
const everyNum = numbers.every(function(number){
  return number <= 10;
});
console.log(everyNum);
```

結果  10以下ではない数値(20)があるためfalse
```
false
```

## reduce
配列の各要素に対して（左から右へ）関数を適用し、単一の値にする

reduceでよくある配列の要素を全て足す使い方  
numbersの配列の数字を全て足してみます   
sumの値は前回の結果が入る    
sumは初期値0で指定  

- 1回目は0（初期値）+ 10  
- 2回目は10（1回目の結果） + 20  
- 3回目は30（2回目の結果）+ 30  
で結果60になる  
初期値は0である必要はないので10で指定したら結果は70になり、20で指定したら結果は80になります
```javascript
const numbers = [10,20,30];
numbers.reduce(function(sum,number){
  return sum + number
},0);
```

結果
```
60
```

primaryColorsのcolorのみで配列を作る  
mapでできますがreduceでやってみます  
初期値を空の配列で指定  
- 空の配列にredをpush
- [red]にblueをpush
- [red,blue]にgreenをpush  
結果[red,blue,green]になります
```javascript
const primaryColors = [
  {
    color: 'red'
  },
  {
    color: 'blue'
  },
  {
    color: 'green'
  }
];

primaryColors.reduce(function(previous,primaryColor){
  previous.push(primaryColor.color);
  console.log(previous)
  return previous;
},[]);
```

