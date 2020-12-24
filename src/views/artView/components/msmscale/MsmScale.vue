<template>
  <div class="msmscale">
    <div class="btn-open" @click="info.isShow=true">
      <p>展开</p>
    </div>
    <el-drawer  :visible.sync="info.isShow" :with-header="false" :modal="false">
      <div class="main">
      
        <div class="main-top">
          <div class="title-logo"></div>
          <div class="title-text">计量秤</div>
        </div>

        <div class="title">
          <span>详情</span>
          <img src="../../../../assets/title-bg.png" />
        </div>

        <ul class="procss-detail">
          <li>
            <span class="key">读数:</span>
            <span class="value">
              <span>1213</span>
            </span>
          </li>

          <li>
            <span class="key">速度:</span>
            <span class="value">
              <span>23432</span>
            </span>
          </li>
        </ul>

        
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
.msmscale >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.msmscale >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.msmscale >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.msmscale .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.msmscale .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.msmscale .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.msmscale .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.msmscale .main {
  width: 370px;
  height: 100%;
  float: right;
}

.msmscale .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.msmscale .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.msmscale .title-text {
  margin-top: 22px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.msmscale .btn-enter {
  float: right;
  margin-top: 24px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.msmscale .main .title {
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

.msmscale .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.msmscale .main .title img {
  float: right;
  margin-top: 10px;
}

.msmscale .procss-detail {
  width: 350px;
  overflow: hidden;
}

.msmscale .procss-detail li {
  overflow: hidden;
  position: relative;
  padding: 10px 0 10px 20px;
}

.msmscale .procss-detail li span {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #fff;
}

.msmscale .procss-detail li .value {
  position: absolute;
  left: 120px;
  top: 11px;
}

.msmscale .main table {
  table-layout: fixed;
  width: 350px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

.msmscale .main table tr {
  height: 25px;
}

.msmscale .table {
  margin-top:20px;
  margin-bottom: 20px;
}

.msmscale .main table td {
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.msmscale .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.msmscale .table-list {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  width: 350px;
  height: 50px;
  border-left: 1px solid #1183f8;
}

.msmscale .table-list::-webkit-scrollbar {
  width: 10px;

  height: 10px;
}

.msmscale .table-list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  background: #1183f8;
}

.msmscale .table-list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  border-radius: 10px;

  background: #ededed;
}

.msmscale .table-list li {
  justify-content: flex-start;
}
.msmscale .table-list li div {
  padding: 0 12px;
  height: 25px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  border-right: 1px solid #1183f8;
  border-bottom: 1px solid #1183f8;
}
</style>