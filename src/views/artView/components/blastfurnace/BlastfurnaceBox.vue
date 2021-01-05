<template>
  <div class="blastfurnace">
    <div class="main">
      <!-- 顶部 -->
      <div class="main-top">
        <div class="title-logo"></div>
        <div class="title-text">{{ info.name }}</div>
      </div>

      <div class="title">
        <span>产量信息</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="pop-charts">
        <div class="text">
          <span>铁水产量：&nbsp;&nbsp;</span><span>1233T</span>
        </div>
        <div class="btn1">铁水质量</div>
        <div class="btn2" @click="dialogVisible = true">铁渣质量</div>
        <div class="ladder-bar-chart" ref="ladderBarChart"></div>

        <el-dialog :visible.sync="dialogVisible" width="100%" :modal="false">
          <div class="radar-chart" ref="radarChart"></div>
        </el-dialog>
      </div>

      <div class="title">
        <span>原料库存</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="Pie-chart-box" ref="pieChart"></div>

      <div class="title">
        <span>受料/消耗情况</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="bar-chart">
        <div class="sign-title">原料材质</div>
        <div class="new-Bar-Chart" ref="newBarChart"></div>
      </div>

      <div class="title">
        <span>产品数据库</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="product-data">
        <div class="product-data-top">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <input class="help-input" type="text">
            <el-form-item class="input-select" label="产品矿">
               <el-select
                :popper-append-to-body="false"
                v-model="selectValue"
                @change="changeSelect"
                filterable
                 clearable
                placeholder="路径选择"
              >
                <el-option
                  v-for="item in selectArr"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="product-data-content" ref="barChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { pieChart, barChart, ladderBarChart, radarChart,newBarChart} from "./charts";
import {
  storageMaterielStock,
  feedAndReceiving,
  comboBox,
  storageProduct,
} from "../../../../api/home";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        region: "",
      },

      dialogVisible: true,

       selectArr: [],
      selectValue: "",

    };
  },

  methods: {

     changeSelect(){
      storageProduct({
          materialCode: this.selectValue,
          operationAreaCode: this.info.code,
        }).then((res) => {
          console.log(res);
          barChart(this.$refs.barChart,res.data.data);
        });
    },



  },

  mounted() {
    this.$nextTick(() => {
      ladderBarChart(this.$refs.ladderBarChart);
      radarChart(this.$refs.radarChart);
    });

   

    let code = this.info.code;

    storageMaterielStock({
      operationAreaCode: code,
    }).then((res) => {
      console.log(res);
      pieChart(this.$refs.pieChart, res.data.data);
    });

    feedAndReceiving({
      operationAreaCode: code,
    }).then((res) => {
      console.log(res);
      newBarChart(this.$refs.newBarChart, res.data.data);
      //  pieChart(this.$refs.pieChart,res.data.data);
    });

    comboBox().then((res) => {
      console.log(res);
      newBarChart(this.$refs.newBarChart, res.data.data);
      //  pieChart(this.$refs.pieChart,res.data.data);
      console.log(res.data.data);
      this.selectArr = res.data.data;
      if (res.data.data.length > 0) {
        this.selectValue = res.data.data[0].value;
        storageProduct({
          materialCode: this.selectValue,
          operationAreaCode: code,
        }).then((res) => {
          console.log(res);
          barChart(this.$refs.barChart,res.data.data);
        });
      }
    });

  },
};
</script>

<style  scoped>
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
  position: relative;
}




.blastfurnace .sign-title {
  position: absolute;
  top:5px;
  left: 5px;
  z-index: 1000;
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


.blastfurnace .bar-chart .new-Bar-Chart{
  width: 350px;
  height: 180px;
  overflow: auto;
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

.blastfurnace >>> .help-input{
  width: 0 ;
  height: 0;
  border:0;

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
  margin-top: 20px;
}

.blastfurnace >>> .el-dialog__header {
  padding: 0 !important;
}

.blastfurnace >>> .el-dialog__body {
  padding: 0;
  padding-top: 10px;
}
</style>