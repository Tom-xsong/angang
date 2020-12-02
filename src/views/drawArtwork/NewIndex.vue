<template>
  <div class="art-wrap">
    <div class="header-wrap">
      <div class="title">钢铁工艺流程图配置</div>
      <!-- 工具栏 -->
      <ol class="tools">
        <li
          class="item"
          :class="{ active: handleStatus === 0 }"
          @click="toggleHandle(0)"
        >
          绘制线段
        </li>
        <li
          class="item"
          :class="{ active: handleStatus === 1 }"
          @click="toggleHandle(1)"
        >
          缩放
        </li>
        <li
          class="item"
          :class="{ active: handleStatus === 2 }"
          @click="toggleHandle(2)"
        >
          移动
        </li>
        <li
          class="item"
          :class="{ active: handleStatus === 3 }"
          @click="toggleHandle(3)"
        >
          编辑
        </li>
        <li class="item danger" @click="clearAllState">
          清除状态
        </li>
      </ol>
      <div class="button">
        <el-button size="small" @click.stop="handleClear">清除</el-button>
        <el-button size="small" type="primary" @click.stop="handleSave"
          >保存</el-button
        >
      </div>
    </div>
    <div class="art-body">
      <ol class="body-left">
        <div class="header">图例：</div>
        <li
          v-for="li in configData"
          :key="li.id"
          draggable
          class="li"
          @dragstart="handleDragstart(li)"
        >
          <template v-if="li.type === 'image'">
            <img :src="li.image" />
            <div class="name">{{ li.label }}</div>
          </template>
          <div class="text" v-else>{{ li.label }}</div>
        </li>
      </ol>
      <!-- 画布 -->
      <div id="artBody">
        <div class="wrap" ref="configWrap" @dragstart.prevent></div>
      </div>
    </div>
    <!-- 修改矩形样式 -->
    <el-dialog
      title="修改样式"
      :visible.sync="colorDialog"
      close-on-click-modal
      width="400px"
    >
      <el-form size="small" :model="form" label-width="100px">
        <el-form-item label="设备编码：" v-if="curType !== 'line'">
          <el-input v-model="form.code" :maxlength="100" clearable></el-input>
        </el-form-item>
        <el-form-item label="设备名称：">
          <el-input
            type="textarea"
            :rows="2"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="form.text"
            :maxlength="100"
            clearable
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="15">
            <el-form-item label="文字大小：">
              <el-input-number
                v-model="form.fontSize"
                :min="10"
                :step="2"
                :step-strictly="true"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="文字颜色：">
              <el-color-picker v-model="form.textFill"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文字位置：">
          <el-radio-group v-model="form.textPosition">
            <el-radio-button v-for="li in posArr" :label="li.id" :key="li.id">{{
              li.text
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="15">
            <el-form-item label="边框宽度：">
              <el-input-number
                v-model="form.lineWidth"
                :min="0"
                :max="10"
                :step-strictly="true"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="边框颜色：">
              <el-color-picker v-model="form.stroke"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="背景颜色：">
          <el-color-picker v-model="form.fill"></el-color-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="colorDialog = false">取消</el-button>
        <el-button type="primary" size="small" @click="handleModifyStyle()"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  init,
  startDrawLine,
  endDrawLine,
  startResize,
  endResize,
  startRectMove,
  endRectMove,
  startEdit,
  endEdit,
  submitStyle
} from "./flowClient/index";
import {
  add,
  getRectModelList,
  getLineModelList,
  clearAll
} from "./flowClient/render/render";
import { on, off } from "./flowClient/event/index";
import { mapValue } from "@/utils/validate";

let image1 = require("../../assets/image/store1-success.png");
let image2 = require("../../assets/image/store2-success.png");
let image3 = require("../../assets/image/store3-success.png");
let image4 = require("../../assets/image/store4-success.png");
let image5 = require("../../assets/image/store5-success.png");
let belt = require("../../assets/image/belt-success.png");
let scale = require("../../assets/image/scale-success.png");
let test = require("../../assets/image/test-success.png");
let tip = require("../../assets/image/tip-success.png");

export default {
  name: "Test",
  data() {
    return {
      configData: [
        {
          id: 1,
          type: "rect",
          label: "矩形",
          width: 220,
          height: 100
        },
        {
          id: 2,
          type: "image",
          label: "皮带秤",
          image: belt,
          width: 240,
          height: 50
        },
        {
          id: 3,
          type: "image",
          label: "大仓",
          image: image4,
          width: 60,
          height: 42
        },
        {
          id: 4,
          type: "image",
          label: "小仓",
          image: image5,
          width: 34,
          height: 42
        },
        {
          id: 5,
          type: "image",
          label: "配料仓",
          image: image1,
          width: 120,
          height: 120
        },
        {
          id: 6,
          type: "image",
          label: "露天堆场",
          image: image3,
          width: 176,
          height: 144
        },
        {
          id: 7,
          type: "image",
          label: "成品仓",
          image: image2,
          width: 212,
          height: 83
        },
        {
          id: 8,
          type: "image",
          label: "计量秤",
          image: scale,
          width: 36,
          height: 36
        },
        {
          id: 9,
          type: "image",
          label: "检化验",
          image: test,
          width: 36,
          height: 36
        },
        {
          id: 10,
          type: "image",
          label: "提示",
          image: tip,
          width: 44,
          height: 20
        }
      ],
      posArr: [
        { id: "inside", text: "居中" },
        { id: "top", text: "上" },
        { id: "bottom", text: "下" },
        { id: "left", text: "左" },
        { id: "right", text: "右" }
      ],
      currentItem: {},
      handleStatus: -1,
      colorDialog: false,
      form: {
        code: "",
        text: "",
        fontSize: 14,
        textFill: "#fff",
        textPosition: "inside",
        lineWidth: 1,
        stroke: "#00FF84",
        fill: "#002815"
      },
      curType: ""
    };
  },
  mounted() {
    // 初始化
    init(this.$refs.configWrap, {
      addModel: () => {
        this.handleStatus = -1;
        return this.currentItem;
      }
    });
    // 定义事件
    on("handleOpen", this.handleOpenStyle);
    clearAll();
    this.getJSOnData();
  },
  beforeDestroy() {
    off("handleOpen");
  },
  methods: {
    handleDragstart(item) {
      this.currentItem = item;
    },
    toggleHandle(handleStatus) {
      this.handleStatus = handleStatus;
      [startDrawLine, startResize, startRectMove, startEdit][handleStatus]();
    },
    clearAllState() {
      if (this.handleStatus > -1) {
        [endDrawLine, endResize, endRectMove, endEdit][this.handleStatus]();
        this.handleStatus = -1;
      }
    },
    // 打开修改样式弹窗
    handleOpenStyle(param) {
      this.curType = param.type;
      mapValue(this.form, param.style);
      this.form.code = param.code;
      this.colorDialog = true;
    },
    // 修改样式确定
    handleModifyStyle() {
      submitStyle(this.form, () => {
        this.$message.success("编辑成功");
        this.colorDialog = false;
      });
    },
    // 清除画布
    handleClear() {
      clearAll();
      localStorage.clear();
    },
    // 保存数据
    handleSave() {
      let rectArr = getRectModelList();
      let lineArr = getLineModelList();
      localStorage.setItem("rectData", JSON.stringify(rectArr));
      localStorage.setItem("lineData", JSON.stringify(lineArr));
      console.log(rectArr);
      console.log(lineArr);
      let obj = {
        rectData: rectArr,
        lineData: lineArr
      };
      var content = JSON.stringify(obj);
      var blob = new Blob([content], {
        type: "application/octet-stream"
      });
      var aTag = document.createElement("a");
      aTag.href = window.URL.createObjectURL(blob);
      aTag.download = "data.json";
      if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        aTag.dispatchEvent(event);
      } else {
        aTag.click();
      }
    },
    // 获取json数据
    getJSOnData() {
      let url = "/static/json/data.json";
      let request = new XMLHttpRequest();
      request.open("get", url);
      request.send(null);
      request.onload = function() {
        if (request.status === 200) {
          let json = JSON.parse(request.responseText);
          let rectData = json.rectData;
          if (rectData) {
            for (let i in rectData) {
              add(rectData[i]);
            }
          }
          let lineData = json.lineData;
          if (lineData) {
            for (let i in lineData) {
              add(lineData[i]);
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
.art-wrap {
  width: 100%;
  .header-wrap {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eee;
    background: #fff;
    .title {
      flex: none;
      padding: 0 20px;
      font-size: 16px;
      color: #333;
    }
    .tools {
      flex: auto;
      display: flex;
      align-items: center;
      .item {
        padding: 5px 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        margin-right: 16px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
      }
      .active {
        border-color: #b3d8ff;
        background: #ecf5ff;
        color: #409eff;
      }
      .danger {
        border-color: #f56c6c;
        color: #f56c6c;
      }
    }
    .button {
      flex: none;
      margin-right: 14px;
    }
  }
  .art-body {
    display: flex;
    width: 100%;
    background: #000f26;
    .header {
      padding: 20px 0 20px 10px;
      font-size: 18px;
      color: #fff;
    }
    .body-left {
      flex: none;
      display: flex;
      flex-direction: column;
      width: 160px;
      height: calc(100vh - 50px);
      border-right: 1px solid #eee;
      overflow: auto;
      .li {
        margin-bottom: 20px;
        img {
          display: block;
          max-width: 100px;
          margin: 0 auto;
        }
        .name {
          padding-top: 5px;
          font-size: 16px;
          color: #fff;
          text-align: center;
        }
        .text {
          width: 80px;
          height: 30px;
          line-height: 26px;
          margin: 0 auto;
          background: #002815;
          border: 2px solid #00ff84;
          font-size: 16px;
          color: #00ff84;
          text-align: center;
        }
      }
    }
  }
  #artBody {
    flex: auto;
    position: relative;
    height: calc(100vh - 50px);
    background: #000f26;
    overflow: auto;
    .wrap {
      width: 100vw;
      height: 100vh;
    }
  }
}
</style>
