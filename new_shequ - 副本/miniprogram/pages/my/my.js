// pages/my/my.js
const db = wx.cloud.database();
const blogs = db.collection('blog');
const _ = db.command;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 2,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: ''
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        //        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    

    //    console.log('openid是',app.globalData.openid)

    db.collection('users').where({
        _openid: _.eq(app.globalData.openid)
      })
      .get({
        success: function(res) {
          console.log('结果是', res.data.length)
          if (res.data.length == 0) {
            db.collection('users').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                img: e.detail.userInfo.avatarUrl,
                city: e.detail.userInfo.city,
                country: e.detail.userInfo.country,
                gender: e.detail.userInfo.gender,
                nickname: e.detail.userInfo.nickName,
                province: e.detail.userInfo.province
              },
              success: function(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
              }
            })
          }else{
            console.log('记录已存在')
          }
        }
      })


  },

  myblog: function() {
    
    wx.navigateTo({
      url: '../myblog/myblog'
    })
  },

  myreply: function() {
    wx.navigateTo({
      url: '../myreply/myreply'
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

  }
})