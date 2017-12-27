
//API接口文件
const url = ''
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中...',
    icon: 'loading'
  })
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: params.query || {},
    header: {
      'content-type': 'application/json'
    },

    success: function (res) {
      //console.log(res.data)
      params.success && params.success(res)
      // console.log(params.success)
      wx.hideToast()

    },

    fail: function (e) {
      console.log(1)
    }
  })
}
//获取数据列表
const getList = (params) => {
  //console.log(params)
  wxRequest(params, host)
}

module.exports = {//模块化接口
  getList
}