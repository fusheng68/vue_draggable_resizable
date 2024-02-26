<template>
  <div class="pagedesign" >
    <div class="left">
      <el-tabs type="border-card" tab-position="left" style="height: 98vh">
        <el-tab-pane :label="$t('text')">
          <div class="text_selection">
            <div class="text1" draggable @click="addtext(1)">{{$t('title1')}}</div>
            <div class="text2" @click="addtext(2)">{{$t('title2')}}</div>
            <div class="text3" @click="addtext(3)">{{$t('title3')}}</div>
            <div class="text4" @click="addtext(4)">{{$t('title4')}}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('shape')">
          <div class="shape">
            <div class="shape1" @click="addshape(1)">
              <div class="box" draggable></div>
            </div>
            <div class="shape2" @click="addshape(2)">
              <div class="box"></div>
            </div>
            <div class="shape3" @click="addshape(3)">
              <div class="box"></div>
            </div>
            <div class="shape4" @click="addshape(4)">
              <div class="box"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('picture')">
          <div class="image">
            <img
              draggable
              v-for="(item, index) in images"
              :key="index"
              :src="item.src"
              alt=""
              @click="addImg(item)"
            />
            <div class="updata">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="afterImg"
                :show-file-list="false"
              >
                <el-button type="primary">
                  {{$t('upload')}}<i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="con">
      <div class="contentbg" 
          :style="{
            height: backdrop.height + 'px',
            width: backdrop.width + 'px',
            zoom: backdrop.zoom,
          }">
        <div
          ref="content"
          class="content"
          
          :style="{
            height: backdrop.height + 'px',
            width: backdrop.width + 'px',
            'background-color': backdrop.backgroung,
          }"
        >
          <vue-draggable-resizable
            v-for="(item, index) in view"
            id="view"
            :key="item.id"
            class="view"
            :x="item.left"
            :y="item.top"
            :w="item.width"
            :h="item.height"
            :z="item.z_index"
            :minw="10"
            :minh="10"
            :class-name="'vdr' + ' ' + 'boxsa' + item.id"
            :class="border_none ? 'borderNone' : ''"
            :parent="true"
            :grid="[1, 1]"
            @resizing="onResize"
            @dragging="onDrag"
            @mousedown="setBefor(item,index)"
            @mouseleave="setNew(item)"
            @mouseup="onmouseup(item)"
          >
            <div
              v-if="item.type != 'img'"
              :style="{
                height: item.height + 'px',
                width: item.width + 'px',
                color: item.color,
                'font-size': item.size + 'px',
                'font-weight': item.font_weight,
                'border-width': item.border_width + 'px',
                'border-style': item.border_style,
                'border-color': item.border_color,
                'background-color': item.background_color,
                'border-radius': item.radius + 'px',
                'z-index': item.z_index,
              }"
              
            >
              {{ item.value }}
            </div>
            <img
              v-if="item.type === 'img'"
              :src="item.src"
              :style="{
                'object-fit': 'fill',
                top: item.top + 'px',
                left: item.left + 'px',
                height: item.height + 'px',
                width: item.width + 'px',
                color: item.color,
                'font-size': item.size + 'px',
                'font-weight': item.font_weight,
                'border-width': item.border_width + 'px',
                'border-style': item.border_style,
                'border-color': item.border_color,
                'background-color': item.background_color,
                'border-radius': item.radius + 'px',
                'z-index': item.z_index,
              }"
              
            />
          </vue-draggable-resizable>
        </div>
      </div>
      <!-- 回撤 -->
      <div class="moreMenu">
        <div class="oper">
          <el-button class="lineBtn" @click="back" :disabled="BackBtn" size="small" type="info" :icon="Back">{{$t('revoke')}}</el-button>
        </div>
        <div class="oper">
          <el-button class="lineBtn" @click="redo" :disabled="RightBtn" size="small" type="info" :icon="Right">{{$t('redo')}}</el-button>
        </div>
      </div>
      <!-- 国际化 -->
      <div class="internationalization">
        <div class="title">{{$t('selectLanguage')}}</div>
        <div class="list">
          <div v-for="(item,index) in l18nStore.list" :key="item.language"
          @click="change_l18n(index)"
          :class="l18nStore.Index==index?'luag_select luag_con':'luag_con'">{{item.msg}}</div>
        </div>
      </div>
      <div class="dark">
        <el-switch
           v-model="isDark"
           size="large"
           style="--el-switch-on-color: #141414;"
           inline-prompt
           :active-icon="Moon"
           :inactive-icon="Sunny"
         />
      </div>
    </div>
    <div class="right">
      <el-tabs type="border-card">
        <el-tab-pane :label="$t('set')">
          <div v-if="select_index === -1">
            <div class="size">
              {{$t('locationSize')}}
              <div class="size_value">
                <div class="size_x sizeDo">
                  <div class="size_name">x</div>
                  <el-input
                    style="width: 80px"
                    disabled
                    type="number"
                  ></el-input>
                </div>
                <div class="size_y sizeDo">
                  <div class="size_name">y</div>
                  <el-input
                    style="width: 80px"
                    disabled
                    type="number"
                  ></el-input>
                </div>
                <div class="size_w sizeDo">
                  <div class="size_name">{{$t('width')}}</div>
                  <el-input
                    v-model="backdrop.width"
                    style="width: 80px"
                    type="number"
                  ></el-input>
                </div>
                <div class="size_h sizeDo">
                  <div class="size_name">{{$t('height')}}</div>
                  <el-input
                    v-model="backdrop.height"
                    style="width: 80px"
                    type="number"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="style">
              {{$t('styleSet')}}
              <div class="bg_color">
                {{$t('backgroundColor')}}：
                <el-color-picker
                  v-model="backdrop.backgroung"
                  popper-class="color_picker"
                  :predefine="predefineColors"
                ></el-color-picker>
              </div>
              <div>
                {{$t('zoomSize')}}：
                <el-input-number
                  v-model="backdrop.zoom"
                  :step="0.1"
                  :min="0.1"
                  :max="1"
                  @change="handleChange"
                ></el-input-number>
              </div>
            </div>
            <div class="other">
              {{$t('otherset')}}
              <div class="lable">
                <div style="width: 50px">{{$t('name')}}:</div>
                <el-input v-model="backdrop.lable"></el-input>
              </div>
            </div>
          </div>
          <div v-if="select_index >= 0">
            <div class="size">
              {{$t('locationSize')}}
              <div class="size_value">
                <div class="size_x sizeDo">
                  <div class="size_name">x</div>
                  <el-input
                    v-model="view[select_index].left"
                    style="width: 80px"
                    type="number"
                  ></el-input>
                </div>
                <div class="size_y sizeDo">
                  <div class="size_name">y</div>
                  <el-input
                    v-model="view[select_index].top"
                    style="width: 80px"
                    type="number"
                  ></el-input>
                </div>
                <div class="size_w sizeDo">
                  <div class="size_name">{{$t('width')}}</div>
                  <el-input
                    v-model="view[select_index].width"
                    style="width: 80px"
                    type="number"
                  ></el-input>
                </div>
                <div class="size_h sizeDo">
                  <div class="size_name">{{$t('height')}}</div>
                  <el-input
                    v-model="view[select_index].height"
                    style="width: 80px"
                    :disabled="view[select_index].height == null || undefined"
                    type="number"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="style">
              {{$t('styleSet')}}
              <div class="font_size">
                <div v-show="select_type === 'text'">
                  {{$t('size')}}：
                  <el-input
                    v-model="view[select_index].size"
                    style="width: 100px"
                    type="number"
                  >
                    <span slot="suffix" style="line-height: 100%">px</span>
                  </el-input>
                </div>
                <div v-show="select_type === 'rect'">
                  {{$t('borderSize')}}：
                  <el-input
                    v-model="view[select_index].border_width"
                    style="width: 100px"
                    type="number"
                    :min="0"
                  >
                    <span slot="suffix" style="line-height: 100%">px</span>
                  </el-input>
                </div>
                <div v-show="select_type === 'rect'">
                  {{$t('FilletValue')}}：
                  <el-input
                    v-model="view[select_index].radius"
                    style="width: 100px"
                    type="number"
                    :min="0"
                  >
                    <span slot="suffix" style="line-height: 100%">px</span>
                  </el-input>
                </div>
                <div>
                  {{$t('Hierarchy')}}：
                  <el-input-number
                    v-model="view[select_index].z_index"
                    :step="1"
                    :min="1"
                    :max="99"
                    @change="handleChange"
                  ></el-input-number>
                </div>
              </div>
              <div v-show="select_type === 'text'" class="bg_color">
                {{$t('contontColor')}}：
                <el-color-picker
                  v-model="view[select_index].color"
                  popper-class="color_picker"
                  :predefine="predefineColors"
                ></el-color-picker>
              </div>
              <div v-show="select_type === 'rect'" class="bg_color">
                {{$t('contontColor')}}：
                <el-color-picker
                  v-model="view[select_index].background_color"
                  popper-class="color_picker"
                  :predefine="predefineColors"
                ></el-color-picker>
              </div>
              <div v-show="select_type === 'rect'" class="bg_color">
                {{$t('borderColor')}}：
                <el-color-picker
                  v-model="view[select_index].border_color"
                  popper-class="color_picker"
                  :predefine="predefineColors"
                ></el-color-picker>
              </div>

              <div v-show="select_type === 'text'" class="val">
                <div class="lable">{{$t('textContent')}}：</div>
                <el-input
                  v-model="view[select_index].value"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  :placeholder="$t('text_placeholder')"
                >
                </el-input>
              </div>
            </div>
            <div class="other">
              {{$t('otherset')}}
              <div class="lable">
                <div style="width: 50px">{{$t('name')}}:</div>
                <el-input v-model="view[select_index].lable"></el-input>
              </div>
            </div>
          </div>
          <div class="daochu">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="primary"
              @click="exportJson"
            >
              {{$t('export')}}
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('layers')">
          <div class="layers">
            <div
              class="item"
              :class="select_index === -1 ? 'active' : ''"
              @click="select('', -1)"
            >
              {{ backdrop.lable }}
            </div>
            <div
              v-for="(item, index) in view"
              :key="index"
              class="item"
              :class="select_index === index ? 'active' : ''"
              @click="select(item, index)"
            >
              {{ item.lable }}
              <el-popconfirm
                :title="$t('deleteConfirmation')"
                @confirm="deletes(index)"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle></el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="$t('exportSuccess')"
      top="5vh"
      v-model="dialogVisible"
      width="50%"
      :show-close="false"
      center
    >
      <!-- <span>{{ finalData }}</span> -->
      <img
        class="finishedGoods"
        :src="imgUrl"
        alt=""
      />
      <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onCopy">复 制</el-button>
            </span> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="noDialog">{{$t('cancel')}}</el-button>
          <el-button type="primary" @click="Download">{{$t('download')}}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, nextTick, onMounted,computed } from "vue";
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark(false)
const toggleDark = useToggle(isDark)
const {proxy} = getCurrentInstance()
import { Delete,Right,Back,Sunny,Moon } from "@element-plus/icons-vue";
//引入组件 注意和vue2中的路径不同
import VueDraggableResizable from "vue-draggable-resizable/src/components/vue-draggable-resizable.vue";
//引入样式
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import standards from "./pagedesign.js";
import html2canvas from "html2canvas";
import { ElMessage } from "element-plus";
import getImageSize from '../utils/imageSize.js'
// 引入pinia
import {useFlowStore} from '../store/flowStore'
const flowStore = useFlowStore()
// 引入shortid生成id
import shortid from "shortid";


