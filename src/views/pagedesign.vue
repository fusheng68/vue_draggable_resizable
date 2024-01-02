<template>
  <div class="pagedesign" :style="{'height':screenHeight}">
    <div class="left" :style="{'height':screenHeight}">
      <el-tabs type="border-card" tab-position="left" style="height: 100%;">
        <el-tab-pane label="文本">
          <div class="text_selection">
            <div class="text1" @click="addtext(1)">
              大标题
            </div>
            <div class="text2" @click="addtext(2)">
              标题
            </div>
            <div class="text3" @click="addtext(3)">
              副标题
            </div>
            <div class="text4" @click="addtext(4)">
              正文内容
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="形状">
          <div class="shape">
            <div class="shape1" @click="addshape(1)">
              <div class="box"></div>
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
        <el-tab-pane label="图片">
          <div class="image">
            <img v-for="(item,index) in images" :key="index" :src="item" alt="" @click="addImg(item)">
            <div class="updata">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="afterImg"
                :show-file-list="false"
              >
                <el-button type="primary">
                  上传<i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="con">
      <div ref="content" class="content" :style="{height:backdrop.height+'px',width:backdrop.width+'px','background-color':backdrop.backgroung,zoom:backdrop.zoom}">
        <vue-draggable-resizable
          v-for="(item,index) in view"
          id="view" :key="item.id" class="view"
          :w="item.width"
          :h="item.height"
          :z="item.z_index"
          :minw="10"
          :minh="10"
          :class-name="'vdr'+' '+'boxsa'+item.id"
          :class="border_none?'borderNone':'' "
          :parent="true"
          :grid="[1,1]"

          @resizing="onResize"
          @dragging="onDrag">
          <div v-if="item.type!='img'" :style="{height:item.height+'px',width:item.width+'px',color:item.color,
                                                'font-size':item.size+'px','font-weight':item.font_weight,'border-width':item.border_width+'px','border-style':item.border_style,'border-color':item.border_color,
                                                'background-color':item.background_color,'border-radius':item.radius+'px','z-index':item.z_index}" @click="select(item,index)">
            {{ item.value }}
          </div>
          <img v-if="item.type==='img'" :src="item.src" :style="{'object-fit':'fill',top:item.top+'px',left:item.left+'px',height:item.height+'px',width:item.width+'px',color:item.color,
                                                                 'font-size':item.size+'px','font-weight':item.font_weight,'border-width':item.border_width+'px','border-style':item.border_style,'border-color':item.border_color,
                                                                 'background-color':item.background_color,'border-radius':item.radius+'px','z-index':item.z_index}" @click="select(item,index)">
        </vue-draggable-resizable>
      </div>
    </div>
    <div class="right">
      <el-tabs type="border-card">
        <el-tab-pane label="设置">
          <div v-if="select_index === -1">
            <div class="size">
              位置大小
              <div class="size_value">
                <div class="size_x sizeDo">
                  <div class="size_name">
                    x
                  </div>
                  <el-input v-model="backdrop.x" style="width:80px" disabled type="number"></el-input>
                </div>
                <div class="size_y sizeDo">
                  <div class="size_name">
                    y
                  </div>
                  <el-input v-model="backdrop.y" style="width:80px" disabled type="number"></el-input>
                </div>
                <div class="size_w sizeDo">
                  <div class="size_name">
                    宽
                  </div>
                  <el-input v-model="backdrop.width" style="width:80px" type="number"></el-input>
                </div>
                <div class="size_h sizeDo">
                  <div class="size_name">
                    高
                  </div>
                  <el-input v-model="backdrop.height" style="width:80px" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="style">
              样式设置
              <div class="bg_color">
                背景颜色
                <el-color-picker v-model="backdrop.backgroung" popper-class="color_picker" :predefine="predefineColors" @click="color_picker_open"></el-color-picker>
              </div>
              <div>
                缩放大小：
                <el-input-number v-model="backdrop.zoom" :step="0.1"
                                 :min="0.1" :max="1" @change="handleChange"></el-input-number>
              </div>
            </div>
            <div class="other">
              其他设置
              <div class="lable">
                <div style="width:50px">
                  名称:
                </div>
                <el-input v-model="backdrop.lable"></el-input>
              </div>
            </div>
          </div>
          <div v-if="select_index >= 0">
            <div class="size">
              位置大小
              <div class="size_value">
                <div class="size_x sizeDo">
                  <div class="size_name">
                    x
                  </div>
                  <el-input v-model="view[select_index].left" style="width:80px" type="number" @input="inputChange(view[select_index].left,view[select_index].top)"></el-input>
                </div>
                <div class="size_y sizeDo">
                  <div class="size_name">
                    y
                  </div>
                  <el-input v-model="view[select_index].top" style="width:80px" type="number" @input="inputChange(view[select_index].left,view[select_index].top)"></el-input>
                </div>
                <div class="size_w sizeDo">
                  <div class="size_name">
                    宽
                  </div>
                  <el-input v-model="view[select_index].width" style="width:80px" type="number"></el-input>
                </div>
                <div class="size_h sizeDo">
                  <div class="size_name">
                    高
                  </div>
                  <el-input v-model="view[select_index].height" style="width:80px" :disabled="view[select_index].height == null||undefined" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="style">
              样式设置
              <div class="font_size">
                <div v-show="select_type === 'text'">
                  大小：
                  <el-input
                    v-model="view[select_index].size" style="width:100px"
                    type="number">
                    <span slot="suffix" style="line-height:100%">px</span>
                  </el-input>
                </div>
                <div v-show="select_type === 'rect'">
                  边框大小：
                  <el-input
                    v-model="view[select_index].border_width" style="width:100px" type="number"
                    :min="0">
                    <span slot="suffix" style="line-height:100%">px</span>
                  </el-input>
                </div>
                <div v-show="select_type === 'rect'">
                  圆角值：
                  <el-input
                    v-model="view[select_index].radius" style="width:100px" type="number"
                    :min="0">
                    <span slot="suffix" style="line-height:100%">px</span>
                  </el-input>
                </div>
                <div>
                  层级：
                  <el-input-number v-model="view[select_index].z_index" size="small"
                                   :step="1" :min="1"
                                   :max="99" @change="handleChange"></el-input-number>
                </div>
              </div>
              <div v-show="select_type === 'text'" class="bg_color">
                内容颜色
                <el-color-picker v-model="view[select_index].color" popper-class="color_picker" :predefine="predefineColors"></el-color-picker>
              </div>
              <div v-show="select_type === 'rect'" class="bg_color">
                内容颜色
                <el-color-picker v-model="view[select_index].background_color" popper-class="color_picker" :predefine="predefineColors"></el-color-picker>
              </div>
              <div v-show="select_type === 'rect'" class="bg_color">
                边框颜色
                <el-color-picker v-model="view[select_index].border_color" popper-class="color_picker" :predefine="predefineColors"></el-color-picker>
              </div>

              <div v-show="select_type === 'text'" class="val">
                文本内容
                <el-input
                  v-model="view[select_index].value"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容">
                </el-input>
              </div>
            </div>
            <div class="other">
              其他设置
              <div class="lable">
                <div style="width:50px">
                  名称:
                </div>
                <el-input v-model="view[select_index].lable"></el-input>
              </div>
            </div>
          </div>
          <div class="daochu">
            <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="exportJson">
              导出
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图层">
          <div class="layers">
            <div class="item" :class="select_index=== -1?'active':'' " @click="select('', -1)">
              {{ backdrop.lable }}
            </div>
            <div v-for="(item,index) in view" :key="index" class="item" :class="select_index=== index?'active':'' " @click="select(item,index)">
              {{ item.lable }}
              <!-- <el-popconfirm
                title="确定删除这个图层吗？"
                @confirm="deletes(index)"
              >
                <el-icon><DeleteFilled /></el-icon>
                <i slot="reference" class="el-icon-delete-solid delete"></i>
              </el-popconfirm> -->
              <el-popconfirm 
                title="确定删除这个图层吗？"
                @confirm="deletes(index)">
                <template #reference>
                  <el-button>删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="导出成功"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false">
      <span>{{ finalData }}</span>
      <img style="margin: auto; display:block;" :src="imgUrl" alt="">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCopy">复 制</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import html2canvas from 'html2canvas'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import standard from './pagedesign.js'
