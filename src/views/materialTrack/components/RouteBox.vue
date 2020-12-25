<template>
  <div class="route">
    <div class="btn-open" @click="info.isShow = true">
      <p>展开</p>
    </div>
    <el-drawer :visible.sync="info.isShow" :with-header="false" :modal="false">
      <div class="main">
        <div class="main-top" v-if="info.objs.length == 1">
          <div class="title-logo"></div>
          <div class="title-text">
            {{ info.objs[0][0].name }} ---> {{ info.objs[0][1].name }}
          </div>
          <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-button class="btn-enter" type="primary">进入</el-button>
            </el-form-item>
          </el-form> -->
        </div>

        <div class="main-top2" v-else>
          <div class="title-logo"></div>

          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item class="input-select" label="">
              <el-select
                :popper-append-to-body="false"
                v-model="selectValue"
                placeholder="路径选择"
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
          <img src="../../../assets/title-bg.png" />
        </div>

        <div class="bar-chart">
          <ul class="list1">
            <li v-for="item in arr2" class="item" :key="item.name">
              <div class="box">
                <div
                  class="item-gong"
                  :style="{ width: item.num / 100 + 'px' }"
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

        <!-- 表单 -->
        <div class="title">
          <span>检化验情况</span>
          <img src="../../../assets/title-bg.png" />
        </div>
       

        <table v-for="i in transportHistory.records" :key="i">
          <tr>
            <td colspan="4">起点工序</td>
            <td colspan="4">终点工序</td>
            <td colspan="4">原料料号</td>
          </tr>
          <tr>
            <td colspan="4">{{i.startOperationAreaName}}</td>
            <td colspan="4">{{i.endOperationAreaName}}</td>
            <td colspan="4">{{i.materielCode}}</td>
          </tr>
          <tr>
            <td colspan="3">原料料名</td>
            <td colspan="3">皮带路径</td>
            <td colspan="3">物料重量</td>
            <td colspan="3">检化验成分</td>
          </tr>
          <tr>
            <td colspan="3">{{i.materielName}}></td>
            <td colspan="3">{{i.beltFlowPath}}</td>
            <td colspan="3">{{i.trafficVolume}}</td>
            <td colspan="3" class="query">查看</td>
          </tr>
        </table>

        <!-- 分页器 -->
        <div class="pagination-box">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="2"
            :total="transportHistory.total"
            :page-size="4"
          ></el-pagination>
        </div>
      </div>
      <div class="btn-close" @click="info.isShow = false">
        <p>收起</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import { routeHistory, route } from "../../../api/home";
export default {
  props: ["info"],
  data() {
    return {
      arr: [1, 2, 3, 4],
      
      transportHistory:[],

      transportStatistics:[],

      selectValue:[],
    

      arr2: [
        {
          name: "澳矿",
          num: 4000,
        },

        {
          name: "巴西碳",
          num: 12000,
        },

        {
          name: "铁粉",
          num: 17000,
        },

        {
          name: "澳矿",
          num: 4000,
        },

        {
          name: "巴西碳",
          num: 12000,
        },

        {
          name: "铁粉",
          num: 17000,
        },

        {
          name: "澳矿",
          num: 4000,
        },

        {
          name: "巴西碳",
          num: 12000,
        },

        {
          name: "铁粉",
          num: 17000,
        },

        {
          name: "澳矿",
          num: 4000,
        },

        {
          name: "巴西碳",
          num: 12000,
        },

        {
          name: "铁粉",
          num: 17000,
        },

        {
          name: "澳矿",
          num: 4000,
        },

        {
          name: "巴西碳",
          num: 12000,
        },

        {
          name: "铁粉",
          num: 17000,
        },
      ],

      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods:{
     handleCurrentChange(e){
       console.log(e,this.selectValue[0].code,this.selectValue[1].code)
    // routeHistory({
    //   currentPage: 1,
    //   endOperationAreaCode: "BF1",
    //   pageSize: 2,
    //   startOperationAreaCode: "SIN1",
    // }).then((res) => {
    //   console.log(res);
    // });


     }

  },

  mounted() {

    // routeHistory({
    //   currentPage: 1,
    //   endOperationAreaCode: "BF1",
    //   pageSize: 2,
    //   startOperationAreaCode: "SIN1",
    // }).then((res) => {
    //   console.log(res);
    // });
    

    // route({
    //   endOperationAreaCode: "BF1",
    //   startOperationAreaCode: "SIN1",
    // }).then((res) => {
    //   console.log(res);
    // });

    let res = {
      code: "string",
      data: {
        current: 2,
        pages: 0,
        records: [
          {
            analysisText: "www",
            beltFlowPath: "00000",
            endOperationAreaName: "BF1",
            materielCode: "sss",
            materielName: "巴西矿",
            startOperationAreaName: "SIN1",
            trafficVolume: 1000,
          },
        ],
        searchCount: true,
        size: 4,
        total: 5,
      },
      message: "string",
      status: true,
    };

    this.transportHistory  = res.data


    

    // let res2 = {

    // }

    //  this.transportStatistics = 
   


  },
};
</script>

<style  scoped>
.route >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.route >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.route >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.route .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.route .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.route .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

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
  overflow: hidden;
  margin: 10px 0;
}

.route .sign {
  width: 350px;
  overflow: hidden;
  margin-top: 10px;
}

.route .sign div {
  float: right;
}

.route .sign .gong {
  width: 10px;
  height: 10px;
  background: #0f7ae9;
}

.route .sign .gong-text {
  height: 10px;
  line-height: 10px;
  color: #fff;
  font-size: 10px;
  margin-right: 20px;
}

.route .bar-chart .list1 {
  width: 350px;
  overflow: auto;
  height: 250px;
}

.route .bar-chart .list1::-webkit-scrollbar {
  width: 0;
}

.route .bar-chart .item {
  width: 350px;
  height: 10px;
  margin-top: 10px;
}

.route .bar-chart .item .box {
  float: left;
  width: 300px;
  height: 100%;
  overflow: hidden;
}

.route .bar-chart .item .box .item-gong {
  float: left;
  width: 100px;
  height: 100%;
  background: #0f7ae9;
}

.route .bar-chart .item .box .item-shou {
  float: left;
  width: 100px;
  height: 100%;

  background: #0bcdff;
}

.route .bar-chart .item .item-text {
  float: right;
  color: #fff;
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route .bar-chart .x-num {
  width: 350px;
  height: 30px;
  position: relative;
}

.route .bar-chart .x-num span {
  margin-top: 5px;
  color: #fff;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
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