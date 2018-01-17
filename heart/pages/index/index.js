
//index.js
//获取应用实例
import api from '../../api/api.js'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    imgUrls: 'https://www.art-framework.com/weChat/imgs/user.png',
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    list: [],
    bgc:'',
    animation: ''
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    
  },
  showModel: function () {
    this.setData({
      bgc: 'display: block',
      animation: 'bottom: 0rpx;'
    })
  },
  hideModel: function () {
    this.setData({
      bgc: 'display: none',
      animation: 'bottom: -430rpx;'
    })
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
    //console.log(requestTask.x);
    var that = this
    api.getImages({
      success: function (res) {
        let list = res.data
        that.setData({ list })
        //console.log(that.data.list)
        wx.setStorage({
          key: "travel",
          data: that.data.list
        })
      }
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

  },

  
});