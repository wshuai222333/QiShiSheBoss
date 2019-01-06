<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">企业管理</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-row>
        <!-- <el-col :span="8"> 用户名:
          <m-input placeholder="用户名" v-model="username" />
        </el-col>
        <el-col :span="8"> 手机号:
          <m-input placeholder="手机号" v-model="phone" />
        </el-col>
        <m-button type="info" @click="onQueryClick(1)">查询</m-button>-->
        <m-button type="info" @click="onClickNewOpen()">添加</m-button>
      </el-row>

      <p></p>
      <el-table :data="tableData">
        <el-table-column label="企业编号" prop="EnterpriseId"></el-table-column>
        <el-table-column label="企业名称" prop="EnterpriseName"></el-table-column>
        <el-table-column label="企业税务统一代码" prop="EnterpriseCode"></el-table-column>
        <el-table-column label="联系人" prop="ContactsName"></el-table-column>
        <el-table-column label="联系电话" prop="ContactsPhone"></el-table-column>
        <el-table-column label="联系邮箱" prop="ContactsEmail"></el-table-column>
        <el-table-column label="状态" prop="Status" :formatter="formatter"></el-table-column>
        <el-table-column label="创建时间" prop="CreateTime"></el-table-column>
        <el-table-column label="修改时间" prop="UpdateTime"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onClickModify(scope.row)">编辑</el-button>
            <!-- <el-button
              type="text"
              size="small"
              v-if="scope.row.Status==1"
              @click="onClickModifyState(scope.row.BackgroundUserId,0)"
            >停用</el-button>
            <el-button
              type="text"
              size="small"
              v-if="scope.row.Status==0"
              @click="onClickModifyState(scope.row.BackgroundUserId,1)"
            >启用</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog title="添加企业" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input v-model="form.enterprisename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业税务统一代码" :label-width="formLabelWidth">
          <el-input v-model="form.enterprisecode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.contactsname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.contactsphone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.contactsemail" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickAdd(0)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改企业" :visible.sync="dialogMFormVisible">
      <el-form :model="form">
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input v-model="form.enterprisename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业税务统一代码" :label-width="formLabelWidth">
          <el-input v-model="form.enterprisecode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.contactsname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.contactsphone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.contactsemail" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickAdd(form.enterpriseId)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Service from "../_common";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      dialogMFormVisible: false,
      form: {
        enterprisename: "",
        enterprisecode: "",
        contactsname: "",
        contactsphone: "",
        contactsemail: "",
        enterpriseId: 0
      },
      formLabelWidth: "100px",
      currentPage: 1
    };
  },
  methods: {
    formatter(row, column) {
      var msg = "";
      switch (parseInt(row.Status)) {
        case 1:
          msg = "正常";
          break;
        case 0:
          msg = "停用";
          break;
        default:
          msg = "未知状态";
          break;
      }
      return msg;
    },

    handleCurrentChange(val) {
      this.onQueryClick(val);
    },

    onQueryClick: function(pageindex) {
      this.currentPage = pageindex;
      this.$http
        .post(
          "/api/Boss/GetEnterpriseList",
          Service.Encrypt.DataEncryption({
            pageindex: pageindex,
            pagesize: 10
          })
        )
        .then(
          response => {
            if (
              response.Data &&
              response.Data != null &&
              response.Data != undefined
            ) {
              if (response.Status == 100) {
                this.total = response.Data.TotalItems;
                this.tableData = response.Data.Items;
              } else {
                this.$message(response.Message);
              }
            } else {
              this.$message(response.Message);
            }
          },
          error => {
            this.$message(error);
            console.log(error);
          }
        );
    },
    onClickNewOpen() {
      this.dialogFormVisible = true;
      this.form.enterprisename = "";
      this.form.enterprisecode = "";
      this.form.contactsname = "";
      this.form.contactsphone = "";
      this.form.contactsemail = "";
      this.form.enterpriseId = 0;
    },
    onClickModify(enterprise) {
      this.dialogMFormVisible = true;
      this.form.enterprisename = enterprise.EnterpriseName;
      this.form.enterprisecode = enterprise.EnterpriseCode;
      this.form.contactsname = enterprise.ContactsName;
      this.form.contactsphone = enterprise.ContactsPhone;
      this.form.contactsemail = enterprise.ContactsEmail;
      this.form.enterpriseId = enterprise.EnterpriseId;
    },
    onClickModifyState(userid, status) {
      this.$http
        .post(
          "/api/Boss/UpdateBackgroundUser",
          Service.Encrypt.DataEncryption({
            Status: status,
            BackgroundUserId: userid
          })
        )
        .then(
          response => {
            if (
              response.Data &&
              response.Data != null &&
              response.Data != undefined
            ) {
              if (response.Data > 0) {
                this.$message("用户状态修改成功!");
                this.onQueryClick(1);
              } else {
                this.$message(response.Message);
              }
            } else {
              this.$message(response.Message);
            }
          },
          error => {
            this.$message(error);
            console.log(error);
          }
        );
    },
    onClickAdd(enterpriseId) {
        debugger;
      this.$http
        .post(
          "/api/Boss/AddEnterprise",
          Service.Encrypt.DataEncryption({
            EnterpriseName: this.form.enterprisename,
            EnterpriseCode: this.form.enterprisecode,
            ContactsName: this.form.contactsname,
            ContactsPhone: this.form.contactsphone,
            ContactsEmail: this.form.contactsemail,
            EnterpriseId: enterpriseId
          })
        )
        .then(
          response => {
            if (
              response.Data &&
              response.Data != null &&
              response.Data != undefined
            ) {
              if (response.Data > 0) {
                this.$message("用户添加或修改成功!");
                this.dialogFormVisible = false;
                this.dialogMFormVisible = false;
                this.form.name = "";
                this.form.rate = "";
                this.form.phone = "";
                this.onQueryClick(1);
              } else {
                this.$message(response.Message);
              }
            } else {
              this.$message(response.Message);
            }
          },
          error => {
            this.$message(error);
            console.log(error);
          }
        );
    }
  },
  mounted() {
    this.onQueryClick(1);
  }
};
</script>


<style>
.box-body {
  width: 100%;
  overflow: auto;
}
</style>