// 引入pinia
import {usel18nStore} from '../store/l18n'
const l18nStore = usel18nStore()
let language = localStorage.getItem('language')||'zh'
l18nStore.Index = l18nStore.list.findIndex(e=>e.language===language)

//国际化多语言切换
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n();
function change_l18n(index){
  l18nStore.Index = index
  locale.value = l18nStore.list[index].language
  localStorage.setItem('language',l18nStore.list[index].language)
  backdrop.lable = t('background')
  standard.text1.value = t('title1')
  standard.text1.lable = t('title1')
  standard.text2.value = t('title2')
  standard.text2.lable = t('title2')
  standard.text3.value = t('title3')
  standard.text3.lable = t('title3')
  standard.text4.value = t('title4')
  standard.text4.lable = t('title4')
  standard.shape1.lable = t('solidRectangle')
  standard.shape2.lable = t('solidCircle')
  standard.shape3.lable = t('hollowRectangle')
  standard.shape4.lable = t('hollowCircle')
}


const standard = reactive(standards);
// const standard = standards
const images = reactive([{src:"http://bearcarimg.codebear.cn/7456f975fccea2d5cce19a82e08912ec3ilFkUx56xsHRcFttsqK2Q!gradual.show",w:200,h:267},{src:"http://bearcarimg.codebear.cn/be123aa0b72465ee503c7ba5c368863bXC6Yu6FwQMPiYF1yk3F2q!gradual.show",w:200,h:267},{src:"http://bearcarimg.codebear.cn/ce6f9ec8a0d9f077930c15b91b82252b7j9z2sowAjxQQjNJ7eMJwO!gradual.show",w:200,h:113},{src:"http://bearcarimg.codebear.cn/e8b71e7857b96c7b0c091b1f7592fea536hoikc99bOmERWGriRQDU!gradual.show",w:200,h:113},{src:"http://bearcarimg.codebear.cn/5de18d7dd61a4c9b055efdabb9f09c836WgCbYTpXrQq9eWgeTXU1s!gradual.show",w:200,h:113}]);
const backdrop = reactive({
  width: 400,
  height: 750,
  zoom: 1,
  backgroung: "#ffffff",
  lable: t('background'),
});
const changeIng = ref(false);
const predefineColors = reactive([
  // 预设颜色
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgb(255, 69, 0)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsv(120, 40, 94)",
  "hsl(181, 100%, 37%)",
  "hsl(209, 100%, 56%)",
  "#c71585",
]);

