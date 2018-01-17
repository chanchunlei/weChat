// pages/music/musicList/list.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [],
    navName: '',
    num: 30,
    keyword: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ navName: options.keyword, keyword: options.keyword })
    //console.log(options)
    api.getMusic({
      query: {
        keyword: options.keyword
      },
      success: (res) => {
          let musicList = res.data.showapi_res_body.pagebean.contentlist
          this.setData({ musicList })
          //console.log(res.data)
      }
    })
  },
  playmusic: function (e) {
    let idx = e.currentTarget.dataset.index
    //console.log(idx)
    //idx.url = encodeURIComponent(idx.url)  //参数是 URI 的一部分进行转码
    wx.navigateTo({
      url: '../playmusic/Singer?index=' + idx + '&keyword=' + this.data.keyword,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navName
    })
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
    var num = this.data.num + 30
    this.setData({ num })
    //console.log(this.data.num)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})