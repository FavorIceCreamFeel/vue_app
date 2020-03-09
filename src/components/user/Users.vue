<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- //el-row是 栅栏一行，gutter代表下面每个col块 之间的间隔 -->
            <el-row :gutter="20">
                <!-- //el-col 是 一个块 span的属性值代表着每一个块所占大小,总计可以是12/24 -->
                <el-col :span="8">
                    <!-- 搜索框 -->
                    <!-- clearable 清除搜索框 点击后可以出发事件 @clear 也可以添加回车触发事件 keyup-->
                    <el-input placeholder="请输入内容"  @keyup="getUserList" clearable @clear="getUserList" @click="getUserList">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <!-- 按钮 -->
                <el-col :span="4">
                    <el-button type="primary" @click="dialogVisible= true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域  data的值是数据源中的对象-->
            <el-table :data="userList" border stripe>
              <!-- 索引列 -->
              <el-table-column type="index"></el-table-column>
              <!-- label列名 prop 绑定的属性值 -->
              <el-table-column label="姓名" prop="username"></el-table-column>
              <el-table-column label="邮箱" prop="email"></el-table-column>
              <el-table-column label="电话" prop="mobile"></el-table-column>
              <el-table-column label="角色" prop="role_name"></el-table-column>
              <el-table-column label="状态">
                <!-- 处理布尔值 =》 成开关 -->
                <template slot-scope="scope">
                  <!-- {{scope.row}} 作用域插槽的使用 这样能拿到这一行的数据 下面就绑定了一个 -->
                  <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="">
                  <el-tooltip  effect="dark" content="编辑" placement="top">
                    <!-- 按钮 可以使用 size = 'min' 改变图标大小 -->
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                  </el-tooltip>
                  <el-tooltip  effect="dark" content="在线" placement="top">
                    <el-button type="success" icon="el-icon-check" circle></el-button>
                  </el-tooltip>
                  <el-tooltip  effect="dark" content="删除" placement="top">
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页区域  -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">

            </el-pagination>
        </el-card>

        <!-- 添加用户对话框 :visible.sync显示与隐藏-->
        <el-dialog
          title="添加用户"
          :visible.sync="dialogVisible"
          width="50%" >
          <!-- 添加用户输入框 -->
          <el-form ref="addformRef" :model="addform" :rules="addformRole"  label-width="80px">
            <el-form-item label="账户：" prop="usersname" autofocus>
              <el-input v-model="addform.usersname"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pwd" autofocus>
              <el-input show-password v-model="addform.pwd"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="addform.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
              <el-input v-model="addform.mobile"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // 搜索关键字
        query: '',
        // 当前页
        pagenum: 1,
        // 当前页面数量
        pagesize: 2
      },
      total: 3,
      userList: [{
        id: 25,
        username: 'admin',
        mobile: '123456789899',
        type: 1,
        email: '1345566@qq.com',
        create_time: '2014-11-09T20:',
        mg_state: true,
        role_name: '管理员'
      },
      {
        id: 24,
        username: 'root',
        mobile: '123456789899',
        type: 1,
        email: '1345566@qq.com',
        create_time: '2014-11-09T20:',
        mg_state: false,
        role_name: '管理员'
      },
      {
        id: 24,
        username: 'root',
        mobile: '123456789899',
        type: 1,
        email: '1345566@qq.com',
        create_time: '2014-11-09T20:',
        mg_state: false,
        role_name: '管理员'
      }],
      // 对话框展示
      dialogVisible: false,
      addform: {
        usersname: '',
        pwd: '',
        email: '',
        mobile: ''
      },
      addformRole: {
        usersname: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          { min: 3, max: 10, message: '3~10', trigger: 'blur' }],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          { min: 3, max: 10, message: '3~10', trigger: 'blur' }],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          { min: 3, max: 10, message: '3~10', trigger: 'blur' }],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          { min: 3, max: 10, message: '3~10', trigger: 'blur' }]
      }
    }
  },
  created () {
    // this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = this.$http.post('users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = res.data.userlist
      this.total = res.data.total
    },
    // 监听页码值的改变事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      console.log(newSize)
      // 重新获取数据
      // this.getUserList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      // 重新获取数据
      // this.getUserList()
    },
    userStateChange (data) {
      // 利用插槽拿到整行(一条数据)的数据 data即按钮更改过的数据
      console.log(data.mg_state)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table{
  margin-top: 15px;
}
.el-card{
  font-family: '微软雅黑'
}
</style>
