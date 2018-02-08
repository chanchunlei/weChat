
import api from '../../api/api.js'
var sliderWidth = 96;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular: true,
    tabs: ["商品介绍", "商品附件"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    goods:[],
    color:[],
    spec:[],
    details:[],
    listPrice:[],
    num_spec:'',
    num_color:'',
    g_num: 1,
    minusStatus:'disabled',
    minusStatuses: 'normal',
    Money:""
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    var that = this;
    api.getDetail({
      query:{
        gid: options.gid
      },
      success: res =>{
        console.log(res)
        if(res.data.status){
          let goods = res.data.data.goods;
          let color = res.data.data.color;
          let spec = res.data.data.spec;
          let details = res.data.data.detail;
          let Money = res.data.data.goods[0].lower_price.price;
          let imgUrls = [];
          imgUrls.push(res.data.data.goods[0].g_pic);
          this.setData({ goods, color, spec, details, Money, imgUrls });
        }
        
        
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  showColor: function (e) {//选择颜色
    var num_color = e.currentTarget.dataset.color;
    var idx = e.currentTarget.dataset.index;
    var color = this.data.color;
    var details = this.data.details;
    var imgUrls = [];
    var listPrice = [];
    var arr = [];
    for(var j=0; j<color.length; j++){
      color[j].classname = '';
    }
    color[idx].classname = 'active';//设置选定项样式
    imgUrls.push(color[idx].pic);
    for (var i = 0; i < details.length; i++) {
      if (details[i].p_id == num_color) {
        arr.push(details[i]);
      }
    }
    if (this.data.num_spec){//判断是否已经存在规格
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].spec == this.data.num_spec){
          listPrice.push(arr[i]);
        }
      }
    }else{
      for (var i = 0; i < arr.length; i++) {
        listPrice.push(arr[i]);
      }
    }
    this.setData({ listPrice, num_color, color, imgUrls })
    this.showMoney();
  },
  showSpec: function (e) {//选择规格
    var num_spec = e.currentTarget.dataset.spec;
    var idx = e.currentTarget.dataset.index;
    var spec = this.data.spec;
    var details = this.data.details;
    var arr = [];
    var listPrice = [];
    for(var j=0;j<spec.length;j++){
      spec[j].classname = '';
    }
    spec[idx].classname = 'on';
    for (var i = 0; i < details.length; i++) {
      if (details[i].spec == num_spec) {
        arr.push(details[i]);
      }
    }
    if (this.data.num_color) {//判断是否已经存在颜色
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].p_id == this.data.num_color){
          listPrice.push(arr[i]);
        }
      }
    } else {
      for (var i = 0; i < arr.length; i++) {
        listPrice.push(arr[i]);
      }
    }
    this.setData({ listPrice, num_spec, spec})
    this.showMoney();
  },
  showMoney:function () {//价格显示
    var Money = "";
    var listMoney = this.data.listPrice;
    if (listMoney.length==1){
      Money = listMoney[0].price.price;
      this.setData({ Money });
    }
  },
  bindMinus: function (e) {
    var g_num = this.data.g_num;
    if (g_num > 1) {
      g_num--;
    }
    if (this.data.listPrice.length == 1) {
      var stock = this.data.listPrice[0].stock;
      var minusStatuses = g_num >= stock ? 'disabled' : 'normal';
    }
    var minusStatus = g_num <= 1 ? 'disabled' : 'normal';
    this.setData({ g_num, minusStatus, minusStatuses });
  },
  bindPlus: function (e) {
    var g_num = this.data.g_num;
    if (this.data.listPrice.length==1){
      var stock = this.data.listPrice[0].stock;
      if (g_num < stock){
        g_num++;
      }
      var minusStatuses = g_num >= stock ? 'disabled' : 'normal';
    }
    var minusStatus = g_num <= 1 ? 'disabled' : 'normal';
    this.setData({ g_num, minusStatus, minusStatuses });
  },
  bindManualTapped: function () {
    wx.hideKeyboard();//关闭键盘
  },
  joinShopcar: function(){
    if (!this.data.num_spec || !this.data.num_color){
      wx.showModal({
        content: '请选择完整的商品参数再加入购物车！',
        showCancel: false,
      });
    }else{
      var num = this.data.g_num;
      var g_id = this.data.listPrice[0].g_id;
      var code = this.data.listPrice[0].g_number;
      api.joinShopcar({
        query:{
          num: num,
          g_id: g_id,
          code: code
        },
        success:(res) =>{
          if(res.data.status){
            wx.showModal({
              title: '加入成功',
              content: '是否查看购物车？',
              confirmText: "去购物车",
              cancelText: "完成",
              success: function (res) {
               // console.log(res);
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/shopcar/shopcar',
                  })
                } 
              }
            });
          }else{
            wx.showModal({
              content: '加入购物车失败！',
              showCancel: false,
            });
          }
         
        }
      })
      
    }
  }
      
})