import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  },
  newAddress: function () {
    wx.navigateTo({
      url: 'NewAddress/newaddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    api.showAddress({
      success: res =>{
        if(res.data.status){
          let addressList = res.data.data
          for (var i = 0; i < addressList.length; i++) {
            addressList[i]['check'] = false
          }
          //console.log(addressList);
          this.setData({ addressList });
          this.check();
        }
      }
    })
  },
 check:function () {//c查看默认地址
   var addressList = this.data.addressList;
   for (var i = 0; i < addressList.length; i++){
     if (addressList[i].acquiescence == 1){
       addressList[i].check = true;
     }
   }
   this.setData({ addressList });
 },
 Delete: function (e) {//删除地址
   const that = this;
   var id = e.currentTarget.dataset.id;
   wx.showModal({
     title: '提示',
     content: '确定删除？',
     success: function (res) {
       if (res.confirm) {
         api.deleteAddress({
           query: {
             id: id
           },
           success: res =>{
             if(res.data.status){
               wx.showToast({
                 title: '删除成功',
                 icon: 'success',
                 duration: 2000,
                 success: res =>{
                   that.onShow();
                 }
               })
             }
           }
         })
       } 
     }
   })
 },
 checkboxChange: function(e) {//设置为默认地址
   const that = this;
   if (e.detail.value.length>0){
     var id = e.detail.value[0];
     api.acqAddress({
       query:{
         id:id
       },
       success: res =>{
         //console.log(id)
         that.onShow();
       }
     })
   }
 },
 Edit:function (e) {
   var id = e.currentTarget.dataset.id;
   wx.navigateTo({
     url: 'NewAddress/newaddress?id='+id,
   }) 
 }
  
})