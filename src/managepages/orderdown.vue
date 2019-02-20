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
        <el-table-column prop="ArriveCity" label="到达城市"></el-table-column>
        <el-table-column prop="TravelWay" label="交通方式" :formatter="formattertravelway"></el-table-column>
        <el-table-column prop="HotelCheckinDate" label="入住日期"></el-table-column>
        <el-table-column prop="HotelCheckoutDate" label="离店日期"></el-table-column>
        <el-table-column prop="HotelType" label="酒店类型" :formatter="formatterhoteltype"></el-table-column>
        <el-table-column prop="HotelLocation" label="期待位置" :formatter="formatterhotellocation"></el-table-column>
        <el-table-column prop="Status" label="订单状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.Status==0">行程生成中</el-tag>
            <el-tag type="danger" v-if="scope.row.Status==1">待用户确认</el-tag>
            <el-tag type="warning" v-if="scope.row.Status==3">行程采购中</el-tag>
            <el-tag type="success" v-if="scope.row.Status==5">已完成</el-tag>
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

    <el-dialog title="订单详情" :visible.sync="ordertailVisible" width="90%" top="10px" center>
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
                  <el-col :span="4">订单号:{{form.orderid}}</el-col>
                  <el-col :span="4">创建时间:{{form.createtime}}</el-col>
                  <el-col :span="4">预定类型：{{form.booktype}}</el-col>
                  <el-col :span="4">行程方式：{{form.travelway}}</el-col>
                  <el-col :span="4">行程类型：{{form.traveltype}}</el-col>
                  <el-col :span="4">行程要求：{{form.travelothers}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">出发日期：{{form.departdate}}</el-col>
                  <el-col :span="4">期望时间：{{form.expectdeparttime}}</el-col>
                  <el-col :span="4">出发城市：{{form.departcity}}</el-col>
                  <el-col :span="4">到达日期：{{form.arrivedate}}</el-col>
                  <el-col :span="4">期望时间：{{form.expectarrivetime}}</el-col>
                  <el-col :span="4">到达城市：{{form.arrivecity}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">酒店类型：{{form.hoteltype}}</el-col>
                  <el-col :span="4">入住日期：{{form.hotelcheckindate}}</el-col>
                  <el-col :span="4">离店日期：{{form.hotelcheckoutdate}}</el-col>
                  <el-col :span="4">期望位置：{{form.hotellocation}}</el-col>
                  <el-col :span="4">目的地：{{form.destination}}</el-col>
                  <el-col :span="4">位置要求：{{form.hotelothers}}</el-col>
                </el-row>
              </el-form-item>
              <el-form-item></el-form-item>
            </el-form>
          </div>
        </el-card>
        <!--机票信息-->
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>机票信息</span>
          </div>
          <div>
            <el-table :data="tableDataairtop">
              <el-table-column prop="TravelType" label="行程类型" :formatter="formattertraveltype"></el-table-column>
              <el-table-column prop="DepartDate" label="出发时间"></el-table-column>
              <el-table-column prop="ArriveDate" label="返回时间"></el-table-column>
              <el-table-column prop="Citys" label="往返城市"></el-table-column>
              <el-table-column prop="FightNos" label="航班号"></el-table-column>
              <el-table-column prop="SeatType" label="座位类型" :formatter="formatterseattype"></el-table-column>
              <el-table-column prop="TicketPrice" label="票面价格"></el-table-column>
              <el-table-column prop="FuelPrice" label="燃油基建费"></el-table-column>
              <el-table-column label>
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="退改签规定"
                    width="200"
                    trigger="hover"
                    :content="scope.row.AirTicketRules"
                  >
                    <el-button slot="reference">退改签</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <p style="height:5px;"></p>

        <!--火车票选择信息-->
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>火车票信息</span>
          </div>
          <div>
            <el-table :data="tableDataTrainTop">
              <el-table-column prop="TravelType" label="行程类型" :formatter="formattertraveltype"></el-table-column>
              <el-table-column prop="DepartDate" label="出发时间"></el-table-column>
              <el-table-column prop="ArriveDate" label="返回时间"></el-table-column>
              <el-table-column prop="Citys" label="往返城市"></el-table-column>
              <el-table-column prop="TrainNos" label="车次"></el-table-column>
              <el-table-column prop="SeatType" label="座位类型" :formatter="formattertrainseattype"></el-table-column>
              <el-table-column prop="TicketPrice" label="票面价"></el-table-column>
              <el-table-column label>
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="退改签规定"
                    width="200"
                    trigger="hover"
                    :content="scope.row.TrainTicketRules"
                  >
                    <el-button slot="reference">退改签</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <!--酒店信息-->
        <p style="height:5px;"></p>
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>酒店信息</span>
          </div>
          <div>
            <el-table :data="tableDataHotelTop">
              <el-table-column prop="HotelName" label="酒店名称"></el-table-column>
              <el-table-column prop="HotelAddress" label="酒店地址"></el-table-column>
              <el-table-column prop="TotalPrice" label="房间总价"></el-table-column>
              <el-table-column label>
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="酒店规定"
                    width="200"
                    trigger="hover"
                    :content="scope.row.HotelRules"
                  >
                    <el-button slot="reference">退改签</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <el-table :data="tableDataRooms" style="width:100%">
              <el-table-column prop="ApartmentType" label="房间类型" :formatter="formatterroomtype"></el-table-column>
              <el-table-column prop="Apartmentcount" label="房间数量"></el-table-column>
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
            <el-table :data="tableDataPass" style="width:100%">
              <el-table-column prop="PassengerName" label="姓名"></el-table-column>
              <el-table-column prop="PassengerCardNo" label="证件号"></el-table-column>
              <el-table-column prop="zip" label="票号"></el-table-column>
            </el-table>
          </div>
        </el-card>

        <p style="height:5px;"></p>
        <p style="border-bottom:solid 2px #ccc;"></p>

        <!--机票选择信息-->
        <el-card class="box-card" style="width:100%;">
          <div slot="header" class="clearfix">
            <span>机票选择信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="openselectair">添加航班</el-button>
          </div>
          <div>
            <el-table :data="tableDataair">
              <el-table-column prop="TravelType" label="行程类型" :formatter="formattertraveltype"></el-table-column>
              <el-table-column prop="DepartDate" label="出发时间"></el-table-column>
              <el-table-column prop="ArriveDate" label="返回时间"></el-table-column>
              <el-table-column prop="Citys" label="往返城市"></el-table-column>
              <el-table-column prop="FightNos" label="航班号"></el-table-column>
              <el-table-column prop="SeatType" label="座位类型" :formatter="formatterseattype"></el-table-column>
              <el-table-column prop="TicketPrice" label="票面价格"></el-table-column>
              <el-table-column prop="FuelPrice" label="燃油基建费"></el-table-column>
              <el-table-column label>
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="退改签规定"
                    width="200"
                    trigger="hover"
                    :content="scope.row.AirTicketRules"
                  >
                    <el-button slot="reference">退改签</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <p style="height:5px;"></p>

        <!--火车票选择信息-->
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>火车票选择信息</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="openselecttrain"
            >添加火车票</el-button>
          </div>
          <div>
            <el-table :data="tableDataTrain">
              <el-table-column prop="TravelType" label="行程类型" :formatter="formattertraveltype"></el-table-column>
              <el-table-column prop="DepartDate" label="出发时间"></el-table-column>
              <el-table-column prop="ArriveDate" label="返回时间"></el-table-column>
              <el-table-column prop="Citys" label="往返城市"></el-table-column>
              <el-table-column prop="TrainNos" label="车次"></el-table-column>
              <el-table-column prop="SeatType" label="座位类型" :formatter="formattertrainseattype"></el-table-column>
              <el-table-column prop="TicketPrice" label="票面价"></el-table-column>
              <el-table-column label>
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="退改签规定"
                    width="200"
                    trigger="hover"
                    :content="scope.row.TrainTicketRules"
                  >
                    <el-button slot="reference">退改签</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <p style="height:5px;"></p>

        <!--酒店选择信息-->
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>酒店选择信息</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="openselecthotel"
            >添加酒店</el-button>
          </div>
          <div>
            <el-table :data="tableDataHotel">
              <el-table-column prop="HotelName" label="酒店名称"></el-table-column>
              <el-table-column prop="HotelAddress" label="酒店地址"></el-table-column>
              <el-table-column prop="TotalPrice" label="房间总价"></el-table-column>
              <el-table-column label>
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="酒店规定"
                    width="200"
                    trigger="hover"
                    :content="scope.row.HotelRules"
                  >
                    <el-button slot="reference">退改签</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <p style="height:10px;"></p>
        <el-row>
          <el-button
            type="primary"
            v-if="form.status=='0'"
            @click="updateDemandOrderStatus(1)"
          >确认可选行程</el-button>
          <el-button
            type="primary"
            v-if="form.status=='3'"
            @click="updateDemandOrderStatus(5)"
          >确认出票行程</el-button>
        </el-row>
      </div>
      <!--添加航班内层弹窗-->
      <el-dialog width="30%" title="添加航班" :visible.sync="airinnerVisible" append-to-body>
        <el-form :model="airform">
          <el-form-item label="航班类型" :label-width="formLabelWidth">
            <el-select v-model="airform.traveltype" placeholder="请选择">
              <el-option
                v-for="item in traveltypeoptions"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出发城市" :label-width="formLabelWidth">
            <el-input v-model="airform.departcity" auto-complete="off" placeholder="出发城市"></el-input>
          </el-form-item>
          <el-form-item label="到达城市" :label-width="formLabelWidth">
            <el-input v-model="airform.arrivecity" auto-complete="off" placeholder="到达城市"></el-input>
          </el-form-item>
          <el-form-item label="去程航班号" :label-width="formLabelWidth">
            <el-input v-model="airform.onefightno" auto-complete="off" placeholder="去程航班号"></el-input>
          </el-form-item>
          <el-form-item label="去程出发时间" :label-width="formLabelWidth">
            <el-date-picker v-model="airform.onedepartdate" type="datetime" placeholder="去程出发时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="去程到达时间" :label-width="formLabelWidth">
            <el-date-picker v-model="airform.onearrivedate" type="datetime" placeholder="去程到达时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="返程航班号" :label-width="formLabelWidth">
            <el-input v-model="airform.twofightno" auto-complete="off" placeholder="返程航班号"></el-input>
          </el-form-item>
          <el-form-item label="返程出发时间" :label-width="formLabelWidth">
            <el-date-picker v-model="airform.twodepartdate" type="datetime" placeholder="返程出发时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="返程到达时间" :label-width="formLabelWidth">
            <el-date-picker v-model="airform.twoarrivedate" type="datetime" placeholder="返程到达时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="舱位类型" :label-width="formLabelWidth">
            <el-select v-model="airform.seattype" placeholder="请选择">
              <el-option
                v-for="item in seattypeoptions"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="票面价格" :label-width="formLabelWidth">
            <el-input v-model="airform.ticketprice" auto-complete="off" placeholder="票面价格"></el-input>
          </el-form-item>
          <el-form-item label="燃油费" :label-width="formLabelWidth">
            <el-input v-model="airform.fuelprice" auto-complete="off" placeholder="燃油费"></el-input>
          </el-form-item>
          <el-form-item label="退改签规定" :label-width="formLabelWidth">
            <el-input
              v-model="airform.airTicketRules"
              auto-complete="off"
              placeholder="退改签规定"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="airinnerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addselectair(form.enterpriseId)">确 定</el-button>
        </div>
      </el-dialog>
      <!--添加火车票内层弹窗-->
      <el-dialog width="30%" title="添加火车票" :visible.sync="traininnerVisible" append-to-body>
        <el-form :model="trainform">
          <el-form-item label="行程类型" :label-width="formLabelWidth">
            <el-select v-model="airform.traveltype" placeholder="请选择">
              <el-option
                v-for="item in traveltypeoptions"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出发城市" :label-width="formLabelWidth">
            <el-input v-model="trainform.departcity" auto-complete="off" placeholder="出发城市"></el-input>
          </el-form-item>
          <el-form-item label="到达城市" :label-width="formLabelWidth">
            <el-input v-model="trainform.arrivecity" auto-complete="off" placeholder="到达城市"></el-input>
          </el-form-item>
          <el-form-item label="去程车次" :label-width="formLabelWidth">
            <el-input v-model="trainform.onetrainno" auto-complete="off" placeholder="去程车次"></el-input>
          </el-form-item>
          <el-form-item label="去程出发时间" :label-width="formLabelWidth">
            <el-date-picker v-model="trainform.onedepartdate" type="datetime" placeholder="去程出发时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="去程到达时间" :label-width="formLabelWidth">
            <el-date-picker v-model="trainform.onearrivedate" type="datetime" placeholder="去程到达时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="返回车次" :label-width="formLabelWidth">
            <el-input v-model="trainform.twotrainno" auto-complete="off" placeholder="返回车次"></el-input>
          </el-form-item>
          <el-form-item label="返程出发时间" :label-width="formLabelWidth">
            <el-date-picker v-model="trainform.twodepartdate" type="datetime" placeholder="返程出发时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="返程到达时间" :label-width="formLabelWidth">
            <el-date-picker v-model="trainform.twoarrivedate" type="datetime" placeholder="返程到达时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="座位类型" :label-width="formLabelWidth">
            <el-select v-model="trainform.seattype" placeholder="请选择">
              <el-option
                v-for="item in trainseattypeoptions"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="票面价格" :label-width="formLabelWidth">
            <el-input v-model="trainform.ticketprice" auto-complete="off" placeholder="票面价格"></el-input>
          </el-form-item>
          <el-form-item label="退改签规定" :label-width="formLabelWidth">
            <el-input
              v-model="trainform.trainTicketRules"
              auto-complete="off"
              placeholder="退改签规定"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="traininnerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addselecttrain()">确 定</el-button>
        </div>
      </el-dialog>
      <!--添加酒店内层弹窗-->
      <el-dialog width="30%" title="添加酒店" :visible.sync="hotelinnerVisible" append-to-body>
        <el-form :model="hotelform">
          <el-form-item label="酒店名称" :label-width="formLabelWidth">
            <el-input v-model="hotelform.hotelName" auto-complete="off" placeholder="酒店名称"></el-input>
          </el-form-item>
          <el-form-item label="酒店地址" :label-width="formLabelWidth">
            <el-input v-model="hotelform.hotelAddress" auto-complete="off" placeholder="酒店地址"></el-input>
          </el-form-item>
          <el-form-item label="房间总价" :label-width="formLabelWidth">
            <el-input v-model="hotelform.totalPrice" auto-complete="off" placeholder="房间总价"></el-input>
          </el-form-item>
          <el-form-item label="酒店规定" :label-width="formLabelWidth">
            <el-input
              v-model="hotelform.hotelRules"
              auto-complete="off"
              placeholder="酒店规定"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hotelinnerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addselecthotel()">确 定</el-button>
        </div>
      </el-dialog>
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

      ordertailVisible: false,
      airinnerVisible: false,
      traininnerVisible: false,
      hotelinnerVisible: false,
      form: {
        orderid: "",
        booktype: "",
        travelway: "",
        traveltype: "",
        travelothers: "",
        departdate: "",
        expectdeparttime: "",
        departcity: "",
        arrivedate: "",
        expectarrivetime: "",
        arrivecity: "",
        hoteltype: "",
        hotelcheckindate: "",
        hotelcheckoutdate: "",
        hotellocation: "",
        destination: "",
        hotelothers: "",

        status: "",
        createtime: ""
      },
      tableDataair: [],
      airform: {
        onedepartdate: "",
        twodepartdate: "",
        departcity: "",
        onearrivedate: "",
        twoarrivedate: "",
        arrivecity: "",
        onefightno: "",
        twofightno: "",
        seattype: "0",
        traveltype: "1",
        ticketprice: "",
        fuelprice: "",
        airTicketRules: ""
      },
      tableDataTrain: [],
      trainform: {
        onedepartdate: "",
        twodepartdate: "",
        departcity: "",
        onearrivedate: "",
        twoarrivedate: "",
        arrivecity: "",
        onetrainno: "",
        twotrainno: "",
        seattype: "0",
        traveltype: "4",
        ticketprice: "",
        trainTicketRules: ""
      },
      tableDataHotel: [],
      hotelform: {
        hotelName: "",
        hotelAddress: "",
        totalPrice: ""
      },
      tableDataPass: [],
      tableDataHotels: [],
      tableDataRooms: [],
      seattypeoptions: [
        { value: "0", text: "经济舱" },
        { value: "1", text: "公务舱" },
        { value: "2", text: "头等舱" }
      ],
      trainseattypeoptions: [
        { value: "0", text: "硬座" },
        { value: "1", text: "软座" },
        { value: "2", text: "硬卧" },
        { value: "3", text: "软卧" },
        { value: "4", text: "二等座" },
        { value: "5", text: "一等座" },
        { value: "6", text: "商务座" }
      ],
      traveltypeoptions: [
        { value: "0", text: "单程" },
        { value: "1", text: "往返" }
      ],
      formLabelWidth: "100px",
      currentPage: 1,
      tableDataairtop: [],
      tableDataHotelTop: [],
      tableDataTrainTop: []
    };
  },
  methods: {
    //类型枚举
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
    formattertraveltype(row, column) {
      var msg = "";
      switch (parseInt(row.TravelType)) {
        case 0:
          msg = "单程";
          break;
        case 1:
          msg = "往返";
          break;
        default:
          msg = "未知";
          break;
      }
      return msg;
    },
    formatterseattype(row, column) {
      var msg = "";
      switch (parseInt(row.SeatType)) {
        case 0:
          msg = "经济舱";
          break;
        case 1:
          msg = "公务舱";
          break;
        case 2:
          msg = "头等舱";
          break;
        default:
          msg = "未知";
          break;
      }
      return msg;
    },
    formattertrainseattype(row, column) {
      var msg = "";
      switch (parseInt(row.SeatType)) {
        case 0:
          msg = "硬座";
          break;
        case 1:
          msg = "软座";
          break;
        case 2:
          msg = "硬卧";
          break;
        case 3:
          msg = "软卧";
          break;
        case 4:
          msg = "二等座";
          break;
        case 5:
          msg = "一等座";
          break;
        case 6:
          msg = "商务座";
          break;
        default:
          msg = "未知";
          break;
      }
      return msg;
    },
    formatterroomtype(row, column) {
      var msg = "";
      switch (parseInt(row.ApartmentType)) {
        case 0:
          msg = "双人标间";
          break;
        case 1:
          msg = "商务大床";
          break;
        case 2:
          msg = "豪华大床";
          break;
        case 3:
          msg = "豪华套件";
          break;
        default:
          msg = "未知";
          break;
      }
      return msg;
    },
    //订单列表查询
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
    //打开订单详情
    onClickOrderDetail(order) {
      this.ordertailVisible = true;
      this.form.orderid = order.OrderId;
      this.form.booktype = this.formatterbookingtype(order);
      this.form.travelway = this.formattertravelway(order);
      this.form.traveltype = this.formattertraveltype(order);
      this.form.travelothers = order.TravelOthers;

      this.form.departdate = order.DepartDate;
      this.form.expectdeparttime = order.ExpectDepartTime;
      this.form.departcity = order.DepartCity;
      this.form.arrivedate = order.ArriveDate;
      this.form.expectarrivetime = order.ExpectArrivetime;
      this.form.arrivecity = order.ArriveCity;

      this.form.hoteltype = this.formatterhoteltype(order);
      this.form.hotelcheckindate = order.HotelCheckinDate;
      this.form.hotelcheckoutdate = order.HotelCheckoutDate;
      this.form.hotellocation = this.formatterhotellocation(order);
      this.form.destination = order.Destination;
      this.form.hotelothers = order.HotelOthers;

      this.form.status = order.Status;
      this.form.createtime = order.CreateTime;

      this.getGetOrderApartmentList();
      this.getOrderPassengerlist();

      this.getselectairlist();
      this.getselecttrainlist();
      this.getselecthotellist();

      this.getGetOrderAirTicketList();
      this.getGetOrderHotelList();
      this.getGetOrderTrainTicketList();
    },
    //添加选择航班
    openselectair() {
      this.airinnerVisible = true;
      this.airform.onefightno = "";
      this.airform.twofightno = "";
      this.airform.onedepartdate = "";
      this.airform.onearrivedate = "";
      this.airform.twodepartdate = "";
      this.airform.twoarrivedate = "";
      this.airform.departcity = "";
      this.airform.arrivecity = "";
      this.airform.seattype = "0";
      this.airform.traveltype = "1";
      this.airform.ticketprice = "";
      this.airform.fuelprice = "";
    },
    addselectair() {
      this.$http
        .post(
          "/api/Boss/AddSelectAirTicket",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid,
            TravelType: this.airform.traveltype,
            OneDepartDate: this.airform.onedepartdate,
            OneArriveDate: this.airform.onearrivedate,
            TwoDepartDate: this.airform.twodepartdate,
            TwoArriveDate: this.airform.twoarrivedate,
            DepartCity: this.airform.departcity,
            ArriveCity: this.airform.arrivecity,
            OneFightNo: this.airform.onefightno,
            TwoFightNo: this.airform.twofightno,
            SeatType: this.airform.seattype,
            TicketPrice: this.airform.ticketprice,
            FuelAirPrice: this.airform.fuelprice,
            AirTicketRules: this.airform.airTicketRules
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
                this.$message("航班添加成功!");
                this.airinnerVisible = false;
                this.getselectairlist();
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
    getselectairlist() {
      this.$http
        .post(
          "/api/Boss/GetSelectAirTicketList",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid
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
                this.tableDataair = response.Data;
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
    //添加选择火车票
    openselecttrain() {
      this.traininnerVisible = true;
      this.trainform.onetrainno = "";
      this.trainform.twotrainno = "";
      this.trainform.onedepartdate = "";
      this.trainform.onearrivedate = "";
      this.trainform.twodepartdate = "";
      this.trainform.twoarrivedate = "";
      this.trainform.departcity = "";
      this.trainform.arrivecity = "";
      this.trainform.seattype = "4";
      this.trainform.traveltype = "1";
      this.trainform.ticketprice = "";
    },
    addselecttrain() {
      this.$http
        .post(
          "/api/Boss/AddSelectTrainTicket",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid,
            TravelType: this.trainform.traveltype,
            OneDepartDate: this.trainform.onedepartdate,
            OneArriveDate: this.trainform.onearrivedate,
            TwoDepartDate: this.trainform.twodepartdate,
            TwoArriveDate: this.trainform.twoarrivedate,
            DepartCity: this.trainform.departcity,
            ArriveCity: this.trainform.arrivecity,
            OneTrainNo: this.trainform.onetrainno,
            TwoTrainNo: this.trainform.twotrainno,
            SeatType: this.trainform.seattype,
            TicketPrice: this.trainform.ticketprice,
            TrainTicketRules: this.trainform.trainTicketRules
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
                this.$message("火车票添加成功!");
                this.traininnerVisible = false;
                this.getselecttrainlist();
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
    getselecttrainlist() {
      this.$http
        .post(
          "/api/Boss/GetSelectTrainTicketList",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid
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
                this.tableDataTrain = response.Data;
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
    //添加选择酒店
    openselecthotel() {
      this.hotelinnerVisible = true;
      this.hotelform.hotelName = "";
      this.hotelform.hotelAddress = "";
      this.hotelform.totalPrice = "";
    },
    addselecthotel() {
      this.$http
        .post(
          "/api/Boss/AddSelectHotel",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid,
            HotelName: this.hotelform.hotelName,
            HotelAddress: this.hotelform.hotelAddress,
            TotalPrice: this.hotelform.totalPrice,
            HotelRules: this.hotelform.hotelRules
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
                this.$message("酒店添加成功!");
                this.hotelinnerVisible = false;
                this.getselecthotellist();
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
    getselecthotellist() {
      this.$http
        .post(
          "/api/Boss/GetSelectHotelList",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid
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
                this.tableDataHotel = response.Data;
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
    getOrderPassengerlist() {
      this.$http
        .post(
          "/api/Boss/GetOrderPassengerList",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid
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
                this.tableDataPass = response.Data;
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
    getGetOrderApartmentList() {
      this.$http
        .post(
          "/api/Boss/GetOrderApartmentList",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid
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
                this.tableDataRooms = response.Data;
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
    updateDemandOrderStatus(status) {
      this.$http
        .post(
          "/api/Boss/UpdateDemandOrderStatus",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid,
            Status: status
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
                this.$message("行程确认成功!");
                this.ordertailVisible = false;
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
    getGetOrderAirTicketList() {
      this.$http
        .post(
          "/api/Boss/GetOrderAirTicketList",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid
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
                this.tableDataairtop = response.Data;
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
    getGetOrderTrainTicketList() {
      this.$http
        .post(
          "/api/Boss/GetOrderTrainTicketList",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid
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
                this.tableDataTrainTop = response.Data;
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
    getGetOrderHotelList() {
      this.$http
        .post(
          "/api/Boss/GetOrderHotelList",
          Service.Encrypt.DataEncryption({
            OrderId: this.form.orderid
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
                debugger;
                this.tableDataHotelTop = response.Data;
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
.box-card {
  /* text-align: center; */
}
</style>