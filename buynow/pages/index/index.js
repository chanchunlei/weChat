
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [
      { url: "url", title: "欢迎来到百脑汇订货" },
      { url: "url", title: "欢迎来到乐之" },
      { url: "url", title: "欢迎来到百脑汇旗舰店" }],
    classify: [],
    goodslist:[],
    codeleft: 1,
    objectId: 0
  },
  // 跳转到搜索页
  showInput: function () {
   wx.navigateTo({
     url: '../search/secrch',
   })
  },
  // 点击事件
  showList: function (e) {
    // 拿到objectId，作为访问子类的参数
    var objectId = e.currentTarget.dataset.objectId;
    var index = parseInt(e.currentTarget.dataset.index);
    this.setClass(index);
    this.setData({ objectId})
  },
  //toggle nav的样式
  setClass: function (index) {
    var style = [];
    for (var i = 0; i < this.data.classify.length; i++) {
      style[i] = '';
    }
    style[index] = 'normal';
    this.setData({
      style: style
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
    var that = this
    api.getList({
      query: {
        code: 123456789
      },
      success: function (res) {
        let classify = res.data.data.left
        let goodslist = res.data.data.right
        that.setData({classify,goodslist})
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideToast()
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