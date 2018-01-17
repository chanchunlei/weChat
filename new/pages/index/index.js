
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
    cityId:[],
    list: [],
    bgc:'',
    animation: '',
    isScroll: true
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
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
    api.getcityId({
      success: (res) => {
        let cityId = res.data
        for (var i = 0, len = cityId.length; i < len; ++i) {
          cityId[i].open = false
        }
        this.setData({ cityId })
        //console.log(cityId)
      }
    })
  },
  showModel: function () {
    this.setData({
      bgc: 'display: block',
      animation: 'bottom: 0rpx;',
      isScroll: false
    })
  },
  hideModel: function () {
    this.setData({
      bgc: 'display: none',
      animation: 'bottom: -430rpx;',
      isScroll: true
    })
  },
  kindToggle: function (e) {
    var cityid = e.currentTarget.id, cityId = this.data.cityId;
    for (var i = 0, len = cityId.length; i < len; ++i) {
      if (cityId[i].cityID == cityid) {
        cityId[i].open = !cityId[i].open
      } else {
        cityId[i].open = false
      }
    }
    this.setData({
      cityId: cityId,
      cityid
    });
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