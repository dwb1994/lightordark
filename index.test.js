
// 验证公式是正确的
// var redL = tinycolor("#fc0d1c").getLuminance();
// var blueL = tinycolor("#1f75d5").getLuminance();
// console.log(redL);
// console.log(blueL);
// console.log((redL + 0.05) / (blueL + 0.05));
// console.log(tinycolor.readability("#fc0d1c", "#1f75d5"));

var tinycolor = require("tinycolor2");
var color = tinycolor("rgba(0, 0, 0, .87)");


// readability 对比度
// console.log(tinycolor.readability("rgba(0,0,0,.7)", "#1f75d5"));
// console.log('======');
function getLuminance(color) {
  var rgb = tinycolor(color).toRgb();
  // console.log(rgb);
  var RsRGB = rgb.r / 255;
  var GsRGB = rgb.g / 255;
  var BsRGB = rgb.b / 255;
  var R, G, B;
  if (RsRGB <= 0.03928) { R = RsRGB / 12.92; } else { R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4); }
  if (GsRGB <= 0.03928) { G = GsRGB / 12.92; } else { G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4); }
  if (BsRGB <= 0.03928) { B = BsRGB / 12.92; } else { B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4); }
  return (.2126 * R) + (.7152 * G) + (.0722 * B);
}



//获取对比度
function getContrast(back, front) {
  var backLum = getLuminance(back) + .05;
  var frontLum = getLuminance(front) + .05;
  return Math.max(backLum, frontLum) / Math.min(backLum, frontLum);
}
// Alpha 混合 支持前景色半透明
function mixColor(front, back) {
  var rgbFront = tinycolor(front).toRgb();
  var rgbBack = tinycolor(back).toRgb();
  var alphaFront = rgbFront.a;
  var mixR = alphaFront * rgbFront.r + (1 - alphaFront) * rgbBack.r;
  var mixG = alphaFront * rgbFront.g + (1 - alphaFront) * rgbBack.g;
  var mixB = alphaFront * rgbFront.b + (1 - alphaFront) * rgbBack.b;
  var res = tinycolor({ r: mixR, g: mixG, b: mixB }).toHexString();
  return res;
}


const contrast = (color, contrast) => {
  if (color === 'light' || color === 'dark') return color;
  var minimumContrast = contrast || 3.5;

  var lightContrast = getContrast(color, '#fff');
  // console.log('lightContrast: ', lightContrast);
  var darkContrast = getContrast(color, '#000');
  // console.log('darkContrast: ', darkContrast);

  if (lightContrast < 3.1 && darkContrast > lightContrast) {
    return 'light';
  } else {
    return 'dark';
  }
};

contrast('#cdf');


console.log(getContrast('#fff', '#fac200'));
console.log(getContrast('#fff', mixColor('rgba(0,0,0,.87)', '#fff')));
// console.log(getContrast('#fff', '#000'));

console.log(mixColor('rgba(0,0,0,.6)', '#fff'));
// module.exports = contrast;
