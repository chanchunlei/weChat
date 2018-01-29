import api from '../../api/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
     scroll: true,
     isFalse: false,
     ScreenFalse: false,
     inps_price: false,
     brand: false,
     goodslist:[],
     listid: 0,
     classname: {
       all: "active",
       price: "",
       sales: "",
       screen: ""
     },
     Price: 1,
     Pages: 0,
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
  // 选框
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var dis1 = e.detail.value.indexOf('0');
    var dis2 = e.detail.value.indexOf('1');
    if(dis1>=0){
      var brand = true;
      this.setData({ brand });
    } else {
      var brand = false;
      this.setData({ brand });
    }
    if (dis2 >= 0){
      var inps_price = true;
      this.setData({ inps_price });
    } else {
      var inps_price = false;
      this.setData({ inps_price });
    }
  },
  formSubmit: function (e, Pages) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    api.getScreenGoods({
      query: {
        page: Pages,
        cate: 0,
        p_start: 456,
        p_end: 477
      },
      success: (res) => {
        var arr = that.data.goodslist
        if (res.data.page == 0) {//判断页码，若不是0则加上之前数据
          var goodslist = res.data.data;
          var Pages = Number(res.data.page);
        } else {
          var goodslist = arr.concat(res.data.data);
          var Pages = Number(res.data.page);
        }
        console.log(res.data);
        that.setData({ goodslist, Pages })
      }
    })
  },
  formReset: function (e) {
    this.checkboxChange(e);
  },
  // 跳转到详细页
  showDetail: function () {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
 
  onLoad: function (options) {
    this.showAll();
  },
  showAll: function (nums,Pages) {//综合
    var classname = { all: "active",price: "",sales: "",screen: ""};
    var on = { delta1: "", delta2: "" };
    var listid = 0;//滚动监听下标
    var that = this;
    api.getAll({
      query: {
        page: Pages
      },
      success: (res) => {
        var arr = that.data.goodslist
        if (res.data.page == 0) {//判断页码，若不是0则加上之前数据
          var goodslist = res.data.data;
          var Pages = Number(res.data.page);
        } else {
          var goodslist = arr.concat(res.data.data);
          var Pages = Number(res.data.page);
        }
        console.log(res.data);
        that.setData({ goodslist, classname, on, listid, Pages })
      }
    })
    that.HideAll();
  },
  showPrice: function (e,Pages) {//价格
    if(e != this.data.Price){//判断滚动时价格排序规则
      var Price = e.currentTarget.dataset.price
      if (Price == 1) {
        Price = 0;//倒序
        var on = { delta1: "sanjiao", delta2: "" };
      } else {
        Price = 1;//升序
        var on = { delta1: "", delta2: "sanjiao" };
      }
      var goodslist = [];
      this.setData({ goodslist });//价格变换重新请求数据
    } else {
      Price = e;
    }
    var classname = {all: "",price: "active",sales: "",screen: ""};
    var that = this;
    var listid = 1;
    api.getPriseSort({
      query: {
        page: Pages,
        price: Price
      },
      success: (res) => {
        var arr = that.data.goodslist
        if (res.data.page == 0){//判断页码，若不是0则加上之前数据
          var goodslist = res.data.data;
          var Pages = Number(res.data.page);
        }else{
          var goodslist = arr.concat(res.data.data);
          var Pages = Number(res.data.page);
        }
        that.setData({ goodslist, classname, on, Price, listid, Pages })
      }
    })
    that.HideAll();
  },
  showMore: function (nums,Pages) {  //促销
    var classname = { all: "", price: "", sales: "active", screen: "" };
    var that = this;
    var listid = 2;
    api.getPromotionGoods({
      query: {
        page: Pages
      },
      success: (res) => {
        var arr = that.data.goodslist
        if (res.data.page == 0) {//判断页码，若不是0则加上之前数据
          var goodslist = res.data.data;
          var Pages = Number(res.data.page);
        } else {
          var goodslist = arr.concat(res.data.data);
          var Pages = Number(res.data.page);
        }
        that.setData({ goodslist, classname, listid, Pages })
      }
    })
    that.HideAll();
  },
  showScreen: function () {//筛选
    var classname = { all: "", price: "", sales: "", screen: "active" };
    var on = { delta1: "", delta2: "" };
    var listid = 3;
    var isFalse = !this.data.ScreenFalse;
    var ScreenFalse = !this.data.ScreenFalse;
    this.setData({ isFalse, ScreenFalse, classname, on, listid });
  },
  HideAll: function () {//隐藏弹窗
    var isFalse = false;
    var ScreenFalse = false;
    this.setData({
      isFalse, ScreenFalse
    });
  },
  loadMore: function (e) {//加载更多
    // console.log(e.currentTarget.dataset)
    var nums = e.currentTarget.dataset.scrollid;
    var e = this.data.Price;//接收到当前价格排序规则
    var Pages = this.data.Pages + 1;
    if (nums == 0){
      this.showAll(nums,Pages);
    } else if (nums == 1){
      this.showPrice(e, Pages);
    } else if (nums == 2){
      this.showMore(nums,Pages);
    } else if (nums == 3){
      this.formSubmit(e, Pages);
    }
  }
})