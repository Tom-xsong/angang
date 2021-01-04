<template>
  <div class="route">
    <div class="main">
      <div class="main-top" v-if="info.objs.length == 1">
        <div class="title-logo"></div>
        <div class="title-text">
          {{ info.objs[0][0].name }} ---> {{ info.objs[0][1].name }}
        </div>
      </div>

      <div class="main-top2" v-else>
        <div class="title-logo"></div>

        <el-form :inline="true" class="demo-form-inline">
          <el-form-item class="input-select" label="">
            <el-select
              :popper-append-to-body="false"
              v-model="selectValue"
              placeholder="路径选择"
              @change="selectChange"
            >
              <el-option
                v-for="(item, index) in info.objs"
                :key="index"
                :label="item[0].name + '  --->  ' + item[1].name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 柱状图 -->
      <div class="title">
        <span>运输统计</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="bar-chart" ref="barChart"></div>

      <!-- 表单 -->
      <div class="title">
        <span>历史记录</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <table v-for="(i, index) in transportHistory.records" :key="index">
        <tr>
          <td colspan="4">起点工序</td>
          <td colspan="4">终点工序</td>
          <td colspan="4">原料料号</td>
        </tr>
        <tr>
          <td colspan="4">{{ i.startOperationAreaName }}</td>
          <td colspan="4">{{ i.endOperationAreaName }}</td>
          <td colspan="4">{{ i.materielCode }}</td>
        </tr>
        <tr>
          <td colspan="3">原料料名</td>
          <td colspan="3">皮带路径</td>
          <td colspan="3">物料重量</td>
          <td colspan="3">检化验成分</td>
        </tr>
        <tr>
          <td colspan="3">{{ i.materielName }}</td>
          <td colspan="3">{{ i.beltFlowPath }}</td>
          <td colspan="3">{{ i.trafficVolume }}</td>
          <td colspan="3" class="query">查看</td>
        </tr>
      </table>

      <!-- 分页器 -->
      <div class="pagination-box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="transportHistory.total"
          :page-size="3"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { routeHistory, route } from "../../../../api/home";
import { barChart } from "./charts";
export default {
  props: ["info"],
  data() {
    return {
      arr: [1, 2, 3, 4],

      transportHistory: {},

      transportStatistics: [],

      selectValue: [
        
      ],
      
      currentPage:1,

      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    //数据初始渲染
    requestData(start,end){
       route({
      endOperationAreaCode: end,
      startOperationAreaCode: start,
    }).then((res) => {
      barChart(this.$refs.barChart, res.data.data);
    });

    routeHistory({
      currentPage: 1,
      endOperationAreaCode: end,
      pageSize: 3,
      startOperationAreaCode: start,
    }).then((res) => {
      console.log(res);
      this.transportHistory = res.data.data || [];
    });

    },


    //下拉框切换
    selectChange() {
      this.currentPage = 1
      console.log(this.selectValue[0].code, this.selectValue[1].code);
      this.requestData(this.selectValue[0].code, this.selectValue[1].code)
    },

    //分页器切换
    handleCurrentChange(e) {
      console.log(e, this.selectValue[0].code, this.selectValue[1].code);
      routeHistory({
        currentPage: e,
        endOperationAreaCode: this.selectValue[1].code,
        pageSize: 3,
        startOperationAreaCode: this.selectValue[0].code,
      }).then((res) => {
        console.log(res);
        this.transportHistory = res.data.data
      });
    },

  },

  mounted() {
    this.selectValue = this.info.objs[0]

    let start = this.info.objs[0][0].code
    let end = this.info.objs[0][1].code

    this.requestData(start,end)

    
   
  },

  watch: {
    "info.objs": {
      handler(newValue,oldValue) {
        console.log("arr2变了",newValue,oldValue);
         let start = newValue[0][0].code
         let end = newValue[0][1].code
         this.requestData(start,end)
         this.selectValue = newValue[0],
         this.currentPage = 1
      },
      deep: true,
    },
  },
};
</script>

<style  scoped>
.route .main {
  width: 370px;
  height: 100%;
  float: right;
}

.route .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.route .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.route .title-text {
  margin-top: 26px;
  float: left;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.route .input-select {
  margin-top: 19px;
}

.route >>> .el-input--suffix .el-input__inner {
  width: 280px;
  height: 33px;
  border: 1px solid #1a61d9;
  background-color: rgba(0, 0, 0, 0);
}

.route >>> .el-form-item__label {
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route >>> .el-select .el-input__inner {
  color: #fff;
}

.route >>> .el-select-dropdown {
  background-color: rgb(0, 0, 0);
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
  border: 1px solid #1a61d9;
}

.route >>> .el-popper .popper__arrow::after {
  content: " ";
  border-width: 0 !important;
}

.route >>> .el-popper .popper__arrow {
  border-width: 0 !important;
}

.route >>> .el-select .el-input .el-select__caret {
  color: #1a61d9;
}

.route >>> .el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #1a61d9;
}
.route >>> .el-select-dropdown__item {
  color: #fff;
}

.route >>> .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #fff;
  background-color: #1a61d9;
}

.route >>> .el-select-dropdown__item.selected {
  color: #fff;
}

.route .btn-enter {
  float: right;
  margin-top: 22px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.route .main .title {
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

.route .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route .main .title img {
  float: right;
  margin-top: 10px;
}

.route .bar-chart {
  width: 350px;
  height: 200px;
}

.route .main table {
  table-layout: fixed;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 350px;
  height: 113px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

.route .main table td {
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.route .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route .pagination-box {
  width: 350px;
  height: 20px;
  overflow: hidden;
  position: relative;
  margin: 20px 0 20px 0;
}
.route >>> .el-pagination {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.route >>> .el-pagination.is-background .el-pager li {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route >>> .el-pagination.is-background .btn-prev {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #1187ff;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route >>> .el-pagination.is-background .btn-next {
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