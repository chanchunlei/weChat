// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
checkboxChange: function(e) {
  console.log('checkbox发生change事件，携带value值为：', e.detail.value)
},
bindMinus: function (e) {
  var index = parseInt(e.currentTarget.dataset.index);
  var num = this.data.carts[index].num;
  // 如果只有1件了，就不允许再减了
  if (num > 1) {
    num--;
  }
  // 只有大于一件的时候，才能normal状态，否则disable状态
  var minusStatus = num <= 1 ? 'disabled' : 'normal';
  // 购物车数据
  var carts = this.data.carts;
  carts[index].num = num;
  // 按钮可用状态
  var minusStatuses = this.data.minusStatuses;
  minusStatuses[index] = minusStatus;
  // 将数值与状态写回
  this.setData({
    carts: carts,
    minusStatuses: minusStatuses
  });
},
bindPlus: function (e) {
  var index = parseInt(e.currentTarget.dataset.index);
  var num = this.data.carts[index].num;
  // 自增
  num++;
  // 只有大于一件的时候，才能normal状态，否则disable状态
  var minusStatus = num <= 1 ? 'disabled' : 'normal';
  // 购物车数据
  var carts = this.data.carts;
  carts[index].num = num;
  // 按钮可用状态
  var minusStatuses = this.data.minusStatuses;
  minusStatuses[index] = minusStatus;
  // 将数值与状态写回
  this.setData({
    carts: carts,
    minusStatuses: minusStatuses
  });
},
// 跳转到详细页
showDetail: function () {
  wx.navigateTo({
    url: '../detail/detail',
  })
},
// 跳转至填写订单
FillIn: function () {
  wx.navigateTo({
    url: 'FillIn/FillIn',
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