<template>
  <div class="pelletizing">
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

      <div class="bar-one" ref="barChart1"></div>

      <div class="broken-line" ref="brokenLine"></div>

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
          <el-form :inline="true" class="demo-form-inline">
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
import {
  brokenLine,
  pieChart,
  barChart,
  barChart1,
  newBarChart,
} from "./charts";
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
      console.log(this.$refs.pieChart);
      brokenLine(this.$refs.brokenLine);
      barChart1(this.$refs.barChart1);
      barChart(this.$refs.barChart);
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
.pelletizing >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.pelletizing >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.pelletizing >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.pelletizing .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.pelletizing .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.pelletizing .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.pelletizing .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.pelletizing .main {
  width: 370px;
  height: 100%;
  float: right;
}

.pelletizing .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 10px;
}

.pelletizing .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.pelletizing .title-text {
  margin-top: 22px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.pelletizing .btn-enter {
  float: right;
  margin-top: 24px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.pelletizing .main .title {
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

.pelletizing .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.pelletizing .main .title img {
  float: right;
  margin-top: 10px;
}

.pelletizing .bar-chart {
  width: 350px;
  height: 180px;
  overflow: hidden;
  position: relative;
}

.pelletizing .sign-title {
  position: absolute;
  left: 10px;
  top: 5px;
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

.pelletizing .bar-chart .new-Bar-Chart {
  width: 350px;
  height: 100%;
  overflow: auto;
}

.pelletizing .bar-chart .new-Bar-Chart::-webkit-scrollbar {
  width: 0;
}

.pelletizing .broken-line {
  width: 350px;
  height: 180px;
  background-color: #000;
}

.pelletizing .bar-one {
  width: 350px;
  height: 180px;
  background-color: #000;
}

.pelletizing .Pie-chart-box {
  width: 350px;
  height: 120px;
  background-color: #000;
}

.pelletizing .Pie-chart-box .Pie-chart {
  float: left;
  width: 50%;
  height: 120px;
  background-color: #000;
}

.pelletizing .Pie-chart-box .Pie-legend {
  float: left;
  width: 40%;
  height: 100%;
  background-color: #000;
  color: #fff;
}



.pelletizing .Pie-chart-box .Pie-legend ul {
  overflow: hidden;
  margin-top: 20px;
}

.pelletizing .Pie-chart-box .Pie-legend ul li {
  overflow: hidden;
  width: 100px;
  margin-bottom: 10px;
}
.pelletizing .Pie-chart-box .Pie-legend .legend {
  float: left;
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(17, 135, 255, 1);
  margin-top: 3px;
  margin-right: 10px;
}

.pelletizing .Pie-chart-box .Pie-legend .name {
  float: left;
  font-size: 12px;
}

.pelletizing .Pie-chart-box .Pie-legend .num {
  float: right;
  font-size: 12px;
}

.pelletizing .main .product-data {
  width: 350px;
}

.pelletizing .main .product-data .product-data-top {
  width: 100%;
}

.pelletizing >>> .help-input{
  width: 0 ;
  height: 0;
  border:0;

}

.pelletizing >>> .input-select {
  margin-top: 10px;
  margin-bottom: 10px !important;
}

.pelletizing >>> .el-input--suffix .el-input__inner {
  width: 280px;
  height: 33px;
  border: 1px solid #1a61d9;
  background-color: rgba(0, 0, 0, 0);
}

.pelletizing >>> .el-form-item__label {
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.pelletizing >>> .el-select .el-input__inner {
  color: #fff;
}

.pelletizing >>> .el-select-dropdown {
  background-color: rgb(0, 0, 0);
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
  border: 1px solid #1a61d9;
}

.pelletizing >>> .el-popper .popper__arrow::after {
  content: " ";
  border-width: 0 !important;
}

.pelletizing >>> .el-popper .popper__arrow {
  border-width: 0 !important;
}

.pelletizing >>> .el-select .el-input .el-select__caret {
  color: #1a61d9;
}
.pelletizing >>> .el-select-dropdown__item {
  color: #fff;
}

.pelletizing >>> .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #fff;
  background-color: #1a61d9;
}

.pelletizing >>> .el-select-dropdown__item.selected {
  color: #fff;
}

.pelletizing .product-data .product-data-content {
  width: 350px;
  height: 180px;
}
</style>