const fullscreenLoading = ref(false); //加载状态
const dialogVisible = ref(false); //弹窗
const finalData = ref(""); // 生成的数据
const imgUrl = ref(""); // 生成的图片
const border_none = ref(false); // border样式

//           添加功能
let view = ref([]);
// const id = ref(0);
// 添加文字
function addtext(i) {
  const obj = JSON.parse(JSON.stringify(standard[`text${i}`]));
  obj.id = shortid.generate()
  view.value.push(obj);
  view.value[view.value.length - 1].z_index = view.value.length;
  flowStore.addFlow(view.value)
}
// 添加图形
function addshape(i) {
  const obj = JSON.parse(JSON.stringify(standard[`shape${i}`]));
  obj.id = shortid.generate()
  view.value.push(obj);
  view.value[view.value.length - 1].z_index = view.value.length;
  flowStore.addFlow(view.value)
}
// 添加图片
function addImg(item) {
  const obj = {
    src: item.src,
    width: item.w,
    height: item.h,
    top: 0,
    left: 0,
    type: "img",
    lable: "图片",
    id: shortid.generate(),
    z_index: view.value.length + 1,
  };
  view.value.push(obj);
  flowStore.addFlow(view.value)
}

const select_index = ref(-1);
const active_id = ref(-1);
const select_type = ref("");
// // 选择元素
function select(item, i) {
  select_index.value = i;
  active_id.value = item.id;
  select_type.value = item.type;
}
// 删除元素
function deletes(i) {
  select_index.value = -1;
  view.value.splice(i, 1);
}

