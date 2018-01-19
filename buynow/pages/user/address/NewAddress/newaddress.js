

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
    city:[],
    area:[],
    value: [0, 0, 0],
    isFalse: false,
    chooseP: '北京市',
    chooseC: '东城区',
    chooseA: '',
    focus: false,
    numbers: 0
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
        //console.log(allcity);
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
    wx.hideKeyboard()
    //省默认渲染，点击后Model显示，默认选取北京市全部渲染
    var num = this.data.allprovince[0].cidx;
    var city = this.data.allcity.slice(num[0], num[1]+1);
    var isFalse = true;
    var area = [];
    this.setData({city, isFalse, area});
  },
  bindChange: function (e) {//三级联动滚动
    
    var val = e.detail.value;
    if (this.data.numbers[0] != val[0]){
       var val = [val[0],0,0]
    } else if (this.data.numbers[1] != val[1]){
       var val = [val[0], val[1], 0]
    }
    var num = this.data.allprovince[val[0]].cidx
    var city = this.data.allcity.slice(num[0], num[1] + 1);//取出对应市
    var areanum = city[val[1]].cidx
    if(areanum){
      var area = this.data.allarea.slice(areanum[0], areanum[1] + 1);//取出对应区
    }else{
      var area = [];
    }
    //input显示效果
    var chooseP = this.data.allprovince[val[0]].fullname;
    var chooseC = city[val[1]].fullname;
    if (!area.length==0) {
      var chooseA = area[val[2]].fullname;
    }else{
      var chooseA = "";
    } 
    var numbers = val;
    this.setData({ city, area, chooseP, chooseC, chooseA, numbers});
   // console.log(chooseC)
   // console.log(val)
  },
  open: function () {
    var addressP = this.data.chooseP
    var addressC = this.data.chooseC
    var addressA = this.data.chooseA
    var areaSelectedStr = addressP + addressC + addressA
    var isFalse = false
    //console.log(areaSelectedStr)
    this.setData({
      areaSelectedStr, isFalse
    })
  },
  close: function () {
    var isFalse = false
    this.setData({ isFalse });
  }
})