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
            {{ info.objs[0][0].name }}--->{{ info.objs[0][1].name }}
          </div>
          <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-button class="btn-enter" type="primary">进入</el-button>
            </el-form-item>
          </el-form> -->
        </div>

        <div class="main-top2" v-else>
          <div class="title-logo"></div>

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="input-select" label="">
              <el-select
                :popper-append-to-body="false"
                v-model="formInline.region"
                placeholder="路径选择"
              >
                <el-option
                  v-for="(item, index) in info.objs"
                  :key="index"
                  :label="item[0].name + '--->' + item[1].name"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item>
            <el-button class="btn-enter" type="primary">进入</el-button>
          </el-form-item> -->
          </el-form>
        </div>

        <!-- 柱状图 -->
        <div class="title">
          <span>码头进料</span>
          <img src="../../../assets/title-bg.png" />
        </div>

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

        <!-- 表单 -->
        <div class="title">
          <span>检化验情况</span>
          <img src="../../../assets/title-bg.png" />
        </div>

        <table v-for="i in arr" :key="i">
          <tr>
            <td colspan="4">起点工序</td>
            <td colspan="4">终点工序</td>
            <td colspan="4">原料料号</td>
          </tr>
          <tr>
            <td colspan="4">{{ i }}</td>
            <td colspan="4"></td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td colspan="3">原料料名</td>
            <td colspan="3">皮带路径</td>
            <td colspan="3">物料重量</td>
            <td colspan="3">检化验成分</td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td colspan="3"></td>
            <td colspan="3"></td>
            <td colspan="3" class="query">查看</td>
          </tr>
        </table>

        <!-- 分页器 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          :pager-count="5"
        ></el-pagination>
      </div>
      <div class="btn-close" @click="info.isShow = false">
        <p>收起</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { routeHistory, route } from "../../../api/home";
export default {
  props: ["info"],
  data() {
    return {
      drawer: false,

      arr: [1, 2, 3, 4],

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

  mounted() {
    routeHistory({
      currentPage: "1",
      endOperationAreaCode: "SIN1",
      pageSize: "1",
      startOperationAreaId: "BF1",
    }).then((res) => {
      console.log(res);
    });

    route({
      endOperationAreaCode: "SIN1",
      startOperationAreaCode: "BF1",
    }).then((res) => {
      console.log(res);
    });
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

.route .bar-chart .item {
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}
.route .bar-chart .item .name {
  font-size: 12px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route .bar-chart .item .list2 li {
  width: 325px;
  height: 10px;
  margin-bottom: 5px;
}

.route .bar-chart .item .list2 li div {
  float: left;
  width: 100px;
  height: 100%;
  background-color: rgba(17, 135, 255, 1);
}

.route .bar-chart .item .list2 li span {
  float: right;
  color: #fff;
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route .bar-chart .item .list2 {
  float: left;
  border-left: 1px solid #ffffff;
  margin-left: 20px;
  padding-left: 5px;
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

.route >>> .el-pagination.is-background .el-pager li {
  min-width: 16px;
  width: 24px;
  height: 24px;
  background: #09345f;
  color: #fff;
  text-align: center;
  line-height: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.route >>> .el-pagination.is-background .btn-prev {
  min-width: 16px;
  width: 24px;
  height: 24px;
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