//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    films: [],
    // 控制分页（展示数量）
    offset: 0,
    limit: 10,
    scrollHeight: 0,
    loading: true,
    userInfo: {},
    cityId: 290
  },
  onLoad: function() {
    const that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // });
    wx.getSystemInfo({
      success(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
    this.loadFilms();
  },

  // 滑动到底部，加载更多
  lower(e) {
    // this.setData({
    //   loading: true
    // })
    // this.loadFilms()
    console.log('划到底了。')
  },
  //滑动到头部
  bindscrolltoupper(e) {
    console.log('划到顶了。')
  },
  //加载电影
  loadFilms() {
    const that = this;
    wx.request({
      url: 'https://api-m.mtime.cn/Showtime/LocationMovies.api?=',
      data: {
        locationId: that.data.cityId,
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let films = res.data.ms;
        films.forEach(function(val, key) {
          val.img = val.img.replace("http", "https");
        })
        // console.log(res.data.ms);
        that.setData({
          films: films,
          offset: that.data.offset + 10,
          loading: false,
        });
      }
    })
  },
  bindDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../mvdetail/mvdetail?id=' + id
    })
  }
})