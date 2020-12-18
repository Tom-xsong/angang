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
        background: li.back,
      }"
      @click="liaotiaoClick(li.info)"
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
    <!-- <mix-box></mix-box> -->
     <!-- <stockyard-box :info="info" ></stockyard-box> -->
    <!-- <process-box :info="info"></process-box> -->
    <!-- <liaodui-box :info="info"></liaodui-box> -->
    <!-- <coking-box :info="info"></coking-box> -->
    <!-- <pelletizing-box>  </pelletizing-box> -->
    <!-- <sinma-box></sinma-box> -->
    <blastfurnace-box></blastfurnace-box>
    
  </div>
</template>

<script>
// import {
//   secondAnalysis,
//   facilityStatus,
//   feedAndReceiving,
//   operationAreaFeedAndReceiving,
//   operationAreaMaterielStock,
//   processDetails,
//   stripProportion
// } from "../../api/home";

//皮带图片
let beltWarning = require("../../assets/image/belt-warning.png");
let beltSuccess = require("../../assets/image/belt-success.png");
let beltStop = require("../../assets/image/belt-stop.png");

//大仓
let wareError = require("../../assets/image/store1-error.png");
let wareSuccess = require("../../assets/image/store1-success.png");
let wareWarning = require("../../assets/image/store1-warning.png");

//成品仓
let finishedError = require("../../assets/image/store5-error.png");
let finishedSuccess = require("../../assets/image/store5-success.png");
let finishedWarning = require("../../assets/image/store5-warning.png");

//配料仓
let mixError = require("../../assets/image/store4-error.png");
let mixSuccess = require("../../assets/image/store4-success.png");
let mixWarning = require("../../assets/image/store4-warning.png");

//露天堆厂
let exposedError = require("../../assets/image/store3-error.png");
let exposedSuccess = require("../../assets/image/store3-success.png");
let exposedWarning = require("../../assets/image/store3-warning.png");

//计量秤
let scaleSuccess = require("../../assets/image/scale-success.png");
let scaleWarning = require("../../assets/image/scale-warning.png");

//检化验
let testSuccess = require("../../assets/image/test-success.png");
let testWarning = require("../../assets/image/test-warning.png");

import zrender from "zrender";
import { calcArrowCenter } from "../drawArtwork/flowClient/helpers";


