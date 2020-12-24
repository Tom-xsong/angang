<template>
  <div class="blastfurnace">
    <div class="btn-open" @click="info.isShow = true">
      <p>展开</p>
    </div>
    <el-drawer :visible.sync="info.isShow" :with-header="false" :modal="false">
      <div class="main">
        <!-- 顶部 -->
        <div class="main-top">
          <div class="title-logo"></div>
          <div class="title-text">{{info.name}}</div>
        </div>

        <div class="title">
          <span>焦化产量信息</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <div class="pop-charts">
          <div class="text">
            <span>铁水产量：&nbsp;&nbsp;</span><span>1233T</span>
          </div>
          <div class="btn1">铁水质量</div>
          <div class="btn2" @click="dialogVisible=true">铁渣质量</div>
          <div class="ladder-bar-chart" ref="ladderBarChart"></div>

          <el-dialog :visible.sync="dialogVisible" width="100%" :modal="false">
            <div class="radar-chart" ref="radarChart"></div>
          </el-dialog>
        </div>

        <div class="title">
          <span>原料库存</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <div class="Pie-chart-box">
          <div class="Pie-chart" ref="pieChart"></div>
          <div class="Pie-legend">
            <ul>
              <li>
                <span class="legend"></span><span class="name">肥煤</span
                ><span class="num">314T</span>
              </li>
              <li>
                <span class="legend" style="background: #0bcdff"></span
                ><span class="name">肥煤</span><span class="num">314T</span>
              </li>
              <li>
                <span class="legend" style="background: #00ff84"></span
                ><span class="name">肥煤</span><span class="num">314T</span>
              </li>
              <li>
                <span class="legend" style="background: #ff862c"></span
                ><span class="name">肥煤</span><span class="num">314T</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="title">
          <span>1#烧结机受料/消耗情况</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <div class="bar-chart">
          <div class="sign">
            <div class="sign-title">原料材质</div>
            <div class="shou-text">受料</div>
            <div class="shou"></div>
            <div class="gong-text">供料</div>
            <div class="gong"></div>
          </div>

          <ul class="list1">
            <li v-for="(item, index) in arr2" class="item" :key="index">
              <div class="box">
                <div
                  class="item-gong"
                  :style="{ width: item.gong / 100 + 'px' }"
                ></div>
                <div
                  class="item-shou"
                  :style="{ width: item.shou / 100 + 'px' }"
                ></div>
              </div>
              <span class="item-text">{{ item.name }}</span>
            </li>
          </ul>
          <div class="x-num">
            <span style="position: absolute; top: 0; left: 0">0</span>
            <span style="position: absolute; top: 0; left: 50px">5000</span>
            <span style="position: absolute; top: 0; left: 100px">10000</span>
            <span style="position: absolute; top: 0; left: 150px">15000</span>
            <span style="position: absolute; top: 0; left: 200px">20000</span>
          </div>
        </div>

        <div class="title">
          <span>产品数据库</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <div class="product-data">
          <div class="product-data-top">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item class="input-select" label="产品矿">
                <el-select
                  :popper-append-to-body="false"
                  v-model="form.region"
                  placeholder="路径选择"
                >
                  <el-option label="混匀矿" value="shanghai"></el-option>
                  <el-option label="巴西矿" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <div class="product-data-content" ref="barChart"></div>
        </div>
      </div>

      <div class="btn-close" @click="info.isShow = false">
        <p>收起</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { pieChart, barChart, ladderBarChart,radarChart } from "./charts";
