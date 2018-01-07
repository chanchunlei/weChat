

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [
      { url: "url", title: "欢迎来到百脑汇订货" },
      { url: "url", title: "欢迎来到乐之" },
      { url: "url", title: "欢迎来到百脑汇旗舰店" }],
    classify: [
      { id: 1, title: "智能商品" },
      { id: 2, title: "智能商品" },
      { id: 3, title: "智能商品" },
      { id: 4, title: "智能商品" },
      { id: 5, title: "智能商品" },
      { id: 6, title: "智能商品" }
    ]
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
  // 加入购物车
  JoinShopcar: function () {
    console.log("测试冒泡");
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