
//API接口文件
const url = 'http://192.168.81.41/webgoodslist'
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
    method: 'POST',
    success: function (res) {
      //console.log(res.data)
      params.success && params.success(res)
      // console.log(params.success)
      
    },
    fail: function (e) {
      console.log(1)
    }
  })
}
//获取数据列表
const getList = (params) => {
  //console.log(params)
  wxRequest(params, url)
}

module.exports = {//模块化接口
  getList
}

