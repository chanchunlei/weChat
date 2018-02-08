import MD5 from '../services/MD5.js'
import app from '../app.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_state:'',
    classname:''
  },
  formSubmit: function (e) {
    var classname = 'move';
    this.setData({ classname });
    var that = this;
    if (e.detail.value.user_name.length == 0){
      var login_state = '用户名不能为空！';
      that.setData({ login_state })
    } else if (e.detail.value.user_pwd.length == 0){
      var login_state = '密码不能为空！';
      that.setData({ login_state })
    }else{
      var password = MD5.hexMD5(e.detail.value.user_pwd);//md5加密密码
      var u_name = e.detail.value.user_name;
      var u_pass = e.detail.value.user_name;
      //console.log(password);
      wx.request({
        url: 'https://www.qqlong.top/weblogin',
        data: {
          u_name: u_name,
          u_pass: password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success(res) {
          //console.log(res.data)
          if(res.data.status){
            wx.setStorage({
              key: "token",
              data: res.data.token
            })
            wx.switchTab({
              url: '/pages/index/index'
            })
            var login_state ='';
            var classname = '';
            that.setData({ login_state, classname })
          }else{
            var login_state = res.data.errormsg+'！';
            that.setData({ login_state })
          }
        }
      })
    }
    
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