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
     cate:[],
     lodding: {
       icon:'waiting',
       concent: "加载更多..."
     },
     cid: "",
     section:{
       p_start: "",
       p_end: "",
     },
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
  typeC:function () {
    var lodding = this.data.lodding;
    lodding.icon = 'info';
    lodding.concent = '没有更多内容了！';
    this.setData({ lodding })
  },
  showInput: function () {// 跳转到搜索页
    wx.navigateTo({
      url: '../search/secrch',
    })
  },
  // 选框
  checkboxChange: function (e) {
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    if(e.type=="reset"){
      var dis1 = -1;
      var dis2 = -1;
    }else{
      var dis1 = e.detail.value.indexOf('0');
      var dis2 = e.detail.value.indexOf('1');
    }
    if(dis1>=0){
      var brand = true;
      this.setData({ brand });
    } else {
      var brand = false;
      var cid = '';
      var cate = this.data.cate;
      for (var i = 0; i < cate.length; i++) {
        cate[i]['classname'] = "";
      }
      this.setData({ brand, cid, cate });
    }
    if (dis2 >= 0){
      var inps_price = true;
      this.setData({ inps_price });
    } else {
      var section = { p_start: "",p_end: ""};
      var inps_price = false;
      this.setData({ inps_price, section });
    }
  },
  //获取种类选中
  getCid: function (e) {
    //console.log(this.data.cate)
     var idx = e.currentTarget.dataset.index;
     var cid = e.currentTarget.dataset.cid;
     var cate = this.data.cate;
     //console.log(cate)
     for(var i=0; i<cate.length;i++){
       cate[i]['classname'] = "";
     }
     cate[idx]['classname'] = "cate_active";
     this.setData({ cid, cate})
  },
  formSubmit: function (e, Pages) {//筛选提交
      var that = this;
      var cid = that.data.cid
      if (e.detail){
        if (e.detail.value.p_start) {
          section['p_start'] = e.detail.value.p_start;
          that.setData({ section })
        }
        if (e.detail.value.p_start) {
          section["p_end"] = e.detail.value.p_end;
          that.setData({ section })
        }
      }
      if (!Pages) { Pages = 0 };
      api.getScreenGoods({
        query: {
          page: Pages,
          cate: that.data.cid,
          p_start: that.data.section.p_start,
          p_end: that.data.section.p_end
        },
        success: (res) => {
          var arr = that.data.goodslist
          if (res.data.status) {
            if (res.data.page == 0) {//判断页码，若不是0则加上之前数据
              var goodslist = res.data.data;
              var Pages = Number(res.data.page);
            } else {
              var goodslist = arr.concat(res.data.data);
              var Pages = Number(res.data.page);
            }
          }else{
            var goodslist = that.data.goodslist;
            var Pages = that.data.Pages;
          }
          that.setData({ goodslist, Pages })
        }
      })
      that.HideAll();
  },
  formReset: function (e) {
    this.checkboxChange(e);
  },
  // 跳转到详细页
  showDetail: function (e) {
    var gid = e.currentTarget.dataset.gid;
    wx.navigateTo({
      url: '../detail/detail?gid=' + gid,
    })
  },
  onLoad: function (options) {
    this.showAll();
  },
  showAll: function (nums,Pages) {//综合
    if (!Pages) { Pages = 0 };
    var classname = { all: "active",price: "",sales: "",screen: ""};
    var on = { delta1: "", delta2: "" };
    var listid = 0;//滚动监听下标
    var that = this;
    api.getAll({
      query: {
        page: Pages
      },
      success: (res) => {
        if(res.data.status){
          var cate = res.data.cate;
          var arr = that.data.goodslist
          if (res.data.page == 0) {//判断页码，若不是0则加上之前数据
            var goodslist = res.data.data;
            var Pages = Number(res.data.page);
          } else {
            var goodslist = arr.concat(res.data.data);
            var Pages = Number(res.data.page);
          }
        }else{
          var goodslist = that.data.goodslist;
          var Pages = that.data.Pages;
          var cate = that.data.cate;
        }
        //console.log(res.data);
        that.setData({ goodslist, classname, on, listid, Pages, cate})
      }
    })
    that.HideAll();
  },
  showPrice: function (e,Pages) {//价格
    if (!Pages) { Pages = 0 };
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
        if (res.data.status) {
          if (res.data.page == 0) {//判断页码，若不是0则加上之前数据
            var goodslist = res.data.data;
            var Pages = Number(res.data.page);
          } else {
            var goodslist = arr.concat(res.data.data);
            var Pages = Number(res.data.page);
          }
        }else{
          var goodslist = that.data.goodslist;
          var Pages = that.data.Pages;
        }
        that.setData({ goodslist, classname, on, Price, listid, Pages })
      }
    })
    that.HideAll();
  },
  showMore: function (nums,Pages) {  //促销
    if (!Pages) { Pages = 0 };
    var classname = { all: "", price: "", sales: "active", screen: "" };
    var that = this;
    var listid = 2;
    api.getPromotionGoods({
      query: {
        page: Pages
      },
      success: (res) => {
        var arr = that.data.goodslist
        if (res.data.status) {
          if (res.data.page == 0) {//判断页码，若不是0则加上之前数据
            var goodslist = res.data.data;
            var Pages = Number(res.data.page);
          } else {
            var goodslist = arr.concat(res.data.data);
            var Pages = Number(res.data.page);
          }
        }else{
          var goodslist = that.data.goodslist;
          var Pages = that.data.Pages;
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
    var isFalse = true;
    var ScreenFalse = true;
    var styles = 'overflow:hidden';
    this.setData({ isFalse, ScreenFalse, classname, on, listid, styles });
  },
  HideAll: function () {//隐藏弹窗
    var isFalse = false;
    var ScreenFalse = false;
    var styles = '';
    this.setData({
      isFalse, ScreenFalse, styles
    });
  },
  loadMore: function (e) {//加载更多
    // console.log(e.currentTarget.dataset)
    var nums = e.currentTarget.dataset.scrollid;
    var Pages = this.data.Pages + 1;
    if (nums == 0){
      this.showAll(nums,Pages);
    } else if (nums == 1){
      var e = this.data.Price;//接收到当前价格排序规则
      this.showPrice(e, Pages);
    } else if (nums == 2){
      this.showMore(nums,Pages);
    } else if (nums == 3){
      var e = this.data.section;//接收到当前价格排序规则
      this.formSubmit(e,Pages);
    }
  }
})