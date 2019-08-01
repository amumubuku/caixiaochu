<template>
  <div class="comment">
    <div class="comment-list">
      <div class="comment-item" v-for="(item, index) in commentList" :key="index">
        <div class="comment-head">
          <div class="good-cover">
            <img :src="item.cover" alt />
          </div>
          <div class="comment-info">
            <p>{{item.goods_title}}</p>
            <div class="comments-level">
              <div class="rate" v-for="(item, k) in  item.level" :key="k">
                <img
                  src="https://img.icaixiaochu.com/%E6%98%9F_%E5%AE%9E@2x.png"
                  @click="changeRate(index)"
                  v-if="index <= tempValue"
                  alt
                />
                <img
                  src="https://img.icaixiaochu.com/1111@2x.png"
                  v-else
                  @click="changeRate(index)"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
        <div class="comment-centent">
          <textarea
            placeholder="写下您对这笔交易的评价吧~"
            auto-focus
            v-model="text"
            class="text"
            maxlength="5000"
          />
        </div>
        <div class="comment-imgs">
          <p class="title">相关截图（选填）</p>
          <div class="img-list">
            <div
              class="img-item"
              v-for="(item, i) in item.uploadimg"
              :key="i"
              @click="previewImage(item)"
            >
              <img :src="item" alt />
              <div class="delete" @click.stop="deteleImg(i)">
                <img src="https://img.icaixiaochu.com/detele-icon.png" alt />
              </div>
            </div>
            <div class="select-img" @click="chooseImage">
              <img src="https://img.icaixiaochu.com/camera-icon.png" alt />
              <p>添加图片</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submit">提交</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectImgs: [],
      uploadImgs: [],
      level: 5,
      tempValue: -1,
      orderId: '',
      commentList: ''
    }
  },
  methods: {
    changeRate (value) {
      this.tempValue = value
    },
    subComment () {
      wx.showModal({
        title: '',
        content: `感谢你的评价`,
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#FEA835',
        success: result => {},
        fail: () => {},
        complete: () => {}
      })
    },
    chooseImage () {
      let _this = this
      if (_this.selectImgs.length >= 3) {
        wx.showToast({
          title: '只能上传3张图片',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: result => {},
          fail: () => {},
          complete: () => {}
        })
        return
      }
      wx.chooseImage({
        count: 3 - _this.selectImgs.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: result => {
          _this.selectImgs = _this.selectImgs.concat(result.tempFilePaths)
          this.upload(result.tempFilePaths)
        },
        fail: () => {},
        complete: () => {}
      })
    },
    previewImage (imgUrl) {
      wx.previewImage({
        current: imgUrl, // 当前显示图片的http链接
        urls: this.selectImgs // 需要预览的图片http链接列表
      })
    },
    upload (data) {
      let token = wx.getStorageSync('token') || ''
      data.forEach(element => {
        wx.uploadFile({
          url: 'https://icaixiaochu.com/api/upload',
          filePath: element,
          name: '111',
          formData: {
            token
          },
          success: result => {
            this.uploadImgs.push(JSON.parse(result.data).data)
          },
          fail: err => {
            console.log(err)
          },
          complete: () => {}
        })
      })
    },
    getOrderDetail () {
      this.$http.post('/orderDetail', { order_id: this.orderId }).then(res => {
        let normal = res.data.goods
        normal.forEach(ele => {
          ele.image = []
          ele.uploadImg = []
          ele.level = 5
          ele.tempValue = -1
          ele.content = ''
        })
        this.commentList = normal
      })
    }
  },
  mounted () {
    this.orderId = this.$root.$mp.query.id
    this.getOrderDetail()
  }
}
</script>
<style lang="less">
@import "./style.less";
</style>

