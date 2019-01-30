<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">订单管理</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
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
      </el-row>

      <p></p>
      <el-table :data="tableData">
        <el-table-column prop="OrderId" label="订单号"></el-table-column>
        <el-table-column prop="BookingType" label="预定类型" :formatter="formatterbookingtype"></el-table-column>
        <el-table-column prop="DepartDate" label="出发日期"></el-table-column>
        <el-table-column prop="DepartCity" label="出发城市"></el-table-column>
        <el-table-column prop="ArriveDate" label="到达日期"></el-table-column>
        <el-table-column prop="ArriveCity" label="到底城市"></el-table-column>
        <el-table-column prop="TravelWay" label="交通方式" :formatter="formattertravelway"></el-table-column>
        <el-table-column prop="HotelCheckinDate" label="入住日期"></el-table-column>
        <el-table-column prop="HotelCheckoutDate" label="离店日期"></el-table-column>
        <el-table-column prop="HotelType" label="酒店类型" :formatter="formatterhoteltype"></el-table-column>
        <el-table-column prop="HotelLocation" label="期待位置" :formatter="formatterhotellocation"></el-table-column>
        <el-table-column prop="Status" label="订单状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.Status==0">等待确认需求</el-tag>
            <el-tag type="danger" v-if="scope.row.Status==1">等待员工确认</el-tag>
            <el-tag type="success" v-if="scope.row.Status==3">确认完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="onClickModify(scope.row)">编辑</el-button> -->
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
            >启用</el-button>-->
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
     formatterbookingtype(row, column) {
      var msg = "";
      switch (parseInt(row.BookingType)) {
        case 0:
          msg = "机票/火车票";
          break;
        case 1:
          msg = "酒店";
          break;
        case 2:
          msg = "机票/火车票&&酒店";
          break;
        default:
          msg = "未知";
          break;
      }
      return msg;
    },
    formattertravelway(row, column) {
      var msg = "";
      switch (parseInt(row.TravelWay)) {
        case 0:
          msg = "飞机";
          break;
        case 1:
          msg = "火车";
          break;
        default:
          msg = "未知";
          break;
      }
      return msg;
    },
    formatterhoteltype(row, column) {
      var msg = "";
      switch (parseInt(row.HotelType)) {
        case 0:
          msg = "立即支付";
          break;
        case 1:
          msg = "到店支付";
          break;
        default:
          msg = "未知";
          break;
      }
      return msg;
    },
    formatterhotellocation(row, column) {
      var msg = "";
      switch (parseInt(row.HotelLocation)) {
        case 0:
          msg = "系统默认";
          break;
        case 1:
          msg = "目的地";
          break;
        case 2:
          msg = "机场/车站";
          break;
        default:
          msg = "未知";
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
          "/api/Boss/GetDemandOrderListByBoss",
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