<template>
  <div
    class="canvas-wrap"
    ref="canvasWrap"
    style="width: 1980px; height: 1080px"
  >
    <header-logo></header-logo>
    <div class="workarea-detail" @click="detailShowClick">作业区详情</div>
    <div id="canvas" ref="canvas" style="width: 1980px; height: 1080px"></div>
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
      <div class="name">{{ li.info.text }}</div>
      <div class="block">
        <div
          class="col"
          :class="['col' + (i + 1)]"
          :style="{ width: j.value/li.total*100+'%' }"
          v-for="(j, i) in li.num"
          :key="i"
        ></div>
      </div>
    </div>
    <div class="btn-open" @click="info.isShow = true">
      <p>展开</p>
    </div>

    <el-drawer :visible.sync="info.isShow" :with-header="false" :modal="false">
      <mix-box
        v-if="/MMS/.test(info.code) && info.type == 'ordinary'"
        :info="info"
      ></mix-box>
      <blastfurnace-box
        v-if="/BF/.test(info.code) && info.type == 'ordinary'"
        :info="info"
      ></blastfurnace-box>
      <coking-box
        v-if="/GFPP/.test(info.code) && info.type == 'ordinary'"
        :info="info"
      ></coking-box>
      <pelletizing-box
        v-if="/PPP/.test(info.code) && info.type == 'ordinary'"
        :info="info"
      >
      </pelletizing-box>
      <sinma-box
        v-if="/SIN/.test(info.code) && info.type == 'ordinary'"
        :info="info"
      ></sinma-box>
      <stockyard-box
        v-if="/PMF/.test(info.code) && info.type == 'ordinary'"
        :info="info"
      ></stockyard-box>
      <liaotiao-box v-if="info.type == 'tiao'" :info="info"></liaotiao-box>
      <analysis-box v-if="info.type == 'analysis'" :info="info"></analysis-box>
      <liaodui-box v-if="info.type == 'store'" :info="info"></liaodui-box>
      <msm-scale v-if="info.type == 'scale'" :info="info"></msm-scale>
      <process-box v-if="info.type == 'belt'" :info="info"></process-box>
      <div class="btn-close" @click="info.isShow = false">
        <p>收起</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  facilityStatus,
  stripProportion,
  // beltInFlow,
  // beltMetering,
  // processDetails,
  // pileInformation,
  // pileInfopileDetailrmation,
  // feedAndReceiving,
  // castingInformation,
  // storageMaterielStock,
  // storageProduct
} from "../../api/home";

//皮带图片
let beltWarning = require("../../assets/image/belt-warning.png");
let beltSuccess = require("../../assets/image/belt-success.png");
let beltStop = require("../../assets/image/belt-stop.png");

//大仓
let wareError = require("../../assets/image/store1-error.png");
let wareSuccess = require("../../assets/image/store1-success.png");
let wareWarning = require("../../assets/image/store1-warning.png");

//小仓
let smWareError = require("../../assets/image/store2-error.png");
let smWareSuccess = require("../../assets/image/store2-success.png");
let smWareWarning = require("../../assets/image/store2-warning.png");

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
import { workArtdetail } from "../../api/home";