// 调整大小
function onResize(x, y, width, height) {
  const index = select_index.value;
  view.value[index].top = y;
  view.value[index].left = x;
  view.value[index].width = width;
  view.value[index].height = height;
}
// 拖动组件
function onDrag(x, y) {
  const index = select_index.value;
  view.value[index].top = y;
  view.value[index].left = x;
}

const content = ref(null);
// 导出数据
function exportJson() {

  // 强制刷新
  proxy.$forceUpdate()
  fullscreenLoading.value = true;
  border_none.value = true;
  // onMounted(() => {
  //     console.log(content.value);
  // })
  nextTick(() => {
    // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
    html2canvas(content.value, {
      // width: 30, //截图宽度
      // height: 50, //截图高度
      allowTaint: true,
      backgroundColor: backdrop.backgroung, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
      useCORS: true, // 支持图片跨域
      scale: backdrop.zoom, // 设置放大的倍数
    }).then(function (canvas) {
      // 把生成的base64位图片上传到服务器,生成在线图片地址
      const url = canvas.toDataURL("image/png"); // toDataURL: 图片格式转成 base64
      imgUrl.value = url;
      // canvas.toBlob((blob) => {
      //     _this.blobToImage(blob, data => {
      //     this.imgUrl = data
      //     })
      // }, 'image/png')
    });
  });
  const list = JSON.parse(JSON.stringify(view.value));
  list.sort(function (a, b) {
    return a.z_index - b.z_index;
  });
  const views = [];
  list.forEach((e) => {
    if (e.type === "rect") {
      views.push({
        type: "rect",
        css: {
          top: e.top + "px",
          left: e.left + "px",
          color: e.background_color,
          width: e.width + "px",
          height: e.height + "px",
          borderWidth: e.border_width + "px",
          // border_style:'solid',
          borderColor: e.border_color,
          borderRadius: e.radius + "px",
        },
      });
    }
    if (e.type === "text") {
      const obj = {
        type: "text",
        text: e.value,
        css: {
          top: e.top + "px",
          left: e.left + "px",
          color: e.color,
          width: e.width + "px",
          fontSize: e.size + "px",
          fontWeight: e.font_weight,
        },
      };
      if (e.height) {
        obj.css.height = e.height + "px";
      }
      views.push(obj);
    }
    if (e.type === "img") {
      views.push({
        type: "image",
        url: e.src,
        css: {
          top: e.top + "px",
          left: e.left + "px",
          width: e.width + "px",
          height: e.height + "px",
        },
      });
    }
  });
  const json = {
    background: backdrop.backgroung,
    height: backdrop.height + "px",
    width: backdrop.width + "px",
    views,
  };
  console.log(json);
  finalData.value = JSON.stringify(json);
  setTimeout(() => {
    fullscreenLoading.value = false;
    dialogVisible.value = true;
    border_none.value = false;
  }, 1000);
}

