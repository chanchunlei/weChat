const Myurl = 'https://www.art-framework.com/weChat/'
const wxRequest = (params,url) => {
  wx.showToast({
    title: '加载中...',
    icon: 'loading'
  })
  wx.request({
    url: url,
    data: params.query || {},
    header: {
      'content-type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res) //调用api时params里包含的success函数调用,并传res.data
      //console.log(params.success(res))
      wx.hideToast()
    },
    fail: (e) => {
      console.log(2)
    }
  })
}
const city = (params) => {
  wxRequest (params,Myurl+'city.json')
}
const weather = (params) => {
  wxRequest(params, Myurl + 'weather.php')
}
const getImages = (params) => {
  wxRequest(params,Myurl + 'travel.php')
}
const getcityId = (params) => {
  wxRequest(params, Myurl + 'cityID.php')
}

module.exports = {
  city,
  weather,
  getImages, 
  getcityId
}