export default {
  name: "ArtView",
  components: {
    HeaderLogo: () => import("../../components/HeaderLogo"),
    // MixBox: () => import("./components/mixwell/MixBox"),
    // StockyardBox: () => import("./components/stockyard/StockyardBox"),
    // ProcessBox: () => import("./components/process/ProcessBox"),
    // LiaoduiBox: () => import("./components/liaodui/LiaoduiBox"),
    // CokingBox: () => import("./components/coking/CokingBox"),
    // PelletizingBox: () => import("./components/pelletizing/PelletizingBox"),
    //  sinmaBox: () => import("./components/sinteringmachine/sinmaBox"),
     BlastfurnaceBox: () => import("./components/blastfurnace/BlastfurnaceBox"),


  },
  data() {
    return {
      info: {
        isShow: true,
        objs: { name: "燃供码头" },
        code: "",
      },
      zr: null,
      liaotArr: [],
    };
  },
  mounted() {
    this.info.code = this.$route.query.code;

    this.zr = zrender.init(document.getElementById("canvas"));
    this.getJSOnData();
    // 用来保存配有code的设备
    this.id2element = {};

    this.id2elementLine = {};
    this.id2elementCirle = {};

    //   secondAnalysis({ analysisCode: "1" }).then((res) => {
    //     console.log(res);
    //   });

    //   facilityStatus().then((res) => {
    //     console.log(res);
    //   });

    //   feedAndReceiving({ storageCode: "1" }).then((res) => {
    //     console.log(res);
    //   });

    //   operationAreaFeedAndReceiving({ operationAreaCode: "SIN1" }).then((res) => {
    //     console.log(res);
    //   });

    //   operationAreaMaterielStock({ operationAreaCode: "SIN1" }).then((res) => {
    //     console.log(res);
    //   });

    //   processDetails({
    //     analysisCode: "1",
    //     processDetailsName: "第一区",
    //   }).then((res) => {
    //     console.log(res);
    //   });

    //  stripProportion().then((res) => {
    //     console.log(res);
    //   });
  },
  methods: {
    // 获取json数据
    getJSOnData() {
      const _this = this;
      let url = "/static/json/pellet-data.json";
      let request = new XMLHttpRequest();
      request.open("get", url);
      request.send(null);
      request.onload = function () {
        if (request.status === 200) {
          let json = JSON.parse(request.responseText);
          let rectData = json.rectData;
          if (rectData) {
            _this.drawRect(rectData);
          }
          let lineData = json.lineData;
          this.line = json.lineData;
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
              data: data[i],
            });
            this.zr.add(rect);
            rect.on("click", this.equipmentClick);
            if (data[i].code) {
              this.id2element[data[i].code] = rect;
            }
          }
        } else if (/image/.test(data[i].type)) {
          // 图片
          let img = new zrender.Image({
            style: data[i].style,
            zlevel: 3,
            data: data[i],
          });
          this.zr.add(img);
          img.on("click", this.equipmentClick);
          if (data[i].code) {
            this.id2element[data[i].code] = img;
          }
        } else if (data[i].type === "circle") {
          // 圆形
          let circle = new zrender.Circle({
            shape: data[i].shape,
            style: data[i].style,
            zlevel: 2,
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
              zlevel: 2,
            },
          });
          this.zr.add(text);
        }
      }

     

    },
    // 绘制线段
    drawLine(lineData) {
      for (let i in lineData) {
        let points = lineData[i].shape.points;
        const polyline = new zrender.Polyline({
          shape: lineData[i].shape,
          style: lineData[i].style,
          zlevel: 1,
          data: lineData[i],
        });
        this.zr.add(polyline);

        if (lineData[i].id) {

          this.id2elementLine[lineData[i].id] = polyline;
        }

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
            n: 3,
          },
          style: {
            fill: lineData[i].style.stroke,
            stroke: lineData[i].style.stroke,
            lineWidth: 1,
          },
          zIndex: 1,
          rotation: Math.PI * rotation,
          origin: [x, y],
        });
        this.zr.add(triangle);
        // if (lineData[i].animate) {
        //   this.circleAnimate(points, lineData[i].style.stroke,lineData[i].id);
        // }
      }

       
      //  改变状态
      for (let i in this.id2element) {
        let state = this.id2element[i].data.state;
         console.log("222"+state)
         this.changeImage(state ,i);
         this.changeAnimate(state,i);


      }

     
    
     
      
    },
    

    //根据状态改变图片
    changeImage(state,i) {
      
        let imageUrl = "";
        if (this.id2element[i].data.equipmentType == "皮带秤") {
          switch (state) {
            case "stop":
              imageUrl = beltStop;
              break;
            case "warning":
              imageUrl = beltWarning;
              break;
            case "success":
              imageUrl = beltSuccess;
              break;
          }
        }

       else if (this.id2element[i].data.equipmentType == "配料仓") {
          switch (state) {
            case "error":
              imageUrl = mixError;
              break;
            case "warning":
              imageUrl = mixWarning;
              break;
            case "success":
              imageUrl = mixSuccess;
              break;
          }
        }

        else if (this.id2element[i].data.equipmentType == "成品仓") {
          switch (state) {
            case "error":
              imageUrl = finishedError;
              break;
            case "warning":
              imageUrl = finishedWarning;
              break;
            case "success":
              imageUrl = finishedSuccess;
              break;
          }
        }

      else if (this.id2element[i].data.equipmentType == "大仓") {
          switch (state) {
            case "error":
              imageUrl = wareError;
              break;
            case "warning":
              imageUrl = wareWarning;
              break;
            case "success":
              imageUrl = wareSuccess;
              break;
          }
        }

       else if (this.id2element[i].data.equipmentType == "露天堆场") {
          switch (state) {
            case "error":
              imageUrl = exposedError;
              break;
            case "warning":
              imageUrl = exposedWarning;
              break;
            case "success":
              imageUrl = exposedSuccess;
              break;
          }
        }

       else if (this.id2element[i].data.equipmentType == "计量秤") {
          switch (state) {
            case "warning":
              imageUrl = scaleWarning;
              break;
            case "success":
              imageUrl = scaleSuccess;
              break;
          }
        }

       else if (this.id2element[i].data.equipmentType == "检化验") {
          switch (state) {
            case "warning":
              imageUrl = testWarning;
              break;
            case "success":
              imageUrl = testSuccess;
              break;
          }
        }

        this.id2element[i].attr({
          style: {
            image: imageUrl,
          },
        });
      
    },

    // 根据状态改变动画
    changeAnimate(state,i) {
    
        console.log(this.id2element[i], state);

        if (this.id2element[i].data.lineRelations) {
          let lineArrs = this.id2element[i].data.lineRelations.filter(
            (item) => {
              return item.isStart == true;
            }
          );

          lineArrs.forEach((item) => {
            let line = this.id2elementLine[item.id];

            if (line.data.animate) {
              if (state == "stop" || state == "error") {
                let cir = this.id2elementCirle[line.data.id];
                if (cir) {
                  this.zr.remove(cir);
                  delete this.id2elementCirle[line.data.id];
                  
                }
              }

              if (state == "success" || state == "warning") {
                this.circleAnimate(
                  line.data.shape.points,
                  line.data.style.stroke,
                  line.data.id
                );
               
              }
            } 
            
          });
        }
      
    },

    // 动画
    circleAnimate(polyline, color, id) {
      // 实心圆
      let cir = new zrender.Circle({
        shape: {
          cx: polyline[0][0],
          cy: polyline[0][1],
          r: 5,
        },
        style: {
          fill: color,
        },
      });
      this.zr.add(cir);
      const animation = cir.animate("shape", true);
      this.id2elementCirle[id] = cir;

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
          cy: cur[1],
        });
      }
      animation.start();
    },
    // div绘制料条分层
    getLiaotiao(data) {
      let obj = {
        info: {
          code: data.code,
          equipmentType: data.equipmentType,
          text: data.text,
          associatedCode: data.associatedCode,
        },
        width: data.shape.width,
        height: data.shape.height,
        left: data.shape.x,
        top: data.shape.y,
        borderWidth: data.style.lineWidth,
        borderColor: data.style.stroke,
        background: data.style.fill,
        name: data.style.text,
        num: 5,
      };
      this.liaotArr.push(obj);
    },

    equipmentClick(e) {
      console.log(e.target);
    },

    liaotiaoClick(info) {
      console.log(info);
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
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas-wrap {
  position: relative;
  width: 1920px;
  height: 1080px;
}
#canvas {
  width: 100%;
  height: 1080px;
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
