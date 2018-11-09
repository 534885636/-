// pages/buluo2/buluo2.js
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
    blog_list: [],
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    db.collection('blog').orderBy('time', 'desc').where({
      item: _.eq(options.id)
    }).get({
      success: res => {
        console.log(res)
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
    if (options.id == 1) {
      this.setData({
        title: '工作之道'
      })
    } else if (options.id == 2) {
      this.setData({
        title: '以书会友'
      })
    } else if (options.id == 3) {
      this.setData({
        title: '跳蚤市场'
      })
    } else if (options.id == 4) {
      this.setData({
        title: '福利分享'
      })
    } else if (options.id == 5) {
      this.setData({
        title: '兴趣部落'
      })
    } else if (options.id == 6) {
      this.setData({
        title: '古今杂谈'
      })
    }

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
    db.collection('blog').orderBy('time', 'desc').where({
      item: _.eq(this.options.id)
    }).get({
      success: res => {
        console.log(res)
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

  detail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})