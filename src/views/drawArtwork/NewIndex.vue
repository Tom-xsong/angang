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
        <li class="item danger" @click="clearAllState">清除状态</li>
      </ol>

      <div class="art-set">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="画布宽:">
            <el-input
              class="input"
              @change="changeArt"
              v-model="canvasSize.width"
              placeholder="请输入宽"
            ></el-input>
          </el-form-item>
          <el-form-item label="画布高:">
            <el-input
              class="input"
              @change="changeArt"
              v-model="canvasSize.height"
              placeholder="请输入高"
            ></el-input>
          </el-form-item>

          <el-form-item label="当前作业区图:">
            <el-select
              @change="changeArtCode"
              v-model="artCode"
              placeholder="选择图"
            >
              <el-option
                v-for="item in artArr"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogVisible = true" class="submit-btn" type="primary"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button size="small" @click.stop="handleClear(true)">清除</el-button>
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
        <header-logo></header-logo>
        <div class="wrap" ref="configWrap" @dragstart.prevent></div>
      </div>
    </div>

    <!-- 数据提交弹框 -->
    <el-dialog :title="artObj.code==''?'添加':'修改'" :visible.sync="dialogVisible" width="20%">
     
      <el-form  label-width="80px">
        <el-form-item label="name:">
          <el-input v-model="artObj.name"></el-input>
        </el-form-item>
        <el-form-item label="code:">
          <el-input  v-model="artObj.code"></el-input>
        </el-form-item>
        <el-form-item label="id:">
          <el-input v-model="artObj.id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改矩形样式 -->
    <el-dialog
      title="修改样式"
      :visible.sync="colorDialog"
      close-on-click-modal
      width="400px"
    >
      <el-form size="small" :model="form" label-width="100px">
        <el-form-item
          label="设备编码："
          v-if="curType !== 'line' && curType !== 'text'"
        >
          <el-input v-model="form.code" :maxlength="100" clearable></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input
            type="textarea"
            :rows="2"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="form.text"
            :maxlength="100"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="关联code："
          v-if="curLabel == '检化验' || curLabel == '计量秤'"
        >
          <el-input
            v-model="form.associatedCode"
            :maxlength="100"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          label="设备类型： "
          v-if="curType == 'rect' || curType == 'image'"
        >
          <el-input
            v-model="form.equipmentType"
            :maxlength="100"
            clearable
            :disabled="false"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="设备状态： "
          v-if="curType == 'image' && curLabel !== '皮带'"
        >
          <el-select v-model="form.state" placeholder="选择状态" clearable>
            <el-option label="报错" value="error"></el-option>
            <el-option label="正常" value="success"></el-option>
            <el-option label="警告" value="warning"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备状态： "
          v-if="curType == 'image' && curLabel == '皮带'"
        >
          <el-select v-model="form.state" placeholder="选择状态" clearable>
            <el-option label="停止" value="stop"></el-option>
            <el-option label="正常" value="success"></el-option>
            <el-option label="警告" value="warning"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span="15">
            <el-form-item label="文字大小：" v-if="curLabel !== 'line'">
              <el-input-number
                v-model="form.fontSize"
                :min="10"
                :step="2"
                :step-strictly="true"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="文字颜色：" v-if="curLabel !== 'line'">
              <el-color-picker v-model="form.textFill"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="文字位置："
          v-if="curType == 'rect' || curType == 'image'"
        >
          <el-radio-group v-model="form.textPosition">
            <el-radio-button v-for="li in posArr" :label="li.id" :key="li.id">{{
              li.text
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="15">
            <el-form-item
              label="边框宽度："
              v-if="curType == 'rect' || curType == 'line'"
            >
              <el-input-number
                v-model="form.lineWidth"
                :min="0"
                :max="10"
                :step-strictly="true"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item
              label="边框颜色："
              v-if="curType == 'rect' || curType == 'line'"
            >
              <el-color-picker v-model="form.stroke"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="背景颜色：" v-if="curType == 'rect'">
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
  submitStyle,
} from "./flowClient/index";
import {
  add,
  getZR,
  getRectModelList,
  getLineModelList,
  getTextModelList,
  clearAll,
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

import { addOrUpdate, workArtList, workArtdetail } from "../../api/home";
export default {
  name: "Test",
  components: {
    HeaderLogo: () => import("../../components/HeaderLogo"),
  },
  data() {
    return {
      configData: [
        {
          id: 1,
          type: "rect",
          label: "矩形",
          width: 70,
          height: 30,
        },

        {
          id: 10,
          type: "rect",
          label: "虚线框",
          width: 70,
          height: 30,
        },

        {
          id: 11,
          type: "text",
          label: "文本",
          width: 70,
          height: 30,
        },

        {
          id: 2,
          type: "image",
          label: "皮带",
          image: belt,
          width: 96,
          height: 21,
        },
        {
          id: 3,
          type: "image",
          label: "大仓",
          image: image1,
          width: 44,
          height: 32,
        },
        {
          id: 4,
          type: "image",
          label: "小仓",
          image: image2,
          width: 24,
          height: 26,
        },
        {
          id: 5,
          type: "image",
          label: "配料仓",
          image: image4,
          width: 52,
          height: 52,
        },
        {
          id: 6,
          type: "image",
          label: "成品仓",
          image: image5,
          width: 96,
          height: 38,
        },
        {
          id: 7,
          type: "image",
          label: "露天堆场",
          image: image3,
          width: 72,
          height: 60,
        },
        {
          id: 8,
          type: "image",
          label: "计量秤",
          image: scale,
          width: 18,
          height: 18,
        },

        {
          id: 9,
          type: "image",
          label: "检化验",
          image: test,
          width: 18,
          height: 18,
        },
      ],
      posArr: [
        { id: "inside", text: "居中" },
        { id: "top", text: "上" },
        { id: "bottom", text: "下" },
        { id: "left", text: "左" },
        { id: "right", text: "右" },
      ],

      currentItem: {},
      handleStatus: -1,
      colorDialog: false,
      dialogVisible: false,
      canvasSize: {
        width: 1920,
        height: 1080,
      },
      artArr: [],
      artCode: "",
      artObj:{
        name:"",
        code:"",
        id:"",
      },

      form: {
        code: "",
        equipmentType: "",
        text: "",
        associatedCode: "",
        state: "",
        fontSize: 14,
        textFill: "#fff",
        textPosition: "inside",
        lineWidth: 1,
        stroke: "#00FF84",
        fill: "#002815",
      },
      curType: "",
      curLabel: "",
    };
  },
  mounted() {
    // 初始化
    init(this.$refs.configWrap, {
      addModel: () => {
        this.handleStatus = -1;
        return this.currentItem;
      },
    });
    // 定义事件
    on("handleOpen", this.handleOpenStyle);
    clearAll();
    this.getJSOnData();

    //查询列表
    workArtList().then((res) => {
      this.artArr = res.data.data;
    });
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
      this.curLabel = param.label;
      mapValue(this.form, param.style);
      this.form.code = param.code;
      this.form.equipmentType = param.equipmentType;
      this.form.text = param.text;
      this.form.associatedCode = param.associatedCode;
      this.form.state = param.state;
      this.colorDialog = true;
    },

    
    // 修改样式确定
    handleModifyStyle() {
      submitStyle(this.form, () => {
        this.$message.success("编辑成功");
        this.colorDialog = false;
      });
    },

    //修改画布大小
    changeArt() {
      let zr = getZR();
      zr.resize({
        width: this.canvasSize.width,
        height: this.canvasSize.height,
      });
    },

    // 清除画布
    handleClear(bool) {
      clearAll();
      this.artObj={
        name:"",
        code:"",
        id:"",
      }

      if(bool){
        this.artCode="";
        console.log(bool)
      }
      
     
      // localStorage.clear();
     
    },

    //添加或修改图
    dataSubmit() {
      let rectArr = getRectModelList();
      let lineArr = getLineModelList();
      let textArr = getTextModelList();
      let artSize = {
        width: this.canvasSize.width,
        height: this.canvasSize.height,
      };

      let obj = {
        rectData: rectArr,
        lineData: lineArr,
        textData: textArr,
        artData: artSize,
      };

      let content = JSON.stringify(obj);

      let parmas = {
        body: content,
        code: this.artObj.code,
        id: this.artObj.id,
        name: this.artObj.name,
      };

      addOrUpdate(parmas).then((res) => {
        if(res.data.code=="00000"){
           this.$message.success("编辑成功");
           this.dialogVisible=false;
        }
      });
    },

    //切换图
    changeArtCode() {
      workArtdetail({ code: this.artCode }).then((res) => {
        this.handleClear(false);
        let data = JSON.parse(res.data.data.body);
        
        let rectData = data.rectData;
        if (rectData) {
          for (let i in rectData) {
            add(rectData[i]);
          }
        }
        let lineData = data.lineData;
        if (lineData) {
          for (let i in lineData) {
            add(lineData[i]);
          }
        }

        let textData = data.textData;
        if (textData) {
          for (let i in textData) {
            add(textData[i]);
          }
        }
        console.log(data.artData)

        this.canvasSize = data.artData;
        this.changeArt();
        this.artObj = res.data.data
      });
    },

    // 保存数据
    handleSave() {
      let rectArr = getRectModelList();
      let lineArr = getLineModelList();
      let textArr = getTextModelList();

      // localStorage.setItem("rectData", JSON.stringify(rectArr));
      // localStorage.setItem("lineData", JSON.stringify(lineArr));
      // console.log(rectArr);
      // console.log(lineArr);
      let obj = {
        rectData: rectArr,
        lineData: lineArr,
        textData: textArr,
      };
      var content = JSON.stringify(obj);
      var blob = new Blob([content], {
        type: "application/octet-stream",
      });
      var aTag = document.createElement("a");
      aTag.href = window.URL.createObjectURL(blob);
      aTag.download = "pellet-data.json";
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
      let url = "/static/json/pellet-data.json";
      let request = new XMLHttpRequest();
      request.open("get", url);
      request.send(null);
      request.onload = function () {
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

          let textData = json.textData;
          if (textData) {
            for (let i in textData) {
              add(textData[i]);
            }
          }
        }
      };
    },
  },
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

    .art-set {
      margin-top: 20px;
      flex: auto;
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
      height: 1080px;
    }
  }
}

.art-wrap ::v-deep .input .el-input__inner {
  width: 100px;
  height: 30px !important;
}

.art-wrap ::v-deep .input .el-input__inner {
  width: 100px;
  height: 30px !important;
}

.art-wrap ::v-deep .el-select .el-input__inner {
  width: 200px;
  height: 30px;
}
.art-wrap ::v-deep .submit-btn {
  width: 50px;
  height: 30px;
  padding: 0;
}
</style>
