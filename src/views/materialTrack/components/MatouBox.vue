<template>
  <div class="wharf">
    <div class="btn-open" @click="info.isShow= true">
      <p>展开</p>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="info.isShow"
      :with-header="false"
      :modal="false"
    >
      <div class="main">
        <!-- 顶部 -->
        <div class="main-top">
          <div class="title-logo"></div>
          <div class="title-text">{{info.objs.name}}</div>
          <!-- <el-button class="btn-enter" type="primary">进入</el-button> -->
        </div>

        <div class="title">
          <span>码头进料</span>
          <img src="../../../assets/title-bg.png" />
        </div>

        <!-- 柱状图 -->
        <div class="bar-chart">
          <ul class="list1">
            <li v-for="item in arr2" class="item" :key="item.name">
              <div class="name">
                <span>{{ item.name }}</span>
              </div>
              <ul
                v-for="(item2, index) in item.content"
                class="list2"
                :key="item2.num"
              >
                <li :class="item.content.length - 1 == index ? 'qq' : ''">
                  <div :style="{ width: item2.num / 100 + 'px' }"></div>
                  <span>{{ item2.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="x-num">
            <span style="position: absolute; top: 0; left: 25px">0</span>
            <span style="position: absolute; top: 0; left: 75px">5000</span>
            <span style="position: absolute; top: 0; left: 125px">10000</span>
            <span style="position: absolute; top: 0; left: 175px">15000</span>
            <span style="position: absolute; top: 0; left: 225px">20000</span>
          </div>
        </div>

        <div class="title">
          <span>检化验情况</span>
          <img src="../../../assets/title-bg.png" />
        </div>

        <!-- 搜索表单 -->
        <div class="search">
          <el-form
            label-width="68px"
            label-position="left"
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
          >
            <el-form-item label="日期">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>

            <el-form-item label="物料编号">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>

            <el-form-item label="物料名称">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>

            <el-form-item label="合同号">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- 表格 -->
        <div class="table" v-for="i in arr" :key="i">
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
            <tr>
              <td colspan="6">预计到达时间</td>
              <td colspan="6"></td>
            </tr>
            <tr>
              <td colspan="6">合同号</td>
              <td colspan="6"></td>
            </tr>
          </table>
          <ul class="table-list">
            <li>
              <div style="width:60px;height:29px;padding:0;">化学成分</div>
              <div style="width:60px;height:29px">数值</div>
            </li>

            <li>
              <div>CaO</div>
              <div>数值</div>
            </li>

            <li>
              <div>CaO</div>
              <div>数值</div>
            </li>

            <li>
              <div>CaO</div>
              <div>数值</div>
            </li>

            <li>
              <div>CaO</div>
              <div>数值</div>
            </li>

            <li>
              <div>CaOwerre</div>
              <div>数值</div>
            </li>

           
          </ul>
        </div>

        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          :pager-count="5"
        ></el-pagination>
      </div>
      <div class="btn-close" @click="info.isShow= false">
        <p>收起</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props:["info"],
  data() {
    return {
      drawer: false,

      arr: [1, 2,3],

      arr2: [
        {
          name: "码1",
          content: [
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
        },

        {
          name: "码2",
          content: [
            {
              name: "澳矿",
              num: 4000,
            },

            {
              name: "巴西碳",
              num: 12000,
            },
          ],
        },

        {
          name: "码3",
          content: [
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
        },
      ],

      formInline: {
        user: "",
        region: "",
      },
    };
  },
};
</script>

<style  scoped>
.wharf >>> .el-drawer__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 1080px;
}

.wharf >>> .el-drawer__wrapper .el-drawer.rtl {
  width: 750px;
  border: 0;
  background: linear-gradient(
    270deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 56%,
    rgba(0, 0, 0, 0) 100%
  );
}

.wharf >>> .el-drawer__wrapper .el-drawer.rtl:focus {
  outline: 0;
}

.wharf .btn-open {
  width: 53px;
  height: 120px;
  background: url("../../../assets/tag.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 460px;
}

.wharf .btn-open p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf .btn-close {
  width: 53px;
  height: 120px;
  background: url("../../../assets/tag.png") no-repeat center;
  position: absolute;
  right: 394px;
  top: 480px;
}

.wharf .btn-close p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

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
  overflow: hidden;
  margin-top: 10px;
}
.wharf .bar-chart .item .name {
  font-size: 12px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf .bar-chart .item .list2 li {
  width: 325px;
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
  margin-left: 20px;
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

.wharf .main .search {
  width: 350px;
  overflow: hidden;
  margin: 10px 0;
}

.wharf .main .search .el-form-item {
  margin-bottom: 10px;
}

.wharf >>> .main .search .el-input__inner {
  width: 96px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid #1183f8;
  background: #000;
  color:#fff;
}

.wharf >>> .search .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  padding: 0 !important;
}

.wharf .main table {
  table-layout: fixed;
  width: 350px;
  height: 113px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}


.wharf .table{
    margin-top: 10px;
    margin-bottom: 20px;
}

.wharf .main table td {
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.wharf .main table .query {
  color: #1187ff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf .table-list {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  width: 350px;
  height: 58px;
  border-left: 1px solid #1183f8;
}

.wharf .table-list::-webkit-scrollbar {

        width: 10px;     

        height: 10px;

    }

    .wharf .table-list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/

        border-radius: 10px;

         

        background: #1183f8;

    }

.wharf .table-list::-webkit-scrollbar-track {/*滚动条里面轨道*/

        

        border-radius: 10px;

        background: #EDEDED;

}

	
.wharf .table-list li {
  
  justify-content: flex-start;
 
  
}
.wharf .table-list li div {
  padding:0 12px;
  
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 28px;
  border-right: 1px solid #1183f8;
  border-bottom: 1px solid #1183f8;

}





.wharf >>> .el-pagination.is-background .el-pager li {
  min-width: 16px;
  width: 24px;
  height: 24px;
  background: #09345f;
  color: #fff;
  text-align: center;
  line-height: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.wharf >>> .el-pagination.is-background .btn-prev {
  min-width: 16px;
  width: 24px;
  height: 24px;
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
  width: 24px;
  height: 24px;
  background: #09345f;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.qq {
  margin-bottom: 0 !important;
}
</style>