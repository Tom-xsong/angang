<template>
  <div id="canvas"></div>
</template>

<script>
let img1 = require("../../assets/image/img1.png");
let img2 = require("../../assets/image/img2.png");
import zrender from "zrender";
import { calcArrowCenter } from "./flowClient/helpers";
export default {
  name: "ArtView",
  data() {
    return {
      zr: null
    };
  },
  mounted() {
    this.zr = zrender.init(document.getElementById("canvas"));
    this.getRectData();
    this.getLineData();
  },
  methods: {
    getRectData() {
      let data = JSON.parse(localStorage.getItem("rectData"));
      for (let i in data) {
        if (data[i].type === "rect") {
          // 矩形
          let rect = new zrender.Rect({
            shape: data[i].shape,
            style: data[i].style
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
    // 绘制线段
    getLineData() {
      let lineData = JSON.parse(localStorage.getItem("lineData"));
      for (let i in lineData) {
        let points = lineData[i].shape.points;
        const polyline = new zrender.Polyline({
          shape: lineData[i].shape,
          style: lineData[i].style
        });
        this.zr.add(polyline);
        let rotation = "";
        let j = points.length - 1;
        let direction = lineData[i].direction;
        let [x, y] = calcArrowCenter(points[j], direction);
        switch (direction) {
          case "T":
            break;
          case "R":
            rotation = -0.5;
            break;
          case "B":
            rotation = 1;
            break;
          case "L":
            rotation = 0.5;
            break;
        }
        const triangle = new zrender.Isogon({
          shape: {
            x: x,
            y: y,
            r: 6,
            n: 3
          },
          style: {
            fill: lineData[i].style.stroke,
            stroke: 1
          },
          rotation: Math.PI * rotation,
          origin: [x, y]
        });
        this.zr.add(triangle);
        if (lineData[i].animate) {
          this.circleAnimate(points, lineData[i].style.stroke);
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
  height: 100vh;
  background: #fff;
}
</style>
