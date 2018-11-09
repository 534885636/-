// pages/login/login.js
const db = wx.cloud.database();
const blogs = db.collection('blog');
const _ = db.command;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    active: 0,
    blog_list: []
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
  onLoad: function(options) {
    var that = this;
    db.collection('blog').orderBy('time', 'desc').get({
      success: res => {
        let data = res.data;
        data = data.map((item) => {
          let appendix = (item.content.length > 20) ? '...' : '';
          item.content = item.content.slice(0, 20) + appendix;
          return item;
        })
        this.setData({
          blog_list: data,
        })
      }
    })

  },

  onClickRight: function() {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../add/add'
      })
    } else {
      wx.showToast({
        title: '请先在‘我的’页面登陆',
        icon: 'none',
        duration: 2000,
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '../my/my'
        })
      }, 500);

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    var that = this;
    db.collection('blog').orderBy('time', 'desc').get({
      success: res => {
        let data = res.data;
        data = data.map((item) => {
          let appendix = (item.content.length > 20) ? '...' : '';
          item.content = item.content.slice(0, 20) + appendix;
          return item;
        })
        this.setData({
          blog_list: data,
        })
      }
    })
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  viewItem: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  detail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})