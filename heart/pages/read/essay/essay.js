// pages/read/essay/essay.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     passage:{},
     audioBtn: {
       text: '收听',
       imgurl: 'https://www.art-framework.com/weChat/imgs/audio_play.png'
     },
     isFalse: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     api.getEssayById({
       query: {
         id: options.id
       },
       success: (res) =>{
         let passage = res.data.data
         //console.log(passage)
         passage.hp_content = passage.hp_content.replace(/<.*?>/g, "\n")
         passage.hp_makettime = passage.hp_makettime.substring(0,10)
         this.setData({passage})
         if (this.data.passage.audio === ''){
           this.setData({ isFalse: false})
         }else{
           this.setData({ isFalse: true })
         }
         //console.log(this.data.passage)
       }
     })
  },
  toggleAudio: function() {
     var audio = this.data.passage.audio
     var audioBtn = this.data.audioBtn
     if (audioBtn.text==='收听'){
       audioBtn = {
         text: '暂停',
         imgurl: 'https://www.art-framework.com/weChat/imgs/audio_pause.png'
       }
       this.playreadding(audio)
     }else{
       audioBtn = {
         text: '收听',
         imgurl: 'https://www.art-framework.com/weChat/imgs/audio_play.png'
       }
       this.stopreadding()
     }
     this.setData({ audioBtn })
  },
  playreadding: function(audio) {
    wx.playBackgroundAudio({
      dataUrl: audio
    })
  },
  stopreadding: function() {
    wx.pauseBackgroundAudio()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})