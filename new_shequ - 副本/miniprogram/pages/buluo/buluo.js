// pages/buluo/buluo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,

  },

  onChange(event) {
    console.log(event.detail);
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../index/index'
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../buluo/buluo'
      })
    // } else if (event.detail == 2) {
    //   wx.navigateTo({
    //     url: '../add/add'
    //   })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../my/my'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  work:function(e){
    wx.navigateTo({
      url: '../buluo2/buluo2?id=1'
    })
  },

  book: function (e) {
    wx.navigateTo({
      url: '../buluo2/buluo2?id=2'
    })
  },

  sell: function (e) {
    wx.navigateTo({
      url: '../buluo2/buluo2?id=3'
    })
  },

  nice: function (e) {
    wx.navigateTo({
      url: '../buluo2/buluo2?id=4'
    })
  },

  hobby: function (e) {
    wx.navigateTo({
      url: '../buluo2/buluo2?id=5'
    })
  },

  talk: function (e) {
    wx.navigateTo({
      url: '../buluo2/buluo2?id=6'
    })
  }
})