// import { stripProportion} from "../../../../api/home";
export default {
  props:["info"],
  data() {
    return {
      form: {
        region: "",
      },


      dialogVisible:true,

      drawer: false,

      arr: [1],

      arr2: [
        {
          name: "巴西矿",
          gong: 5000,
          shou: 8000,
        },

        {
          name: "石灰石",
          gong: 4000,
          shou: 10000,
        },

        {
          name: "铁矿",
          gong: 10000,
          shou: 8000,
        },
        {
          name: "铁矿",
          gong: 10000,
          shou: 8000,
        },
        {
          name: "石灰石",
          gong: 4000,
          shou: 10000,
        },

        {
          name: "铁矿",
          gong: 10000,
          shou: 8000,
        },
        {
          name: "铁矿",
          gong: 10000,
          shou: 8000,
        },
      ],
    };
  },

  methods: {},

  mounted() {
    this.$nextTick(() => {
      pieChart(this.$refs.pieChart);
      ladderBarChart(this.$refs.ladderBarChart);
      barChart(this.$refs.barChart);
      radarChart(this.$refs.radarChart);
      
    });

    // stripProportion({
    //   materialName: "1",
    //   operationAreaCode: "SIN1",
    // }).then((res) => {
    //   console.log(res);
    // });

    // storageMaterielStock({
    //  storageCode:"1"
    // }).then((res) => {
    //   console.log(res);
    // });
  },
};
</script>

<style  scoped>
.blastfurnace >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
  z-index: 1  ! important;
}

.blastfurnace >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
 
}

.blastfurnace >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.blastfurnace .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.blastfurnace .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.blastfurnace .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.blastfurnace .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.blastfurnace .main {
  width: 370px;
  height: 100%;
  float: right;
}

.blastfurnace .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 10px;
}

