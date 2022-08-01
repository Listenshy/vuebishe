<template>
  <div>
    <!-- 条件查询 -->
    <el-form
      :inline="true"
      :model="searchMap"
      ref="searchForm"
      class="demo-form-inline"
    >
      <el-form-item prop="stunum">
        <el-input v-model="searchMap.stunum" placeholder="学号"></el-input>
      </el-form-item>

      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="姓名"></el-input>
      </el-form-item>

      <el-form-item prop="teacher">
        <el-input
          v-model="searchMap.teacher"
          readonly
          @click.native="dialogFormVisible = true"
          placeholder="指导教师"
        ></el-input>
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

    <!-- 主体 -->
    <el-table :data="list" height="400" border style="width: 95%">
      <el-table-column type="index" label="序号" width="50px">
      </el-table-column>
      <el-table-column prop="stunum" label="学号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="admissiondate" label="入学时间"></el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="teacher" label="教师"> </el-table-column>
      <el-table-column prop="class" label="班级"> </el-table-column>
      <el-table-column prop="job" label="工作"> </el-table-column>
      <el-table-column prop="money" label="工资"> </el-table-column>

      <el-table-column label="操作" width="150px">
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 弹出框 -->

    <el-dialog title="请选择教师" :visible.sync="dialogFormVisible">
      <teacher :bb="true" @option-teacher="optionTeacher"></teacher>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div> -->
    </el-dialog>

    <!-- 新增学员弹出框 -->
    <el-dialog title="学员编辑" :visible.sync="studentFormVisible">
      <!-- 新增学员学号 -->
      <el-form :model="pojo" ref="pojoFrom" :rules="rules">
        <el-form-item label="学号" prop="stunum">
          <el-input
            style="width: 200px"
            v-model="pojo.stunum"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <!-- 新增学员姓名 -->
        <el-form-item label="姓名" prop="name">
          <el-input
            style="width: 200px"
            v-model="pojo.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <!-- 新增学员入学时间 -->
        <el-form-item label="入学时间" prop="admissiondate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="pojo.admissiondate"
          ></el-date-picker>
        </el-form-item>
        <!-- 新增学员教师 -->
        <el-form-item label="教师" prop="teacher">
          <el-input
            style="width: 200px"
            v-model="pojo.teacher"
            readonly
            @click.native="editTeacher"
            placeholder="授课教师"
          ></el-input>
        </el-form-item>
        <!-- 新增学员电话号码 -->
        <el-form-item label="电话号码" prop="phone">
          <el-input
            style="width: 200px"
            v-model="pojo.phone"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <!-- 新增学员班级 -->
        <el-form-item label="班级" prop="class">
          <el-input
            style="width: 200px"
            v-model="pojo.class"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <!-- 新增学员工作 -->
        <el-form-item label="工作" prop="job">
          <el-input
            style="width: 200px"
            v-model="pojo.job"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <!-- 新增学员工资 -->
        <el-form-item label="工资" prop="money">
          <el-input
            style="width: 200px"
            v-model="pojo.money"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="studentFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null
              ? addFormData('pojoFrom')
              : updateFormData('pojoFrom')
          "
          >确 定
        </el-button>
        <!-- <el-button type="primary" @click="addFormData('pojoFrom')"
          >确 定
        </el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
import Teacher from "../teacher/index.vue";

export default {
  components: {
    Teacher,
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchMap: {
        stunum: "",
        name: "",
        teacher: "",
        id: null,
      },
      dialogFormVisible: false,
      studentFormVisible: false,
      bb: true,
      rules: {
        stunum: [
          //默认校验
          { required: true, message: "请输入学生学号", trigger: "blur" },
        ],
        name: [
          //默认校验
          { required: true, message: "请输入学生姓名", trigger: "blur" },
        ],
        admissiondate: [
          //默认校验
          { required: true, message: "请输入入学时间", trigger: "blur" },
        ],
        // teacher: [
        //   //默认校验
        //   { required: true, message: "请输入授课教师", trigger: "blur" },
        // ],
        phone: [
          //默认校验
          { required: true, message: "请输入学生电话", trigger: "blur" },
        ],
        class: [
          //默认校验
          { required: true, message: "请输入入学班级", trigger: "blur" },
        ],
      },
      isEdit: false,
      pojo: {
        id: null,
        name: "",
        stunum: "",
        admissiondate: "",
        teacher: "",
        phone: "",
        class: "",
        job: "",
        money: "",
      },
    };
  },
  // watch: {
  //   list(newval) {
  //     console.log(newval);
  //   },
  // },
  // mounted() {
  //   // this.$nextTick(() => {
  //    console.log(this.list);
  //   // });
  // },
  methods: {
    // 学生编辑
    handleEdit(value) {
      this.addData();
      this.pojo.id = value;
      studentApi.getById(value).then((res) => {
        let resArr = res.data;
        if (resArr.flag) {
          this.pojo = resArr.data;
        }
      });
    },
    // 学生删除
    handleDelete(msg) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          studentApi.delete(msg).then((res) => {
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
    // 渲染页面
    getList() {
      studentApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((res) => {
          let resArr = res.data;
          this.list = resArr.data.rows;
          this.total = resArr.data.content;
        });
      // console.log(this.pojo.job);
    },

    // 底端的分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //条件查询
    onSubmit() {
      this.currentPage = 1;
      this.getList();
    },
    //
    addData() {
      this.pojo.id = null;
      this.studentFormVisible = true;
      this.$nextTick(() => {
        // 渲染操作结束
        this.$refs["pojoFrom"].resetFields();
      });
    },
    //重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getList();
    },
    optionTeacher(val) {
      if (this.isEdit) {
        this.pojo.teacher = val.name;
      } else {
        this.searchMap.teacher = val.name;
      }
      this.isEdit = false;
      this.dialogFormVisible = false;
    },
    // 添加新增确定按钮方法
    addFormData(formName) {
      // console.log("新增");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log("验证通过");
          studentApi.save(this.pojo).then((res) => {
            let resArr = res.data;
            // console.log(resArr);
            if (resArr.flag) {
              this.getList();
              this.studentFormVisible = false;
            } else {
              // console.log("新增失败");
            }
          });
        } else {
          alert("验证不通过");
        }
      });
    },
    // 更新学生信息
    updateFormData() {
      // console.log("更新");
      studentApi.update(this.pojo).then((res) => {
        // console.log(res);
        let resArr = res.data;
        if (resArr.flag) {
          this.getList();
          this.studentFormVisible = false;
        }
      });
    },
    // 编辑
    editTeacher() {
      this.isEdit = true;
      this.dialogFormVisible = true;
    },
  },

  created() {
    this.getList();
    
  },
};
</script>

<style></style>
