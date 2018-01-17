// pages/weather/weather.js
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: 'https://www.art-framework.com/weChat/imgs/user.png',
    list:[],
    sty: '',
    location:'CHSH000000',
    massage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.weather({
      query: {
        location: this.data.location
      },
      success:(res) => {
        let list = res.data.weather
        this.setData({ list })
        //console.log(list)
      }
    })
    var that = this
    wx.getStorage({
      key: 'city',
      success: function (res) {
        let massage = res.data
        that.setData({ massage })
        //console.log(that.data.massage)
      }
    })
  },
  showModel: function () {
    this.setData({
      bgc: 'display: block',
      animation: 'bottom: 0rpx;',
      sty: 'position: fixed;'
    })
  },
  hideModel: function () {
    this.setData({
      bgc: 'display: none',
      animation: 'bottom: -430rpx;',
      sty: ''
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  showTo: function (e) {
    var townName = e.currentTarget.dataset.id;
    var all = this.data.massage;
    for(var i=0;i<all.length;i++){
      if (all[i].townName == townName || all[i].townEN == townName){
        api.weather({
          query:{
            location: all[i].townID
          },
          success: (res) => {
            let list = res.data.weather
            let location = list[0].city_id
            this.setData({ 
              list,
              location 
             })
            this.hideInput()
          }
        })
      }
    }
    
    
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
    api.weather({
      query: {
        location: this.data.location
      },
      success: (res) => {
        let list = res.data.weather
        this.setData({ list })
        //console.log(list)
        wx.stopPullDownRefresh()
      }
    })
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