//cinima.js
Page({
  data: {
    scrollHeight: 0,
    loading: true,
    newsList:[],
    newsType: ['top', 'shehui', 'guonei', 'yule', 'tiyu', 'junshi', 'keji', 'caijing', 'shishang'], //新闻类型
    newsTypeIndex: 0,
    newsAPI: 'http://v.juhe.cn/toutiao/index?key=d6b425961ff54c50c8a4fb7ceb1d63bd',
  },
  onLoad: function() {
    let that=this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
    this.loadNews();
  },
  // 滑动到底部，加载更多
  lower(e) {
    let newIndex = this.data.newsTypeIndex;
    if (newIndex < this.data.newsType.length) {
      this.setData({
        loading: true,
        newsTypeIndex: ++newIndex
      });
      this.loadNews();
    } else {
      console.log('加载完了');
    }
  },
  //滑动到头部
  upper(e) {
    console.log('划到顶了。')
  },
  //加载影院
  loadNews() {
    const that = this;
    wx.request({
      url: that.data.newsAPI,
      method: "GET",
      data: {type: that.data.newsType[that.data.newsTypeIndex]},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let newsList = res.data.result.data;
        newsList.forEach(function(val,key){
          newsList.thumbnail_pic_s = val.thumbnail_pic_s.replace('http', 'https');
        })
        that.setData({
          loading:false,
          newsList: that.data.newsList.concat(newsList)
        })
      }
    })
  },
  bindDetail(event) {
    const url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../common/common?url=' + url
    })
  }
})