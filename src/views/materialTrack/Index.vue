<template>
  <div class="track-wrap">
    <header-logo></header-logo>
    <div id="material-track"></div>
    <div class="matou">燃供码头</div>
    <div class="matou" style="left: 1394px;top: 721px;">原料码头</div>
    <div
      class="block"
      :style="{ left: item.left + 'px', top: item.top + 'px' }"
      v-for="item in blockData"
      :key="item.id"
      @click="handleBlock(item)"
    >
      <div class="header">{{ item.name }}</div>
      <ol class="list">
        <li class="li" v-for="li in 5" :key="li">原料1号：4000</li>
      </ol>
    </div>
  </div>
</template>

<script>
import zrender from "zrender";
export default {
  name: "MaterialTrack",
  components: {
    HeaderLogo: () => import("../../components/HeaderLogo")
  },
  data() {
    return {
      blockData: [
        { id: 1, name: "燃供厂", left: 389, top: 647 },
        { id: 2, name: "一高炉", left: 956, top: 584 },
        { id: 3, name: "二高炉", left: 831, top: 625 },
        { id: 4, name: "三高炉", left: 664, top: 657 },
        { id: 5, name: "1#烧结机", left: 901, top: 380 },
        { id: 6, name: "2#烧结机", left: 653, top: 306 },
        { id: 7, name: "3#烧结机", left: 778, top: 342 },
        { id: 8, name: "四高炉", left: 1290, top: 106 },
        { id: 9, name: "五高炉", left: 1165, top: 188 },
        { id: 10, name: "四#烧结机", left: 1510, top: 322 },
        { id: 11, name: "五#烧结机", left: 1633, top: 373 },
        { id: 12, name: "一次料场", left: 1220, top: 443 },
        { id: 13, name: "一混匀", left: 1097, top: 490 },
        { id: 14, name: "二混匀", left: 1344, top: 342 },
        { id: 15, name: "球团", left: 1026, top: 194 }
      ]
    };
  },
  mounted() {
    this.zr = zrender.init(document.getElementById("material-track"));
    this.getCurveData();
  },
  methods: {
    // 绘制曲线
    getCurveData() {
      // 起点坐标-终点坐标-控制点坐标-箭头中心坐标-箭头旋转角度（默认箭头方向朝上）
      let data = [
        {
          id: 1,
          points: [[207, 792], [382, 719], [207, 719], [381, 721], -0.6]
        },
        {
          id: 2,
          points: [[501, 678], [689, 512], [689, 678], [690, 512], -0.1]
        },
        {
          id: 3,
          points: [[501, 678], [629, 718], [629, 674], [629, 718], 1.2]
        },
        {
          id: 4,
          points: [[801, 528], [802, 657], [828, 657], [806, 656], 0.9]
        },
        {
          id: 5,
          points: [[1100, 346], [1040, 569], [1100, 565], [1040, 571], 0.75]
        },
        {
          id: 6,
          points: [[1061, 463], [1165, 512], [1165, 463], [1062, 463], 0.5]
        },
        {
          id: 7,
          points: [[1076, 355], [1218, 445], [1077, 445], [1074, 353], 0.1]
        },
        {
          id: 8,
          points: [[1100, 346], [1196, 389], [1100, 389], [1198, 387], -0.35]
        },
        {
          id: 9,
          points: [[1307, 434], [1300, 389], [1307, 389], [1299, 388], 0.3]
        },
        {
          id: 10,
          points: [[1365, 313], [1508, 455], [1508, 313], [1364, 313], 0.45]
        },
        {
          id: 11,
          points: [[1454, 448], [1499, 462], [1499, 448], [1498, 458], -0.6]
        },
        {
          id: 12,
          points: [[1345, 552], [1450, 520], [1450, 552], [1341, 551], 0.45]
        },
        {
          id: 13,
          points: [[1303, 609], [1394, 748], [1303, 748], [1303, 605], 0]
        },
        {
          id: 14,
          points: [[1214, 631], [1271, 595], [1271, 631], [1216, 631], 0.5]
        }
      ];
      for (let i in data) {
        let points = data[i].points;
        let curve = new zrender.BezierCurve({
          id: data[i].id,
          shape: {
            x1: points[0][0],
            y1: points[0][1],
            x2: points[1][0],
            y2: points[1][1],
            cpx1: points[2][0],
            cpy1: points[2][1]
          },
          style: {
            lineWidth: 2,
            stroke: "#fff"
          }
        });
        this.zr.add(curve);
        curve.on("click", this.curveClick);
        this.getNarrow(points[3], points[4]);
      }
    },
    // 绘制箭头
    getNarrow(arr, r) {
      let narrow = new zrender.Isogon({
        shape: {
          x: arr[0],
          y: arr[1],
          r: 7,
          n: 3
        },
        style: {
          lineWidth: 1,
          fill: "#fff",
          stroke: "#fff"
        },
        rotation: Math.PI * r,
        origin: [arr[0], arr[1]]
      });
      this.zr.add(narrow);
    },
    // 箭头点击
    curveClick(e) {
      console.log(e.target);
    },
    // 区域点击
    handleBlock(block) {
      if (block.id === 15) {
        this.$router.push("/artView");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.track-wrap {
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 100vh;
}
#material-track {
  width: 1920px;
  height: 1080px;
  background: url(../../assets/background.png) no-repeat center center;
  background-size: 100% 100%;
}
.matou {
  position: absolute;
  left: 159px;
  top: 793px;
  z-index: 2;
  width: 104px;
  height: 44px;
  line-height: 44px;
  background: linear-gradient(
    180deg,
    rgba(21, 64, 153, 0.6) 0%,
    rgba(2, 10, 35, 0.6) 100%
  );
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.2)
    )
    1 1;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
}
.block {
  position: absolute;
  z-index: 2;
  width: 109px;
  background: linear-gradient(
    180deg,
    rgba(21, 64, 153, 0.6) 0%,
    rgba(2, 10, 35, 0.6) 100%
  );
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.2)
    )
    1 1;
  cursor: pointer;
  .header {
    padding: 8px 0 4px;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 30px;
    text-align: center;
  }
  .list {
    padding-left: 14px;
    .li {
      padding-bottom: 4px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 17px;
    }
  }
}
</style>
