<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
        <!-- <router-link v-if="item.children.length===1 && !item.children[0].children" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span v-if="item.name">{{item.name}}</span>
</template>
        </el-menu-item>
      </router-link> -->

      <el-submenu :index="item.name||item.path" :key="item.name">
<template slot="title">
  <i class="el-icon-menu"></i>
  <span style="color:#e6a23c;font-size: 16px;margin-left:14px" v-if="item.name">{{item.name}}</span>
</template>

<template v-for="child in item.children" v-if="!child.hidden">
  <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path">
  </sidebar-item>
  <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
    <el-menu-item :index="item.path+'/'+child.path" style="height:40px;color: #409eff;font-size: 14px;padding-left:20px;line-height:40px">{{child.name}}</el-menu-item>
  </router-link>
</template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    }
  }
</script>



