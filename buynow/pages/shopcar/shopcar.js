import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     carlist:[],
     minusStatuses: [],
     allmoney:0.00,
     minusStatus:'',
     S_money:'',
     check: false
  },
  checkboxChanges: function(e) {//给checkbox添加属性
    var idx = e.currentTarget.dataset.index;
    var carlist = this.data.carlist;
    carlist[idx].checked = !this.data.carlist[idx].checked;
    this.setData({ carlist })
    this.Selected();
    this.ifAll();
  },
  Selected: function() {//选中的加总
    var allmoney = 0;
    var carlist = this.data.carlist;
    for (var i = 0; i < carlist.length; i++) {
      if (carlist[i].checked) {
        allmoney += Number(carlist[i].num) * Number(carlist[i].price);
      }
    }
    this.setData({ allmoney });
  },
  bindMinus: function (e) {//商品减少
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carlist[index].num;
    var code = this.data.carlist[index].coding;
    if (num > 1) {
      num--;
      this.amendNum(code, num);
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var carlist = this.data.carlist;
    carlist[index].num = num;
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus; // 将数值与状态写回
    this.setData({
      carlist: carlist,
      minusStatuses: minusStatuses
    });
    this.Selected();
  },
  bindPlus: function (e) {//商品增加
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carlist[index].num;
    var code = this.data.carlist[index].coding;
    num++;// 自增
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var carlist = this.data.carlist;
    carlist[index].num = num;
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    this.setData({
      carlist: carlist,
      minusStatuses: minusStatuses
    });
    this.Selected();
    this.amendNum(code, num);
  },
  ifAll: function (){//判断是否全选
    var carlist = this.data.carlist;
    var val = [];
    var check = '';
    for (var i = 0; i < carlist.length; i++) {
      val.push(carlist[i].checked);
    }
    if (val.indexOf(false)<0){
      check = true;
    } else {
      check = false;
    }
    this.setData({ check })
  },
  checkboxAll: function (e) {//全选
  var selectAll = e.detail.value;
  var carlist = this.data.carlist;
  if (selectAll.length>0){
    for (var i = 0; i < carlist.length; i++) {
      carlist[i].checked = true;
    }
  }else{
    for (var i = 0; i < carlist.length; i++) {
      carlist[i].checked = false;
    }
  } 
  this.setData({ carlist });
  this.Selected();
  },
  // 跳转到详细页
  showDetail: function (e) {
    var gid = e.currentTarget.dataset.gid;
    wx.navigateTo({
      url: '../detail/detail?gid=' + gid,
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
  onShow: function (options) {
    api.getShopcar({
      success: res =>{
        console.log(res.data)
        if(res.data.data){
          let carlist = res.data.data
          for (var i = 0; i < carlist.length; i++) {
            carlist[i]['checked'] = false;
          }
          var allmoney = 0;
          var check = false;
          //    console.log(carlist)
          this.setData({ carlist, allmoney, check })
        }else{
          console.log('无数据')
        }
      }
    })
  },
  amendNum: function (code,num) {//数量修改
    api.amendCar({
      query:{
        code:code,
        num:num
      },
      sccess: res =>{
        console.log(res)
      }
    })
  },
  deleteGoods: function (e) {//删除单条购物车
    var that = this;
    var code = e.currentTarget.dataset.code;
    wx.showModal({
      content: '确认删除？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          api.deleteGoods({
            query:{
              code: code
            },
            success: res =>{
              if(res.data.status){
                that.onShow();
              }
            }
          })
        }
      }
    }); 
  }
})