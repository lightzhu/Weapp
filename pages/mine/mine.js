// mine.js
Page({
	data: {

	},
  luckyDog:function(e){
    console.log(e);
    wx.showToast({
      title: e.detail.target,
      icon: 'success',
      duration: 3000
    });
  }
})
