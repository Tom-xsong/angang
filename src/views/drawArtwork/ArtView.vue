<template>
  <div id="canvas"></div>
</template>

<script>
let img1 = require("../../assets/image/img1.png");
let img2 = require("../../assets/image/img2.png");
import zrender from "zrender";
export default {
  name: "ArtView",
  data() {
    return {
      zr: null
    };
  },
  mounted() {
    this.zr = zrender.init(document.getElementById("canvas"));
    this.getData();
  },
  methods: {
    getData() {
      let data = JSON.parse(localStorage.getItem("artData"));
      let arr = [];
      for (let i in data) {
        if (data[i].type === "polyline") {
          // 线段
          // let x2 = 0;
          // let y2 = 0;
          // if (data[i].width === 1) {
          //   x2 = data[i].left;
          //   y2 = data[i].top + data[i].height;
          // } else {
          //   x2 = data[i].left + data[i].width;
          //   y2 = data[i].top;
          // }
          // let line = new zrender.Line({
          //   shape: {
          //     x1: data[i].left,
          //     y1: data[i].top,
          //     x2: x2,
          //     y2: y2
          //   },
          //   style: {
          //     stroke: data[i].color
          //   }
          // });
          // this.zr.add(line);
          // 连续线段
          let polyline = new zrender.Polyline({
            shape: {
              points: data[i].lines,
              smooth: 0
            },
            style: {
              stroke: data[i].color,
              zlevel: 1
            }
          });
          this.zr.add(polyline);
          arr.push(data[i].lines);
          if (data[i].animate) {
            this.circleAnimate(data[i].lines, data[i].color);
          }
        } else if (data[i].type === "triangle") {
          // 三角形
          let rotate = 0;
          let x = data[i].left;
          let y = data[i].top;
          switch (data[i].direct) {
            case "t":
              x = x + 7;
              y = y + 7;
              break;
            case "b":
              rotate = 1;
              x = x + 1;
              y = y + 9;
              break;
            case "l":
              rotate = 1.5;
              x = x - 6;
              y = y + 12;
              break;
            case "r":
              rotate = 0.5;
              x = x + 2;
              y = y + 10;
              break;
          }
          let triangle = new zrender.Isogon({
            rotation: rotate,
            origin: [data[i].left, data[i].top],
            shape: {
              x: x,
              y: y,
              r: 10,
              n: 3
            },
            style: {
              fill: data[i].color
            }
          });
          this.zr.add(triangle);
        } else if (data[i].type === "device") {
          // 矩形
          let rect = new zrender.Rect({
            shape: {
              x: data[i].left,
              y: data[i].top,
              width: data[i].width,
              height: data[i].height,
              r: 5
            },
            style: {
              stroke: data[i].color,
              fill: "#fff",
              text: data[i].text,
              fontSize: 16,
              textFill: data[i].color,
              zlevel: 2
            }
          });
          this.zr.add(rect);
        } else if (/image/.test(data[i].type)) {
          // 图片
          let img = new zrender.Image({
            style: {
              image: data[i].type === "image1" ? img1 : img2,
              x: data[i].left,
              y: data[i].top,
              width: data[i].width,
              height: data[i].height,
              text: data[i].type === "image1" ? data[i].text : "",
              textFill: "#fff",
              fontSize: 16,
              textVerticalAlign: "bottom",
              textAlign: "center",
              textOffset: [0, 30],
              zlevel: 2
            }
          });
          this.zr.add(img);
        } else if (data[i].type === "text") {
          // 文字
          let text = new zrender.Text({
            style: {
              text: data[i].text,
              fontSize: 16,
              textFill: data[i].color,
              textWidth: data[i].width,
              textHeight: data[i].height,
              x: data[i].left,
              y: data[i].top,
              zlevel: 2
            }
          });
          this.zr.add(text);
        }
      }
    },
    // 动画
    circleAnimate(polyline, color) {
      // 实心圆
      let cir = new zrender.Circle({
        shape: {
          cx: polyline[0][0],
          cy: polyline[0][1],
          r: 5
        },
        style: {
          fill: color
        }
      });
      this.zr.add(cir);
      const animation = cir.animate("shape", true);
      let delay = 0;
      for (let i = 1; i < polyline.length; i++) {
        const prev = polyline[i - 1];
        const cur = polyline[i];
        const distance = Math.sqrt(
          (prev[0] - cur[0]) ** 2 + (prev[1] - cur[1]) ** 2
        );
        delay += distance * 5;
        animation.when(delay, {
          cx: cur[0],
          cy: cur[1]
        });
      }
      animation.start();
    }
  }
};
</script>

<style lang="scss" scoped>
#canvas {
  width: 100%;
  height: 852px;
  background: #fff;
}
</style>
