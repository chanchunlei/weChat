
import api from '../../../../api/api.js'
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
    list:[],
    value: [0, 0, 0],
    isFalse: false,
    chooseP: '北京市',
    chooseC: '东城区',
    chooseA: '',
    numbers: 0,
    minute:'',
    addressId: '',
    checkOn: false
  },
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var id = this.data.addressId;
    var recipients = e.detail.value.recipients;
    var add_phone = e.detail.value.add_phone;
    var address = e.detail.value.address;
    var area = e.detail.value.area;
    var acquiescence = e.detail.value.acquiescence;
    if (acquiescence.length == 0){
      acquiescence = 0;
    }else{
      acquiescence = acquiescence[0];
    }
    if (id) {
      console.log(id)
      api.amendAddress({//修改地址
        query: {
          recipients: recipients,
          add_phone: add_phone,
          address: address,
          area: area,
          id:id,
          acquiescence: acquiescence
        },
        success: res => {
          console.log(res)
          if (res.data.status) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              success: res => {
                wx.navigateBack({//关闭当前页并跳到指定页
                  url: '../address'
                })
              }
            })
          }
        }
      })
    }else{
      api.newaddress({//添加地址
        query: {
          recipients: recipients,
          add_phone: add_phone,
          address: address,
          area: area,
          acquiescence: acquiescence
        },
        success: res => {
          //console.log(res)
          if (res.data.status) {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000,
              success: res => {
                wx.navigateBack({//关闭当前页并跳到指定页
                  url: '../address'
                })
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      api.showAddress({
        success: res => {
          if (res.data.status) {
            var addressId = options.id;
            let list = {};
            var areaSelectedStr = '';
            var checkOn = '';
            var minute = '';
            let addressList = res.data.data
            for (var i = 0; i < addressList.length; i++) {
              if (addressList[i].id == addressId){
                list = addressList[i]
                areaSelectedStr = list.area;
                minute = list.address
                checkOn = list.acquiescence==0 ? false: true;
              }
            }
            this.setData({ list, areaSelectedStr, minute, addressId, checkOn });
          }
        }
      })
    }
    var that = this;
    qqmapsdk = new QQMapWX({//调用腾讯地图
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
 
  fetchPOI: function () {//使用腾讯地图
    var that = this;
    // 调用接口
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      get_poi: 1,
      success: function (res) {
        //console.log(res);
        var areaSelectedStr = res.result.address_component.province + res.result.address_component.city + res.result.address_component.district;
        var minute = res.result.address_component.street_number;
        that.setData({ areaSelectedStr, minute });
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
  open: function () {//省市区
    var addressP = this.data.chooseP
    var addressC = this.data.chooseC
    var addressA = this.data.chooseA
    var areaSelectedStr = addressP + addressC + addressA
    var isFalse = false
    var minute = '';
    //console.log(areaSelectedStr)
    this.setData({
      areaSelectedStr, isFalse, minute
    })
  },
  close: function () {
    var isFalse = false
    this.setData({ isFalse });
  }
})