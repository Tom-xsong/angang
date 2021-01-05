<template>
  <div class="analysis">
    <div class="main">
      <div class="main-top">
        <div class="title-logo"></div>
        <div class="title-text">检化验</div>
      </div>

      <div class="title">
        <span>检化验成分</span>
        <img src="../../../../assets/title-bg.png" />
      </div>
      <el-form
        label-width="68px"
        label-position="left"
        :inline="true"
        class="demo-form-inline"
      >

        <input class="help-input" type="text">
        <el-form-item label="物料名称:">
          <el-select
            v-model="form.materielCode"
            :popper-append-to-body="false"
            filterable
            clearable
            placeholder="请选择"
            @change="formChange"
          >
            <el-option
              v-for="(item, index) in selectOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="到达时间:">
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
      </el-form>

    

      <div class="table" v-for="(item, index) in data" :key="index">
        <table>
          <tr>
            <td colspan="3">报告编号</td>
            <td colspan="3">{{ item.analysisHead[0].code }}</td>
            <td colspan="3">物料名称</td>
            <td colspan="3">{{ item.analysisHead[0].materielName }}</td>
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
          :total="total"
          :page-size="1"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { comboBox, analysisButton } from "../../../../api/home";
export default {
  props: ["info"],
  data() {
    return {
      selectOptions: [],
      selectValue: "",
      currentPage: 1,
      data: [],
      total: 1,
      form: {
        samplingTime:null,
        materielCode:"",
      },
    };
  },

  methods: {
    //下拉框聚焦处理

    //页面初始化
    requestData(code) {
      comboBox().then((res) => {
        console.log(res);
        this.selectOptions = res.data.data;
      });

      let analysisButtonDTO = {
        currentPage: 1,
        materielCode: "",
        pageSize: 1,
        samplingEndTime: "",
        samplingPlaceCode: code,
        samplingStartTime: "",
      };

      analysisButton(analysisButtonDTO).then((res) => {
        console.log(res);
        this.total = res.data.data.total;
        this.data = res.data.data.records;
      });
    },

    //表单查询
    formChange() {
      let analysisButtonDTO = {
        currentPage: 1,
        pageSize: 1,
        samplingPlaceCode: this.info.code,
      };
      analysisButtonDTO.materielCode = this.form.materielCode;
      if (this.form.samplingTime){
        analysisButtonDTO.samplingStartTime = this.form.samplingTime[0].getTime();
        analysisButtonDTO.samplingEndTime = this.form.samplingTime[1].getTime();
      } else {
        analysisButtonDTO.samplingStartTime = "";
        analysisButtonDTO.samplingEndTime = "";
      }
      console.log(analysisButtonDTO);
      analysisButton(analysisButtonDTO).then((res) => {
        console.log(res);
        this.total = res.data.data.total;
        this.data = res.data.data.records;
      });
    },

    //分页器切换
    handleCurrentChange(e) {
      let analysisButtonDTO = {
        currentPage: e,
        pageSize: 1,
        samplingPlaceCode: this.info.code,
      };
      analysisButtonDTO.materielCode = this.form.materielCode;
     
      if (this.form.samplingTime) {
        analysisButtonDTO.samplingStartTime = this.form.samplingTime[0].getTime();
        analysisButtonDTO.samplingEndTime = this.form.samplingTime[1].getTime();
      } else {
        analysisButtonDTO.samplingStartTime = "";
        analysisButtonDTO.samplingEndTime = "";
      }
      analysisButton(analysisButtonDTO).then((res) => {
        console.log(res);
        this.total = res.data.data.total;
        this.data = res.data.data.records;
      });
    },
  },

  mounted() {
    let code = this.info.code;
    console.log(code);
    this.requestData(code);
  },

  watch: {
    "info.code": {
      handler(newValue, oldValue) {
        console.log("arr2变了", newValue, oldValue);

        this.selectOptions = [];
        this.selectValue = "";
        this.currentPage = 1;
        this.data = [];
        this.total = 1;
        this.form = {
          samplingTime: [],
          materielCode: "",
        };

        let code = newValue;
        this.requestData(code);
        this.currentPage = 1;
      },
      deep: true,
    },
  },
};
</script>

