import api from '../../api/api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
     scroll: true,
     isFalse: false,
     ScreenFalse: false,
     goodslist:[],
     classname: {
       all: "active",
       price: "",
       sales: "",
       screen: ""
     },
     Price: 1,
     Page: 0,
     on:{
       delta1: "",
       delta2: ""
     }
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
    this.showAll();
  },
  showAll: function () {//综合
    var classname = { all: "active",price: "",sales: "",screen: ""};
    var on = { delta1: "", delta2: "" };
    var that = this;
    api.getAll({
      query: {
        page: 0
      },
      success: (res) => {
        let goodslist = res.data.data
        that.setData({ goodslist, classname, on })
        console.log(res.data)
      }
    })
    that.HideAll();
  },
  showPrice: function (e) {//价格
    var Price = e.currentTarget.dataset.price
    if (Price==1){
      Price = 0;
      var on = { delta1: "sanjiao", delta2: "" };
    }else{
      Price = 1;
      var on = { delta1: "", delta2: "sanjiao" };
    }
    var classname = {all: "",price: "active",sales: "",screen: ""};
    var that = this;
    api.getPriseSort({
      query: {
        page: 0,
        price: Price
      },
      success: (res) => {
        let goodslist = res.data.data
        that.setData({ goodslist, classname, on, Price })
        console.log(res.data)
      }
    })
    that.HideAll();
  },
  showMore: function () {  //促销
    var classname = { all: "", price: "", sales: "active", screen: "" };
    var on = { delta1: "", delta2: "" };
    var that = this;
    api.getPromotionGoods({
      query: {
        page: 0
      },
      success: (res) => {
        let goodslist = res.data.data
        that.setData({ goodslist, classname, on })
        console.log(res.data)
      }
    })
    that.HideAll();
  },
  showScreen: function () {//筛选
    var classname = { all: "", price: "", sales: "", screen: "active" };
    var on = { delta1: "", delta2: "" };
    var isFalse = !this.data.ScreenFalse;
    var ScreenFalse = !this.data.ScreenFalse;
    this.setData({
      isFalse, ScreenFalse, classname, on
    });
  },
  HideAll: function () {//隐藏弹窗
    var isFalse = false;
    var ScreenFalse = false;
    this.setData({
      isFalse, ScreenFalse
    });
  },
  loadMore: function () {//加载更多
    var Page = this.data.Page + 1;
    this.showAll(Page);
    this.showPrice(Page);
    this.showMore(Page);
    this.setData({ Page });
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