export default {
  name: "ArtView",
  components: {
    HeaderLogo: () => import("../../components/HeaderLogo"),
    MixBox: () => import("./components/mixwell/MixBox"),
    StockyardBox: () => import("./components/stockyard/StockyardBox"),
    ProcessBox: () => import("./components/process/ProcessBox"),
    LiaoduiBox: () => import("./components/liaodui/LiaoduiBox"),
    CokingBox: () => import("./components/coking/CokingBox"),
    PelletizingBox: () => import("./components/pelletizing/PelletizingBox"),
    sinmaBox: () => import("./components/sinteringmachine/sinmaBox"),
    BlastfurnaceBox: () => import("./components/blastfurnace/BlastfurnaceBox"),
    AnalysisBox: () => import("./components/analysis/AnalysisBox"),
    MsmScale: () => import("./components/msmscale/MsmScale"),
    LiaotiaoBox: () => import("./components/liaotiao/LiaotiaoBox"),
  },
  data() {
    return {
      workAreaCode:"",
      info: {
        isShow: true,
        type: "ordinary",
        code: "",
        name: "",
        obj: {},
      },

      zr: null,
      liaotArr: [],
      id2element: {},
      id2elementLine: {},
      id2elementCirle: {},
    };
  },

  async mounted() {
    //拿到code，
    this.info.code = this.$route.query.code;
    this.workAreaCode = this.$route.query.code

    this.info.name = this.$route.query.name;

    this.zr = zrender.init(document.getElementById("canvas"));

    //拿后台数据进行绘图
    workArtdetail({
      code: this.info.code,
    }).then((res) => {
      if (res.data.code === "00000") {
        let json = JSON.parse(res.data.data.body);
        var canvasWrap = this.$refs.canvasWrap;
        var canvasBox = this.$refs.canvas;
        canvasBox.style.width = json.artData.width + "px";
        canvasBox.style.height = json.artData.height + "px";
        canvasWrap.style.width = json.artData.width + "px";
        canvasWrap.style.height = json.artData.height + "px";
        this.zr.resize(json.artData);
        let rectData = json.rectData;
        if (rectData) {
          this.drawRect(rectData);
        }
        let lineData = json.lineData;
        if (lineData) {
          this.drawLine(lineData);
        }

        let textData = json.textData;
        if (textData) {
          this.drawText(textData);
        }
      }
    });

    //开启websoket
    this.WebSocketTest();

    // beltInFlow({ beltCode: "p1" }).then((res) => {
    //   console.log(res);
    // });

    // processDetails({
    //   analysisCode: "string",
    //   processDetailsName: "string",
    // }).then((res) => {
    //   console.log(res);
    // });

    // pileInformation({
    //   storageCode:"cc"
    // }).then(res=>{
    //   console.log(res)

    // })

    // pileInfopileDetailrmation().then(res=>{
    //   console.log(res)
    // })

    // feedAndReceiving({operationAreaCode:"PMF"}).then(res=>{
    //   console.log(res)
    // })
    // castingInformation({operationAreaCode:"BF1"}).then(res=>{
    //   console.log(res)
    // })

    // storageMaterielStock().then(res=>{
    //   console.log(res)
    // })

    // storageProduct().then(res=>{
    //   console.log(res)

    // })
  },
  
  
  methods: {
    //连接websoket响应状态
    WebSocketTest() {
      let that = this;
      if ("WebSocket" in window) {
        var ws = new WebSocket(
          "ws://" + location.host + "/ws/material/" + this.workAreaCode
        );

        ws.onopen = function () {
          console.log("连接成功");
        };

        ws.onerror = function () {
          that.WebSocketTest();
        };

        ws.onmessage = function (res) {
          console.log("收到服务器内容", res);
          let data = JSON.parse(res.data).msgBody;
          console.log(data)
          data.forEach(item=>{
            that.wschange(item);
          })
          
        };
      } else {
        alert("您的浏览器不支持 WebSocket!");
      }
    },


    




    //ws状态修改
    wschange(item){
      if (item.type == "BELT") {
            let belt = this.id2element[item.code];
            belt.data.state = item.status;
            let imageUrl = "";
            switch (belt.data.state) {
              case "STOP":
                imageUrl = beltStop;
                break;
              case "ERROR":
                imageUrl = beltWarning;
                break;
              case "RUN":
                imageUrl = beltSuccess;
                break;
            }

            belt.attr({
              style: {
                image: imageUrl,
              },
            });

          this.changeAnimate(item.status,item.code)
          } else if (item.type == "STORAGE") {
            let storage = this.id2element[item.code];
            storage.data.state = item.status;
            let imageUrl = "";
            if (storage.data.equipmentType == "配料仓") {
              switch (storage.data.state) {
                case "ERROR":
                  imageUrl = mixError;
                  break;
                case "WARN":
                  imageUrl = mixWarning;
                  break;
                case "NOMAL":
                  imageUrl = mixSuccess;
                  break;
              }
            } else if (storage.data.equipmentType == "成品仓") {
              switch (storage.data.state) {
                case "ERROR":
                  imageUrl = finishedError;
                  break;
                case "WARN":
                  imageUrl = finishedWarning;
                  break;
                case "NOMAL":
                  imageUrl = finishedSuccess;
                  break;
              }
            } else if (storage.data.equipmentType == "露天堆场") {
              switch (storage.data.state) {
                case "ERROR":
                  imageUrl = exposedError;
                  break;
                case "WARN":
                  imageUrl = exposedWarning;
                  break;
                case "NOMAL":
                  imageUrl = exposedSuccess;
                  break;
              }
            } else if (storage.data.equipmentType == "大仓") {
              switch (storage.data.state) {
                case "ERROR":
                  imageUrl = wareError;
                  break;
                case "WARN":
                  imageUrl = wareWarning;
                  break;
                case "NOMAL":
                  imageUrl = wareSuccess;
                  break;
              }
            } else if (storage.data.equipmentType == "小仓") {
              switch (storage.data.state) {
                case "ERROR":
                  imageUrl = smWareError;
                  break;
                case "WARN":
                  imageUrl = smWareWarning;
                  break;
                case "NOMAL":
                  imageUrl = smWareSuccess;
                  break;
              }
            }

            storage.attr({
              style: {
                image: imageUrl,
              },
            });
             this.changeAnimate(item.status,item.code)
          }


        

       

    },






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
          if (lineData) {
            _this.drawLine(lineData);
          }

          let textData = json.textData;
          if (textData) {
            _this.drawText(textData);
          }
        }
      };
    },

    // 绘制rect
    drawRect(data) {
      this.liaotArr = [];
      for (let i in data) {
        if (data[i].type === "rect") {
          // 矩形
          if (/料条/.test(data[i].equipmentType)) {
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
      }

      //获取状态
      this.changeState(facilityStatus);

      this.renderLiao();
    },

    //渲染料条
    renderLiao(){
      stripProportion({operationAreaCode:this.info.code}).then((res) => {
      console.log(res);
      console.log(this.liaotArr)

      this.liaotArr.forEach(item=>{

        res.data.data.forEach(item1 =>{
           if(item.info.code == item1.code){
             item.num = item1.materielList
             item.info.text = item1.name,
             item.total = item1.total
           }
        })
      })
    })

    },

    //改变状态
    changeState(fun) {
      let codeArr = this.id2element;
      fun({ operationAreaCode: this.info.code }).then((res) => {
        //从后台拿状态
        let data = res.data.data;
        for (var i in codeArr) {
          data.forEach((item) => {
            if (codeArr[i].data.code == item.code) {
              codeArr[i].data.state = item.status;
              codeArr[i].data.text = item.name
            }
          });
        }
        //遍历改变状态

        for (let i in codeArr) {
          let state = this.id2element[i].data.state;
          this.changeImage(state, i);
          this.changeAnimate(state, i);
        }
       
      });
    },

    //根据状态改变图片
    changeImage(state, i) {
      let imageUrl = "";
      if (this.id2element[i].data.equipmentType == "皮带") {
        switch (state) {
          case "STOP":
            imageUrl = beltStop;
            break;
          case "WARN":
            imageUrl = beltWarning;
            break;
          case "RUN":
            imageUrl = beltSuccess;
            break;
          default:
            imageUrl = beltStop;
        }
      } else if (this.id2element[i].data.equipmentType == "配料仓") {
        switch (state) {
          case "ERROR":
            imageUrl = mixError;
            break;
          case "WARN":
            imageUrl = mixWarning;
            break;
          case "NORMAL":
            imageUrl = mixSuccess;
            break;
          default:
            imageUrl = mixError;
        }
      } else if (this.id2element[i].data.equipmentType == "成品仓") {
        switch (state) {
          case "ERROR":
            imageUrl = finishedError;
            break;
          case "WARN":
            imageUrl = finishedWarning;
            break;
          case "NORMAL":
            imageUrl = finishedSuccess;
            break;
          default:
            imageUrl = finishedError;
        }
      } else if (this.id2element[i].data.equipmentType == "大仓") {
        switch (state) {
          case "ERROR":
            imageUrl = wareError;
            break;
          case "WARN":
            imageUrl = wareWarning;
            break;
          case "NORMAL":
            imageUrl = wareSuccess;
            break;
          default:
            imageUrl = wareError;
        }
      } else if (this.id2element[i].data.equipmentType == "小仓") {
        switch (state) {
          case "ERROR":
            imageUrl = smWareError;
            break;
          case "WARN":
            imageUrl = smWareWarning;
            break;
          case "NORMAL":
            imageUrl = smWareSuccess;
            break;
          default:
            imageUrl = smWareError;
        }
      } else if (this.id2element[i].data.equipmentType == "露天堆场"){
        switch (state) {
          case "ERROR":
            imageUrl = exposedError;
            break;
          case "WARN":
            imageUrl = exposedWarning;
            break;
          case "NORMAL":
            imageUrl = exposedSuccess;
            break;
          default:
            imageUrl = exposedError;
        }
      } else if (this.id2element[i].data.equipmentType == "计量秤") {
        let relationState = "";
        if (this.id2element[i].data.associatedCode) {
          let relationEquipment = this.id2element[
            this.id2element[i].data.associatedCode
          ];

          if (relationEquipment) {
            relationState = relationEquipment.data.state;
          }
        }
        switch (relationState) {
          case "WARN":
            imageUrl = scaleWarning;
            break;
          case "NORMAL":
            imageUrl = scaleSuccess;
            break;
          case "RUN":
            imageUrl = scaleSuccess;
            break;
          case "STOP":
            imageUrl = scaleSuccess;
            break;
          case "ERROR":
            imageUrl = scaleSuccess;
            break;
          default:
            imageUrl = scaleSuccess;
        }
      } else if (this.id2element[i].data.equipmentType == "检化验") {
        let relationState = "";
        if (this.id2element[i].data.associatedCode) {
          let relationEquipment = this.id2element[
            this.id2element[i].data.associatedCode
          ];

          if (relationEquipment) {
            relationState = relationEquipment.data.state;
          }
        }

        switch (relationState) {
          case "WARN":
            imageUrl = testWarning;
            break;
          case "NORMAL":
            imageUrl = testSuccess;
            break;
          case "RUN":
            imageUrl = testSuccess;
            break;
          case "STOP":
            imageUrl = testSuccess;
            break;
          case "ERROR":
            imageUrl = testSuccess;
            break;
          default:
            imageUrl = testSuccess;
        }
      }

      this.id2element[i].attr({
        style: {
          image: imageUrl,
        },
      });
    },

    // 根据状态改变动画
    changeAnimate(state, i) {
      if (this.id2element[i].data.lineRelations) {
        let lineArrs = this.id2element[i].data.lineRelations.filter((item) => {
          return item.isStart == true;
        });

        lineArrs.forEach((item) => {
          let line = this.id2elementLine[item.id];

          if (line) {
              if (state == "STOP" || state == "ERROR") {
                let cir = this.id2elementCirle[line.data.id];
                if (cir) {
                  this.zr.remove(cir);
                  delete this.id2elementCirle[line.data.id];
                }
              }

              if (state == "RUN" || state == "WARN" || state == "NORMAL") {
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

    //绘制文字
    drawText(data) {
      for (let i in data) {
        let text = new zrender.Text({
          style: {
            text: data[i].style.text,
            fontSize: data[i].style.fontSize,
            textFill: data[i].style.textFill,
            x: data[i].style.x,
            y: data[i].style.y,
            zlevel: 2,
          },
        });
        this.zr.add(text);
      }
    },

    // div绘制料条分层
    getLiaotiao(data) {
      let obj = {
        info: {
          code: data.code,
          equipmentType: data.equipmentType,
          text: data.text,
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

    //设备点击
    equipmentClick(e) {
      console.log(e)
      let type = e.target.data.equipmentType;
      let state = e.target.data.state;
      if (type == "皮带" && (state == "RUN" || state == "WARN")) {
        this.info.type = "belt";
        this.info.isShow = true;
        this.info.code =  e.target.data.code
      } else if (
        (type == "配料仓" ||
          type == "成品仓" ||
          type == "大仓" ||
          type == "露天堆场" ||
          type == "小仓") &&
        (state == "NORMAL" || state == "WARN")
      ) {
        this.info.type = "store";
        this.info.isShow = true;
        this.info.code =  e.target.data.code;
        this.info.name = e.target.data.text
      } else if (type == "计量秤") {
        this.info.type = "scale";
        this.info.isShow = true;
        this.info.code =  e.target.data.associatedCode
      } else if (type == "检化验") {
        this.info.type = "analysis";
        this.info.isShow = true;
        this.info.code =  e.target.data.associatedCode
        
      }
    },

    //顶部按钮点击
    detailShowClick() {
      this.info.type = "ordinary";
      this.info.isShow = true;
      this.info.code = this.workAreaCode;
    },

    //料条点击
    liaotiaoClick(e) {
      this.info.type = "tiao";
      this.info.isShow = true;
      this.info.code = e.code;
      this.info.name = e.text
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas-wrap {
  background: linear-gradient(180deg, #000000 0%, #001e4d 100%);
  position: relative;
}
#canvas {
  background: linear-gradient(180deg, #000000 0%, #001e4d 100%);
}

.workarea-detail {
  position: absolute;
  top: 14px;
  left: 638px;
  z-index: 10;
  width: 250px;
  height: 30px;
  border-radius: 15px;
  cursor: pointer;
  background: linear-gradient(
    270deg,
    rgba(17, 135, 255, 0) 0%,
    rgba(8, 88, 168, 0.5) 100%
  );

  padding-left: 10px;
  line-height: 30px;
  color: #fff;
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

.canvas-wrap ::v-deep .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.canvas-wrap ::v-deep .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.canvas-wrap ::v-deep .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.canvas-wrap .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.canvas-wrap .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.canvas-wrap .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.canvas-wrap .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}
</style>
