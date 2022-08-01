<template>
  <div class="block">
    <el-form
      v-if="!bb"
      :inline="true"
      :model="searchMap"
      ref="searchForm"
      class="demo-form-inline"
    >
      <el-form-item prop="jobnumber">
        <el-input v-model="searchMap.jobnumber" placeholder="工号"></el-input>
      </el-form-item>

      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="教师姓名"></el-input>
      </el-form-item>

      <el-form-item prop="role">
        <el-select v-model="searchMap.role" placeholder="教师职务">
          <el-option
            v-for="option in roleOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="entrydate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="searchMap.entrydate"
        ></el-date-picker>
      </el-form-item>
      <!-- 按钮功能 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addData">新增</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- zhuti -->
    <el-table
      :data="list"
      height="400"
      border
      style="width: 95%"
      :highlight-current-row="bb"
      @current-change="clickCurrentChange"
    >
      <el-table-column v-if="!bb" type="index" label="序号" width="50px">
      </el-table-column>
      <el-table-column v-if="!bb" prop="jobnumber" label="工号">
      </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="role" label="职务">
        <!-- 过滤职务是否为班主任还是教师 -->
        <template slot-scope="scope">
          <span>{{ scope.row.role | roleFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="!bb" prop="entrydate" label="入职时间">
      </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>

      <el-table-column label="操作" v-if="!bb">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      :layout="
        !bb ? 'total, sizes, prev, pager, next, jumper' : ' prev, pager, next'
      "
      :total="total"
    >
    </el-pagination>

    <!-- 弹出框 -->
    <el-dialog title="编辑教师信息" :visible.sync="dialogFormVisible">
      <!-- 新增工号 -->
      <el-form :model="pojo" ref="pojoFrom" :rules="rules">
        <el-form-item label="工号" prop="jobnumber">
          <el-input
            style="width: 200px"
            v-model="pojo.jobnumber"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <!-- 新增教师姓名 -->
        <el-form-item label="姓名" prop="name">
          <el-input
            style="width: 200px"
            v-model="pojo.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <!-- 新增职务 -->
        <el-form-item label="职务" prop="role">
          <el-select
            style="width: 200px"
            v-model="pojo.role"
            placeholder="请选择职务"
          >
            <el-option
              v-for="option in roleOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 新增教师入职时间 -->
        <el-form-item label="入职时间" prop="entrydate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="pojo.entrydate"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input
            style="width: 200px"
            v-model="pojo.phone"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null
              ? addFormData('pojoFrom')
              : updateFormData('pojoFrom')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入getList方法获得的数据
import teacherApi from "@/api/teacher.js";
// 定义规则
let roleOptions = [
  { type: "1", name: "班主任" },
  { type: "2", name: "教师" },
];

export default {
  props: {
    bb: Boolean,
  },
  data() {
    return {
      // 返回到教师列表的数据
      list: [],
      // 默认第一页
      currentPage: 1,
      // 默认一页十个
      pageSize: 10,
      total: 0,
      // 条件查询
      searchMap: {
        jobnumber: "",
        name: "",
        role: "",
        entrydate: "",
      },
      roleOptions,
      dialogFormVisible: false,
      // 新增教师
      pojo: {
        jobnumber: "",
        name: "",
        role: "",
        entrydate: "",
        phone: "",
        role: "",
        id: null,
      },
      rules: {
        jobnumber: [
          //默认校验
          { required: true, message: "请输入注册工号", trigger: "blur" },
        ],
        name: [
          //默认校验
          { required: true, message: "请输入教师姓名", trigger: "blur" },
        ],
        phone: [
          //默认校验
          { required: true, message: "请输入注册账号", trigger: "blur" },
        ],
        username: [
          //默认校验
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        entrydate: [
          //默认校验
          { required: true, message: "请输入入职时间", trigger: "blur" },
        ],
        role: [
          //默认校验
          { required: true, message: "请输入教师职务", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // queryList() {
    //   // 使用方法拿到后台数据库中的数据，使用钩子函数运行
    //   teacherApi.getList().then((res) => {
    //     this.list = res.data.data.rows;
    //     console.log(res);
    //   });
    // },

    //页面刷新
    getList() {
      teacherApi
        // search 的三个参数
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((res) => {
          // console.log(res);

          // 显示到页面中
          let resArr = res.data;
          // 当前多少条
          this.total = resArr.data.content;
          // 显示所有信息的人数
          this.list = resArr.data.rows;
        })
        .catch((err) => {
          // console.log(err, "err");
        });
    },

    // 编辑功能
    handleEdit(msg) {
      this.addData();

      // console.log(msg);就是id
      teacherApi.getId(msg).then((res) => {
        if (res.data.flag) {
          // console.log(res);
          this.pojo = res.data.data;
        }
      });
    },
    // 删除功能
    handleDelete(msg) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          teacherApi.delete(msg).then((res) => {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            if (res.data.flag) {
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除!",
          });
        });
    },

    // 底端的分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      // if (this.bb) {
      //   return;
      // }
      this.currentPage = val;
      this.getList();
    },

    // 查询按钮
    onSubmit() {
      // 规定页面数
      this.currentPage = 1;
      this.getList();
    },

    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getList();
    },
    //  新增教师
    addData() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["pojoFrom"].resetFields();
      });
    },

    addFormData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("验证通过");
          teacherApi.add(this.pojo).then((res) => {
            // console.log(res.data);
            if (res.data.flag) {
              this.getList();
              this.dialogFormVisible = false;
            }
          });
        } else {
          alert("验证不通过");
          return false;
        }
      });
    },
    // 编辑更新教师
    updateFormData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("验证通过");
          teacherApi.update(this.pojo).then((res) => {
            // console.log(res.data);
            if (res.data.flag) {
              this.getList();
              this.dialogFormVisible = false;
              this.pojo.id = null;
              this.pojo.name = "";
              this.pojo.role = "";
              this.pojo.jobnumber = "";
              this.pojo.entrydate = "";
              this.pojo.phone = "";
              // for (const key in this.pojo) {
              //   if(key=="id"){
              //      this.pojo[key]=null
              //   }
              //   this.pojo[key]=""
              // }
              // console.log(this.pojo);
            }
          });
        } else {
          alert("验证不通过");
          return false;
        }
      });
    },
    clickCurrentChange(val) {
      if (val) {
        // 判断是否有val，向父组件传值
        this.$emit("option-teacher", val);
      }
    },
  },
  created() {
    // this.queryList();
    this.getList();
  },
  // 过滤器
  filters: {
    roleFilter(type) {
      let obj = roleOptions.find((item) => item.type === type);
      return obj ? obj.name : null;
    },
  },
};
</script>

<style></style>
