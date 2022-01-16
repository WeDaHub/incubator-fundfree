// pages/components/color-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sourceData: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    colorList: ['63b2ee', '76da91', 'f8cb7f', 'f89588', '7cd6cf', '9192ab', '7898e1', 'efa666', 'eddd86', '9987ce', '63b2ee', '76da91']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlerItemTap: function(e) {
      this.triggerEvent('handlerItemTap', e)
    }
  }
})
