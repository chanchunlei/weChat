
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
    codeleft: 1,
    objectId: 0,
    isTrue: true
  },
  // 跳转到搜索页
  showInput: function () {
   wx.navigateTo({
     url: '../search/secrch',
   })
  },
  // 点击事件
  showList: function (e) {
    var isTrue = !this.data.isTrue
    // 拿到objectId，作为访问子类的参数
    var objectId = e.currentTarget.dataset.objectId;
    var index = parseInt(e.currentTarget.dataset.index);
    this.setClass(index);
    this.setData({ objectId, isTrue});
  },
  showHot: function () {
    var isTrue = true;
    var style = [];
    this.setData({ isTrue, style});
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
    var that = this;
    let hotlist = [];
    api.getList({
      success: function (res) {
        let classify = res.data.data.left
        let goodslist = res.data.data.right
        for (var i = 0; i < res.data.data.right.length; i++){
          if (res.data.data.right[i].hot==1){//默认渲染热销商品
            hotlist.push(res.data.data.right[i]);
          }
        }
        that.setData({ hotlist, classify, goodslist })
        //console.log(hotlist)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  }
})