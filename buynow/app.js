//app.js
import api from 'api/api.js'
App({
  logins: function() {
    wx.getUserInfo({
      success: res => {
        wx.login({
          success: res => {
            var that = this;
            // console.log(res.code)
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              wx.request({
                url: 'https://www.qqlong.top/webxiaoweixinlogin',
                data: {
                  code: res.code,
                  headimgurl: that.globalData.userInfo.avatarUrl,
                  nickname: that.globalData.userInfo.nickName
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function (res) {
                  if (res.data.token) {
                    wx.setStorage({
                      key: "token",
                      data: res.data.token
                    })
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  }
                },
                fail: function () {
                  console.log(1)
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
        //console.log(res)
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  onLaunch: function () {
    this.logins()
  },
 onShow: function(){
   var that = this;
   wx.getSetting({
     success(res) {
       if (!res.authSetting['scope.userInfo']) {
         console.log(1)
         that.logins()
       }
     }
   })
 },
  globalData: {
    userInfo: null
  }
  
})