<style  scoped>
.analysis .main {
  width: 370px;
  height: 100%;
  float: right;
}

.analysis .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.analysis .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.analysis .title-text {
  margin-top: 22px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.analysis .btn-enter {
  float: right;
  margin-top: 24px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.analysis .main .title {
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

.analysis .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.analysis .main .title img {
  float: right;
  margin-top: 10px;
}

.analysis .procss-detail {
  width: 350px;
  overflow: hidden;
}

.analysis .procss-detail li {
  overflow: hidden;
  position: relative;
  padding: 10px 0 10px 20px;
}

.analysis .procss-detail li span {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #fff;
}

.analysis .procss-detail li .value {
  position: absolute;
  left: 120px;
  top: 11px;
}



.analysis >>> .help-input{
  width: 0 ;
  height: 0;
  border:0;

}

.analysis .main .el-form-item {
  margin-bottom: 5px;
}

.analysis >>> .main .el-input__inner {
  width: 96px;
  height: 28px;
  border-radius: 2px;
  border: 1px solid #1183f8;
  background: #000;
  color: #fff;
}

.analysis >>> .el-form-item__label {
  width: 69px !important;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  padding: 0 !important;
}

.analysis >>> .el-range-editor.el-input__inner {
  width: 280px;
  height: 30px;
  padding: 0 10px;
}
.analysis >>> .el-range-editor .el-range-input {
  background-color: #000;
  color: #ccc !important;
  margin: 10px;
}

.analysis >>> .el-date-editor .el-range-separator {
  color: #fff;
  padding: 0;
  line-height: 28px;
}

.analysis >>> .el-date-editor .el-range__icon {
  line-height: 30px;
}

.analysis >>> .el-date-editor .el-range__close-icon {
  line-height: 30px;
}

.analysis >>> .el-input--suffix .el-input__inner {
  color: #fff;
  width: 280px;
  height: 30px;
  border: 1px solid #1a61d9;
  background-color: rgba(0, 0, 0, 0);
}

.analysis >>> .el-select-dropdown {
  background-color: rgb(0, 0, 0);
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
  border: 1px solid #1a61d9;
}

.analysis >>> .el-popper .popper__arrow::after {
  content: " ";
  border-width: 0 !important;
}

.analysis >>> .el-popper .popper__arrow {
  border-width: 0 !important;
}

.analysis >>> .el-select .el-input .el-select__caret {
  color: #1a61d9;
}
.analysis >>> .el-select-dropdown__item {
  color: #fff;
}

.analysis >>> .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #fff;
  background-color: #1a61d9;
}

.analysis >>> .el-select-dropdown__item.selected {
  color: #fff;
}

.analysis .main table {
  overflow: hidden;
  margin-top: 10px;
  table-layout: fixed;
  width: 350px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

/* .analysis .main table tr {
  
} */

.analysis .table {
  margin-bottom: 20px;
}

.analysis .main table td {
  padding: 5px 0;
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.analysis .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.analysis .table-list-box {
  width: 350px;
  height: 220px !important;
  overflow: auto;
}

/* .analysis .table-list-box table{
  margin-top:0 !important;
} */

.analysis .table-list-box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.analysis .table-list-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  background: #1183f8;
}

.analysis .table-list-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  border-radius: 10px;

  background: #ededed;
}

.analysis .pagination-box {
  width: 350px;
  height: 20px;
  overflow: hidden;
  position: relative;
  margin: 20px 0 20px 0;
}
.analysis >>> .el-pagination {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.analysis >>> .el-pagination.is-background .el-pager li {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.analysis >>> .el-pagination.is-background .btn-prev {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.analysis >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #1187ff;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.analysis >>> .el-pagination.is-background .btn-next {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}
</style>