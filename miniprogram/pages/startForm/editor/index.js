// 查看事件文档https://developers.weixin.qq.com/miniprogram/dev/api/media/editor/EditorContext.html
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { editorHtml } from '../../../store/userinfo'
const app = getApp();
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '支持文字排版和图片...',
    _focus: false,
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    safeHeight: 0,
    toolBarHeight: 50,
    actContentImg: []
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: editorHtml,
      fields: ['actContentHtml'],
      actions: ['updateActContent']

    })

    const { platform, safeArea, screenHeight} = wx.getSystemInfoSync()
    let safeHeight;
    if (safeArea) {
      safeHeight = (screenHeight - safeArea.bottom);
    } else  {
      safeHeight = 32;
    }
    this._safeHeight = safeHeight;
    let isIOS = platform === 'ios'
    this.setData({ isIOS, safeHeight, toolBarHeight: isIOS ? safeHeight + 50 : 50 })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) {
        return
      }      
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)
    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    if (keyboardHeight === 0) {
      this.setData({
        editorHeight, keyboardHeight,
        toolBarHeight: this.data.isIOS ? 50 + this._safeHeight : 50,
        safeHeight: this._safeHeight,
      })
    } else {
      this.setData({ editorHeight, keyboardHeight, 
        toolBarHeight: 50,
        safeHeight: 0, 
      })
    }
  },
  // 编辑器初始化完成时触发
  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function(res) {
      console.log(res, that.data.actContentHtml)

      that.editorCtx = res.context;
      if(Object.keys(that.data.actContentHtml).length > 0) {
        that.editorCtx.setContents({
          html: that.data.actContentHtml,
          complete: (res)=>{
            console.log(res,'set')
          },
          fail: (res)=>{
            console.log(res,'fail')
          }
        })
      }
    }).exec();

    // if(Object.keys(this.data.actContentHtml).length === 0) {
    //   wx.createSelectorQuery().select('#editor').context(res =>{
    //     res.context.setContents({
    //       html: this.data.actContentHtml
    //     })
    //   }).exec()
    // }
  },
  undo() {
    this.editorCtx.undo();
  },
  redo() {
    this.editorCtx.redo();
  },
  format(e) {
    console.log(e)
    let {
      name,
      value
    } = e.target.dataset;
    if (!name) return;
    // console.log('format', name, value)
    this.editorCtx.format(name, value);
  },
  // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
  onStatusChange(e) {
    const formats = e.detail;
    this.setData({
      formats
    });
  },
  // 插入分割线
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    });
  },
  // 清除
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    });
  },
  // 移除样式
  removeFormat() {
    this.editorCtx.removeFormat();
  },
  // 插入当前日期
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    });
  },
  // 插入图片
  insertImage() {
    // if(this.data.actContentImg.length >8) {

    // }
    wx.chooseImage({
      count: 1,
      success: (res) => {
        console.log(res.tempFilePaths[0])
        this.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          // width:'80%',
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: () => {
            console.log('insert image success')
          }
        })
      }
    });
  },

  toDeatil() {
    const that = this
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.delta, res.html)
        // app.globalData.html = res.html
        // that.setData({
        //   actContentHtml: res.html
        // })
        this.updateActContent(res.html)
        wx.navigateBack()
        console.log(res.html)
      },
      fail: (res) => {
        console.log("fail：" , res);
      }
    });
  },
  bindeditorBlur() {
    EditorContext.blur()
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  }
})