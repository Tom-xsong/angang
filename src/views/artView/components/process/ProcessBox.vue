<template>
  <div class="process">
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
          <span class="value">{{ data.startName }}</span>
        </li>

        <li>
          <span class="key">终点位置:</span>
          <span class="value">{{ data.endName }}</span>
        </li>

        <li>
          <span class="key">皮带路径:</span>
          <span class="value">
            <span>{{ data.path }}</span>
          </span>
        </li>

        <li>
          <span class="key">流程运输量:</span>
          <span class="value">{{ data.scale }}</span>
        </li>

        <li>
          <span class="key">物料名称:</span>
          <span class="value"> {{ data.materielName }} </span>
        </li>
      </ul>

      <div class="title">
        <span>检化验成分</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="table" v-for="i in 1" :key="i">
        <table>
          <tr>
            <td colspan="3">物料名称</td>
            <td colspan="3">{{ data.analysisHead[0].materielName }}</td>
            <td colspan="3">报告编号</td>
            <td colspan="3">{{ data.analysisHead[0].materielCode }}</td>
          </tr>

          <tr>
            <td colspan="3">物料重量</td>
            <td colspan="3">{{ data.analysisHead[0].total }}</td>

            <td colspan="3">检化频次</td>
            <td colspan="3">{{ data.analysisHead[0].time }}</td>
          </tr>
        </table>

        <div class="table-list-box">
          <table>
            <tr v-for="(item1, index1) in data.data" :key="index1">
              <td v-for="(item2, index2) in item1" :key="index2">
                {{ item2 }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { processDetails } from "../../.././../api/home";
export default {
  props: ["info"],
  data() {
    return {
      data: {
        analysisHead: [
          {
            materielCode: "",
            materielName: "",
            time: "",
            total: "",
          },
        ],
        data: [],
        endName: "",
        materielName: "",
        path: "",
        scale: "",
        startName: "",
      },
    };
  },

  methods: {
    //页面初始化
    requestData(code) {
      processDetails({ beltCode: code }).then((res) => {
        console.log(res);
          this.data = res.data.data;
      });
    },
  },

  mounted() {
    let code = this.info.code;
    this.requestData(code);
  },

  watch: {
    "info.code": {
      handler(newValue, oldValue) {
        console.log("arr2变了", newValue, oldValue);
        this.data = {
        analysisHead: [
          {
            materielCode: "",
            materielName: "",
            time: "",
            total: "",
          },
        ],
        data: [],
        endName: "",
        materielName: "",
        path: "",
        scale: "",
        startName: "",
      };
      
        let code = newValue;
        this.requestData(code);
      },
      deep: true,
    },
  },
};
</script>

<style  scoped>
.process .main {
  width: 370px;
  height: 100%;
  float: right;
}

.process .main .main-top {
  overflow: hidden;
  width: 350px;
  margin-bottom: 20px;
}

.process .title-logo {
  float: left;
  margin-top: 28px;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(180deg, #042055 0%, #1a63de 100%);
}

.process .title-text {
  margin-top: 22px;
  float: left;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #fff;
  overflow: hidden;
}

.process .btn-enter {
  float: right;
  margin-top: 24px;
  width: 72px;
  height: 33px;
  background: linear-gradient(180deg, rgba(5, 37, 94, 0.2) 0%, #1a61d9 100%);
  border-radius: 2px;
  border: 1px solid #1187ff;
  padding: 0;
}

.process .main .title {
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

.process .main .title span {
  float: left;
  color: #ffffff;
  line-height: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
}

.process .main .title img {
  float: right;
  margin-top: 10px;
}

.process .procss-detail {
  width: 350px;
  overflow: hidden;
}

.process .procss-detail li {
  overflow: hidden;
  position: relative;
  padding: 10px 0 10px 20px;
}

.process .procss-detail li span {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #fff;
}

.process .procss-detail li .value {
  position: absolute;
  left: 120px;
  top: 11px;
}

.process .main table {
  overflow: hidden;
  margin-top: 10px;
  table-layout: fixed;
  width: 350px;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #1183f8;
}

.process .main table tr {
  height: 25px;
}

.process .table {
  margin-bottom: 20px;
}

.process .main table td {
  font-size: 12px;
  color: #fff;
  border: 1px solid #1187ff;
  text-align: center;
}

.process .table-list-box {
  width: 350px;
  height: 220px !important;
  overflow: auto;
}

.process .table-list-box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.process .table-list-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  background: #1183f8;
}

.process .table-list-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  border-radius: 10px;

  background: #ededed;
}
</style>