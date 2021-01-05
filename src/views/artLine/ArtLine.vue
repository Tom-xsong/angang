<template>
  <div>
    <div class="artBody">
      <span>{{num}}℃</span>
      <div class="wrap" ref="configWrap"></div>
    </div>
  </div>
</template>

<script>
import { init as initZR, Line } from "zrender";
export default {
  data() {
    return {
      zr: null,
      lineArr: [],
      curLine: null,
      num: 0,
    };
  },

  mounted() {
      this.artLoad()
  },

  methods: {
     artLoad(){
      this.zr = initZR(this.$refs.configWrap, {
      renderer: "canvas",
      devicePixelRatio: 1,
      width: "1920px",
      height: "1080px",
      background: "#000",
    });

    this.zr.on("mousedown", this.clickRoot);
    this.zr.on("mouseup", this.mouseup);
        
    },




    mousemove(e) {
      console.log(e);
      this.curLine.setShape({
        x2: ~~e.offsetX + 0.5, //结束点横坐标
        y2: ~~e.offsetY + 0.5, //结束点横坐标
      });
    },

    mouseup() {
      this.zr.off("mousemove", this.mousemove);
      this.lineArr.push(this.curLine);
      if (this.lineArr.length == 2) {
        let x1 = this.lineArr[0].shape.x1;
        let y1 = this.lineArr[0].shape.y1;

        let x3 = this.lineArr[0].shape.x2;
        let y3 = this.lineArr[0].shape.y2;

        let x2 = this.lineArr[1].shape.x2;
        let y2 = this.lineArr[1].shape.y2;

        console.log(x1,y1,x2,y2,x3,y3)

        const angle = this.getAngle(
          {
            x: x1 - x3,
            y: y1 - y3,
          },
          {
            x: x2 - x3,
            y: y2 - y3,
          }
        );
        console.log(angle);
        this.num = angle
        this.lineArr = []


      }
      


    },

    clickRoot(e) {
      console.log(~~e.offsetX + 0.5, ~~e.offsetY + 0.5);

      (this.curLine = new Line({
        style: {
          stroke: "yellow", //线的颜色
          lineWidth: 1, //线宽
          lineDash: [0], //虚线样式
        },
        shape: {
          x1: ~~e.offsetX + 0.5, //起始点横坐标
          y1: ~~e.offsetY + 0.5, //起始点纵坐标
          x2: ~~e.offsetX + 0.5, //结束点横坐标
          y2: ~~e.offsetY + 0.5, //结束点横坐标
          percent: 1,
        },
      })),
        this.zr.add(this.curLine);
      this.zr.on("mousemove", this.mousemove);
    },

    //夹角计算公式
    getAngle({ x: x1, y: y1 }, { x: x2, y: y2 }) {
      const dot = x1 * x2 + y1 * y2;
      const det = x1 * y2 - y1 * x2;
      const angle = (Math.atan2(det, dot) / Math.PI) * 180;
      return Math.round(angle + 360) % 360;
    },
  },
};
</script>

<style>
.wrap {
  background-color: #000;
}

.artBody {
  position: relative;
  overflow: hidden;
}

.artBody span {
  position: absolute;
  left: 100px;
  top: 100px;
  font-size: 50px;
  color: yellow;
}
</style>