
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
    style:[],
    rightList:[],
    codeleft: 1,
    objectId: 0,
    isTrue: true,
    isFalse: false
  },
  // 跳转到搜索页
  showInput: function () {
   wx.navigateTo({
     url: '../search/secrch',
   })
  },
  // 点击事件
  showList: function (e) {
    //console.log(e)
    var isFalse = true;
    var isTrue = false;
    var objectId = e.currentTarget.dataset.objectId;// 拿到objectId，作为访问子类的参数
    var rightList = [];
    var goodslist = this.data.goodslist;
    for(var i=0;i<goodslist.length;i++){
      if (goodslist[i].coderight == objectId){
        rightList.push(goodslist[i])
      }
    }
    var index = parseInt(e.currentTarget.dataset.index);
    this.setClass(index);
    this.setData({ objectId, isTrue, isFalse, rightList});
  },
  showHot: function () {
    var isTrue = true;
    var isFalse = false;
    var style = [];
    this.setData({ isTrue, isFalse, style});
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
  showDetail: function (e) {
   var gid = e.currentTarget.dataset.gid;
  // console.log(gid)
   wx.navigateTo({
     url: '../detail/detail?gid='+gid,
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let hotlist = [];
        api.getList({
          success: function (res) {
            //console.log(res)
            if(res.data.status){
              var classify = res.data.data.left
              var goodslist = res.data.data.right
              for (var i = 0; i < res.data.data.right.length; i++) {
                if (res.data.data.right[i].hot == 1) {//默认渲染热销商品
                  hotlist.push(res.data.data.right[i]);
                }
              }
              that.setData({ hotlist, classify, goodslist })
            }
          }
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  }
})