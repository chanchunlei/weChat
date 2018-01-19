
//API接口文件
const url = 'http://192.168.81.41/'
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
      wx.hideToast()
      // console.log(params.success)
      
    },
    fail: function (e) {
      console.log(1)
    }
  })
}
//获取数据列表
const getList = (params) => {//首页商品接口
  //console.log(params)
  wxRequest(params, url + 'webgoodslist')
}
const getAll = (params) => {//所有商品，可分页
  wxRequest(params, url + 'webgoodsAll')
}
const getPriseSort = (params) => {//价格分页排序接口
  wxRequest(params, url + 'webpricegoods')
}
const getPromotionGoods = (params) => {//促销商品分页接口
  wxRequest(params, url + 'webpromotiongoods')
}
const getScreenGoods = (params) => { //价格和分类筛选接口
  wxRequest(params, url + 'websougoods')
} 
module.exports = {//模块化接口
  getList,
  getAll,
  getPriseSort,
  getPromotionGoods,
  getScreenGoods
}

