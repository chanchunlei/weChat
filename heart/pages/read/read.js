// pages/read/read.js
import api from '../../api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: 'https://www.art-framework.com/weChat/imgs/user.png',
    bgc: '',
    animation: '',
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    carousel: [],
    articles: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getCarousel({
      success:(res) => {
        if (res.data.res === 0) {
          let carousel = res.data.data
          this.setData({ carousel })
          //console.log(res.data)
        }
      }
    }),
    api.getLastArticles({
      success: (res) => {
        if (res.data.res === 0) {
          let articles = res.data.data
          this.setData({ articles })
          //console.log(this.data.articles)
        }
      }
    })
  },
  tapEssay: function (e) {
    let id = e.currentTarget.dataset.id
    //console.log(id);
    wx.navigateTo({
      url: 'essay/essay?id=' + id
    })
  },
  tapQuestion: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'question/question?id=' + id
    })
  },
  tapSerial: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'serial/serial?id=' + id
    })
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
    wx.clearStorage()
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