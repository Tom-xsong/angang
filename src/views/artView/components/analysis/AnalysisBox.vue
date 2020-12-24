<template>
  <div class="analysis">
    <div class="btn-open" @click="info.isShow=true">
      <p>展开</p>
    </div>
    <el-drawer  :visible.sync="info.isShow" :with-header="false" :modal="false">
      <div class="main">
      
        <div class="main-top">
          <div class="title-logo"></div>
          <div class="title-text">检化验</div>
        </div>

       
        <div class="title">
          <span>检化验成分</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

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
        
      </div>

      <div class="btn-close" @click="info.isShow=false">
        <p>关闭</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props:["info"],
  data() {
    return {
      
         
    };
  },

  methods: {
    
    


  },

  mounted() {
   
  },
};
</script>

<style  scoped>
.analysis >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.analysis >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.analysis >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.analysis .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.analysis .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.analysis .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.analysis .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

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

.analysis .main table {
  overflow: hidden;
  margin-top:10px;
  table-layout: fixed;
  width: 350px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

.analysis .main table tr {
  height: 25px;
}

.analysis .table {
  margin-bottom: 20px;
}

.analysis .main table td {
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.analysis .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.analysis .table-list-box{
  width: 350px;
  height: 210px ! important;
  overflow: auto;
}


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



.analysis .table-list {
  display: flex;
  flex-wrap: nowrap;
  height: 50px;
  border-left: 1px solid #1183f8;
}




.analysis .table-list li {
  justify-content: flex-start;
}
.analysis .table-list li div {
  padding: 0 12px;
  height: 25px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  border: 0.5px solid #1183f8 !important;
  /* border-right: 1px solid #1183f8;
  border-bottom: 1px solid #1183f8; */
}
</style>