<template>
  <div class="wharf">
    <div class="main">
      <!-- 顶部 -->
      <div class="main-top">
        <div class="title-logo"></div>
        <div class="title-text">{{ info.objs.name }}</div>
        <!-- <el-button class="btn-enter" type="primary">进入</el-button> -->
      </div>

      <div class="title">
        <span>码头进料</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <!-- 柱状图 -->
      <div class="bar-chart">
        <ul class="list1">
          <li
            v-for="item in wharfPlaceFeedVOList"
            class="item clearfix"
            :key="item.placeName"
          >
            <div class="name">
              <p>{{ item.placeName }}</p>
            </div>
            <ul v-for="(item2, index) in item.data" class="list2" :key="index">
              <li :class="item.data.length - 1 == index ? 'qq' : ''">
                <div :style="{ width: item2.value / proportion + 'px' }"></div>
                <span>{{ item2.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="x-num">
          <span
            :style="{
              position: 'absolute',
              top: 0,
              left: 65 + index * 50 + 'px',
            }"
            v-for="(item, index) in x"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>

      <div class="title">
        <span>检化验情况</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <!-- 搜索表单 -->

      <el-form
        label-width="68px"
        label-position="left"
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item label="物料名称:">
          <el-select
            ref="ss"
            v-model="form.materielCode"
            :popper-append-to-body="false"
            filterable
            clearable
            placeholder="请选择"
            @change="formChange"
          >
            <el-option
              v-for="(item, index) in selectObjs"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车皮船号">
          <el-input
            v-model="form.transportCode"
            @change="formChange"
          ></el-input>
        </el-form-item>

        <el-form-item label="报告编号:">
          <el-input v-model="form.erpCode" @change="formChange"></el-input>
        </el-form-item>

        <el-form-item label="到达时间:">
          <el-date-picker
            v-model="form.arriveTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="formChange"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <div
        class="table"
        v-for="(item, index) in wharfAnalysis.records"
        :key="index"
      >
        <table>
          <tr>
            <td colspan="3">报告编号</td>
            <td colspan="3">{{ item.analysisHead[0].analysisCode }}</td>
            <td colspan="3">物料名称</td>
            <td colspan="3">{{ item.analysisHead[0].materielName }}</td>
          </tr>
          <tr>
            <td colspan="3">物料批号</td>
            <td colspan="3">{{ item.analysisHead[0].batchCode }}</td>
            <td colspan="3">运输量</td>
            <td colspan="3">{{ item.analysisHead[0].total }}</td>
          </tr>
          <tr>
            <td colspan="3">ERP计划号</td>
            <td colspan="3">{{ item.analysisHead[0].erpCode }}</td>
            <td colspan="3">船号</td>
            <td colspan="3">{{ item.analysisHead[0].transportCode }}</td>
          </tr>
          <tr>
            <td colspan="6">到达时间</td>
            <td colspan="6">{{ item.analysisHead[0].arriveTime }}</td>
          </tr>
        </table>

        <div class="table-list-box">
          <table>
            <tr v-for="(item1, index1) in item.data" :key="index1">
              <td v-for="(item2, index2) in item1" :key="index2">
                {{ item2 }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination-box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="wharfAnalysis.total"
          :page-size="1"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { matou, matouJian, comboBox } from "../../../../api/home";
// import { barChart } from "./charts";
export default {
  props: ["info"],
  data() {
    return {
      wharfPlaceFeedVOList: [],
      x: [],
      proportion: 25,

      wharfAnalysis: {},
      currentPage: 1,
      selectObjs: {},
      form: {
        arriveTime:null,
        erpCode: "",
        materielCode: "",
        transportCode: "",
      },
    };
  },

  methods: {
    //数据初始渲染
    requestData(code) {
      matou({ wharf: code }).then((res) => {
        console.log(res);
        this.x = res.data.data.x;
        this.proportion = res.data.data.x[1] / 50;
        this.wharfPlaceFeedVOList = res.data.data.wharfPlaceFeedVOList;
        // barChart(this.$refs.barChart, res.data.data);
      });

      comboBox({ operationAreaCode: code }).then((res) => {
        console.log(res);
        this.selectObjs = res.data.data;
      });
      matouJian({
        currentPage: 1,
        erpCode: "",
        materielCode: "",
        pageSize: 1,
        areaCode: code,
        transportCode: "",
        arriveEndTime:"",
        arriveStartTime:""
      }).then((res) => {
        console.log(res);
        this.wharfAnalysis = res.data.data;
      });
    },

    //表单查询
    formChange() {
      let WharfAnalysisDTO = {
        currentPage: 1,
        pageSize: 1,
        areaCode: this.info.objs.code,
      };
      WharfAnalysisDTO.erpCode = this.form.erpCode;
      WharfAnalysisDTO.materielCode = this.form.materielCode;
      WharfAnalysisDTO.transportCode = this.form.transportCode;
      if (this.form.arriveTime) {
        WharfAnalysisDTO.arriveStartTime = this.form.arriveTime[0].getTime();
        WharfAnalysisDTO.arriveEndTime = this.form.arriveTime[1].getTime();
      } else {
        WharfAnalysisDTO.arriveStartTime = "";
        WharfAnalysisDTO.arriveEndTime = "";
      }

      console.log(WharfAnalysisDTO);
      matouJian(WharfAnalysisDTO).then((res) => {
        this.wharfAnalysis = res.data.data;
      });
    },

    //分页器切换
    handleCurrentChange(e) {
      let WharfAnalysisDTO = {
        currentPage: e,
        pageSize: 1,
        areaCode: this.info.objs.code,
      };
      WharfAnalysisDTO.erpCode = this.form.erpCode;
      WharfAnalysisDTO.materielCode = this.form.materielCode;
      WharfAnalysisDTO.transportCode = this.form.transportCode;
      if (this.form.arriveTime) {
        WharfAnalysisDTO.arriveStartTime = this.form.arriveTime[0].getTime();
        WharfAnalysisDTO.arriveEndTime = this.form.arriveTime[1].getTime();
      } else {
        WharfAnalysisDTO.arriveStartTime = "";
        WharfAnalysisDTO.arriveEndTime = "";
      }
      console.log(WharfAnalysisDTO);
      matouJian(WharfAnalysisDTO).then((res) => {
        console.log(res);
        this.wharfAnalysis = res.data.data;
      });
    },
  },

  mounted() {
    let code = this.info.objs.code;
    this.requestData(code);
  },

  watch: {
    "info.objs": {
      handler(newValue, oldValue) {
        console.log("arr2变了", newValue, oldValue);
        let code = newValue.code;
        this.requestData(code);
        this.currentPage = 1;
      },
      deep: true,
    },
  },
};
</script>

<style  scoped>
.wharf .main {
  width: 370px;
  height: 100%;
  float: right;
}

.wharf .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.wharf .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.wharf .title-text {
  margin-top: 22px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.wharf .btn-enter {
  float: right;
  margin-top: 24px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.wharf .main .title {
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

.wharf .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf .main .title img {
  float: right;
  margin-top: 10px;
}

.wharf .bar-chart {
  width: 350px;
  overflow: hidden;
  margin: 10px 0;
}

.wharf .bar-chart .item {
  position: relative;
  margin-top: 20px;
}

.clearfix::after{
  content: ".";
 
  line-height: 0;
  height: 0;
  font-size: 0;
 
  display: block;
  clear: both;
}

.wharf .bar-chart .item .name {
  width: 60px;
  font-size: 12px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  text-align: center;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf .bar-chart .item .list2 li {
  width: 285px;
  height: 10px;
  margin-bottom: 5px;
}

.wharf .bar-chart .item .list2 li div {
  float: left;
  width: 100px;
  height: 100%;
  background-color: rgba(17, 135, 255, 1);
}

.wharf .bar-chart .item .list2 li span {
  float: right;
  color: #fff;
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf .bar-chart .item .list2 {
  float: left;
  border-left: 1px solid #ffffff;
  margin-left: 60px;
  padding-left: 5px;
}

.wharf .bar-chart .x-num {
  width: 350px;
  height: 30px;
  position: relative;
}

.wharf .bar-chart .x-num span {
  margin-top: 5px;
  color: #fff;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf .main .el-form-item {
  margin-bottom: 5px;
}

.wharf >>> .main .el-input__inner {
  width: 96px;
  height: 28px;
  border-radius: 2px;
  border: 1px solid #1183f8;
  background: #000;
  color: #fff;
}

.wharf >>> .el-form-item__label {
  width: 69px !important;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  padding: 0 !important;
}

.wharf >>> .el-range-editor.el-input__inner {
  width: 280px;
  height: 30px;
  padding: 0 10px;
}
.wharf >>> .el-range-editor .el-range-input {
  background-color: #000;
  color: #ccc !important;
  margin: 10px;
}

.wharf >>> .el-date-editor .el-range-separator {
  color: #fff;
  padding: 0;
  line-height: 28px;
}

.wharf >>> .el-date-editor .el-range__icon {
  line-height: 30px;
}

.wharf >>> .el-date-editor .el-range__close-icon {
  line-height: 30px;
}

.wharf >>> .el-input--suffix .el-input__inner {
  color: #fff;
  width: 280px;
  height: 30px;
  border: 1px solid #1a61d9;
  background-color: rgba(0, 0, 0, 0);
}

.wharf >>> .el-select-dropdown {
  background-color: rgb(0, 0, 0);
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
  border: 1px solid #1a61d9;
}

.wharf >>> .el-popper .popper__arrow::after {
  content: " ";
  border-width: 0 !important;
}

.wharf >>> .el-popper .popper__arrow {
  border-width: 0 !important;
}

.wharf >>> .el-select .el-input .el-select__caret {
  color: #1a61d9;
}
.wharf >>> .el-select-dropdown__item {
  color: #fff;
}

.wharf >>> .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #fff;
  background-color: #1a61d9;
}

.wharf >>> .el-select-dropdown__item.selected {
  color: #fff;
}

.wharf .main table {
  overflow: hidden;
  margin-top: 10px;
  table-layout: fixed;
  width: 350px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

/* .wharf .main table tr {
  
} */

.wharf .table {
  margin-bottom: 20px;
}

.wharf .main table td {
  padding: 5px 0;
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.wharf .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf .table-list-box {
  width: 350px;
  height: 220px !important;
  overflow: auto;
}

/* .wharf .table-list-box table{
  margin-top:0 !important;
} */

.wharf .table-list-box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.wharf .table-list-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  background: #1183f8;
}

.wharf .table-list-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  border-radius: 10px;

  background: #ededed;
}

.wharf .pagination-box {
  width: 350px;
  height: 20px;
  overflow: hidden;
  position: relative;
  margin: 20px 0 20px 0;
}
.wharf >>> .el-pagination {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.wharf >>> .el-pagination.is-background .el-pager li {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf >>> .el-pagination.is-background .btn-prev {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #1187ff;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf >>> .el-pagination.is-background .btn-next {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.qq {
  margin-bottom: 0 !important;
}
</style>