// 修改层级
function handleChange(value, old) {
  proxy.$forceUpdate();
}
//关闭对话框
function noDialog() {
  dialogVisible.value = false;
}
// 下载图片
function Download() {
  phoneDown(imgUrl.value, "海报");
}
function phoneDown(imgsrc, name) {
  //下载图片地址和图片名
  let image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    let a = document.createElement("a"); // 生成一个a元素
    let event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  image.src = imgsrc;
}
// 上传图片
async function afterImg(file) {
  let img = await getImageSize(file.file)
  images.push(img);
    ElMessage({
      message: "上传成功",
      type: "success",
    });
}
let isOperation = false
// 鼠标点击
function setBefor(item,i){
  isOperation = true
  select_index.value = i;
  active_id.value = item.id;
  select_type.value = item.type;
  flowStore.setBefor(item)
}
// 鼠标松开
function onmouseup(item){
  if (isOperation) {
    if (!flowStore.beforOperating) {
      return
    }
    isOperation = false
    flowStore.newOperating = JSON.stringify(item)
    if (flowStore.newOperating === flowStore.beforOperating) {
    }else{
      proxy.$forceUpdate()
      let view_copy = JSON.parse(JSON.stringify(view.value))
      view_copy.forEach(e=>{
        e.id = shortid.generate()
      })
      flowStore.addFlow(view_copy)
    }
  } else {
    
  }
}
// 鼠标移出
function setNew(item){
  if (isOperation) {
    if (!flowStore.beforOperating) {
      return
    }
    isOperation = false
    flowStore.newOperating = JSON.stringify(item)
    if (flowStore.newOperating === flowStore.beforOperating) {
    }else{
      // proxy.$forceUpdate()
      let view_copy = JSON.parse(JSON.stringify(view.value))
      view_copy.forEach(e=>{
        e.id = shortid.generate()
      })
      flowStore.addFlow(view_copy)
    }
  } else {
    
  }
}




//计算按钮状态
let BackBtn = computed(()=>{
  return flowStore.flowIndex==0
})
let RightBtn = computed(()=>{
  return flowStore.flow.length <= flowStore.flowIndex
})

let repaint = ref(true)
//前进和回撤
function back(){
  select_index.value = -1
  if (flowStore.flowIndex == 1) {
    view.value = []
    flowStore.flowIndex--
  } else {
    flowStore.flowIndex--
    view.value = JSON.parse(flowStore.flow[flowStore.flowIndex-1])
  }
}
function redo(){
  view.value = JSON.parse(flowStore.flow[flowStore.flowIndex])
  flowStore.flowIndex++
}





