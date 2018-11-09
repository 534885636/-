//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    dataMsg: '',
    statusMsg: '',
    fileID: null,
    coverImage: '',
    tempFilePath: '',
    date: '',
    current: '',
    array: ['点击选择分类','工作之道', '以书会友', '跳蚤市场', '福利分享','兴趣部落','古今杂谈'],
    objectArray: [
      {
        id: 1,
        name: '工作之道'
      },
      {
        id: 2,
        name: '以书会友'
      },
      {
        id: 3,
        name: '跳蚤市场'
      },
      {
        id: 4,
        name: '福利分享'
      },
      {
        id: 5,
        name: '兴趣部落'
      },
      {
        id: 6,
        name: '古今杂谈'
      }
    ],
    index: 0,
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 上传文件
   */
  uploadFile: function () {
    wx.chooseImage({
      success: dRes => {
        this.setData({
          statusMsg: '开始上传文件'
        })

        wx.showLoading({
          title: '加载中',
        });

        const uploadTask = wx.cloud.uploadFile({
          cloudPath: `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
          filePath: dRes.tempFilePaths[0],
          success: res => {
            if (res.statusCode < 300) {
              this.setData({
                fileID: res.fileID,
              }, () => {
                this.getTempFileURL();
              });
            }
          },
          fail: err => {
            wx.hideLoading();
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            });
          },
        })
      },
      fail: console.error,
    })
  },

  /**
   * 获取图片链接
   */
  getTempFileURL: function () {
    wx.cloud.getTempFileURL({
      fileList: [{
        fileID: this.data.fileID,
      }],
    }).then(res => {
      console.log('获取成功', res)
      let files = res.fileList;

      if (files.length) {
        this.setData({
          coverImage: files[0].tempFileURL
        });
      }

      wx.hideLoading();
    }).catch(err => {
      console.error('获取失败', err)
      wx.showToast({
        title: '获取图片链接失败',
        icon: 'none'
      });
      wx.hideLoading();
    })
  },

  /**
   * 发布文章
   */
  addBlog: function (e) {
    const data = this.data
    const formData = e.detail.value;

    if (!formData.title || !formData.content || !data.coverImage) {
      return wx.showToast({
        title: '封面、标题或文章内容不能为空',
        icon: 'none'
      });
    }

    if(this.data.index == 0){
      return wx.showToast({
        title: '请选择分类',
        icon: 'none'
      });
    }

    wx.showLoading({
      title: '发布中',
    });

    data.date = new Date();
    var time = data.date.getTime();
    var year = data.date.getFullYear();
    var month = data.date.getMonth()+1;
    var day = data.date.getDate();
    var hour = data.date.getHours();
    var min = data.date.getMinutes();
    this.setData({
      current:year+'-'+month+'-'+day+' '+hour+':'+min
    })
    console.log(time);
    console.log(month);

    console.log(app.globalData.userInfo.nickName);

    wx.cloud.callFunction({
      name: 'add',
      data: {
        cover: data.coverImage,
        title: formData.title,
        content: formData.content,
        time: time,
        item: data.index,
        current: data.current,
        nickname:app.globalData.userInfo.nickName,
        // reply:[],
      }
    }).then(res => {
      console.log('调用成功', res)
      const result = res.result;
      const data = result.data || {};

      if (result.code) {
        wx.showToast({
          title: result.msg,
          icon: 'none'
        });
        return;
      }
      
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        duration: 2000
      })



    }).catch(err => {
      console.error('调用失败', err)
      this.setData({
        statusMsg: `调用失败：${err.errMsg}`,
      });
      wx.hideLoading();
    });
    wx.navigateBack({
      delta: 1
    })
  }
})
