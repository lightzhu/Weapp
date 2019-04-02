Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemWidth:0,
    scrollHeight: 0,
  },
  attached: function () {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          itemWidth: parseInt(res.windowWidth/3),
          scrollHeight: res.windowWidth,
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    galleryShow: function (e) {
      this.triggerEvent('mytap', { current: e.currentTarget.dataset.url });
    }
  }
})