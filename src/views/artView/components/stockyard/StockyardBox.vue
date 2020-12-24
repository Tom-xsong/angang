<template>
  <div class="stockyard">
    <div class="btn-open" @click="info.isShow = true">
      <p>展开</p>
    </div>
    <el-drawer :visible.sync="info.isShow" :with-header="false" :modal="false">
      <div class="main">
        <!-- 顶部 -->
        <div class="main-top">
          <div class="title-logo"></div>
          <div class="title-text">{{info.name}}</div>
          <!-- <el-button class="btn-enter" @click="enter" type="primary"
            >进入</el-button
          > -->
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
            <li v-for="n in 4" :key="n">
              <span class="name">巴润矿</span>
              <span class="num">300</span>
            </li>
          </ul>

          <div class="pagination-box">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="50"
              :pager-count="5"
            ></el-pagination>
          </div>
        </div>

        <div class="title">
          <span>供/受料情况</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <!-- 柱状图 -->
        <div class="bar-chart">
          <div class="sign">
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
          <span>检化验情况</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <!-- 搜索表单 -->
        
          <el-form
            label-width="68px"
            label-position="left"
            :inline="true"
            :model="operationAreaAnalysisDTO"
            class="demo-form-inline"
          >
           <el-form-item label="物料名称:">
              <el-select  v-model="value1" :popper-append-to-body="false" placeholder="请选择">
                <el-option label="铁矿" value="shanghai"></el-option>
                <el-option label="巴西矿" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item  label="取样时间:">
              <el-date-picker 
                v-model="arr"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        
        <!-- 表格 -->
        <div class="table" v-for="i in 1" :key="i">
          <table>
            <tr>
              <td colspan="2">物料名称</td>
              <td colspan="2"></td>
              <td colspan="2">报告编号</td>
              <td colspan="2"></td>
              <td colspan="2">物料批号</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td colspan="2">取样地点</td>
              <td colspan="3"></td>
              <td colspan="2">取样时间</td>
              <td colspan="5"></td>
            </tr>
          </table>

          <div class="table-list-box">
          <ul class="table-list">
            <li>
              <div style="width: 58px; height: 25px; padding: 0">化学成分</div>
              <div style="width: 58px; height: 25px; padding: 0">数值</div>
            </li>
            <li v-for="item in 8" :key="item">
              <div>CaO</div>
              <div>数值</div>
            </li>
          </ul>


           <ul class="table-list">
            <li>
              <div style="width: 58px; height: 25px; padding: 0">物理性能</div>
              <div style="width: 58px; height: 25px; padding: 0">数值</div>
            </li>
            <li v-for="item in 8" :key="item">
              <div>CaO</div>
              <div>数值</div>
            </li>
          </ul>


           <ul class="table-list">
            <li>
              <div style="width: 58px; height: 25px; padding: 0">微量元素</div>
              <div style="width: 58px; height: 25px; padding: 0">数值</div>
            </li>
            <li v-for="item in 8" :key="item">
              <div>CaO</div>
              <div>数值</div>
            </li>
          </ul>


           <ul class="table-list">
            <li>
              <div style="width: 58px; height: 25px; padding: 0">治金性能</div>
              <div style="width: 58px; height: 25px; padding: 0">数值</div>
            </li>
            <li v-for="item in 8" :key="item">
              <div>CaO</div>
              <div>数值</div>
            </li>
          </ul>

          </div>
        </div>
        <!-- 分页 -->
        <div class="pagination-box">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="50"
            :pager-count="5"
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
// import {
//   workArea,
//   workAreaShou,
//   workAreaJian,
//   workAreaAll,
// } from "../../../../api/home";
export default {
  props: ["info"],
  data() {
    return {
      workAreaSave: [],

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
      ],

      operationAreaAnalysisDTO: {
        analysisFrequency: "",
        materielCode: "",
        materielName: "",
        operationAreaCode: "BF1",
      },
    };
  },

  methods: {
    enter() {
      this.$router.push("/artView");
    },
  },

  mounted() {
    // workArea({ operationAreaCode: "BF1" }).then((res) => {
    //   console.log(res);
    // }),
    //   workAreaShou({ operationAreaCode: "BF1" }).then((res) => {
    //     console.log(res);
    //   });

    // workAreaJian({
    //   analysisFrequency: "1",
    //   materielCode: "1",
    //   materielName: "1",
    //   operationAreaCode: "SIN1",
    // }).then((res) => {
    //   console.log(res);
    // });

    // workAreaAll().then((res) => {
    //   console.log(res);
    // });
  },
};
</script>

<style  scoped>
.stockyard >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.stockyard >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.stockyard >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.stockyard .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.stockyard .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.stockyard .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard .main {
  width: 370px;
  height: 100%;
  float: right;
}

