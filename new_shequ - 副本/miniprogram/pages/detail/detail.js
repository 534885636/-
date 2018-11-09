// pages/detail/detail.js
const db = wx.cloud.database();
const app = getApp();
import Dialog from '../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    data: {},
    // arr:[],
    reply_list: [],
    date: '',
    current: '',
    title: '',
    hidden: true,
    hidden_1: false,
    openid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.globalData.option = options;
    this.setData({
      openid: app.globalData.openid
    });
    db.collection('blog').doc(options.id).get({
      success: res => {
        if (res.data._openid == app.globalData.openid) {
          this.setData({
            hidden: false
          })
        };
        console.log(res.data)
        // res.data 包含该记录的数据
        if (!res.data.title) {
          this.setData({
            blog: {
              content: '原贴已删除'
            },
          })
        } else {
          this.setData({
            blog: res.data,
            id: options.id,
            title: res.data.title
          })
        }


        if (res.data.item == 1) {
          this.setData({
            item: '工作之道'
          })
        } else if (res.data.item == 2) {
          this.setData({
            item: '以书会友'
          })
        } else if (res.data.item == 3) {
          this.setData({
            item: '跳蚤市场'
          })
        } else if (res.data.item == 4) {
          this.setData({
            item: '福利分享'
          })
        } else if (res.data.item == 5) {
          this.setData({
            item: '兴趣部落'
          })
        } else if (res.data.item == 6) {
          this.setData({
            item: '古今杂谈'
          })
        }
      }
    })
    const _ = db.command;
    db.collection('reply').orderBy('index', 'desc').where({
      id: _.eq(options.id)
    }).get({
      success: res => {
        if (res.data.length == 0) {
          this.setData({
            reply_list: {
              0: {
                content: "还没有评论，来做第一个吧~"
              },
            }
          })
        } else {
          this.setData({
            reply_list: res.data
          })
        }
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

  //提交评论
  addReply: function(e) {
    if (app.globalData.userInfo) {
      const data = this.data
      const formData = e.detail.value;
      let openid = app.globalData.blog.openid;

      data.date = new Date();
      var time = data.date.getTime();
      var year = data.date.getFullYear();
      var month = data.date.getMonth() + 1;
      var day = data.date.getDate();
      var hour = data.date.getHours();
      var min = data.date.getMinutes();
      this.setData({
        current: year + '-' + month + '-' + day + ' ' + hour + ':' + min
      })
      db.collection('reply').add({
        data: {
          id: this.options.id,
          title: this.data.title,
          content: formData.content,
          _openid: openid,
          nickname: app.globalData.userInfo.nickName,
          time: data.current,
          index: time
        },

        success: function(res) {
          wx.showToast({
            title: '评论成功',
          })
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '请先在‘我的’页面登陆',
        icon: 'none',
        duration: 2000
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '../my/my'
        })
      }, 500);
    }


  },
  refresh: function() {
    // wx.redirectTo({
    //   url: '../detail/detail?id=' + this.options.id
    // })
    this.onLoad(app.globalData.option)
  },

  deleteBlog: function(e) {
    Dialog.confirm({
      title: '确定删除吗',
      // message: '弹窗内容'
    }).then(() => {
      // on confirm
      console.log(app.globalData.option.id)
      //删帖
      db.collection('blog').doc(app.globalData.option.id).remove({
        success: function(res) {
          console.log(res.data)
          wx.showToast({
            title: '请刷新',
          })
        }
      })
      //删帖子下的评论
      const _ = db.command
      db.collection('reply').where({
        id: _.eq(app.globalData.option.id)
      }).remove({
        success: function(res) {

        }
      })

      wx.navigateBack({
        delta: getCurrentPages() + 1
      });
    }).catch(() => {
      // on cancel
    });

  },

  deleteReply: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);

    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          db.collection('reply').doc(id).remove({
            success: function(res) {
              wx.showToast({
                title: '删除成功',
              })
            }
          })
          wx.redirectTo({
            url: '../detail/detail?id=' + app.globalData.option.id
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})