<template>
  <el-menu class="navbar" mode="horizontal">
      <img :src="logo" class="img-circle">
      <span style="float: left;margin-left:10px;font-size: 16px;">博客管理平台</span>
    
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    
    <el-button type="text" menu-item class="avatar-container" style="right: 250px;">{{name}}</el-button>
    <el-button type="text" menu-item class="avatar-container" style="right: 150px;">{{username}}</el-button>
    <el-dropdown class="avatar-container" style="right: 25px;">
      <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="logout" style="display:block;">退出</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import shouqianba from '@/assets/shouqianba.png'
  import {
    mapGetters
  } from 'vuex'
  import Levelbar from './Levelbar'
  import Hamburger from '@/components/Hamburger'
  
  
  export default {
    data() {
      return {
        shouqianba
      }
    },
    components: {
      Levelbar,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'username',
        'name'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 60px;
    line-height: 60px;
    background-color: rgb(84, 92, 100);
    // background-color: #3c8dbc;
    // active-text-color:rgb(255, 208, 75);
    color: rgb(255, 208, 75);
    border-radius: 0px !important;
    // padding-left:10px;
    .hamburger-container {
      // line-height: 58px;
      // height: 60px;
      float: left;
      margin-left:30px;
      padding: 2px 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      color: rgb(255, 208, 75);
      height: 60px;
      display: inline-block;
      position: absolute;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 15px;
        position: relative;
        .user-avatar {
          width: 40px;
          // height: 60px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .img-circle {
      float: left;
      margin-left: 13px;
      margin-top: 5px;
      margin-bottom: 5px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle
    }
    .navbar__logo-box {
      color: rgb(255, 208, 75);
      /* background-color: #3c8dbc; */
      background-color:rgb(84, 92, 100);

      /* background-color: #ffffff; */
    }
    .navbar__logo {
        display: block;
        // height: 60px;
        margin-left: auto;
        
        margin-right: auto;
    }
    .logo {
    /* background-color: #ffffff; */
    font-size: 20px;
    padding: 4px 7px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    }
  }
</style>

