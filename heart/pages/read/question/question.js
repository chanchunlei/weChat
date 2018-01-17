// pages/read/question/question.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     passages:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getQuestionById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let passages = res.data.data
          passages.answer_content = passages.answer_content.replace(/<.*?>/g, "\n")
          passages.question_makettime = passages.question_makettime.substring(0, 10)
          this.setData({passages})
          //console.log(this.data.passages)
        }
      } 
    })
     
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