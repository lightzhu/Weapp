// mvdetail.js
Page({
	data: {
		hideText: true,
		hideClass: 'up',
    movieItem:null,
    scrollHeight: 0,
	},
	onLoad(params){
		const that = this;
		const id = params.id,
      url = 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290';
    wx.getSystemInfo({
      success(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
		wx.request({
			url: url,
      data: { movieId: id},
			success(res){
				console.log(res);
        that.setData({
          movieItem: res.data.data
        })
        let detail = res.data.data.basic;
        detail.img = detail.img.replace("http","https");
        detail.type=detail.type.join(" / ");
        detail.stages = detail.stageImg.list.map((item)=>{
          return({
            imgId: item.imgId,
            imgUrl: item.imgUrl.replace("http","https")
          })
        })
        console.log(detail);
				that.setData({
					detail: detail
				});
			}
		})
	},
  mytap: function (e) {
    //通过事件接收
    let that=this;
    let urls = that.data.detail.stages.map((item) => (item.imgUrl));
    wx.previewImage({
      current: e.detail.current, // 当前显示图片的http链接
      urls: urls
    })
  }
})