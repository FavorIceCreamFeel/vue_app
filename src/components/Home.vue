<template>
    <el-container class="home_container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <div class="avater_box">
                    <img src="../assets/logo.png" alt="图片">
                </div>
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
            <!-- 侧边栏  绑定折叠样式-->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 折叠按钮 -->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏区域 unique-opened属性可以让子菜单只打开一个，打开其他的就直接关闭其他的 -->
                <el-menu background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" unique-opened :collapse="isCollapse"
                :collapse-transition="false" router :default-active="activePath">
                    <!-- 一级菜单 -->
                    <!-- <el-submenu :index="item.id" v-for="item in menulist" :key="item.id"> -->
                        <el-submenu index="1">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标  根据key来确定对应的小图标-->
                            <i :class="iconsObj[123]"></i>
                            <!-- 文本 -->
                            <!-- <span>{{ item.name }}</span> -->
                            <span>一级文本</span>
                        </template>
                        <!-- 二级导航模板 -->
                        <!-- <el-menu-item index="'/'+subItem.path"  v-for="subItem in item.children" :key="subItem.id"
                        @click="saveActive('/'+subItem.path)"> -->
                        <el-menu-item index="users" @click="saveActive('users')">
                            <!-- 二级图标 -->
                            <i class="el-icon-menu"></i>
                            <!-- 二级文本 -->
                            <!-- <span slot="title">{{ subItem.name }}</span> -->
                             <span slot="title">二级文本</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标  根据key来确定对应的小图标-->
                            <i :class="iconsObj[127]"></i>
                            <!-- 文本 -->
                            <!-- <span>{{ item.name }}</span> -->
                            <span>一级文本</span>
                        </template>
                        <!-- 二级导航模板 -->
                        <!-- <el-menu-item index="'/'+subItem.path"  v-for="subItem in item.children" :key="subItem.id"
                        @click="saveActive('/'+subItem.path)"> -->
                        <el-menu-item index="roles" @click="saveActive('roles')">
                            <!-- 二级图标 -->
                            <i class="el-icon-menu"></i>
                            <!-- 二级文本 -->
                            <!-- <span slot="title">{{ subItem.name }}</span> -->
                             <span slot="title">二级文本</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iconsObj: {
        //   小图标 根据key来确定对应的小图标
        123: 'el-icon-s-custom',
        124: 'el-icon-s-cooperation',
        125: 'el-icon-s-home',
        126: 'el-icon-s-comment',
        127: 'el-icon-s-tools'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.post('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.status)
      this.menulist = res.data
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveActive (activepath) {
      window.sessionStorage.setItem('activePath', activepath)
      this.activePath = activepath
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
    background-color: #373d41;
     display: flex;
    //  以两边对齐
    justify-content: space-between;
    // 以中间对对齐
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        font-family: '微软雅黑';
        span {
            margin-left: 10px;
        }
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background-color: #eaedf1;
}
.home_container{
    height: 100%;
}
.avater_box{
        height: 50px;
        width: 50px;
        border: 1px solid #eee;
        border-radius: 50%;
        // padding: 10px;
        box-shadow: 0 0 5px #ddd;
        display: inline-block;
        // position: absolute;
        // left: 50%;
        // 往x轴移动付50%，往y轴移动-50%，及为avater_box高宽的一半
        // transform: translate(-50%,-50%);
        background-color: #fff;
        img{
           width: 100%;
           height: 100%;
           border-radius: 50%;
           background-color: #eee;
        }
}
.toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color:#fff;
    text-align: center
    cursor：pointer;
}
</style>
