<template> 
    <el-menu mode="vertical" :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <!-- <div class="navbar__logo-box">
          <img :src="shouqianba" class="img-circle">
          <span style="margin-top:20px;margin-left:10px;font-size: 16px;">技术支持平台</span>
       </div> -->
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
</template>

<script>
import logo from '@/assets/logo.png'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  data() {
    return {
      logo
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>


<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
  /* .img.top{
    vertical-align: text-top
  }
  .img.bottom{
    vertical-align: text-bottom
  } */
  .img-circle{
    margin-left:13px;
    margin-top:5px;
    margin-bottom:5px;
    width:50px;
    height:50px;
    border-radius: 50%;
    vertical-align:middle
    

  }
  .logo {
    /* background-color: #ffffff; */
    font-size: 20px;
    padding: 4px 7px;
    
   
  }

   .navbar__logo-box {
      color: rgb(255, 208, 75);
      /* background-color: #3c8dbc; */
      background-color:rgb(84, 92, 100);

      /* background-color: #ffffff; */
    }
  .navbar__logo {
        display: block;
        height: 60px;
        margin-left: auto;
        
        margin-right: auto;
    }
</style>


