import api from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    massage:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var index = Number(options.idx)
    wx.getStorage({
      key: 'travel',
      success: function (res) {
        let massage = res.data[index]
        massage.traffic = massage.traffic.replace(/\\n/g, "\n")
        massage.spend = massage.spend.replace(/\\n/g, "\n")
        that.setData({massage})
        //console.log(that.data.massage)
        wx.setNavigationBarTitle({
          title: that.data.massage.place
        })
      }
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