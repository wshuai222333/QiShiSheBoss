<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">订单详情</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}"></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <p style="height:10px;"></p>
      <!--出行人需求信息-->
      <el-card class="box-card" style="width:65%">
        <div slot="header" class="clearfix">
          <span>需求信息</span>
        </div>
        <div>
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item>
              <el-row>
                <el-col :span="4">订单号:123123</el-col>
                <el-col :span="4">预定类型：机票</el-col>
                <el-col :span="4">交通方式：方式</el-col>
                <el-col :span="4">交通方式：方式</el-col>
                <el-col :span="4">交通方式：方式</el-col>
                <el-col :span="4">交通方式：方式</el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="机票"></el-form-item>
          </el-form>
        </div>
      </el-card>
      <p style="height:5px;"></p>
      <!--机票信息-->
      <el-card class="box-card" style="width:65%">
        <div slot="header" class="clearfix">
          <span>机票信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="clickopendialog">添加航班</el-button>
        </div>
        <div>
          <el-table :data="tableData3" style="width:100%">
            <el-table-column prop="tag" label>
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '去程' ? 'primary' : 'success'"
                  disable-transitions
                >{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="起飞时间"></el-table-column>
            <el-table-column prop="province" label="起飞地点"></el-table-column>
            <el-table-column prop="city" label="到达时间"></el-table-column>
            <el-table-column prop="city" label="到达地点"></el-table-column>
            <el-table-column prop="zip" label="航班号"></el-table-column>
            <el-table-column prop="zip" label="座位类型"></el-table-column>
            <el-table-column label>
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="退改签规定"
                  width="200"
                  trigger="hover"
                  content="起飞前2小时扣除80%票价;起飞前2小时后扣除100%票价"
                >
                  <el-button slot="reference">退改签</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <p style="height:5px;"></p>

      <!--火车票信息-->
      <el-card class="box-card" style="width:65%">
        <div slot="header" class="clearfix">
          <span>火车票信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="clickopendialog">添加火车票</el-button>
        </div>
        <div>
          <el-table :data="tableData3" style="width:100%">
            <el-table-column prop="tag" label>
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '去程' ? 'primary' : 'success'"
                  disable-transitions
                >{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="出发时间"></el-table-column>
            <el-table-column prop="province" label="出发地"></el-table-column>
            <el-table-column prop="city" label="到达时间"></el-table-column>
            <el-table-column prop="city" label="目的地"></el-table-column>
            <el-table-column prop="zip" label="车次"></el-table-column>
            <el-table-column prop="zip" label="座位类型"></el-table-column>
            <el-table-column label>
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="退改签规定"
                  width="200"
                  trigger="hover"
                  content="起飞前2小时扣除80%票价;起飞前2小时后扣除100%票价"
                >
                  <el-button slot="reference">退改签</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <p style="height:5px;"></p>

      <!--酒店信息-->
      <el-card class="box-card" style="width:65%">
        <div slot="header" class="clearfix">
          <span>酒店信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="clickopenhdialog">添加酒店</el-button>
        </div>
        <div>
          <el-table :data="tableData2" style="width:100%">
            <el-table-column prop="city" label="酒店名称"></el-table-column>
            <el-table-column prop="address" label="酒店地址"></el-table-column>
            <el-table-column prop="date" label="入住时间"></el-table-column>
            <el-table-column prop="date1" label="离店时间"></el-table-column>
            <el-table-column prop="fightno" label="房型"></el-table-column>
            <el-table-column prop="count" label="间数"></el-table-column>
            <el-table-column label>
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="酒店规定"
                  width="200"
                  trigger="hover"
                  content="起飞前2小时扣除80%票价;起飞前2小时后扣除100%票价"
                >
                  <el-button slot="reference">酒店规定</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <!--出行人信息-->
      <p style="height:5px;"></p>
      <el-card class="box-card" style="width:65%">
        <div slot="header" class="clearfix">
          <span>出行人信息</span>
        </div>
        <div>
          <el-table :data="tableData3" style="width:100%">
            <el-table-column prop="province" label="姓名"></el-table-column>
            <el-table-column prop="zip" label="身份证号"></el-table-column>
            <el-table-column prop="city" label="电话"></el-table-column>
            <el-table-column prop="zip" label="票号"></el-table-column>
          </el-table>
        </div>
      </el-card>
      <p style="height:10px;"></p>
      <el-row>
        <el-button type="primary" @click="onSubmit">确认行程</el-button>
      </el-row>
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