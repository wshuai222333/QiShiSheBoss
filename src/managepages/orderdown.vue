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
            <el-button type="text" size="small" @click="onClickOrderDetail(scope.row)">订单详情</el-button>
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
    
   
     <el-dialog title="订单详情" :visible.sync="ordertailVisible" width="80%" center>
      <div class="boxtail">
      <p style="height:10px;"></p>
      <!--出行人需求信息-->
      <el-card class="box-card" style="width:100%">
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
      <el-card class="box-card" style="width:100%;">
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
      <el-card class="box-card" style="width:100%">
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
      <el-card class="box-card" style="width:100%">
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
      <el-card class="box-card" style="width:100%">
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
      ordertailVisible:false,
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
    onClickOrderDetail(enterprise) {
      this.ordertailVisible = true;
      // this.form.enterprisename = enterprise.EnterpriseName;
      // this.form.enterprisecode = enterprise.EnterpriseCode;
      // this.form.contactsname = enterprise.ContactsName;
      // this.form.contactsphone = enterprise.ContactsPhone;
      // this.form.contactsemail = enterprise.ContactsEmail;
      // this.form.enterpriseId = enterprise.EnterpriseId;
    },
   
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
.box-card{
  text-align: center;
}
</style>