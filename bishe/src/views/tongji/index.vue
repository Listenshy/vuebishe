<template>
  <div>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" width="180"> </el-table-column>
      <el-table-column prop="name1" width="180"> </el-table-column>
      <el-table-column prop="prap" width="180"> </el-table-column>
    </el-table>
    <!-- <table>
      <ul>
        <li v-for="(item, index) in tableData" :key="index"> <ul v-for="(item1, index1) in item.prap" :key="index1">
            <li>{{ item1.first }} {{ item1.last }}</li>
          </ul>
        </li>
      </ul>
    </table> -->

    <!-- 分页器 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[5, 10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination> -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      layout="total, prev, pager, next"
      :total="total"
      :page-size="5"
    >
    </el-pagination> -->

    <!-- <ul>
      <li v-for="(item, index) in tableData.prap" :key="index">
        <ul>
          <li v-for="(item1, index1) in item.first" :key="index1">
            {{ item1 }}
          </li>
          <li></li>
        </ul>
      </li>
    </ul> -->
  </div>
</template>

<script>
import teacherApi from "@/api/teacher.js";
// import studentApi from "@/api/student.js";
export default {
  data() {
    return {
      tableData: [
        // { name: '是', prap: [{ first: "起始1" }, { last: "结束1" }] },
        // { name: '是', prap: [{ first: "起始2" }, { last: "结束2" }] },
        // { name: '否', prap: [{ first: "起始3" }, { last: "结束3" }] },
        { name: "否", name1: "是", prap: 111 },
        { name: "是", name1: "否", prap: 222 },
        { name: "否", name1: "否", prap: 333 },
      ],
      // 条数
      total: 0,
      // 当前页
      currentPage1: 1,
      // 默认一页5个
      pageSize: 5,
    };
  },
  beforeMount() {
    this.tableData.map((item) => {
      console.log(item);
      if (item.name == "否" && item.name1 == "否") {
        item.name1 = "-";
        item.prap = "-";
      } else if (item.name == "是" && item.name1 == "否") {
        item.prap = "-";
      } else if (item.name == "否" && item.name1 == "是") {
        item.name = "-";
      }
    });
  },
  methods: {
    getList() {
      teacherApi.getList().then((res) => {
        //   console.log(res.data.data.rows);
        this.tableData = res.data.data.rows;
        this.total = res.data.data.rows.length;
        console.log(this.total);
      });
    },
    handleSizeChange(val) {
      console.log(1);
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.getList();
    },
  },
  // beforeMount() {
  // this.tableData.map((item) => {
  //   // console.log(item.name);
  //   if(item.name==111){
  //     return item.name=999
  //   }else if(item.name==222){
  //      return item.name=888
  //   }else if(item.name==333){
  //      return item.name=777
  //   }
  // });
  // },
};
</script>

<style>
</style>