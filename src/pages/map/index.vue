<template>
  <div class="page-index">
    <div class="header border-solid-bottom">
      <div class="avatarbox">
        <open-data type="userAvatarUrl" class="avatar"></open-data>
      </div>
      <div class="search">
        <input type="text" placeholder="选择位置" v-model="keyword" disabled @click="chooseAddr" />
      </div>
      <div class="list">
        <i class="icon icon-home_icon_listx"></i>
      </div>
    </div>
    <div class="mapbox">
      <map
        id="map"
        :latitude="current.latitude"
        :longitude="current.longitude"
        :markers="markers"
        show-location
        @regionchange="regionChange"
        @begin="begin"
        @end="end"
        @markertap="markerTap"
      >
        <cover-view class="center">
          <cover-image src="/static/images/location.png"></cover-image>
        </cover-view>
      </map>
    </div>
  </div>
</template>

<script >
export default {
  data () {
    return {
      // 搜索关键词
      keyword: '',
      // 当前位置经纬度
      current: {
        latitude: '39',
        longitude: '116'
      },
      // 充电站列表
      markers: []
    }
  },
  mounted () {
    this.getCurrentPosition()
    // setInterval(() => {
    //   this.getCurrentPosition()
    // }, 3000)
  },
  methods: {
    // 选择地址
    chooseAddr () {
      wx.chooseLocation({
        success: res => {
          let pos = {
            latitude: res.latitude.toString(),
            longitude: res.longitude.toString()
          }
          console.log(res)
          this.current = pos
          this.keyword = res.name
        }
      })
    },
    // 获取当前位置经纬度
    getCurrentPosition () {
      wx.getLocation({
        type: 'gcj02',
        altitude: 'false',
        success: result => {
          let pos = {
            latitude: result.latitude.toString(),
            longitude: result.longitude.toString()
          }

          this.current = pos
        },
        fail: () => {},
        complete: () => {}
      })
    },
    // 获取中心点经纬度,然后查询附近充电站
    getCenterLocation () {
      let mapCtx = wx.createMapContext('map')
      mapCtx.getCenterLocation({
        success: res => {
          let pos = {
            latitude: res.latitude,
            longitude: res.longitude
          }
          this.getStations(pos)
        }
      })
    },
    // 获取充电站
    getStations (e) {
      // 模拟请求后更改data数据
      this.markers = [1, 2]
    },
    // 视野变化触发：begin和end方法内操作data会导致地图拖动后立即复位
    regionChange (e) {
      console.log('in regionchange')
      console.log(e)
    },
    // 视野变化开始：begin和end方法内操作data会导致地图拖动后立即复位
    begin (e) {
      console.log('in begin')
      console.log(e)
    },
    // 视野变化结束：begin和end方法内操作data会导致地图拖动后立即复位
    end (e) {
      // 拖动结束后获取中心点经纬度
      console.log('in end')
      this.getCenterLocation()
    }
  }
}
</script>

<style lang="less"  scoped>
.page-index {
  display: flex;
  flex-direction: column;
  height: 100%;
  .header {
    display: flex;
    padding: 12px 0;
    .avatarbox,
    .list {
      padding: 0 16px;
    }
    .avatarbox {
      .avatar {
        display: block;
        width: 36px;
        height: 36px;
        border-radius: 2 * 36px;
        text-align: center;
        border: 1px solid #f1f1f1;
        overflow: hidden;
      }
    }
    .list {
      .icon {
        font-size: 30px;
        color: #00baef;
      }
    }
    .search {
      flex: 1;
      input {
        height: 36px;
        line-height: 36px;
        padding: 0 16px;
        background: #f1f1f1;
        border-radius: 2 * 36px;
      }
    }
  }
  .mapbox {
    position: relative;
    flex: 1;
    height: 400px;
    #map {
      width: 100%;
      height: 100%;
      .center {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -48px 0 0 -10px;
        width: 20px;
        height: 50px;
        text-align: center;
        cover-image {
          margin: 0 auto;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>