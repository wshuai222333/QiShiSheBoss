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
        <el-col :span="8">企业名称:
          <el-select v-model="enterpriseid" placeholder="请选择">
            <el-option
              v-for="item in enterpriselistselect"
              :key="item.EnterpriseId"
              :label="item.EnterpriseName"
              :value="item.EnterpriseId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">员工姓名:
          <m-input placeholder="员工姓名" v-model="staffname"/>
        </el-col>
        <el-col :span="8">身份证号:
          <m-input placeholder="身份证号" v-model="staffcardno"/>
        </el-col>
      </el-row>
      <p></p>
      <el-row>
        <el-col :span="9">手机号:
          <m-input placeholder="手机号" v-model="phone"/>
        </el-col>
      </el-row>
      <p></p>
      <el-row>
        <m-button type="info" @click="onQueryClick(1)">查询</m-button>
        <m-button type="info" @click="onClickNewOpen()">添加</m-button>
      </el-row>

      <p></p>

      <el-table :data="tableData">
        <el-table-column label="员工编号" prop="StaffId"></el-table-column>
        <el-table-column label="企业名称" prop="EnterpriseName"></el-table-column>
        <el-table-column label="员工姓名" prop="StaffName"></el-table-column>
        <el-table-column label="证件号" prop="StaffCardNo"></el-table-column>
        <el-table-column label="生日" prop="StaffBirthday"></el-table-column>
        <el-table-column label="手机号" prop="Phone"></el-table-column>
        <el-table-column label="积分" prop="Integral"></el-table-column>
        <el-table-column label="状态" prop="Status" :formatter="formatter"></el-table-column>
        <el-table-column label="创建时间" prop="CreateTime"></el-table-column>
        <el-table-column label="修改时间" prop="UpdateTime"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onClickDeleteStaff(scope.row.StaffId)">删除</el-button>
            <el-button type="text" size="small" @click="onClickModify(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="onClickIntegralOpen(scope.row)">积分</el-button>
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
    <el-dialog title="添加员工" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="选择企业" :label-width="formLabelWidth" prop="enterprise">
          <el-select value-key="EnterpriseId" v-model="form.enterprise" placeholder="请选择">
            <el-option
              v-for="item in enterpriselist"
              :key="item.EnterpriseId"
              :label="item.EnterpriseName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工名称" :label-width="formLabelWidth" prop="staffname">
          <el-input v-model="form.staffname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="证件号" :label-width="formLabelWidth" prop="staffcardno">
          <el-input v-model="form.staffcardno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-date-picker v-model="form.staffbirthday" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
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
          <el-input v-model="form.enterprisename" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="员工名称" :label-width="formLabelWidth">
          <el-input v-model="form.staffname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="证件号" :label-width="formLabelWidth">
          <el-input v-model="form.staffcardno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-date-picker v-model="form.staffbirthday" type="date"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickAdd(form.staffid)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="增加积分" :visible.sync="dialogIFormVisible">
      <el-form :model="form">
        <el-form-item label="增加积分" :label-width="formLabelWidth">
          <el-input v-model="integral" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickModifyIntegral(form.staffid)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Service from "../_common";
export default {
  data() {
    return {
      rules: {
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        staffname: [
          { required: true, message: "请输入员工名称", trigger: "blur" }
        ],
        staffcardno: [
          { required: true, message: "请输入员工证件号", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度必须11个字符", trigger: "blur" }
        ]
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      dialogMFormVisible: false,
      dialogIFormVisible: false,
      form: {
        enterprise: {},
        enterpriseid: 0,
        enterprisename: "",
        staffname: "",
        staffcardno: "",
        staffbirthday: "",
        phone: "",
        staffid: 0
      },
      formLabelWidth: "100px",
      currentPage: 1,
      enterpriselist: [],
      enterpriselistselect: [],
      staffname: "",
      staffcardno: "",
      phone: "",
      integral: 0,
      enterpriseid: 0
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
          "/api/Boss/GetStaffList",
          Service.Encrypt.DataEncryption({
            pageindex: pageindex,
            pagesize: 10,
            StaffName: this.staffname,
            EnterpriseId: this.enterpriseid,
            StaffCardNo: this.staffcardno,
            Phone: this.phone
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
      this.form.enterprise = null;
      (this.enterpriseid = 0),
        (this.enterprisename = ""),
        (this.form.staffname = "");
      this.form.staffcardno = "";
      this.form.staffbirthday = "";
      this.form.phone = "";
      this.getenterprise();
    },
    onClickModify(staff) {
      this.dialogMFormVisible = true;
      this.form.enterprisename = staff.EnterpriseName;
      this.form.staffname = staff.StaffName;
      this.form.staffcardno = staff.StaffCardNo;
      this.form.staffbirthday = staff.StaffBirthday;
      this.form.phone = staff.Phone;
      this.form.staffid = staff.StaffId;
    },

    onClickDeleteStaff(staffId) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              "/api/Boss/DeleteStaff",
              Service.Encrypt.DataEncryption({
                StaffId: staffId
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
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onClickIntegralOpen(staff) {
      this.dialogIFormVisible = true;
      this.form.staffid = staff.StaffId;
      this.integral = 0;
    },
    onClickModifyIntegral(staffid) {
      this.$http
        .post(
          "/api/Boss/UpdateStaffIntegral",
          Service.Encrypt.DataEncryption({
            StaffId: staffid,
            Integral: this.integral
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
                this.$message("积分增加成功!");
                this.dialogIFormVisible = false;
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
    onClickAdd(staffid) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (staffid > 0) {
            this.form.enterpriseid = 0;
            this.form.enterprisename = "";
          } else {
            this.form.enterpriseid = this.form.enterprise.EnterpriseId;
            this.form.enterprisename = this.form.enterprise.EnterpriseName;
          }
          this.$http
            .post(
              "/api/Boss/AddStaff",
              Service.Encrypt.DataEncryption({
                EnterpriseId: this.form.enterpriseid,
                EnterpriseName: this.form.enterprisename,
                StaffName: this.form.staffname,
                StaffCardNo: this.form.staffcardno,
                StaffBirthday: this.form.staffbirthday,
                Phone: this.form.phone,
                StaffId: staffid
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
      });
    },
    getenterprise() {
      this.$http
        .post(
          "/api/Boss/GetEnterpriseListSelect",
          Service.Encrypt.DataEncryption({})
        )
        .then(
          response => {
            if (
              response.Data &&
              response.Data != null &&
              response.Data != undefined
            ) {
              if (response.Status == 100) {
                this.enterpriselist = response.Data;
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
    getenterpriseselect() {
      this.$http
        .post(
          "/api/Boss/GetEnterpriseListSelect",
          Service.Encrypt.DataEncryption({})
        )
        .then(
          response => {
            if (
              response.Data &&
              response.Data != null &&
              response.Data != undefined
            ) {
              if (response.Status == 100) {
                this.enterpriselistselect = response.Data;
                this.enterpriselistselect.push({
                  EnterpriseId: 0,
                  EnterpriseName: "全部"
                });
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
    this.getenterpriseselect();
    this.onQueryClick(1);
  }
};
</script>


<style scoped>
.box-body {
  width: 100%;
  overflow: auto;
}
</style>