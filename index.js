var tinycolor = require("tinycolor2");

module.exports = {
  // 获取亮度
  getLuminance: function (color) {
    var rgb = tinycolor(color).toRgb();
    var RsRGB = rgb.r / 255;
    var GsRGB = rgb.g / 255;
    var BsRGB = rgb.b / 255;
    var R, G, B;
    if (RsRGB <= 0.03928) { R = RsRGB / 12.92; } else { R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4); }
    if (GsRGB <= 0.03928) { G = GsRGB / 12.92; } else { G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4); }
    if (BsRGB <= 0.03928) { B = BsRGB / 12.92; } else { B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4); }
    return (.2126 * R) + (.7152 * G) + (.0722 * B);
  },
  // 获取对比度
  getContrast: function (back, front) {
    var backLum = this.getLuminance(back) + .05;
    var frontLum = this.getLuminance(front) + .05;
    return Math.max(backLum, frontLum) / Math.min(backLum, frontLum);
  },
  // Alpha 混合 支持前景色半透明
  mixColor: function (front, back) {
    var rgbFront = tinycolor(front).toRgb();
    var rgbBack = tinycolor(back).toRgb();
    var alphaFront = rgbFront.a;
    var mixR = alphaFront * rgbFront.r + (1 - alphaFront) * rgbBack.r;
    var mixG = alphaFront * rgbFront.g + (1 - alphaFront) * rgbBack.g;
    var mixB = alphaFront * rgbFront.b + (1 - alphaFront) * rgbBack.b;
    var res = tinycolor({ r: mixR, g: mixG, b: mixB }).toHexString();
    return res;
  },
  // 判断是浅色还是暗色 支持调节最小对比度
  contrast: function (color, contrast) {
    if (color === 'light' || color === 'dark') return color;
    var minimumContrast = contrast || 3.5;

    var lightContrast = this.getContrast(color, '#fff');
    var darkContrast = this.getContrast(color, '#000');

    if (lightContrast < minimumContrast && darkContrast > lightContrast) {
      return 'light';
    } else {
      return 'dark';
    }
  }
};
