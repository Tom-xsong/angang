<template>
  <div class="work">
    <div class="main">
      <!-- 顶部 -->
      <div class="main-top">
        <div class="title-logo"></div>
        <div class="title-text">{{ info.objs.name }}</div>
        <el-button class="btn-enter" @click="enter" type="primary"
          >进入</el-button
        >
      </div>

      <!-- 作业区情况 -->

      <div class="title">
        <span>作业区情况</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="yuanliao">
        <div class="yuanliao-top">
          <span class="title1">原料名称</span>
          <span class="title2">库存量T</span>
        </div>
        <ul class="content">
          <li v-for="item in situation.records" :key="item.code">
            <span class="name">{{ item.name }}</span>
            <span class="num">{{ item.value }}</span>
          </li>
        </ul>

        <div class="pagination-box">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange1"
            :current-page="currentPage"
            :total="situation.total"
            :page-size="3"
          ></el-pagination>
        </div>
      </div>

      <div class="title">
        <span>供/受料情况</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <!-- 柱状图 -->
      <div class="bar-chart" ref="barChart"></div>

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

        <input type="text" class="help-input">

        <el-form-item label="物料名称:">
          <el-select
            class="wl-name"
            v-model="form.materielCode"
            :popper-append-to-body="false"
            filterable
            clearable
            placeholder="请选择"
            @change="formChange"
          >
            <el-option
              v-for="(item, index) in selectWl"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告编号:">
          <el-input v-model="form.analysisCode" @change="formChange"></el-input>
        </el-form-item>

        <el-form-item label="取样时间:">
          <el-date-picker
            v-model="form.samplingTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="formChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="取样地点:">
          <el-select
            v-model="form.samplingPalceCode"
            filterable
            allow-create
            default-first-option
            clearable
            :popper-append-to-body="false"
            placeholder="请选择"
            @change="formChange"
          >
            <el-option
              v-for="(item, index) in selectPlace"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <div
        class="table"
        v-for="(item, index) in workAnalysis.records"
        :key="index"
      >
        <table>
          <tr>
            <td colspan="3">物料名称</td>
            <td colspan="3">{{ item.analysisHead[0].materielName }}</td>
            <td colspan="3">报告编号</td>
            <td colspan="3">{{ item.analysisHead[0].code }}</td>
          </tr>

          <tr>
            <td colspan="3">物料批号</td>
            <td colspan="3">{{ item.analysisHead[0].batchCode }}</td>
            <td colspan="3">取样地点</td>
            <td colspan="3">{{ item.analysisHead[0].placeName }}</td>
          </tr>

          <tr>
            <td colspan="6">取样时间</td>
            <td colspan="6">{{ item.analysisHead[0].time }}</td>
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
          :total="workAnalysis.total"
          :page-size="1"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  workArea,
  workAreaShou,
  workAreaJian,
  comboBox,
  samplingPlace,
} from "../../../../api/home";
import { barChart } from "./charts";
export default {
  props: ["info"],
  data() {
    return {
      workAnalysis: {},
      situation: {},
      currentPage: 1,
      selectWl: {},
      selectPlace: {},
      form: {
        analysisCode: "",
        materielCode: "",
        samplingPalceCode: "",
        samplingTime:null,
      },
    };
  },

  methods: {
    //页面初始化加载数据
    requestData(code) {
      workArea({
        currentPage: 1,
        operationAreaCode: code,
        pageSize: 3,
      }).then((res) => {
        console.log(res);
        this.situation = res.data.data || {};
      });

      workAreaShou({ operationAreaCode: code }).then((res) => {
        console.log(res.data.data);

        barChart(this.$refs.barChart, res.data.data);
      });

      comboBox({ operationAreaCode: code }).then((res) => {
        console.log(res);
        this.selectWl = res.data.data;
      });

      samplingPlace({ operationAreaCode: code }).then((res) => {
        console.log(res);
        this.selectPlace = res.data.data;
      });

      workAreaJian({
        analysisCode: "",
        currentPage: 1,
        materielCode: "",
        operationAreaCode: code,
        pageSize: 1,
        samplingEndtTime: "",
        samplingPalceCode: "",
        samplingStartTime: "",
      }).then((res) => {
        console.log(res);
        this.workAnalysis = res.data.data;
      });
    },

    //作业区情况分页
    handleCurrentChange1(e) {
      workArea({
        currentPage: e,
        operationAreaCode: this.info.objs.code,
        pageSize: 3,
      }).then((res) => {
        console.log(res);
        this.situation = res.data.data;
      });
    },

    //作业区检化验分页
    handleCurrentChange(e) {
      let OperationAreaAnalysisDTO = {
        currentPage: e,
        operationAreaCode: this.info.objs.code,
        pageSize: 1,
      };
      OperationAreaAnalysisDTO.analysisCode = this.form.analysisCode;
      OperationAreaAnalysisDTO.materielCode = this.form.materielCode;
      OperationAreaAnalysisDTO.samplingPalceCode = this.form.samplingPalceCode;

      if (this.form.samplingTime) {
        OperationAreaAnalysisDTO.samplingStartTime = this.form.samplingTime[0].getTime();
        OperationAreaAnalysisDTO.samplingEndtTime = this.form.samplingTime[1].getTime();
      } else {
        OperationAreaAnalysisDTO.samplingStartTime = "";
        OperationAreaAnalysisDTO.samplingEndtTime = "";
      }
      console.log(OperationAreaAnalysisDTO);

      workAreaJian(OperationAreaAnalysisDTO).then((res) => {
        console.log(res);
        this.workAnalysis = res.data.data;
      });
    },

    //表单查询
    formChange() {
      let OperationAreaAnalysisDTO = {
        currentPage: 1,
        operationAreaCode: this.info.objs.code,
        pageSize: 1,
      };
      OperationAreaAnalysisDTO.analysisCode = this.form.analysisCode;
      OperationAreaAnalysisDTO.materielCode = this.form.materielCode;
      OperationAreaAnalysisDTO.samplingPalceCode = this.form.samplingPalceCode;

      if (this.form.samplingTime) {
        OperationAreaAnalysisDTO.samplingStartTime = this.form.samplingTime[0].getTime();
        OperationAreaAnalysisDTO.samplingEndtTime = this.form.samplingTime[1].getTime();
      } else {
        OperationAreaAnalysisDTO.samplingStartTime = "";
        OperationAreaAnalysisDTO.samplingEndtTime = "";
      }

      workAreaJian(OperationAreaAnalysisDTO).then((res) => {
        console.log(res);
        this.workAnalysis = res.data.data;
      });

      console.log(OperationAreaAnalysisDTO);
    },

    //进入二级页面
    enter() {
      this.$router.push(
        "/artView/?code=" + this.info.objs.code + "&name=" + this.info.objs.name
      );
    },
  },

  mounted() {
    let code = this.info.objs.code;
    console.log(code);
    this.requestData(code);
  },

  watch: {
    "info.objs.code": {
      handler(newValue, oldValue) {
        console.log("变了" + newValue, oldValue);
        this.currentPage = 1;
        this.requestData(newValue);
      },
      deep: true,
    },
  },
};
</script>

