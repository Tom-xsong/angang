<template>
  <div class="track-wrap">
    <header-logo></header-logo>
    <div id="material-track"></div>
    <div class="matou" @click="matouClick({ name: '燃供码头', code: 'RGMT' })">
      燃供码头
    </div>
    <div
      class="matou"
      @click="matouClick({ name: '原料码头', code: 'YLMT' })"
      style="left: 1394px; top: 721px"
    >
      原料码头
    </div>
    <div
      class="block"
      :style="{ left: item.left + 'px', top: item.top + 'px' }"
      v-for="item in blockData"
      :key="item.id"
      @click="handleBlock(item)"
    >
      <div class="header">{{ item.name }}</div>
      <ol class="list">
        <li
          class="li"
          v-for="(item1, index) in item.rawMaterialArr"
          :key="index"
        >
          {{ item1.name }}：{{ item1.value }}
        </li>
      </ol>
    </div>
    <div class="btn-open" @click="info.isShow = true">
      <p>展开</p>
    </div>

     <el-drawer :visible.sync="info.isShow" :with-header="false" :modal="false">
       <route-box v-if="info.isBox == 'line'" :info="info"></route-box>
       <matou-box v-if="info.isBox == 'matou'" :info="info"></matou-box>
       <work-box v-if="info.isBox == 'workArea'" :info="info"></work-box> 
       <div class="btn-close" @click="info.isShow = false">
        <p>收起</p>
      </div>
     </el-drawer>
   
    
    
  </div>
</template>

<script>
import zrender from "zrender";

