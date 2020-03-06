<template>
    <div class="login_container">
       <div class="login_box">
           <!-- 头像区域 -->
           <div class="avater_box">
               <img src="../assets/logo.png" alt="图片">
           </div>
           <!-- 登录表单区域 ref就代表着表单本身 rules对象 简单的校验，可以使用正则表达式， loginForm 对象 绑定的数据 -->
           <el-form ref="form" :rules="loginFormRules"  :model="loginForm" label-width="90px" class="login_form">
               <!-- 用户名 -->
                <el-form-item label="账户：" prop="name">
                    <!-- <el-input class="input_width">可以使用class调整样式</el-input> -->
                    <el-input v-model="loginForm.name" prefix-icon="el-icon-user-solid" autofocus></el-input>
                </el-form-item>

                <!-- 密码 -->
                 <el-form-item label="密码：" prop="password">
                    <el-input show-password v-model="loginForm.password" class="input_width" prefix-icon="el-icon-s-goods"></el-input>
                </el-form-item>

                <!-- 按钮 -->
                 <el-form-item class="login_button">
                    <el-button type="primary">注册</el-button>
                    <el-button type="success" @click="login()">登录</el-button>
                </el-form-item>
           </el-form>
       </div>
    </div>
</template>

<script>
export default {
// 空格缩进难受死我了
  data () {
    return {
      loginForm: {
        name: '12345678',
        password: '123456'
      },
      loginFormRules: {
        //   验证用户名是否合法 这个名字要和数据中的名字一样要不然没效果
        name: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 8, max: 12, message: '8到12个字符之间', trigger: 'blur' }
        ],
        // 验证密码  这个名字要和数据中的名字一样要不然没效果
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '6到8个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
    // 获取rules验证结果
      this.$refs.form.validate(async boo => {
        if (!boo) return
        // 发送post请求 携带绑定的loginForm数据对象
        // const { data: res } = await this.$http.post('login', this.loginForm)
        // if (res.meta.status !== 200) {
        //   return this.$message.error('登录失败！')
        // }
        this.$message.success('登录成功！')
        // 将登录成功后的token，保存到客户端的sessionStorage中
        // token只在当前网站打开期间生效，所有将token保存着sessionStorage中
        // window.sessionStorage.setItem('token', res.data.token)
        // 通过编程式导航跳转到后台主页
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 全局背景颜色
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
// 中间登录框样式
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

// 语法嵌套小图标样式
    .avater_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        // 往x轴移动付50%，往y轴移动-50%，及为avater_box高宽的一半
        transform: translate(-50%,-50%);
        background-color: #fff;
        img{
           width: 100%;
           height: 100%;
           border-radius: 50%;
           background-color: #eee;
        }
    }
}
// 按钮位置调整
.login_button{
    margin-left: 11%;
}
// 登录表单位置处理
.login_form{
    position: absolute;
    top: 100px;
    left: 20px;
    // 调整表单的宽度
    width: 80%;
    font-family: "微软雅黑";
}
</style>
