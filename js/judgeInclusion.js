// 角度の和による内外判定
// 包含関係を調べる対象の矩形(comparisonArr)は一筆書きできる図形である必要あり。
// 辺が交差している図形では判定不可。

// https://qiita.com/ykob/items/6118b8e2e7ddcd8b6355
// yoichi kobayashi @ykob

// Copyright (c) 2019 by yoichi kobayashi (https://codepen.io/ykob/pen/zxJjxg)
// Fork of an original work by yoichi kobayashi (https://codepen.io/ykob/pen/ogdpoM)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

judgeInclusion = function(p1, comparisonArr) {
  var deg = 0;
  var p1x = p1.x;
  var p1y = p1.y;

  for (var index = 0; index < comparisonArr.length; index++) {
    var p2x = comparisonArr[index].x;
    var p2y = comparisonArr[index].y;
    if (index < comparisonArr.length - 1) {
      var p3x = comparisonArr[index + 1].x;
      var p3y = comparisonArr[index + 1].y;
    } else {
      var p3x = comparisonArr[0].x;
      var p3y = comparisonArr[0].y;
    }

    var ax = p2x - p1x;
    var ay = p2y - p1y;
    var bx = p3x - p1x;
    var by = p3y - p1y;

    var cos = (ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by));
    deg += getDegree(Math.acos(cos));
  }

  if (Math.round(deg) == 360) {
    return true;
  } else {
    return false;
  }
};

var getDegree = function(radian) {
  return radian / Math.PI * 180;
};