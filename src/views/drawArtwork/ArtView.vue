<template>
  <div class="canvas-wrap">
    <header-logo></header-logo>
    <div id="canvas"></div>
    <div
      class="liaotiao"
      v-for="li in liaotArr"
      :key="li.code"
      :style="{
        width: li.width + 'px',
        height: li.height + 'px',
        left: li.left + 'px',
        top: li.top + 'px',
        borderWidth: li.borderWidth + 'px',
        borderColor: li.borderColor,
        background: li.back
      }"
    >
      <div class="name">{{ li.name }}</div>
      <div class="block">
        <div
          class="col"
          :class="['col' + (j + 1)]"
          :style="{ width: '20%' }"
          v-for="(j, i) in li.num"
          :key="i"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
let belt = require("../../assets/image/belt-warning.png");
import zrender from "zrender";
import { calcArrowCenter } from "./flowClient/helpers";
export default {
  name: "ArtView",
  components: {
    HeaderLogo: () => import("../../components/HeaderLogo")
  },
  data() {
    return {
      zr: null,
      liaotArr: []
    };
  },
  mounted() {
    this.zr = zrender.init(document.getElementById("canvas"));
    this.getJSOnData();
    // 用来保存配有code的设备
    this.id2element = {};
  },
  methods: {
    // 获取json数据
    getJSOnData() {
      const _this = this;
      let url = "/static/json/pellet-data.json";
      let request = new XMLHttpRequest();
      request.open("get", url);
      request.send(null);
      request.onload = function() {
        if (request.status === 200) {
          let json = JSON.parse(request.responseText);
          let rectData = json.rectData;
          if (rectData) {
            _this.drawRect(rectData);
          }
          let lineData = json.lineData;
          if (lineData) {
            _this.drawLine(lineData);
          }
        }
      };
    },
    // 绘制图片
    drawRect(data) {
      this.liaotArr = [];
      for (let i in data) {
        if (data[i].type === "rect") {
          // 矩形
          if (/liaotiao/.test(data[i].code)) {
            this.getLiaotiao(data[i]);
          } else {
            let rect = new zrender.Rect({
              shape: data[i].shape,
              style: data[i].style,
              zlevel: 2,
              data: data[i]
            });
            this.zr.add(rect);
            if (data[i].code) {
              this.id2element[data[i].code] = rect;
            }
          }
        } else if (/image/.test(data[i].type)) {
          // 图片
          let img = new zrender.Image({
            style: data[i].style,
            zlevel: 3,
            data: data[i]
          });
          this.zr.add(img);
          if (data[i].code) {
            this.id2element[data[i].code] = img;
          }
        } else if (data[i].type === "circle") {
          // 圆形
          let circle = new zrender.Circle({
            shape: data[i].shape,
            style: data[i].style,
            zlevel: 2
          });
          this.zr.add(circle);
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
      this.changeState();
    },
    // 绘制线段
    drawLine(lineData) {
      for (let i in lineData) {
        let points = lineData[i].shape.points;
        const polyline = new zrender.Polyline({
          shape: lineData[i].shape,
          style: lineData[i].style,
          zlevel: 1
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
            stroke: lineData[i].style.stroke,
            lineWidth: 1
          },
          zIndex: 1,
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
    },
    // div绘制料条分层
    getLiaotiao(data) {
      let obj = {
        code: data.code,
        width: data.shape.width,
        height: data.shape.height,
        left: data.shape.x,
        top: data.shape.y,
        borderWidth: data.style.lineWidth,
        borderColor: data.style.stroke,
        background: data.style.fill,
        name: data.style.text,
        num: 5
      };
      this.liaotArr.push(obj);
    },
    // 更换图片
    changeState() {
      let code = "belt1";
      let rect = this.id2element[code];
      if (rect) {
        rect.data.style.image = belt;
        rect.attr({
          style: {
            image: belt
          }
        });
      }
    },
    // 初始化weosocket
    initWebSocket() {
      const wsuri = "ws://127.0.0.1:8080/websocket/123";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      // this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      // this.websock.onclose = this.websocketclose;
    },
    // 连接建立失败重连
    websocketonerror() {
      this.initWebSocket();
    },
    // 数据接收后执行的操作
    websocketonmessage(e) {
      const redata = e.data;
      console.log(redata);
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
}
#canvas {
  width: 100%;
  height: 100vh;
  background: #000f26;
}
.liaotiao {
  position: absolute;
  border-style: solid;
  padding: 10px;
  .name {
    font-size: 14px;
    color: #fff;
  }
  .block {
    display: flex;
    width: 100%;
    height: 60%;
    margin-top: 10px;
    .col {
      height: 100%;
      margin-right: 1px;
    }
    .col1 {
      background: #1187ff;
    }
    .col2 {
      background: #344bff;
    }
    .col3 {
      background: #b053ba;
    }
    .col4 {
      background: #ea508b;
    }
    .col5 {
      background: #fa4949;
    }
    .col6 {
      background: #ff862c;
    }
  }
}
</style>
