

var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaSelectedStr:'',
    allprovince:[],
    allcity:[],
    allarea:[],
    province:[],
    city:[],
    area:[]
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'XBNBZ-VCB6F-TVXJN-JVX5P-WGD5F-JMBGF'
    });
    var citylist = new QQMapWX({
      key: 'XBNBZ-VCB6F-TVXJN-JVX5P-WGD5F-JMBGF'
    });
    // 调用接口
    citylist.getCityList({
      success: function (res) {
        var allprovince = res.result[0];
        var allcity = res.result[1];
        var allarea = res.result[2];
        console.log(allcity);
        that.setData({
          allprovince,allcity,allarea
        });
      },
      fail: function (res) {
       // console.log(res);
      },
      complete: function (res) {
       // console.log(res);
      }
    });
    
  },
 
  fetchPOI: function () {
    var that = this;
    // 调用接口
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      get_poi: 1,
      success: function (res) {
        //console.log(res);
        that.setData({
          areaSelectedStr: res.result.address
        });
      },
      fail: function (res) {
        //         console.log(res);
      },
      complete: function (res) {
        //         console.log(res);
      }
    });
  },
  showModel: function () {
    var num = this.data.allprovince[0].cidx
    var city = this.data.allcity.slice(num[0], num[1]+1);
    this.setData({city});
  },
  bindChange: function (e) {
    const val = e.detail.value;
    var num = this.data.allprovince[val[0]].cidx
    var city = this.data.allcity.slice(num[0], num[1] + 1);
    var areanum = city[val[1]].cidx
    if(areanum){
      var area = this.data.allarea.slice(areanum[0], areanum[1] + 1);
    }else{
      var area = [];
    }
    this.setData({ city,area });
   // console.log(val)
  }
})