<style  scoped>
.work .main {
  width: 370px;
  height: 100%;
  float: right;
}

.work .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.work .title-logo {
  float: left;
  margin-top: 20px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.work .title-text {
  margin-top: 15px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.work .btn-enter {
  float: right;
  margin-top: 15px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.work .main .title {
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

.work .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.work .main .title img {
  float: right;
  margin-top: 10px;
}

.work .main .yuanliao {
  width: 350px;
  overflow: hidden;
}

.work .main .yuanliao .yuanliao-top {
  width: 350px;
  overflow: hidden;
}

.work .main .yuanliao .yuanliao-top .title1 {
  float: left;
  margin: 15px 0 10px 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

.work .main .yuanliao .yuanliao-top .title2 {
  float: right;
  margin: 15px 20px 10px 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

.work .main .yuanliao .content {
  width: 350px;
  overflow: hidden;
}

.work .main .yuanliao .content li {
  width: 350px;
  height: 25px;
  background: url("../../../../assets/rectbg.png") no-repeat center;
  background-size: 100% 100%;
  margin-top: 10px;
}

.work .main .yuanliao .content li .name {
  float: left;
  margin-left: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 25px;
}

.work .main .yuanliao .content li .num {
  float: right;
  margin-right: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 25px;
}

.work .bar-chart {
  width: 350px;
  height: 200px;
}

.work >>> .help-input{
  width: 0 ;
  height: 0;
  border:0;

}

.work .main .el-form-item {
  margin-bottom: 5px;
}

.work >>> .main .el-input__inner {
  width: 96px;
  height: 28px;
  border-radius: 2px;
  border: 1px solid #1183f8;
  background: #000;
  color: #fff;
}

.work >>> .el-form-item__label {
  width: 69px !important;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  padding: 0 !important;
}

.work >>> .el-range-editor.el-input__inner {
  width: 280px;
  height: 30px;
  padding: 0 10px;
}
.work >>> .el-range-editor .el-range-input {
  background-color: #000;
  color: #ccc !important;
  margin: 10px;
}

.work >>> .el-date-editor .el-range-separator {
  color: #fff;
  padding: 0;
  line-height: 28px;
}

.work >>> .el-date-editor .el-range__icon {
  line-height: 30px;
}

.work >>> .el-date-editor .el-range__close-icon {
  line-height: 30px;
}

.work >>> .wl-name .el-input__inner {
  width: 96px !important;
}

.work >>> .el-input--suffix .el-input__inner {
  color: #fff;
  width: 280px;
  height: 30px;
  border: 1px solid #1a61d9;
  background-color: rgba(0, 0, 0, 0);
}

.work >>> .el-select-dropdown {
  background-color: rgb(0, 0, 0);
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
  border: 1px solid #1a61d9;
}

.work >>> .el-popper .popper__arrow::after {
  content: " ";
  border-width: 0 !important;
}

.work >>> .el-popper .popper__arrow {
  border-width: 0 !important;
}

.work >>> .el-select .el-input .el-select__caret {
  color: #1a61d9;
}
.work >>> .el-select-dropdown__item {
  color: #fff;
}

.work >>> .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #fff;
  background-color: #1a61d9;
}

.work >>> .el-select-dropdown__item.selected {
  color: #fff;
}

.work .main table {
  overflow: hidden;
  margin-top: 10px;
  table-layout: fixed;
  width: 350px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

/* .work .main table tr {
  height: 25px;
} */

.work .table {
  margin-bottom: 20px;
}

.work .main table td {
  padding: 5px 0;
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.work .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.work .table-list-box {
  width: 350px;
  height: 220px !important;
  overflow: auto;
}

/* .work .table-list-box table{
  margin-top:0 !important;
} */

.work .table-list-box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.work .table-list-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  background: #1183f8;
}

.work .table-list-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  border-radius: 10px;

  background: #ededed;
}

.work .pagination-box {
  width: 350px;
  height: 20px;
  overflow: hidden;
  position: relative;
  margin: 20px 0 20px 0;
}
.work >>> .el-pagination {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.work >>> .el-pagination.is-background .el-pager li {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.work >>> .el-pagination.is-background .btn-prev {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.work >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #1187ff;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.work >>> .el-pagination.is-background .btn-next {
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