import { workAreaAll } from "../../api/home";
export default {
  name: "MaterialTrack",
  components: {
    HeaderLogo: () => import("../../components/HeaderLogo"),
    RouteBox: () => import("./components/route/RouteBox"),
    MatouBox: () => import("./components/matou/MatouBox"),
    WorkBox: () => import("./components/work/WorkBox"),
  },
  data() {
    return {
      info: {
        isShow: false,
        isBox: "matou",
        objs: { name: '燃供码头', code: 'RGMT' },
      },

      blockData: [
        {
          id: 1,
          type: "workArea",
          name: "燃供厂",
          code: "GFPP",
          left: 389,
          top: 647,
          rawMaterialArr: [],
        },
        {
          id: 2,
          type: "workArea",
          name: "一高炉",
          code: "BF1",
          left: 956,
          top: 584,
          rawMaterialArr: [],
        },
        {
          id: 3,
          type: "workArea",
          name: "二高炉",
          code: "BF2",
          left: 831,
          top: 625,
          rawMaterialArr: [],
        },
        {
          id: 4,
          type: "workArea",
          name: "三高炉",
          code: "BF3",
          left: 664,
          top: 657,
          rawMaterialArr: [],
        },
        {
          id: 5,
          type: "workArea",
          name: "1#烧结机",
          code: "SIN1",
          left: 901,
          top: 380,
          rawMaterialArr: [],
        },
        {
          id: 6,
          type: "workArea",
          name: "2#烧结机",
          code: "SIN2",
          left: 653,
          top: 306,
          rawMaterialArr: [],
        },
        {
          id: 7,
          type: "workArea",
          name: "3#烧结机",
          code: "SIN3",
          left: 778,
          top: 342,
          rawMaterialArr: [],
        },
        {
          id: 8,
          type: "workArea",
          name: "四高炉",
          code: "BF4",
          left: 1290,
          top: 106,
          rawMaterialArr: [],
        },
        {
          id: 9,
          type: "workArea",
          name: "五高炉",
          code: "BF5",
          left: 1165,
          top: 188,
          rawMaterialArr: [],
        },
        {
          id: 10,
          type: "workArea",
          name: "四#烧结机",
          code: "SIN4",
          left: 1510,
          top: 322,
          rawMaterialArr: [],
        },
        {
          id: 11,
          type: "workArea",
          name: "五#烧结机",
          code: "SIN5",
          left: 1633,
          top: 373,
          rawMaterialArr: [],
        },
        {
          id: 12,
          type: "workArea",
          name: "一次料场",
          code: "PMF",
          left: 1220,
          top: 443,
          rawMaterialArr: [],
        },
        {
          id: 13,
          type: "workArea",
          name: "一混匀",
          code: "MMS1",
          left: 1097,
          top: 490,
          rawMaterialArr: [],
        },
        {
          id: 14,
          type: "workArea",
          name: "二混匀",
          code: "MMS2",
          left: 1344,
          top: 342,
          rawMaterialArr: [],
        },
        {
          id: 15,
          type: "workArea",
          name: "球团",
          code: "PPP",
          left: 1026,
          top: 194,
          rawMaterialArr: [],
        },
      ],
    };
  },

  created() {},
  mounted() {
    this.zr = zrender.init(document.getElementById("material-track"));
    this.getCurveData();

    workAreaAll().then((res) => {
      console.log(res);
      let data1 = res.data.data;
      this.blockData.forEach((item) => {
        data1.forEach((item1) => {
          if (item.code == item1.operationAreaCode) {
            item.rawMaterialArr = item1.storageMaterielCurrentList;
          }
        });
      });
    });
  },
  methods: {
    // 绘制曲线
    getCurveData() {
      // 起点坐标-终点坐标-控制点坐标-箭头中心坐标-箭头旋转角度（默认箭头方向朝上）
      let data = [
        {
          id: 1,
          type: "line",
          points: [[207, 792], [382, 719], [207, 719], [381, 721], -0.6], //码 厂
          arr: [
            [
              { name: "燃供码头", code: "RGMT" },
              { name: "燃供厂", code: "GFPP" },
            ],
          ],
        },
        {
          id: 2,
          type: "line",
          points: [[501, 678], [689, 512], [689, 678], [690, 512], -0.1], //厂 烧
          arr: [
            [
              { name: "燃供厂", code: "GFPP" },
              { name: "1#烧结机", code: "SIN1" },
            ],
            [
              { name: "燃供厂", code: "GFPP" },
              { name: "2#烧结机", code: "SIN2" },
            ],
            [
              { name: "燃供厂", code: "GFPP" },
              { name: "3#烧结机", code: "SIN3" },
            ],
          ],
        },
        {
          id: 3,
          type: "line",
          points: [[501, 678], [629, 718], [629, 674], [629, 718], 1.2], //厂 高
          arr: [
            [
              { name: "燃供厂", code: "GFPP" },
              { name: "1#高炉", code: "BF1" },
            ],
            [
              { name: "燃供厂", code: "GFPP" },
              { name: "2#高炉", code: "BF2" },
            ],
            [
              { name: "燃供厂", code: "GFPP" },
              { name: "3#高炉", code: "BF3" },
            ],
          ],
        },
        {
          id: 4,
          type: "line",
          points: [[801, 528], [802, 657], [828, 657], [806, 656], 0.9], //烧 高
          arr: [
            [
              
              { name: "1#烧结机", code: "SIN1" },
              { name: "1#高炉", code: "BF1" },
            ],
            [
              
              { name: "2#烧结机", code: "SIN2" },
              { name: "1#高炉", code: "BF1" },
            ],
            [
             
              { name: "3#烧结机", code: "SIN3" },
              { name: "1#高炉", code: "BF1" },
            ],
            [
              
              { name: "1#烧结机", code: "SIN1" },
              { name: "2#高炉", code: "BF1" },
            ],
            [
              { name: "2#烧结机", code: "SIN2" },
              { name: "2#高炉", code: "BF1" },
            ],
            [
              { name: "3#烧结机", code: "SIN3" },
              { name: "2#高炉", code: "BF1" },
            ],
            [
              
              { name: "1#烧结机", code: "SIN1" },
              { name: "3#高炉", code: "BF1" },
            ],
            [
              
              { name: "2#烧结机", code: "SIN2" },
              { name: "3#高炉", code: "BF1" },
            ],
            [
              { name: "3#烧结机", code: "SIN3" },
              { name: "3#高炉", code: "BF1" },
            ],
          ],
        },
        {
          id: 5,
          points: [[1100, 346], [1040, 569], [1100, 565], [1040, 571], 0.75], //球 高
          arr: [
            [
              { name: "球团", code: "PPP" },
              { name: "1#高炉", code: "BF1" },
            ],
            [
              { name: "球团", code: "PPP" },
              { name: "2#高炉", code: "BF2" },
            ],
            [
              { name: "球团", code: "PPP" },
              { name: "3#高炉", code: "BF3" },
            ],
          ],
        },
        {
          id: 6,
          type: "line",
          points: [[1061, 463], [1165, 512], [1165, 463], [1062, 463], 0.5], //混 烧
          arr: [
            [
              { name: "1#混均料场", code: "MMS1" },
              { name: "1#烧结机", code: "SIN1" },
            ],
            [
              { name: "1#混均料场", code: "MMS1" },
              { name: "2#烧结机", code: "SIN2" },
            ],
            [
              { name: "1#混均料场", code: "MMS1" },
              { name: "3#烧结机", code: "SIN3" },
            ],
          ],
        },

        {
          id: 7,
          type: "line",
          points: [[1076, 355], [1218, 445], [1077, 445], [1074, 353], 0.1], //一料 球
          arr: [
            [
              { name: "一次料场", code: "PMF" },
              { name: "燃供厂", code: "GFPP" },
            ],
          ],
        },
        {
          id: 8,
          type: "line",
          points: [[1100, 346], [1196, 389], [1100, 389], [1198, 387], -0.35], //球 五高
          arr: [
            [
              { name: "球团", code: "PPP" },
              { name: "4#高炉", code: "BF4" },
            ],
            [
              { name: "球团", code: "PPP" },
              { name: "5#高炉", code: "BF5" },
            ],
          ],
        },
        {
          id: 9,
          type: "line",
          points: [[1307, 434], [1300, 389], [1307, 389], [1299, 388], 0.3], //一料 五高
          arr: [
            [ 
              { name: "一次料场", code: "PMF" },
              { name: "4#高炉", code: "BF4" },
            ],
            [
              { name: "一次料场", code: "PMF" },
              { name: "5#高炉", code: "BF5" },
            ],
          ],
        },
        {
          id: 10,
          type: "line",
          points: [[1365, 313], [1508, 455], [1508, 313], [1364, 313], 0.45], //四烧 五高
          arr: [
            [
              { name: "4#烧结机", code: "SIN4" },
              { name: "4#高炉", code: "BF4" },
            ],
            [
              { name: "5#烧结机", code: "SIN5" },
              { name: "5#高炉", code: "BF5" },
            ],
          ],
        },
        {
          id: 11,
          type: "line",
          points: [[1454, 448], [1499, 462], [1499, 448], [1498, 458], -0.6], //二混 四烧
          arr: [
            [
              { name: "2#混均料场", code: "MMS2" },
              { name: "4#烧结机", code: "SIN4" },
            ],
            [
              { name: "2#混均料场", code: "MMS2" },
              { name: "5#烧结机", code: "SIN5" },
            ],
          ],
        },
        {
          id: 12,
          type: "line",
          points: [[1345, 552], [1450, 520], [1450, 552], [1341, 551], 0.45], //四烧 一料
          arr: [
            [
              { name: "4#烧结机", code: "SIN4" },
              { name: "一次料场", code: "PMF" },
            ],
            [
              { name: "5#烧结机", code: "SIN5" },
              { name: "一次料场", code: "PMF" },
            ],
          ],
        },
        {
          id: 13,
          type: "line",
          points: [[1303, 609], [1394, 748], [1303, 748], [1303, 605], 0], //原码 一料
          arr: [
            [
              { name: "原料码头", code: "YLMT" },
              { name: "一次料场", code: "PMF" },
            ],
          ],
        },
        {
          id: 14,
          type: "line",
          points: [[1214, 631], [1271, 595], [1271, 631], [1216, 631], 0.5], //一料 一混
          arr: [
            [
              { name: "1#混均料场", code: "MMS1" },
              { name: "一次料场", code: "PMF" },
            ],
          ],
        },
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
            cpy1: points[2][1],
          },
          style: {
            lineWidth: 2,
            stroke: "#fff",
          },
          type: data[i].type,
          arr: data[i].arr,
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
          n: 3,
        },
        style: {
          lineWidth: 1,
          fill: "#fff",
          stroke: "#fff",
        },
        rotation: Math.PI * r,
        origin: [arr[0], arr[1]],
      });
      this.zr.add(narrow);
    },
    // 箭头点击
    curveClick(e) {
      this.info.isBox = "line";
      this.info.isShow = true;
      this.info.objs = e.target.arr;
    },
    // 区域点击
    handleBlock(block) {
      this.info.isBox = "workArea";
      this.info.isShow = true;
      this.info.objs = block;
    },

    matouClick(obj) {
      this.info.isBox = "matou";
      this.info.isShow = true;
      this.info.objs = obj;
    },
  },
};
</script>

<style lang="scss" scoped>
.track-wrap {
  position: relative;
  z-index: 1;
  width: 1920px;
  height: 1080px;
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
    height: 100px;
    overflow: auto;
    .li {
      padding-bottom: 4px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 17px;
    }
  }
  .list::-webkit-scrollbar {
    width: 0;
  }
}


.track-wrap ::v-deep .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.track-wrap ::v-deep .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.track-wrap ::v-deep .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.track-wrap .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.track-wrap .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.track-wrap .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.track-wrap .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}
</style>
