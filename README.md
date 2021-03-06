# Lightordark

## install

``` bash
npm install lightordark
```

在文件中引入：
``` js
var lightordark = require('lightordark');
``` 

## Usage

### getLuminance 

获取亮度

``` js
lightordark.getLuminance('#cdf'); // 0.7177027204456372
```

### getContrast 

获取对比度

``` js
lightordark.getContrast('#666', '#fff'); // 5.74183648145415
lightordark.getContrast(lightordark.mixColor('rgba(0,0,0,.6)', '#fff'), '#fff'); // 5.74183648145415
```

### mixColor 

Alpha 混合 支持前景色半透明

``` js
lightordark.mixColor('rgba(0,0,0,.6)', '#fff'); // #666666
lightordark.mixColor('#666', '#fff'); // #666666
```

### contrast

判断是浅色还是暗色 支持调节最小对比度

``` js
lightordark.contrast('#888'); // dark
lightordark.contrast('#888', 7); // light
```

## 链接与参考资料

- [博客地址](http://dwbbb.com/blog/improve-web-legibility/)
---
- [Android accessibility 帮助 - 色彩对比度](https://support.google.com/accessibility/android/answer/7158390?hl=zh-Hans)
- [Human Interface Guidelines - iOS - Accessibility](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Material Design - Text legibility](https://material.io/design/color/text-legibility.html#)