.stockyard .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.stockyard .title-logo {
  float: left;
  margin-top: 20px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.stockyard .title-text {
  margin-top: 15px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.stockyard .btn-enter {
  float: right;
  margin-top: 15px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.stockyard .main .title {
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

.stockyard .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard .main .title img {
  float: right;
  margin-top: 10px;
}

.stockyard .main .yuanliao {
  width: 350px;
  overflow: hidden;
}

.stockyard .main .yuanliao .yuanliao-top {
  width: 350px;
  overflow: hidden;
}

.stockyard .main .yuanliao .yuanliao-top .title1 {
  float: left;
  margin: 15px 0 10px 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

.stockyard .main .yuanliao .yuanliao-top .title2 {
  float: right;
  margin: 15px 20px 10px 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

.stockyard .main .yuanliao .content {
  width: 350px;
  overflow: hidden;
}

.stockyard .main .yuanliao .content li {
  width: 350px;
  height: 25px;
  background: url("../../../../assets/rectbg.png") no-repeat center;
  background-size: 100% 100%;
  margin-top: 10px;
}

.stockyard .main .yuanliao .content li .name {
  float: left;
  margin-left: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 25px;
}

.stockyard .main .yuanliao .content li .num {
  float: right;
  margin-right: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 25px;
}

.stockyard .bar-chart {
  width: 350px;
  overflow: hidden;
  margin: 10px 0;
}

.stockyard .sign {
  width: 350px;
  overflow: hidden;
  margin-top: 10px;
}

.stockyard .sign div {
  float: right;
}

.stockyard .sign .gong {
  width: 10px;
  height: 10px;
  background: #0f7ae9;
}

.stockyard .sign .gong-text {
  height: 10px;
  line-height: 10px;
  color: #fff;
  font-size: 10px;
  margin-right: 20px;
}

.stockyard .sign .shou {
  width: 10px;
  height: 10px;
  background: #0bcdff;
}

.stockyard .sign .shou-text {
  height: 10px;
  line-height: 10px;
  color: #fff;
  font-size: 10px;
  margin-right: 20px;
}

.stockyard .bar-chart .list1 {
  width: 350px;
  overflow: auto;
  height: 150px;
  margin-top: 20px;
}

.stockyard .bar-chart .list1::-webkit-scrollbar {
  width: 0;
}

.stockyard .bar-chart .item {
  width: 350px;
  height: 10px;

  margin-top: 10px;
}

.stockyard .bar-chart .item .box {
  float: left;
  width: 300px;
  height: 100%;
  overflow: hidden;
}

.stockyard .bar-chart .item .box .item-gong {
  float: left;
  width: 100px;
  height: 100%;
  background: #0f7ae9;
}

.stockyard .bar-chart .item .box .item-shou {
  float: left;
  width: 100px;
  height: 100%;

  background: #0bcdff;
}

.stockyard .bar-chart .item .item-text {
  float: right;
  color: #fff;
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard .bar-chart .x-num {
  width: 350px;
  height: 30px;
  position: relative;
}

.stockyard .bar-chart .x-num span {
  margin-top: 5px;
  color: #fff;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard .main  .el-form-item {
  margin-bottom: 5px;
}



 .stockyard >>>  .el-form-item__label {
  width: 69px !important;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  padding: 0 !important;
}

 







.stockyard >>> .el-range-editor.el-input__inner{
  width: 280px;
  height: 30px;
  padding: 0 10px;
  border-radius: 2px;
  border: 1px solid #1183f8;
  background: #000;
  color: #fff;
  

}
.stockyard >>> .el-range-editor .el-range-input{
  background-color: #000;
  color: #CCC ! important;
  margin: 10px;

}

.stockyard >>> .el-date-editor .el-range-separator{
  color: #fff;
  padding:0;
  line-height: 28px;
}

.stockyard >>> .el-date-editor .el-range__icon{
   line-height: 30px;

}

.stockyard >>> .el-date-editor .el-range__close-icon{
   line-height: 30px;

}




.stockyard >>> .el-input--suffix .el-input__inner {
  color: #fff;
  width: 280px;
  height: 30px;
  border: 1px solid #1a61d9;
  background-color: rgba(0, 0, 0, 0);
}


.stockyard >>> .el-select-dropdown {
  background-color: rgb(0, 0, 0);
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
  border: 1px solid #1a61d9;
  
}


.stockyard >>> .el-popper .popper__arrow::after{
    content: " ";
    border-width:0 !important;
}

.stockyard >>> .el-popper .popper__arrow{
  border-width:0 !important;
}


.stockyard >>> .el-select .el-input .el-select__caret{
  color: #1a61d9;
}
.stockyard >>> .el-select-dropdown__item {
  color: #fff;
}

.stockyard >>> .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #fff;
  background-color: #1a61d9;
}

.stockyard >>> .el-select-dropdown__item.selected {
  color: #fff;
} 





.stockyard .main table {
  overflow: hidden;
  margin-top:10px;
  table-layout: fixed;
  width: 350px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

.stockyard .main table tr {
  height: 25px;
}

.stockyard .table {
  margin-bottom: 20px;
}

.stockyard .main table td {
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.stockyard .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard .table-list-box{
  width: 350px;
  height: 210px ! important;
  overflow: auto;
}


.stockyard .table-list-box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}


.stockyard .table-list-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  background: #1183f8;
}

.stockyard .table-list-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  border-radius: 10px;

  background: #ededed;
}



.stockyard .table-list {
  display: flex;
  flex-wrap: nowrap;
  height: 50px;
  border-left: 1px solid #1183f8;
}




.stockyard .table-list li {
  justify-content: flex-start;
}
.stockyard .table-list li div {
  padding: 0 12px;
  height: 25px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  border: 1px solid #1183f8;
  /* border-right: 1px solid #1183f8;
  border-bottom: 1px solid #1183f8; */
}


.stockyard .pagination-box {
  width: 350px;
  height: 20px;
  overflow: hidden;
  position: relative;
  margin: 20px 0 20px 0;
}
.stockyard >>> .el-pagination {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%,0);
} 

.stockyard >>> .el-pagination.is-background .el-pager li {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard >>> .el-pagination.is-background .btn-prev {
  min-width: 16px;
  width: 20px;
  height: 20px;
  background: #09345f;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #1187ff;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.stockyard >>> .el-pagination.is-background .btn-next {
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