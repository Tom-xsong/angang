<template>
  <div class="hun">
    <div class="btn-open" @click="info.isShow = true">
      <p>展开</p>
    </div>
    <el-drawer :visible.sync="info.isShow" :with-header="false" :modal="false">
      <div class="main">
        <!-- 顶部 -->
        <div class="main-top">
          <div class="title-logo"></div>
          <div class="title-text">混匀</div>
          <el-button class="btn-enter" type="primary">进入</el-button>
        </div>

        <div class="title">
          <span>供/受料情况</span>
          <img src="../../../assets/title-bg.png" />
        </div>

        <!-- 柱状图 -->
        <!-- <div class="bar-chart">
          <div class="sign">
            <div class="shou-text">受料</div>
            <div class="shou"></div>
            <div class="gong-text">供料</div>
            <div class="gong"></div>
          </div>

          <ul class="list1">
            <li v-for="item in arr2" class="item" :key="item.name">
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
        </div> -->

        <div class="title">
          <span>检化验情况</span>
          <img src="../../../assets/title-bg.png"/>
        </div>


        <div class="broken-line" id="brokenLine">

        </div>

        <div class="title">
          <span>作业区情况</span>
          <img src="../../../assets/title-bg.png" />
        </div>


      </div>
      <div class="btn-close" @click="info.isShow = false">
        <p>收起</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {brokenLine} from "./chart"
export default {
  props: ["info"],
  data() {
    return {
      workAreaSave: [],

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
      ],

      operationAreaAnalysisDTO: {
        analysisFrequency: "",
        materielCode: "",
        materielName:"",
        operationAreaCode:"BF1"
      },
    };
  },

  methods: {},

  mounted() {
   brokenLine(this.refs.brokenLine)
  },
};
</script>

<style  scoped>
.hun >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.hun >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.hun >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.hun .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.hun .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.hun .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.hun .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.hun .main {
  width: 370px;
  height: 100%;
  float: right;
}

.hun .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.hun .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.hun .title-text {
  margin-top: 22px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.hun .btn-enter {
  float: right;
  margin-top: 24px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.hun .main .title {
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

.hun .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.hun .main .title img {
  float: right;
  margin-top: 10px;
}



.hun .bar-chart {
  width: 350px;
  overflow: hidden;
  margin: 10px 0;
}

.hun .sign {
  width: 350px;
  overflow: hidden;
  margin-top: 10px;
}

.hun .sign div {
  float: right;
}

.hun .sign .gong {
  width: 10px;
  height: 10px;
  background: #0f7ae9;
}

.hun .sign .gong-text {
  height: 10px;
  line-height: 10px;
  color: #fff;
  font-size: 10px;
  margin-right: 20px;
}

.hun .sign .shou {
  width: 10px;
  height: 10px;
  background: #0bcdff;
}

.hun .sign .shou-text {
  height: 10px;
  line-height: 10px;
  color: #fff;
  font-size: 10px;
  margin-right: 20px;
}

.hun .bar-chart .list1 {
  width: 350px;
  overflow: hidden;
  margin-top: 20px;
}

.hun .bar-chart .item {
  width: 350px;
  height: 10px;

  margin-top: 10px;
}

.hun .bar-chart .item .box {
  float: left;
  width: 300px;
  height: 100%;
  overflow: hidden;
}

.hun .bar-chart .item .box .item-gong {
  float: left;
  width: 100px;
  height: 100%;
  background: #0f7ae9;
}

.hun .bar-chart .item .box .item-shou {
  float: left;
  width: 100px;
  height: 100%;

  background: #0bcdff;
}

.hun .bar-chart .item .item-text {
  float: right;
  color: #fff;
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.hun .bar-chart .x-num {
  width: 350px;
  height: 30px;
  position: relative;
}

.hun .bar-chart .x-num span {
  margin-top: 5px;
  color: #fff;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
}


.hun .broken-line{
  width: 350px;
  height: 250px;
  background-color: #fff;
}



</style>