<template>
  <div class="Liaodui">
    <div class="main">
      <div class="main-top">
        <div class="title-logo"></div>
        <div class="title-text">{{this.info.name}}</div>
      </div>

      <div class="title">
        <span>仓库详情</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <ul class="procss-detail">
        <li>
          <span class="key">仓库名称:</span>
          <span class="value">
            <span>{{ data.storageName }}</span>
          </span>
        </li>

        <li>
          <span class="key">所属作业区:</span>
          <span class="value">
            <span>{{ data.operationAreaName }}</span>
          </span>
        </li>

        <li>
          <span class="key">仓库储量:</span>
          <span class="value">
            <span>{{ data.storageReserves }}</span>
          </span>
        </li>

        <li>
          <span class="key">批次数量:</span>
          <span class="value">{{ data.batchNum }} </span>
        </li>
      </ul>

      <div class="title">
        <span>修正库存量</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="liaotiao-box">
        <div class="liaotiao">
          <div class="liaotiao-title">{{ liaoInfo.name }}</div>
          <div class="liaotiao-content">
            <div
              class="col"
              :class="['col' + (index + 1)]"
              :style="{ width: (item.value / liaoInfo.total) * 100 + '%' }"
              v-for="(item, index) in liaoInfo.liaoArr"
              :key="index"
              @click="liaotiaoClick(item.id)"
            ></div>
          </div>
        </div>
      </div>

      <div class="title">
        <span>检化验成分</span>
        <img src="../../../../assets/title-bg.png" />
      </div>

      <div class="table" v-for="i in 1" :key="i">
        <table>
          <tr>
            <td colspan="3">物料名称</td>
            <td colspan="3">{{ analysis.analysisHead[0].materielName }}</td>
            <td colspan="3">报告编号</td>
            <td colspan="3">{{ analysis.analysisHead[0].code }}</td>
          </tr>
          <tr>
            <td colspan="3">物料批号</td>
            <td colspan="3">{{ analysis.analysisHead[0].batchCode }}</td>
            <td colspan="3">取样地点</td>
            <td colspan="3">{{ analysis.analysisHead[0].placeName }}</td>
          </tr>
          <tr>
            <td colspan="6">取样时间</td>
            <td colspan="6">{{ analysis.analysisHead[0].time }}</td>
          </tr>
        </table>

        <div class="table-list-box">
          <table>
            <tr v-for="(item1, index1) in analysis.data" :key="index1">
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
import {
  pileInformation,
  pileInfopileDetailrmation,
} from "../../../../api/home";
export default {
  props: ["info"],
  data() {
    return {
      data: {},
      liaoInfo: {
        total: 0,
        liaoArr: [],
        name: "",
      },
      analysis: {
        analysisHead: [
          {
            batchCode: "",
            code: "",
            materielName: "",
            placeName: "",
            time: "",
          },
        ],
        data: [],
      },
    };
  },

  methods: {
    //料条点击
    liaotiaoClick(id) {
      pileInfopileDetailrmation({
        materialLayerId: id,
        storageCode: this.info.code,
      }).then((res) => {
        console.log(res);
        this.analysis = res.data.data;
      });
    },

    //数据初始化
    requestData(code) {
      pileInformation({ storageCode: code }).then((res) => {
        console.log(res);
        if(res.data.code=="00000"){
        this.data = res.data.data;
        this.liaoInfo.total = res.data.data.storageReserves;
        this.liaoInfo.liaoArr = res.data.data.data;
        this.liaoInfo.name = res.data.data.storageName;
        }
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
        console.log("变了" + newValue, oldValue);
        this.analysis = {
          analysisHead: [
            {
              batchCode: "",
              code: "",
              materielName: "",
              placeName: "",
              time: "",
            },
          ],
          data: []
        };
        this.data = {};
        this.liaoInfo = {};

        let code = newValue;
        this.requestData(code);
      },
      deep: true,
    },
  },
};
</script>

<style  scoped>
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
  overflow: hidden;
  margin-top: 10px;
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

.Liaodui .table-list-box {
  width: 350px;
  height: 220px !important;
  overflow: auto;
}

.Liaodui .table-list-box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.Liaodui .table-list-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  background: #1183f8;
}

.Liaodui .table-list-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  border-radius: 10px;

  background: #ededed;
}

.Liaodui .liaotiao-box {
  width: 350px;
  overflow: hidden;
}

.Liaodui .liaotiao {
  margin: 50px auto;

  width: 300px;
  height: 70px;
  padding: 0 10px;
  padding-bottom: 5px;
  border: 1px solid #1187ff;
}

.Liaodui .liaotiao .liaotiao-title {
  width: 100%;
  height: 50%;

  line-height: 35px;
  color: #fff;
}

.Liaodui .liaotiao .liaotiao-content {
  display: flex;
  width: 100%;
  height: 50%;
}

.col {
  height: 100%;
  margin-right: 1px;
  background: #ff862c;
}
.col1 {
  background: #1187ff;
}
.col2 {
  background: #344bff;
}
.col3 {
  background: #b053ba;
}
.col4 {
  background: #ea508b;
}
.col5 {
  background: #fa4949;
}
.col6 {
  background: #ff862c;
}
</style>