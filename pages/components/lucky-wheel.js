Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {
    redEnvelopeList: [{
      list: [{
        text: "一",
        prizeImg: '../../images/red_envelope1.png',
      }, {
        text: "二",
        prizeImg: '../../images/red_envelope2.png',
      }, {
        text: "三",
        prizeImg: '../../images/red_envelope3.png'
      }, {
        text: "一",
        prizeImg: '../../images/red_envelope1.png'
      }, {
        text: "五"
      }, {
        text: "六"
      }, {
        text: "七"
      }, {
        text: "八"
      }, {
        text: "九"
      }, {
        text: '十',
        prize: true,
      }]
    }, 
    {
      list: [{
        text: "一",
        prizeImg: '../../images/red_envelope1.png'
      }, {
        text: "二",
        prizeImg: '../../images/red_envelope2.png'
      }, {
        text: "三",
        prizeImg: '../../images/red_envelope3.png'
      }, {
        text: "二",
        prizeImg: '../../images/red_envelope2.png'
      }, {
        text: "五"
      }, {
        text: "六"
      }, {
        text: "七"
      }, {
        text: "八"
      }, {
        text: "九"
      }, {
        text: '十',
        prize: true,
      }]
    },
     {
      list: [{
        text: "一",
        prizeImg: '../../images/red_envelope1.png'
      }, {
        text: "二",
        prizeImg: '../../images/red_envelope2.png'
      }, {
        text: "三",
        prizeImg: '../../images/red_envelope3.png'
      }, {
        text: "三",
        prizeImg: '../../images/red_envelope3.png'
      }, {
        text: "五"
      }, {
        text: "六"
      }, {
        text: "七"
      }, {
        text: "八"
      }, {
        text: "九"
      }, {
        text: '十',
        prize: true,
      }]
    }
    ],
    animation: -20,
    time: 5,
  },
  attached: function() {
    const that = this;
  },
  /**
   * 组件的方法列表
   */
  methods: {
    sort(data) {
      //数组重排
      return data.sort((a, b) => {
        if (a.prize || b.prize) {

        } else {
          return a.text.charCodeAt() + parseInt(Math.random() * 1000) > b.text.charCodeAt() + parseInt(Math.random() * 1000)
        }
      })
    },
    /**
     * @params start 抽奖事件
     */
    start() {
      const that = this;
      //  重置数组顺序后转动两圈
      that.setData({
        redEnvelopeList: [{
          list: that.sort(that.data.redEnvelopeList[0].list)
          },
          {
            list: that.sort(that.data.redEnvelopeList[1].list)
          },
          {
            list: that.sort(that.data.redEnvelopeList[2].list)
          }
        ]
      }, () => {
        that.setData({
          animation: that.data.animation + 720
        })
      })
    }
  },
})