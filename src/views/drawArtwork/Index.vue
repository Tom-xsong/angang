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
          @mousedown.stop.prevent="handleClick(li)"
        >
          {{ li.label }}
        </li>
        <li
          class="item"
          @click.stop="handleDrawLine"
          :class="{ active: drawLineFlag }"
        >
          绘制线段
        </li>
      </ol>
      <div class="button">
        <el-button size="small" @click.stop="eleData = []">清除</el-button>
        <el-button size="small" type="primary" @click.stop="handleSave"
          >保存</el-button
        >
      </div>
    </div>
    <!-- 鼠标拖动图标 -->
    <div
      class="mouse"
      v-show="showMouse"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    >
      {{ label }}
    </div>
    <!-- 画布 -->
    <div class="art-body" ref="configWrap" @click="bodyClick">
      <template v-for="(item, index) in eleData">
        <template v-if="item.type !== 'polyline'">
          <!-- 线段 -->
          <div
            v-if="item.type === 'line'"
            :key="item.id"
            class="line"
            :class="currentId === item.seriesId ? 'active' : 'inactive'"
            :style="{
              width: item.width + 'px',
              height: item.height + 'px',
              left: item.left + 'px',
              top: item.top + 'px',
              background: item.color
            }"
            @mousedown.prevent="move($event, item)"
            @click="handleItemClick($event, item)"
            @contextmenu.prevent="rightClick($event, item, index)"
          >
            <div
              class="vdr-stick vdr-stick-tl"
              @mousedown.stop.prevent="stickDown($event, 'tl', item)"
            ></div>
            <div
              class="vdr-stick vdr-stick-br"
              @mousedown.stop.prevent="stickDown($event, 'br', item)"
            ></div>
          </div>
          <!-- 实心三角形 -->
          <div
            v-else-if="item.type === 'triangle'"
            :key="item.id"
            class="trig"
            :class="[item.direct + '-trig']"
            :style="{
              left: item.left + 'px',
              top: item.top + 'px'
            }"
            @contextmenu.prevent="rightClick($event, item, index)"
          ></div>
          <!-- 矩形 -->
          <div
            v-else
            :key="item.id"
            class="box"
            :class="[
              currentId === item.seriesId ? 'active' : 'inactive',
              item.type === 'image1' ? 'box1' : ''
            ]"
            :style="{
              width: item.width + 'px',
              height: item.height + 'px',
              left: item.left + 'px',
              top: item.top + 'px',
              borderColor: item.color
            }"
            @mousedown.prevent="move($event, item)"
            @click="handleItemClick($event, item)"
            @contextmenu.prevent="rightClick($event, item, index)"
          >
            <img
              v-if="item.type === 'image1'"
              class="img"
              src="../../assets/image/img1.png"
            />
            <img
              v-else-if="item.type === 'image2'"
              class="img"
              src="../../assets/image/img2.png"
            />
            <span
              class="text"
              :style="{ color: item.type !== 'image1' && item.color }"
              >{{ item.text }}</span
            >
            <div class="size">尺寸 {{ item.width }} x {{ item.height }}</div>
            <div
              class="vdr-stick"
              :class="['vdr-stick-' + li]"
              v-for="li in sticks"
              :key="li"
              @mousedown.stop.prevent="stickDown($event, li, item)"
            ></div>
            <div
              class="vdr-line"
              :class="['vdr-line-' + li]"
              v-for="li in lines"
              :key="li"
              @mousedown.stop.prevent
            ></div>
          </div>
        </template>
      </template>
      <!-- 自定义右键菜单 -->
      <div v-show="menuVisible">
        <ul id="menu" class="menu">
          <li class="menu-item" @click.stop>
            <span class="demonstration">颜色：</span>
            <el-color-picker
              size="small"
              v-model="currentItem.color"
              @change="handleChangeColor"
            ></el-color-picker>
          </li>
          <li
            class="menu-item"
            @click="handleAnimate"
            v-if="currentIndex > -1 && currentItem.type === 'line'"
          >
            {{ currentItem.animate ? "取消动画" : "添加动画" }}
          </li>
          <li
            class="menu-item"
            @click="handleAddText"
            v-if="currentItem.type !== 'line'"
          >
            添加文字
          </li>
          <li class="menu-item" @click="handleDelete">删除</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapValue } from "@/utils/validate";
