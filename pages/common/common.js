// common.js
Page({
	data: {
    url: ''
	},
	onLoad(params){
		const that = this;
		const url = params.url;
    that.setData({
      url: url
    })
	},
})