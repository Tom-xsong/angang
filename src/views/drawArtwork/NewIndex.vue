<template>
  <div class="art-wrap">
    <div class="header-wrap">
      <div class="title">钢铁工艺流程图配置</div>
      <!-- 工具栏 -->
      <ol class="tools">
        <li
          class="item"
          v-for="(li, index) in configData"
          :key="index"
          draggable
          @dragstart="handleDragstart(li)"
        >
          {{ li.label }}
        </li>
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
    <!-- 画布 -->
    <div id="artBody">
      <div class="wrap" ref="configWrap" @dragstart.prevent></div>
    </div>
    <!-- 修改矩形样式 -->
    <el-dialog
      title="修改样式"
      :visible.sync="colorDialog"
      close-on-click-modal
      width="400px"
    >
      <el-form size="small" :model="form" label-width="100px">
        <el-form-item label="边框宽度：">
          <el-input-number
            v-model="form.lineWidth"
            :min="0"
            :max="10"
            :step-strictly="true"
            class="inpW"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="边框颜色：">
          <el-color-picker v-model="form.stroke"></el-color-picker>
        </el-form-item>
        <el-form-item label="背景颜色：" v-if="curType !== 'line'">
          <el-color-picker v-model="form.fill"></el-color-picker>
        </el-form-item>
        <el-form-item label="添加文字：">
          <el-input
            v-model="form.text"
            :maxlength="100"
            class="inpW"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="文字大小：">
          <el-input-number
            v-model="form.fontSize"
            :min="12"
            :step="2"
            :step-strictly="true"
            class="inpW"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="文字颜色：">
          <el-color-picker v-model="form.textFill"></el-color-picker>
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

export default {
  name: "Test",
  data() {
    return {
      configData: [
        { type: "rect", label: "物料仓" },
        { type: "circle", label: "皮带秤" }
      ],
      currentItem: {},
      handleStatus: -1,
      colorDialog: false,
      form: {
        lineWidth: 1,
        stroke: "#999",
        fill: "#fff",
        text: "",
        fontSize: 14,
        textFill: "#999"
      },
      curType: ""
    };
  },
  mounted() {
    // 初始化
    init(this.$refs.configWrap, {
      addModel: () => {
        this.handleStatus = -1;
        return this.currentItem.type;
      }
    });
    // 定义事件
    on("handleOpen", this.handleOpenStyle);
    // 绘制之前画好的流程图
    let rectData = JSON.parse(localStorage.getItem("rectData"));
    if (rectData) {
      for (let i in rectData) {
        add(rectData[i]);
      }
    }
    let lineData = JSON.parse(localStorage.getItem("lineData"));
    if (lineData) {
      for (let i in lineData) {
        add(lineData[i]);
      }
    }
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
    margin-bottom: 20px;
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
  #artBody {
    position: relative;
    width: 100%;
    height: calc(100vh - 70px);
    background: #fff;
    .wrap {
      width: 100%;
      height: 100%;
    }
  }
}
.inpW {
  width: 260px;
}
</style>