</script>

<style lang="scss" src="./pagedesign.scss" scoped>
</style>
<style lang="scss" scoped>
.pagedesign {
  display: flex;
  justify-content: space-between;
  color: #303133;
  .left {
    flex: 1;
    // width: 300px;
    // height: 100%;
    min-width: 380px;
  }

  .con {
    flex: 2;
    height: 98vh;
    min-width: 500px;
    background-color: var(--el-color-info-light-9);
    overflow: auto;
    position: relative;
    .contentbg{
      margin: 50px auto;
      box-shadow: 1px 1px 10px 3px var(--el-color-info-light-5);
    }
    .content {
      user-select: none;
      
      // transform: scale(0.4);
      // transform-origin: left top;
      // zoom: 0.5;
      position: relative;
      

      .borderNone {
        border: none !important;
      }

      .view {
        box-sizing: border-box;
        div {
          box-sizing: border-box;
        }
      }
    }
    .moreMenu{
      position: absolute;
      top: 40%;
      right: 10px;
      transform: translateY(-50%);
    }
    .internationalization{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 100px;
      text-align: center;
      user-select: none;
      cursor: pointer;
      &:hover .list{
        height: 90px;
      }
      .title{
        background-color: #409eff;
        color: #fff;
        line-height: 30px;
        border-radius: 5px;
        &:hover{
          background-color: #79bbff;
        }
      }
      .list{
        background-color: #fff;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 0 2px 12px #0000001a;
        transition: all 0.3s ease-in-out;
        height: 0px;
        overflow: hidden;
        .luag_con{
          line-height: 30px;
          &:hover{
            background-color: #f5f7fa;
          }
        }
        .luag_select{
          color: #409eff;
        }
      }
    }
    .dark{
      position: absolute;
      top:5px;
      right: 130px;
      width: 50px;
    }
  }

  .right {
    flex: 1;
    min-width: 370px;
    height: 100%;
    
    .size {
      padding-bottom: 20px;
      border-bottom: 1px solid #c8c9cb;

      .size_value {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .sizeDo {
          display: flex;
          flex-direction: column;
          // align-items: center;
          .size_name {
            margin-bottom: 3px;
          }
        }
      }
    }

    .style {
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #c8c9cb;

      .font_size,
      .bg_color,
      .val {
        display: flex;
        align-items: center;
        margin-top: 20px;
        .lable{
          width: 110px;
        }
      }

      .font_size {
        justify-content: space-between;
      }
    }

    .other {
      margin-top: 20px;

      .lable {
        display: flex;
        align-items: center;
        margin-top: 20px;
      }
    }

    .layers {
      .item {
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        background-color: #efefef;
        padding-left: 15px;
        padding-right: 15px;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .delete {
          color: #409eff;
          font-size: 24px;
        }
      }

      .active {
        background-color: #777;
      }
    }

    .daochu {
      margin-top: 50px;
      display: flex;
      justify-content: center;
    }
  }
  
  .finishedGoods{
    margin: auto;
    display: block; 
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,.3);
    max-height: 70vh;
  }
}
</style>
<style scoped>
.left :deep(.el-tabs__item) {
  height: 70px !important;
  line-height: 70px !important;
}

.left :deep(.el-tabs__content) {
  padding-left: 0 !important;
  height: 100%;
}

.left :deep(.el-tab-pane) {
  height: 100%;
}

.right :deep(.el-tabs__nav) {
  width: 100% !important;
}

.right :deep(.el-tabs__item) {
  width: 50% !important;
  text-align: center;
}

.right :deep(.el-tabs--border-card > .el-tabs__header) {
  background-color: #ccc;
}

.right :deep(.el-tabs) {
  height: 100% !important;
}

.style .font_size :deep(.el-input__suffix) {
  display: flex;
  align-items: center;
}

body :deep(.el-color-picker__panel) {
  zoom: 1.25 !important;
}
.oper :deep(.lineBtn){
  flex-direction: column;
  height: auto;
  margin-bottom: 10px;
}
.left :deep(.el-tabs__item){
  padding: 0;
  width: 70px;
  text-align: center;
}
</style>