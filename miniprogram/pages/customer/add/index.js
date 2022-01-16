// miniprogram/pages/customer/add/index.js
import {
    fmtDate
} from 'lonts'
const app = getApp();
import {
    cloudFunction
} from '../../../utils/cloud'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        formData: {
            name: '',
            public: false,
            account: ''
        },
        rules: [{
            name: 'name',
            rules: {
                required: true,
                message: '组合名称不能为空'
            }
        }],
    },
    formInputChange(e) {
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
    },
    submitForm() {
        this.selectComponent('#form').validate((valid, errors) => {
            console.log('valid', valid, errors)
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })
                }
            } else {
                cloudFunction(
                    'addCustomer', {
                        ...this.data.formData,
                        id: fmtDate(new Date(), 'yyyyMMdd_hhmmss') + '_' + Math.random().toString().split('.')[1].substring(0, 6)
                    },
                    (res) => {
                        // 更新全局组合列表
                        app.getList()
                        wx.showToast({
                            icon: "success",
                            duration: 1500,
                            title: "组合添加成功",
                            success: () => {
                                setTimeout(() => {
                                    wx.navigateBack({
                                        delta: 1,
                                    })
                                }, 1500);
                            }
                        })
                    })
            }
        })
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

    }
})