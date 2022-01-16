 const fmtJsonp = (str, cbName) => {
     const reg = new RegExp("^" + cbName + "\\(([\\w\\W]*)\\)$", "i");
     const res = str.match(reg)
     return res ? res[1] : null
 }
 const service = {
     jsonp(url, data, header = {}) {
         return new Promise((resolve, reject) => {
             wx.request({
                 method: 'get',
                 url: url,
                 data: data,
                 header: {
                     "content-type": "application/json",
                     ...header
                 },
                 success: (res) => {
                     // 调用接口成功
                     if (res.errMsg === "request:ok") {
                         const resData = JSON.parse(fmtJsonp(res.data, data.callback)) 
                         resolve(resData)
                     } else {
                        reject(res)
                     }
                 },
                 fail: (err) => {
                     // 调用接口失败
                     reject(err)
                 }
             })
         })
     },
     Get(url, data) {
         return new Promise((resolve, reject) => {
             wx.request({
                 method: 'get',
                 url: url,
                 data: data,
                 header: {
                     "content-type": "application/json"
                 },
                 success: (res) => {
                     // 调用接口成功
                     resolve(res.data)
                 },
                 fail: (err) => {
                     // 调用接口失败
                     reject(err)
                 }
             })
         })
     },
     
    Post(url, data) {
         return new Promise((resolve, reject) => {
             wx.request({
                 method: 'post',
                 url: url,
                 data: data,
                 header: {
                     "content-type": "application/x-www-form-urlencoded"
                 },
                 success: (res) => {
                     // 调用接口成功
                     resolve(res)
                 },
                 fail: (err) => {
                     // 调用接口失败
                     reject(err)
                 }
             })
         })
     }
 }
 module.exports = service