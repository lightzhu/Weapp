Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    widthCan: {
      type: Number,
      value: 200
    },
    heightCan: {
      type: Number,
      value: 200
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    itemWidth: 0,
    scrollHeight: 0,
    _default: {
      outerCircle: {
        color: '#F44F48'
      },
      innerCircle: {
        color: '#f4ad26'
      },
      dots: ['#fbf0a9', '#fbb936'],
      disk: ['#FFF7C5', '#94D7A7', '#FFF7C5', '#94D7A7', '#FFF7C5', '#94D7A7', '#FFF7C5'],
      title: {
        color: '#5c1e08',
        font: '12px Arial'
      }
    },
    initData: {
      "success": true,
      "list": [{
          "id": 100,
          "name": "未中奖",
          "image": "/images/wei.png",
          "rank": 2,
        },
        {
          "id": 101,
          "name": "微波炉",
          "image": "/images/xiang.png",
          "rank": 1,
        },
        {
          "id": 103,
          "name": "10元移动话费",
          "image": "/images/tenyuan.png",
          "rank": 4,
        },
        {
          "id": 102,
          "name": "血压计",
          "image": "/images/xueya.png",
          "rank": 3,
        },
        {
          "id": 104,
          "name": "保温杯",
          "image": "/images/baowen.png",
          "rank": 5,
        },
        {
          "id": 105,
          "name": "10元移动话费",
          "image": "/images/tenyuan.png",
          "rank": 6,
        }
      ]
    }
  },
  attached: function() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          itemWidth: parseInt(res.windowWidth / 3),
          scrollHeight: res.windowWidth,
        })
      }
    })
    that.initPan();
    // setTimeout(()=>this.lotteryGo(100,function(){
    //   console.log("抽奖结束");
    // }),3000)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    galleryShow: function(e) {
      this.triggerEvent('mytap', {
        current: e.currentTarget.dataset.url
      });
    },
    initPan: function (angelTo) {
      var basesize = 14;
      var imgwidth = 3.4 * basesize;
      var imgheight = 3.2 * basesize;
      var positionX = 1.8 * basesize;
      var positionY = 6.8 * basesize; 
      const context = wx.createCanvasContext('firstCanvas', this);
      angelTo = angelTo || 0;
      context.clearRect(0, 0, this.properties.widthCan, this.properties.heightCan);
      // 平分角度
      let num = this.data.initData.list.length;
      let angel = (2 * Math.PI / 360) * (360 / num);
      let startAngel = 2 * Math.PI / 360 * (-90);
      let endAngel = 2 * Math.PI / 360 * (-90) + angel;
      // 圆心, 
      let x = this.properties.widthCan / 2;
      let y = this.properties.heightCan / 2;
      context.translate(x, y);
      // 旋转画布
      context.rotate(angelTo * Math.PI / 180);
      // 画里转盘                
      let colors = this.data._default.disk;
      let images = this.data.initData.list;
      let imageAngel = angel / 2;
      for (let i = 0; i < num; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        context.arc(0, 0, x - 5, startAngel, endAngel, false);
        context.setFillStyle(colors[i]);
        context.fill();
        context.closePath();
        context.setLineWidth(5);
        context.setStrokeStyle("#4EC9A1");
        context.stroke();
        context.rotate(imageAngel);
        context.drawImage(images[i].image, -positionX, -positionY, imgwidth, imgheight);
        context.rotate(-imageAngel);
        imageAngel += angel;
        startAngel = endAngel;
        endAngel += angel;
        context.restore();
      }
      // 画外圆
      context.beginPath();
      context.setLineWidth(6)
      context.setStrokeStyle(this.data._default.outerCircle.color);
      context.arc(0, 0, x - 4, 0, 2 * Math.PI, true)
      context.stroke();
      context.draw();
      context.save();
    },
    lotteryGo: function (angel, callback) {
      angel = angel || 0;
      angel = 360 - angel;
      angel += 720;
      // 基值（减速）
      var baseStep = 30;
      // 起始滚动速度
      var baseSpeed = 0.3;
      // 步长
      var count = 1;
      var _this = this;
      var timer = setInterval(function () {
        _this.initPan(count)
        if (count == angel) {
          clearInterval(timer)
          if (typeof callback == "function") {
            callback()
          }
        }
        count = count + baseStep * (((angel - count) / angel) > baseSpeed ? baseSpeed : ((angel - count) / angel))
        if (angel - count < 0.5) {
          count = angel
        }
      }, 25)
    },
    startLottery(){
      this.lotteryGo(80,()=>{
        this.triggerEvent('luckyDog', { target: "中奖了！" });
      })
    }
  },
})