.blastfurnace .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.blastfurnace .title-text {
  margin-top: 22px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.blastfurnace .btn-enter {
  float: right;
  margin-top: 24px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.blastfurnace .main .title {
  width: 350px;
  height: 30px;
  padding-left: 16px;
  background: linear-gradient(
    270deg,
    rgba(17, 135, 255, 0) 0%,
    rgba(8, 88, 168, 0.5) 100%
  );
  border: 1px solid;
  border-image: linear-gradient(
      270deg,
      rgba(17, 135, 255, 0),
      rgba(17, 135, 255, 1)
    )
    1 1;
  overflow: hidden;
}

.blastfurnace .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.blastfurnace .main .title img {
  float: right;
  margin-top: 10px;
}

.blastfurnace .bar-chart {
  width: 350px;
  overflow: hidden;
  margin: 10px 0;
}

.blastfurnace .sign {
  width: 350px;
  overflow: hidden;
}

.blastfurnace .sign div {
  float: right;
}

.blastfurnace .sign .sign-title {
  float: left;
  width: 72px;
  height: 24px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 24px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid rgba(17, 135, 255, 0.5);
}

.blastfurnace .sign .gong {
  width: 10px;
  height: 10px;
  background: #0f7ae9;
  margin-top: 5px;
}

.blastfurnace .sign .gong-text {
  height: 10px;
  line-height: 10px;
  color: #fff;
  font-size: 10px;
  margin-right: 20px;
  margin-top: 5px;
}

.blastfurnace .sign .shou {
  width: 10px;
  height: 10px;
  background: #0bcdff;
  margin-top: 5px;
}

.blastfurnace .sign .shou-text {
  height: 10px;
  line-height: 10px;
  color: #fff;
  font-size: 10px;
  margin-right: 20px;
  margin-top: 5px;
}

.blastfurnace .bar-chart .list1 {
  width: 350px;
  height: 80px;
  overflow: auto;
  margin-top: 20px;
}

.blastfurnace .bar-chart .list1::-webkit-scrollbar {
  width: 0;
}

.blastfurnace .bar-chart .item {
  width: 350px;
  height: 10px;
  margin-top: 10px;
}

.blastfurnace .bar-chart .item .box {
  float: left;
  width: 300px;
  height: 100%;
  overflow: hidden;
}

.blastfurnace .bar-chart .item .box .item-gong {
  float: left;
  width: 100px;
  height: 100%;
  background: #0f7ae9;
}

.blastfurnace .bar-chart .item .box .item-shou {
  float: left;
  width: 100px;
  height: 100%;

  background: #0bcdff;
}

.blastfurnace .bar-chart .item .item-text {
  float: right;
  color: #fff;
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.blastfurnace .bar-chart .x-num {
  width: 350px;
  height: 30px;
  position: relative;
}

.blastfurnace .bar-chart .x-num span {
  margin-top: 5px;
  color: #fff;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.blastfurnace .pop-charts {
  width: 350px;
  height: 250px;
  position: relative;
  overflow: hidden;
}

.blastfurnace .pop-charts .ladder-bar-chart {
  width: 350px;
  height: 250px;
}

.blastfurnace .pop-charts .text {
  position: absolute;
  left: 5px;
  top: 10px;
  font-size: 12px;
  color: #ccc;
  font-family: PingFangSC-Regular, PingFang SC;
}

.blastfurnace .pop-charts .btn1 {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 75px;
  z-index: 99;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  color: #ccc;
  width: 64px;
  height: 24px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid rgba(17, 135, 255, 0.5);
}

.blastfurnace .pop-charts .btn2 {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 99;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  color: #ccc;
  width: 64px;
  height: 24px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid rgba(17, 135, 255, 0.5);
}

.blastfurnace .Pie-chart-box {
  width: 350px;
  height: 200px;
  background-color: #000;
}

.blastfurnace .Pie-chart-box .Pie-chart {
  float: left;
  width: 50%;
  height: 100%;
  background-color: #000;
}

.blastfurnace .Pie-chart-box .Pie-legend {
  float: left;
  width: 40%;
  height: 100%;
  background-color: #000;
  color: #fff;
  position: relative;
}

.blastfurnace .Pie-chart-box .Pie-legend ul {
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}

.blastfurnace .Pie-chart-box .Pie-legend ul li {
  overflow: hidden;
  width: 100px;
  margin-bottom: 10px;
}
.blastfurnace .Pie-chart-box .Pie-legend .legend {
  float: left;
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(17, 135, 255, 1);
  margin-top: 3px;
  margin-right: 10px;
}

.blastfurnace .Pie-chart-box .Pie-legend .name {
  float: left;
  font-size: 12px;
}

.blastfurnace .Pie-chart-box .Pie-legend .num {
  float: right;
  font-size: 12px;
}

.blastfurnace .main .product-data {
  width: 350px;
}

.blastfurnace .main .product-data .product-data-top {
  width: 100%;
}

.blastfurnace >>> .input-select {
  margin-top: 10px;
  margin-bottom: 10px !important;
}

.blastfurnace >>> .el-input--suffix .el-input__inner {
  width: 280px;
  height: 33px;
  border: 1px solid #1a61d9;
  background-color: rgba(0, 0, 0, 0);
}

.blastfurnace >>> .el-form-item__label {
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.blastfurnace >>> .el-select .el-input__inner {
  color: #fff;
}

.blastfurnace >>> .el-select-dropdown {
  background-color: rgb(0, 0, 0);
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
  border: 1px solid #1a61d9;
}

.blastfurnace >>> .el-popper .popper__arrow::after {
  content: " ";
  border-width: 0 !important;
}

.blastfurnace >>> .el-popper .popper__arrow {
  border-width: 0 !important;
}

.blastfurnace >>> .el-select .el-input .el-select__caret {
  color: #1a61d9;
}
.blastfurnace >>> .el-select-dropdown__item {
  color: #fff;
}

.blastfurnace >>> .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #fff;
  background-color: #1a61d9;
}

.blastfurnace >>> .el-select-dropdown__item.selected {
  color: #fff;
}

.blastfurnace .product-data .product-data-content {
  width: 350px;
  height: 200px;
}

.blastfurnace >>> .el-dialog__wrapper {
  position: absolute;
  left: 0;
  top: 0;
}

.blastfurnace >>> .el-dialog {
  margin-top: 0 !important;
  width: 350px !important;
  margin: 0 !important;
  padding: 0 !important;
  background-color: rgba(0, 0, 0, 0.7);
}

.blastfurnace .radar-chart {
  width: 350px;
  height: 200px;
  margin-top:20px;
}

.blastfurnace >>> .el-dialog__header {
  padding: 0 !important;
}

.blastfurnace >>> .el-dialog__body {
  padding: 0 ;
  padding-top:10px;

}
</style>