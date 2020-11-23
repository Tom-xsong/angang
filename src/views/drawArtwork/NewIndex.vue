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
  endEdit
} from "./flowClient/index";
import {
  getRectModelList,
  getLineModelList,
  clearAll
} from "./flowClient/render/render";

export default {
  name: "Test",
  data() {
    return {
      configData: [{ type: "rect", label: "设备" }],
      currentItem: {},
      handleStatus: -1
    };
  },
  mounted() {
    init(this.$refs.configWrap, {
      addModel: () => {
        this.handleStatus = -1;
        return this.currentItem.type;
      }
    });
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
    handleClear() {
      clearAll();
    },
    handleSave() {
      let rectArr = getRectModelList();
      let lineArr = getLineModelList();
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
</style>
