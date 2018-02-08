
//API接口文件
// const url = 'http://192.168.81.47/'
// const url2 = 'http://192.168.81.55/'
const url = 'https://www.qqlong.top/'
const wxRequest = (params, url) => {
  wx.getStorage({
    key: 'token',
    success: function (res) {
      var token = res.data;
      //console.log(token)
       if(params.query){
          params.query['token'] = token;
       }
        wx.request({
          url: url, //仅为示例，并非真实的接口地址
          data: params.query || { token: token },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            params.success && params.success(res)
            //console.log(res)
            if (res.data.t_status){
              wx.reLaunch({
                url: '/pages/login'
              })
            }
            wx.hideToast()
          },
          fail: function (e) {
            console.log(1)
          }
        })
    }
  })
  wx.showToast({
    title: '加载中...',
    icon: 'loading',
    duration: 8000
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
const getDetail = (params) => { //商品详情接口
  wxRequest(params, url + 'webxiaogoodsdetail')
} 
const joinShopcar = (params) => {//添加购物车
  wxRequest(params, url + 'webaddcar')
}
const getShopcar = (params) => {//查看购物车
  wxRequest(params, url + 'webshowcar')
}
const amendCar = (params) => {//购物车数量增减
  wxRequest(params, url + 'webeditcarnum')
}
const deleteGoods = (params) => {//删除单个购物车商品
  wxRequest(params, url + 'webdelonlycode')
}
const newaddress = (params) => {//添加地址
  wxRequest(params, url + 'webaddress')
}
const showAddress = (params) => {//查看地址
  wxRequest(params, url + 'webshowaddress')
}
const amendAddress = (params) => {//修改地址
  wxRequest(params, url + 'webeditaddress')
}
const deleteAddress = (params) => {//删除地址
  wxRequest(params, url + 'webdeladdress')
}
const acqAddress = (params) => {//设为默认地址地址
  wxRequest(params, url + 'webacquiescence')
}
const generating = (params) => {//生成订单
  wxRequest(params, url + 'webaddorder')
}
const getorder = (params) => {//查询订单
  wxRequest(params, url + 'webshoworder')
}
module.exports = {//模块化接口
  getList,
  getAll,
  getPriseSort,
  getPromotionGoods,
  getScreenGoods,
  getDetail,
  joinShopcar,
  getShopcar,
  amendCar,
  deleteGoods,
  newaddress,
  showAddress,
  amendAddress,
  deleteAddress,
  acqAddress,
  generating,
  getorder
}

