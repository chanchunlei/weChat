const host = 'https://www.art-framework.com/weChat/travel.php'
const one = 'http://v3.wufazhuce.com:8000'
const music = 'https://www.art-framework.com/weChat/music.php'
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
    
    fail: function(e){
      console.log(1)
    }
  })
  }
//获取图集
const getImages = (params) =>{
   //console.log(params)
   wxRequest(params, host)
}
const getId = (params) => {
  //console.log(params.query)
  wxRequest(params, host)
}
//获取文章
const getCarousel = (params) => {
  wxRequest(params, one + '/api/reading/carousel')
}
const getLastArticles = (params) => {
  wxRequest(params, one + '/api/reading/index')
}
const getEssayById = (params) => {
  wxRequest(params, one + '/api/essay/' + params.query.id)
}
const getSerialById = (params) => {
  wxRequest(params, one + '/api/serialcontent/' + params.query.id)
}
const getQuestionById = (params) => { 
  wxRequest(params, one + '/api/question/' + params.query.id)
}
const getArticlesByMonth = (params) => {
  wxRequest(params, one + '/api/' + params.query.type + '/bymonth/' + params.query.month)
  //console.log(wxRequest)
}

//获取音乐
const getMusic = (params) => {
  wxRequest(params,music)
  //console.log(params)
}



//获取个人信息


module.exports = {//模块化接口
 getImages,
 getId,
 getCarousel,
 getLastArticles,
 getEssayById,
 getSerialById,
 getQuestionById,
 getArticlesByMonth,
 getMusic
}