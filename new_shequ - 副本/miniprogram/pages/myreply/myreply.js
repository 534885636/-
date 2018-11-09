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
    reply_list: [],
    aaa:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    db.collection('reply').orderBy('time', 'desc').where({
      _openid: _.eq(app.globalData.openid)
    }).get({
      success: res => {
        let data = res.data;
        data = data.map((item) => {
          let appendix = (item.content.length > 20) ? '...' : '';
          item.content = item.content.slice(0, 20) + appendix;
          return item;
        })
        console.log(data);
        this.setData({
          reply_list: data,
        })
      }
    })

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
    db.collection('reply').doc(id).get({
      success: res=> {
        // res.data 包含该记录的数据
        console.log(res.data.id)
        this.setData({
          aaa : res.data.id
        })
        wx.navigateTo({
          url: '../detail/detail?id=' + this.data.aaa
        })
      }
    })
  }
})