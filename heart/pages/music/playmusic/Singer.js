// pages/music/playmusic/playmusic.js
import api from '../../../api/api.js'
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicitem: [],
    Imgurl: 'https://www.art-framework.com/weChat/imgs/stop.png',
    Imgclass: '',
    index: 0,
    maxnum: 0,
    active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  let musicitem = options
    //  musicitem.url = decodeURIComponent(musicitem.url)
    //  this.setData({musicitem})
    //  console.log(musicitem)
    var index = Number(options.index)
    this.setData({ index })
    //console.log(this.data.index)
    api.getMusic({
      query: {
        keyword: options.keyword
      },
      success: (res) => {
        var musicitem = res.data.showapi_res_body.pagebean.contentlist
        this.setData({ musicitem })
        //console.log(this.data.musicitem)
        this.play()
      }
    })


  },
  playmusic: function () {
    if (backgroundAudioManager.paused) {
      this.setData({ Imgurl: 'https://www.art-framework.com/weChat/imgs/stop.png' })
      backgroundAudioManager.play()
    } else {
      this.setData({ Imgurl: 'https://www.art-framework.com/weChat/imgs/play.png' })
      this.stop()
    }

  },
  play: function () {
    var that = this
    backgroundAudioManager.src = this.data.musicitem[this.data.index].m4a
    //console.log(backgroundAudioManager.src)
    backgroundAudioManager.play()
    backgroundAudioManager.onEnded(function () {
      that.next()
    })
    backgroundAudioManager.onError(function () {
      that.next()
    })
  },
  
  stop: function () {
    backgroundAudioManager.pause()
  },
  prev: function () {
    if (this.data.index == 0) {
      var index = 0
      this.setData({ index })
    } else {
      var index = Number(this.data.index) - 1
      this.setData({ index })
      this.play()
    }
    console.log(index)
  },
  next: function () {
    if (this.data.index < this.data.musicitem.length - 1) {
      var index = Number(this.data.index) + 1
      this.setData({ index })
    } else {
      this.setData({ index: 0 })
    }
    this.play()
  },
  //滑动设置进度
  sliderchange: function (e) {
    var active = Math.ceil(e.detail.value * 0.000001)
    backgroundAudioManager.seek(active)
    //console.log(active)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    backgroundAudioManager.onTimeUpdate(function () {
      var maxnum = Math.ceil(backgroundAudioManager.duration * 1000000)
      var active = Math.ceil(backgroundAudioManager.currentTime * 1000000)
      that.setData({ maxnum, active })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})