import categoryApi from '../../api/category/category'
export default {
  components: {
    VueDraggableResizable
  },
  data () {
    return {
      // zoom: document.body.style.zoom / 1,
      standard, // 规格数据
      images: ['https://api.oms.v-union.cn/upload/pic/20220613/2022061315443527897.jpg', 'https://api.oms.v-union.cn/upload/pic/20220613/2022061315444454968.jpg'],
      backdrop: {
        width: 750,
        height: 1334,
        zoom: 0.5,
        backgroung: '#ffffff',
        lable: '背景页'
      },
      view: [],
      select_index: -1,
      select_type: '',
      changeIng: false,
      predefineColors: [ // 预设颜色
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgb(255, 69, 0)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsv(120, 40, 94)',
        'hsl(181, 100%, 37%)',
        'hsl(209, 100%, 56%)',
        '#c71585'
      ],
      id: 0, // 累加id
      active_id: -1,
      fullscreenLoading: false, // 加载状态
      dialogVisible: false, // 弹窗
      finalData: '', // 生成的数据
      imgUrl: '', // 生成的图片
      border_none: false, // border样式
      screenHeight: document.body.clientHeight * document.body.style.zoom + 'px' // 屏幕高度
    }
  },
  computed: {
    getRatio () {
      const zoom = 1 / document.body.style.zoom
      return zoom
    }
  },
  mounted () {
    // let color_picker = document.getElementsByClassName('color_picker')[0]
    // let zoom = 1 / document.body.style.zoom
    // color_picker.style.zoom = zoom
  },
  methods: {
    // 选择元素
    select (item, i) {
      console.log(this.view)
      this.select_index = i
      this.active_id = item.id
      this.select_type = item.type
    },
    tobg () {
      this.select_index = -1
    },
    color_picker_open () {

    },
    // 修改层级
    handleChange (value, old) {
      this.$forceUpdate()
    },
    // 输入内容处理
    input_process (val, site) {
      console.log(val, site)
      return
      if (this.select_index >= 0) {
        this.view[this.select_index][`${site}`] = parseInt(val)
      } else {
        this.backdrop[`${site}`] = parseInt(val)
        console.log(this.backdrop)
      }
    },
    inputChange (x, y) {
      const name = `boxsa${this.active_id}`
      const boxx = document.getElementsByClassName(name)[0]
      boxx.style.transform = `translate(${x}px, ${y}px)`
      console.log(this.view)
    },
    // 添加文字
    addtext (i) {
      const obj = JSON.parse(JSON.stringify(this.standard[`text${i}`]))
      this.view.push(obj)
      this.view[this.view.length - 1].z_index = this.view.length
      this.view[this.view.length - 1].id = this.id
      this.id++
    },
    // 添加图形
    addshape (i) {
      const obj = JSON.parse(JSON.stringify(this.standard[`shape${i}`]))
      this.view.push(obj)
      this.view[this.view.length - 1].z_index = this.view.length
      this.view[this.view.length - 1].id = this.id
      this.id++
    },
    // 添加图片
    addImg (item) {
      const obj = {
        src: item,
        width: 200,
        height: 200,
        top: 0,
        left: 0,
        type: 'img',
        lable: '图片',
        id: this.id,
        z_index: this.view.length + 1
      }
      this.id++
      this.view.push(obj)
    },
    // 上传图片
    afterImg (file) {
      // console.log(file)
      const from = {
        file: file.file,
        custom_name: 'haibao',
        type: file.file.type
      }
      categoryApi.addcustomimg(from).then(data => {
        console.log(data)
        if (data.code === 200) {
          this.images.push(data.data.url)
        } else {
          console.log('请求错误')
        }
      })
    },
    // 删除元素
    deletes (i) {
      this.select_index = -1
      this.view.splice(i, 1)
    },
    fileOrBlobToDataURL (obj, cb) {
      const a = new FileReader()
      a.readAsDataURL(obj)
      a.onload = e => {
        cb(e.target.result)
      }
    },
    blobToImage (blob, cb) {
      this.fileOrBlobToDataURL(blob, dataurl => {
        cb(dataurl)
      })
    },
    // 导出数据
    exportJson () {
      // 强制刷新
      // this.$forceUpdate()
      this.fullscreenLoading = true
      this.border_none = true
      const _this = this
      this.$nextTick(() => {
        // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
        html2canvas(this.$refs.content, {
          // width: 30, //截图宽度
          // height: 50, //截图高度
          allowTaint: true,
          backgroundColor: null, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
          useCORS: true, // 支持图片跨域
          scale: this.backdrop.zoom // 设置放大的倍数
        }).then((canvas) => {
          // 把生成的base64位图片上传到服务器,生成在线图片地址
          const url = canvas.toDataURL('image/png') // toDataURL: 图片格式转成 base64
          this.imgUrl = url
          // canvas.toBlob((blob) => {
          //     _this.blobToImage(blob, data => {
          //     this.imgUrl = data
          //     })
          // }, 'image/png')
        })
      })
      const list = JSON.parse(JSON.stringify(this.view))
      list.sort(function (a, b) { return a.z_index - b.z_index })
      const views = []
      list.forEach(e => {
        if (e.type === 'rect') {
          views.push({
            type: 'rect',
            css: {
              top: e.top + 'px',
              left: e.left + 'px',
              color: e.background_color,
              width: e.width + 'px',
              height: e.height + 'px',
              borderWidth: e.border_width + 'px',
              // border_style:'solid',
              borderColor: e.border_color,
              borderRadius: e.radius + 'px'
            }
          })
        }
        if (e.type === 'text') {
          const obj = {
            type: 'text',
            text: e.value,
            css: {
              top: e.top + 'px',
              left: e.left + 'px',
              color: e.color,
              width: e.width + 'px',
              fontSize: e.size + 'px',
              fontWeight: e.font_weight
            }
          }
          if (e.height) {
            obj.css.height = e.height + 'px'
          }
          views.push(obj)
        }
        if (e.type === 'img') {
          views.push({
            type: 'image',
            url: e.src,
            css: {
              top: e.top + 'px',
              left: e.left + 'px',
              width: e.width + 'px',
              height: e.height + 'px'
            }
          })
        }
      })
      const json = {
        background: this.backdrop.backgroung,
        height: this.backdrop.height + 'px',
        width: this.backdrop.width + 'px',
        views
      }
      this.finalData = JSON.stringify(json)
      setTimeout(() => {
        this.fullscreenLoading = false
        this.dialogVisible = true
        this.border_none = false
        this.$router.push({
          name:'haibao',
          query:{
            json: JSON.stringify(json)
          }
        })
      }, 1000)
    },
    // 调整大小
    onResize (x, y, width, height) {
      const index = this.select_index
      this.view[index].top = y
      this.view[index].left = x
      this.view[index].width = width
      this.view[index].height = height
    },
    // 拖动组件
    onDrag (x, y) {
      const index = this.select_index
      this.view[index].top = y
      this.view[index].left = x
    },
    // 复制文本
    onCopy () {
      navigator.clipboard.writeText(this.finalData).then(() => {
        this.$message.success('复制成功')
      })
        .catch(err => {
          this.$message.success(err)
        })
    }

  }
}
</script>
<style lang="scss" src="./pagedesign.scss" scoped></style>
<style lang="scss" scoped>
.pagedesign{
    height: 100vh;
    display: flex;
    justify-content: space-between;
    .left{
        flex: 1;
        // width: 300px;
        // height: 100%;
        min-width: 380px;
        background-color: #f00;
    }
    .con{
        flex: 2;
        height: 100%;
        min-width: 500px;
        background-color: #f5f5f5;
        overflow:auto;
        .content{
            user-select: none;
            margin: 50px auto;
            // transform: scale(0.4);
            // transform-origin: left top;
            // zoom: 0.5;
            position: relative;
            box-shadow: 1px 1px 10px 3px rgb(0 0 0 / 10%);
            .borderNone{
                border:none !important ;
            }
            .view{
                box-sizing: border-box;
            }
        }
    }
    .right{
        flex: 1;
        // width: 300px;
        height: 100%;
        .size{
            padding-bottom: 20px;
            border-bottom: 1px solid #c8c9cb;
            .size_value{
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                .sizeDo{
                    display: flex;
                    flex-direction: column;
                    // align-items: center;
                    .size_name{
                        margin-bottom: 3px;
                    }
                }
            }
        }
        .style{
            margin-top: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #c8c9cb;
            .font_size,
            .bg_color,
            .val{
                display: flex;
                align-items: center;
                margin-top: 20px;
            }
            .font_size{
                justify-content: space-between;
            }
        }
        .other{
            margin-top: 20px;
            .lable{
                display: flex;
                align-items: center;
                margin-top: 20px;
            }
        }
        .layers{
            .item{
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
                .delete{
                    color: #409eff;
                    font-size: 24px;
                }
            }
            .active{
                background-color: #777;
            }
        }
        .daochu{
            margin-top: 50px;
            display: flex;
            justify-content: center;
        }
    }

}
</style>
<style scoped>
.left >>> .el-tabs__item{
    height: 70px !important;
    line-height: 70px !important;
}
.left >>> .el-tabs__content{
    padding-left: 0 !important;
    height: 100%;
}
.left >>> .el-tab-pane{
    height: 100%;
}
.right >>> .el-tabs__nav{
    width: 100% !important;
}
.right >>> .el-tabs__item{
    width: 50% !important;
    text-align: center;
}
.right >>> .el-tabs--border-card>.el-tabs__header{
    background-color: #ccc;
}

.right >>> .el-tabs{
    height: 100% !important;
}
.style .font_size >>> .el-input__suffix{
    display: flex;
    align-items: center;
}
body /deep/ .el-color-picker__panel{
    zoom: 1.25 !important;
}
</style>
