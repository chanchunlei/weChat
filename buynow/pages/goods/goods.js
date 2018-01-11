// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isFalse: false,
     MoreFalse: false,
     ScreenFalse: false
  },
  // 跳转到搜索页
  showInput: function () {
    wx.navigateTo({
      url: '../search/secrch',
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  //弹框
  showMore: function() {
    //console.log(this.data.isFalse)
    var isFalse = !this.data.MoreFalse;
    var MoreFalse = !this.data.MoreFalse;
    var ScreenFalse = false;
    this.setData({
      isFalse, MoreFalse, ScreenFalse
    });
  },
  showScreen: function() {
    var isFalse = !this.data.ScreenFalse;
    var MoreFalse = false;
    var ScreenFalse = !this.data.ScreenFalse;
    this.setData({
      isFalse, MoreFalse, ScreenFalse
    });
  },
  HideAll: function() {
    var isFalse = false;
    var MoreFalse = false;
    var ScreenFalse = false;
    this.setData({
      isFalse, MoreFalse, ScreenFalse
    });
  },
  // 跳转到详细页
  showDetail: function () {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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