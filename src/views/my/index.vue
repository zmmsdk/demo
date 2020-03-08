<template>
  <div class="my-container">
    <!-- 已登录：用户信息 -->
    <div class="user-info-wrap" v-if="$store.state.user">
      <div class="base-info-wrap">
        <div class="avatar-title-wrap" >
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="user.photo"
          />
          <div class="title">{{ user.name }}</div>
        </div>

      </div>

    </div>
    <!-- /已登录：用户信息 -->

    <!-- 未登录 -->
    <div class="not-login" v-else>
      <div
        class="mobile"
        @click="$router.push({
          name: 'login',
          query: {
            redirect: '/my'
          }
        })"
      ></div>
      <div class="text">点击登录</div>
    </div>
    <!-- /未登录 -->

    <van-cell-group v-if="$store.state.user">
      <van-cell
        style="text-align: center;"
        title="退出登录"
        clickable
        @click="onLogout"
      />
    </van-cell-group>
    <!-- /其它 -->
  </div>
</template>

<script>
import { getSelf } from '@/api/user'

export default {
  name: 'MyPage',
  data () {
    return {
      user: {} // 用户信息对象
    }
  },
  watch: {
    '$store.state.user' () {
      if (this.$store.state.user) {
        this.loadUser()
      }
    }
  },
  created () {
    if (this.$store.state.user) {
      this.loadUser()
    }
  },
  methods: {
    // 退出登录
    onLogout () {
      // Dialog 组件既可以在模板中使用
      // 也可以通过 JavaScript 来调用
      // 模板中使用 van-dialog
      // JavaScript 调用：this.$dialog
      this.$dialog.confirm({
        title: '退户确认',
        message: '退出当前头条账号，将不能同步收藏，发布评论和云端分享等'
      }).then(() => {
        // 确认执行这里

        // 清除容器和本地存储的数据
        this.$store.commit('setUser', null)
      }).catch(() => {
        // 取消执行这里
      })
    },

    async loadUser () {
      const res = await getSelf()
      this.user = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .user-info-wrap {
    background: url("./banner.png") no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    padding: 40px 20px;
    font-size: 15px;
    color: #fff;
    .base-info-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar-title-wrap {
        display: flex;
        align-items: center;
        .avatar {
          margin-right: 15px;
          width: 66px;
          height: 66px;
          padding: 2px;
          background: #fff;
        }
      }
    }
    .data-info {
      ::v-deep .van-grid-item__content {
        background: none;
      }
    }
  }

  .not-login {
    background: url("./banner.png") no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile {
      background: url("./mobile.png") no-repeat;
      background-size: cover;
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  > .van-cell-group {
    margin-top: 10px;
  }
}
</style>
