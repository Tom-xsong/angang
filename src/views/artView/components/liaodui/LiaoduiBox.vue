<template>
  <div class="Liaodui">
    <div class="btn-open" @click="info.isShow = true">
      <p>展开</p>
    </div>
    <el-drawer :visible.sync="info.isShow" :with-header="false" :modal="false">
      <div class="main">
      
        <div class="main-top">
          <div class="title-logo"></div>
          <div class="title-text">流程</div>
        </div>

        <div class="title">
          <span>流程详情</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <ul class="procss-detail">
          <li>
            <span class="key">起点位置:</span>
            <span class="value"
              ><span>码头</span><span>&nbsp;-&nbsp;</span
              ><span>1#料厂</span></span
            >
          </li>

          <li>
            <span class="key">终点位置:</span>
            <span class="value"
              ><span>码头</span><span>&nbsp;-&nbsp;</span
              ><span>1#料厂</span></span
            >
          </li>

          <li>
            <span class="key">皮带路径:</span>
            <span class="value">
              <span>213&nbsp;-&nbsp;</span>
              <span>213&nbsp;-&nbsp;</span>
              <span>213&nbsp;-&nbsp;</span>
              <span>213&nbsp;-&nbsp;</span>
              <span>213</span>
            </span>
          </li>

          <li>
            <span class="key">流程累计重量:</span>
            <span class="value"> 55T </span>
          </li>

          <li>
            <span class="key">物料名称:</span>
            <span class="value"> 巴西精粉 </span>
          </li>
        </ul>



        <div class="title">
          <span>修正库存量</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

      <div class ="funnel-chart" ref="funnelChart">
      
      
      </div>




        <div class="title">
          <span>检化验成分</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <div class="table">
          <table>
            <tr>
              <td colspan="2">物料名称</td>
              <td colspan="3"></td>
              <td colspan="2">物料编号</td>
              <td colspan="5"></td>
            </tr>
            <tr>
              <td colspan="2">物料重量</td>
              <td colspan="3"></td>
              <td colspan="2">船运代码</td>
              <td colspan="5"></td>
            </tr>
          </table>
          <ul class="table-list" v-for="n in 4" :key="n">
            <li>
              <div style="width: 58px; height: 25px; padding: 0">化学成分</div>
              <div style="width: 58px; height: 25px; padding: 0">数值</div>
            </li>
            <li v-for="item in 5" :key="item">
              <div>CaO</div>
              <div>数值</div>
            </li>
          </ul>
        </div>

        
      </div>

      <div class="btn-close" @click="info.isShow = false">
        <p>收起</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {funnelChart} from "./charts"
export default {
  props:["info"],
  data() {
    return {
     
    };
  },

  methods: {},

  mounted() {


       this.$nextTick(() => {
      funnelChart(this.$refs.funnelChart);
    });

  },
};
</script>

<style  scoped>
.Liaodui >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.Liaodui >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.Liaodui >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.Liaodui .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.Liaodui .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.Liaodui .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.Liaodui .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.Liaodui .main {
  width: 370px;
  height: 100%;
  float: right;
}

.Liaodui .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.Liaodui .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.Liaodui .title-text {
  margin-top: 22px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.Liaodui .btn-enter {
  float: right;
  margin-top: 24px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.Liaodui .main .title {
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

.Liaodui .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.Liaodui .main .title img {
  float: right;
  margin-top: 10px;
}

.Liaodui .procss-detail {
  width: 350px;
  overflow: hidden;
}

.Liaodui .procss-detail li {
  overflow: hidden;
  position: relative;
  padding: 10px 0 10px 20px;
}

.Liaodui .procss-detail li span {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #fff;
}

.Liaodui .procss-detail li .value {
  position: absolute;
  left: 120px;
  top: 11px;
}

.Liaodui .main table {
  table-layout: fixed;
  width: 350px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

.Liaodui .main table tr {
  height: 25px;
}

.Liaodui .table {
  margin-top:20px;
  margin-bottom: 20px;
}

.Liaodui .main table td {
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.Liaodui .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.Liaodui .table-list {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  width: 350px;
  height: 50px;
  border-left: 1px solid #1183f8;
}

.Liaodui .table-list::-webkit-scrollbar {
  width: 10px;

  height: 10px;
}

.Liaodui .table-list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  background: #1183f8;
}

.Liaodui .table-list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  border-radius: 10px;

  background: #ededed;
}

.Liaodui .table-list li {
  justify-content: flex-start;
}
.Liaodui .table-list li div {
  padding: 0 12px;
  height: 25px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  border-right: 1px solid #1183f8;
  border-bottom: 1px solid #1183f8;
}



.Liaodui .funnel-chart{
    width: 350px;
    height: 228px;
}
</style>