<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          :src="userInfo.portrait || require('@/assets/default-avatar.png')"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </template></el-dropdown
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getUserInfo } from "@/services/user";
export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      userInfo: {}, // 当前登录用户信息
    };
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    async loadUserInfo() {
      const { data } = await getUserInfo();
      this.userInfo = data.content;
      console.log("loadUserInfo");
    },
    handleLogout() {
      this.$confirm("确认退出吗？", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认执行这里
          // 清除登录状态
          this.$store.commit("setUser", null);
          // 跳转到登录页面
          this.$router.push({
            name: "login",
          });
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          // 取消执行这里
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