export default {
  name: "DrawArtwork",
  data() {
    return {
      configData: [
        { type: "device", label: "设备" },
        { type: "image1", label: "图片1" },
        { type: "image2", label: "图片2" },
        { type: "text", label: "文字" }
      ],
      formData: {},
      eleData: [],
      currentId: "",
      sticks: ["tl", "tr", "br", "bl"],
      lines: ["t", "r", "b", "l"],
      label: "",
      mouseX: 0,
      mouseY: 0,
      showMouse: false,
      drawLineFlag: false,
      moveFlag: false,
      oldL: 0,
      oldT: 0,
      menuVisible: false,
      currentIndex: -1,
      currentItem: {}
    };
  },
  mounted() {
    // 计算画布大小
    let refs = this.$refs.configWrap;
    this.parentW = refs.offsetWidth;
    this.parentH = refs.offsetHeight;
    this.top = refs.offsetTop;
    this.left = refs.offsetLeft;
    this.maxL = this.parentW - 200;
    this.maxT = this.parentH - 120;
    this.lineArr = [];
    this.seriesId = ""; // 绘制连续线段的系列id,用于删除的时候判断
    this.timer = null; // 双击事件执行时禁止单击事件
  },
  methods: {
    // 展示类型选择
    handleClick(li) {
      const _this = this;
      this.currentType = li.type;
      this.label = li.label;
      this.showMouse = true;
      document.onmousemove = e => {
        _this.mouseX = e.clientX;
        _this.mouseY = e.clientY;
      };
      document.onmouseup = e => {
        let offleft = e.clientX - _this.left;
        let offTop = e.clientY - _this.top;
        _this.showMouse = false;
        if (
          offleft >= 0 &&
          offleft <= _this.maxL &&
          offTop >= 0 &&
          offTop <= _this.maxT
        ) {
          _this.formData = {
            type: li.type,
            width: 120,
            height: 80,
            left: offleft,
            top: offTop,
            color: "#999"
          };
          _this.$nextTick(() => {
            _this.init();
          });
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 初始化id
    init() {
      let data = Object.assign({}, this.formData);
      let index = this.eleData.findIndex(li => li.id === data.id);
      // 新增线段
      if (data.id) {
        // this.$set(this.eleData, index, data);
        if (index > -1) {
          mapValue(this.eleData[index], data);
        } else {
          this.eleData.push(data);
        }
      } else {
        // 添加设备/图片
        let num = this.eleData.filter(li => li.type == data.type).length + 1;
        data.order = num;
        data.id = data.seriesId = data.type + new Date().getTime();
        data.text =
          this.configData.filter(li => li.type == data.type)[0].label +
          data.order;
        this.eleData.push(data);
      }
    },
    // 选择设备
    handleItemClick(e, item) {
      if (this.drawLineFlag) {
        return;
      }
      this.currentId = item.seriesId;
      e.stopPropagation();
    },
    // 调整元素位置
    move(ev, item) {
      if (this.drawLineFlag) {
        return;
      }
      const _this = this;
      let disX = ev.clientX - item.left;
      let disY = ev.clientY - item.top;
      document.onmousemove = e => {
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        let maxL = _this.parentW - item.width - 2;
        let maxT = _this.parentH - item.height - 2;
        if (left >= 0 && left <= maxL) {
          item.left = left;
        } else if (left < 0) {
          item.left = 0;
        } else {
          item.left = maxL;
        }
        if (top >= 0 && top <= maxT) {
          item.top = top;
        } else if (top < 0) {
          item.top = 0;
        } else {
          item.top = maxT;
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 调整元素大小
    stickDown(ev, stick, item) {
      if (this.drawLineFlag) {
        return;
      }
      const _this = this;
      let oldWidth = item.width;
      let oldHeight = item.height;
      let oldX = ev.clientX;
      let oldY = ev.clientY;
      let oldLeft = item.left;
      let oldTop = item.top;
      document.onmousemove = e => {
        let disY = oldTop + (e.clientY - oldY);
        let disX = oldLeft + (e.clientX - oldX);
        if (disX > oldLeft + oldWidth) {
          disX = oldLeft + oldWidth;
        }
        if (disY > oldTop + oldHeight) {
          disY = oldTop + oldHeight;
        }
        if (stick === "tl") {
          // 左上角
          if (disX < 0) {
            item.left = 0;
          } else {
            item.left = disX;
          }
          if (disY < 0) {
            item.top = 0;
          } else {
            item.top = disY;
          }
          if (item.type === "line") {
            if (item.width === 1) {
              if (disY < 0) {
                item.height = oldHeight + oldTop;
              } else {
                item.height = oldHeight - (e.clientY - oldY);
              }
            } else {
              if (disX < 0) {
                item.width = oldWidth + oldLeft;
              } else {
                item.width = oldWidth - (e.clientX - oldX);
              }
            }
          } else {
            if (disX < 0) {
              item.width = oldWidth + oldLeft;
            } else {
              item.width = oldWidth - (e.clientX - oldX);
            }
            if (disY < 0) {
              item.height = oldHeight + oldTop;
            } else {
              item.height = oldHeight - (e.clientY - oldY);
            }
          }
        } else if (stick === "tr") {
          // 右上角
          let tempW = oldWidth + (e.clientX - oldX);
          if (tempW > _this.parentW - item.left - 10) {
            item.width = _this.parentW - item.left - 10;
          } else {
            item.width = tempW;
          }
          if (disY < 0) {
            item.height = oldHeight + oldTop;
            item.top = 0;
          } else {
            item.height = oldHeight - (e.clientY - oldY);
            item.top = disY;
          }
        } else if (stick === "bl") {
          // 左下角
          if (disX < 0) {
            item.width = oldWidth + oldLeft;
            item.left = 0;
          } else {
            item.width = oldWidth - (e.clientX - oldX);
            item.left = disX;
          }
          let tempH = oldHeight + (e.clientY - oldY);
          if (tempH > _this.parentH - item.top - 4) {
            item.height = _this.parentH - item.top - 4;
          } else {
            item.height = tempH;
          }
        } else if (stick === "br") {
          // 右下角
          if (item.type === "line") {
            if (item.width === 1) {
              let tempH = oldHeight + (e.clientY - oldY);
              if (tempH > _this.parentH - item.top - 4) {
                item.height = _this.parentH - item.top - 4;
              } else {
                item.height = tempH;
              }
            } else {
              let tempW = oldWidth + (e.clientX - oldX);
              if (tempW > _this.parentW - item.left - 10) {
                item.width = _this.parentW - item.left - 10;
              } else {
                item.width = tempW;
              }
            }
          } else {
            let tempW = oldWidth + (e.clientX - oldX);
            if (tempW > _this.parentW - item.left - 10) {
              item.width = _this.parentW - item.left - 10;
            } else {
              item.width = tempW;
            }
            let tempH = oldHeight + (e.clientY - oldY);
            if (tempH > _this.parentH - item.top - 4) {
              item.height = _this.parentH - item.top - 4;
            } else {
              item.height = tempH;
            }
          }
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 绘制线段
    handleDrawLine() {
      this.drawLineFlag = !this.drawLineFlag;
      if (this.drawLineFlag) {
        const _this = this;
        this.lineArr = [];
        this.seriesId = "polyline" + new Date().getTime();
        document.onclick = ev => {
          clearTimeout(_this.timer);
          _this.timer = setTimeout(() => {
            _this.handleDown(ev);
          }, 100);
        };
        document.onmousemove = e => {
          _this.handleMove(e);
        };
        document.ondblclick = e => {
          clearTimeout(_this.timer);
          _this.handleDbclick(e);
          document.onclick = null;
          document.onmousemove = null;
          document.ondblclick = null;
        };
      }
    },
    // 单击鼠标
    handleDown(ev) {
      this.moveFlag = true;
      let x = ev.clientX - this.left;
      let y = ev.clientY - this.top;
      if (this.lineArr.length > 0) {
        let length = this.eleData.length;
        let item = this.eleData[length - 1];
        switch (item.direct) {
          case "t":
            x = item.left;
            y = item.top;
            break;
          case "b":
            x = item.left;
            y = item.top + item.height;
            break;
          case "r":
            x = item.left + item.width;
            y = item.top;
            break;
          case "l":
            x = item.left;
            y = item.top;
            break;
        }
      }
      this.lineArr.push([x, y]);
      this.oldL = x;
      this.oldT = y;
      this.formData = {
        type: "line",
        id: "line" + new Date().getTime(),
        seriesId: this.seriesId,
        order: this.lineArr.length - 1,
        width: 1,
        height: 1,
        left: x,
        top: y,
        color: "#999",
        animate: false
      };
    },
    // 移动鼠标
    handleMove(e) {
      if (!this.moveFlag) {
        return;
      }
      let left = e.clientX - this.left;
      let top = e.clientY - this.top;
      let stick = "";
      let x = Math.abs(left - this.oldL);
      let y = Math.abs(top - this.oldT);
      let angle = (350 * Math.atan(y / x)) / (2 * Math.PI);
      if (left - this.oldL >= 0) {
        if (top - this.oldT <= 0) {
          if (angle >= 45) {
            stick = "t";
          } else {
            stick = "r";
          }
        } else {
          if (angle >= 45) {
            stick = "b";
          } else {
            stick = "r";
          }
        }
      } else {
        if (top - this.oldT <= 0) {
          if (angle >= 45) {
            stick = "t";
          } else {
            stick = "l";
          }
        } else {
          if (angle >= 45) {
            stick = "b";
          } else {
            stick = "l";
          }
        }
      }
      this.formData.direct = stick;
      switch (stick) {
        // 上
        case "t":
          this.formData.top = top;
          this.formData.width = 1;
          this.formData.height = this.oldT - top;
          break;
        // 右
        case "r":
          this.formData.width = left - this.oldL;
          this.formData.height = 1;
          break;
        // 下
        case "b":
          this.formData.width = 1;
          this.formData.height = top - this.oldT;
          break;
        // 左
        case "l":
          this.formData.left = left;
          this.formData.width = this.oldL - left;
          this.formData.height = 1;
          break;
      }
      this.init();
    },
    // 双击鼠标
    handleDbclick(e) {
      this.moveFlag = false;
      this.drawLineFlag = false;
      let x = e.clientX - this.left;
      let y = e.clientY - this.top;
      if (this.lineArr.length > 0) {
        let length = this.eleData.length;
        let item = this.eleData[length - 1];
        switch (item.direct) {
          case "t":
            x = item.left - 7;
            y = item.top;
            break;
          case "b":
            x = item.left - 8;
            y = item.top + item.height - 10;
            break;
          case "r":
            x = item.left + item.width - 10;
            y = item.top - 8;
            break;
          case "l":
            x = item.left - 4;
            y = item.top - 7;
            break;
        }
        this.formData = {
          type: "triangle",
          id: "triangle" + new Date().getTime(),
          seriesId: this.seriesId,
          direct: item.direct,
          width: 5,
          height: 5,
          left: x,
          top: y,
          color: "#999"
        };
        this.init();
      }
    },
    // 右击显示自定义菜单
    rightClick(e, item, index) {
      this.currentIndex = index;
      this.currentItem = item;
      this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector("#menu");
      menu.style.left = e.clientX + "px";
      menu.style.top = e.clientY - this.top + "px";
    },
    // 点击画布
    bodyClick() {
      if (this.drawLineFlag) {
        return;
      }
      this.currentId = "";
      this.menuVisible = false;
    },
    // 修改颜色
    handleChangeColor(color) {
      if (this.currentItem.seriesId) {
        for (let i in this.eleData) {
          if (
            this.eleData[i].seriesId &&
            this.eleData[i].seriesId === this.currentItem.seriesId
          ) {
            this.eleData[i].color = color;
          }
        }
      }
      this.menuVisible = false;
    },
    // 添加动画
    handleAnimate() {
      this.currentItem.animate = !this.currentItem.animate;
      for (let i in this.eleData) {
        if (
          this.eleData[i].type === "line" &&
          this.eleData[i].seriesId === this.currentItem.seriesId
        ) {
          this.eleData[i].animate = this.currentItem.animate;
          break;
        }
      }
    },
    // 添加文字
    handleAddText() {
      this.$prompt("请输入文字", "提示", {
        inputValue: this.currentItem.text
      })
        .then(({ value }) => {
          this.currentItem.text = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 删除元素
    handleDelete() {
      if (this.currentId === this.currentItem.seriesId) {
        this.currentId = "";
      }
      // 删除线段时，连一起画的线段都删除
      if (
        (this.currentItem.type === "line" ||
          this.currentItem.type === "triangle") &&
        this.currentItem.seriesId
      ) {
        let length = this.eleData.length - 1;
        for (let i = length; i >= 0; i--) {
          if (
            this.eleData[i].seriesId &&
            this.eleData[i].seriesId === this.currentItem.seriesId
          ) {
            this.eleData.splice(i, 1);
          }
        }
      } else {
        this.eleData.splice(this.currentIndex, 1);
      }
    },
    // 保存
    handleSave() {
      let length = this.eleData.length;
      if (length) {
        // 先去掉已有的polyline数据
        for (let i = length - 1; i >= 0; i--) {
          if (this.eleData[i].type === "polyline") {
            this.eleData.splice(i, 1);
          }
        }
        let polyArr = [];
        // 先找到系列id
        let ids = new Set(this.eleData.map(li => li.seriesId));
        let serIds = [...ids];
        // 重新生成polyline数据
        for (let i in serIds) {
          let lineArr = this.eleData.filter(li => {
            return li.type === "line" && li.seriesId === serIds[i];
          });
          if (lineArr.length) {
            let points = this.connectLine(lineArr);
            let obj = {
              type: "polyline",
              id: "polyline" + new Date().getTime(),
              seriesId: serIds[i],
              lines: points,
              color: lineArr[0].color,
              animate: lineArr[0].animate
            };
            polyArr.push(obj);
          }
        }
        let data = this.eleData.concat(polyArr);
        localStorage.setItem("artData", JSON.stringify(data));
        console.log(data);
        // window.open("/artView");
      }
    },
    // 拼接线段成数组，通过线段提取坐标
    connectLine(arr) {
      let points = [];
      for (let i = 0; i < arr.length; i++) {
        switch (arr[i].direct) {
          case "t":
            points.push([arr[i].left, arr[i].top + arr[i].height]);
            break;
          case "r":
            points.push([arr[i].left, arr[i].top]);
            break;
          case "b":
            points.push([arr[i].left, arr[i].top]);
            break;
          case "l":
            points.push([arr[i].left + arr[i].width, arr[i].top]);
            break;
        }
        if (i === arr.length - 1) {
          switch (arr[i].direct) {
            case "t":
              points.push([arr[i].left, arr[i].top]);
              break;
            case "r":
              points.push([arr[i].left + arr[i].width, arr[i].top]);
              break;
            case "b":
              points.push([arr[i].left, arr[i].top + arr[i].height]);
              break;
            case "l":
              points.push([arr[i].left, arr[i].top]);
              break;
          }
        }
      }
      return points;
    }
  }
};
</script>

<style lang="scss" scoped>
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
    }
    .button {
      flex: none;
      margin-right: 14px;
    }
  }
  .mouse {
    position: fixed;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 30px;
    border: 1px dashed #aaa;
    border-radius: 4px;
    font-size: 12px;
    color: #aaa;
  }
  .art-body {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 852px;
    background: #fff;
    .box {
      position: absolute;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 1px solid #999;
      background: #fff;
      line-height: 30px;
      font-size: 16px;
      color: #333;
      &:hover {
        .size {
          display: block;
        }
      }
    }
    .box1 {
      text-align: center;
      .text {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
        z-index: 4;
        font-size: 16px;
        color: #fff;
      }
    }
    .img {
      width: 100%;
      height: 100%;
    }
    .size {
      position: absolute;
      right: -70px;
      top: -8px;
      z-index: 4;
      display: none;
      font-size: 12px;
      color: #666;
    }
    .line {
      position: absolute;
      z-index: 3;
      background: #333;
    }
    .active {
      border-color: #169ded;
      .size {
        display: block;
      }
    }
    .inactive {
      .vdr-stick {
        display: none;
      }
    }
    .vdr-stick {
      position: absolute;
      z-index: 2;
      width: 8px;
      height: 8px;
      font-size: 1px;
      border: 2px solid #169ded;
      border-radius: 50%;
      background: #fff;
    }
    // 圆圈
    .vdr-stick-tl {
      left: -4px;
      top: -4px;
      cursor: nwse-resize;
    }
    .vdr-stick-tr {
      right: -4px;
      top: -4px;
      cursor: nesw-resize;
    }
    .vdr-stick-br {
      right: -4px;
      bottom: -4px;
      cursor: nwse-resize;
    }
    .vdr-stick-bl {
      left: -4px;
      bottom: -4px;
      cursor: nesw-resize;
    }
    .vdr-line {
      position: absolute;
      z-index: 2;
      width: 8px;
      height: 8px;
      font-size: 1px;
      border: 2px solid #999;
      border-radius: 50%;
      background: #fff;
    }
    .vdr-line-t {
      left: 50%;
      top: -4px;
    }
    .vdr-line-r {
      top: 50%;
      right: -4px;
    }
    .vdr-line-b {
      left: 50%;
      bottom: -4px;
    }
    .vdr-line-l {
      top: 50%;
      left: -4px;
    }
  }
  .menu {
    position: absolute;
    z-index: 3;
    border-radius: 4px;
    border: 1px solid #eee;
    background-color: #fff;
    padding: 4px 0;
    .menu-item {
      display: flex;
      align-items: center;
      padding: 0 14px;
      line-height: 30px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #409eff;
        background: #ecf5ff;
        border-color: #b3d8ff;
      }
      .demonstration {
        padding-right: 6px;
      }
    }
  }
  .trig {
    position: absolute;
    display: inline-block;
    border-style: solid;
    height: 0;
    width: 0;
  }
  .l-trig {
    border-width: 8px 14px 8px 0;
    border-color: transparent #999 transparent transparent;
  }
  .r-trig {
    border-width: 8px 0 8px 14px;
    border-color: transparent transparent transparent #999;
  }
  .t-trig {
    border-width: 0 8px 14px 8px;
    border-color: transparent transparent #999 transparent;
  }
  .b-trig {
    border-width: 14px 8px 0 8px;
    border-color: #999 transparent transparent transparent;
  }
}
</style>
