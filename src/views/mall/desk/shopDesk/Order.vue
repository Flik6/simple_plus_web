<template>
 <el-drawer v-model="drawer" :title="dialogTitle" size="60%">
  <ContentWrap>
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="全部订单" name=""/>
    </el-tabs>
    <el-form-item label="订单状态：" >
      <el-radio-group v-model="orderStatus" size="large"  fill="#DC143C" @change="queryOrderStatus">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="0">未支付</el-radio-button>
        <el-radio-button label="1">制作中</el-radio-button>
        <el-radio-button label="2">待收货</el-radio-button>
        <el-radio-button label="3">已收货/已取餐</el-radio-button>
        <!-- <el-radio-button label="4">交易完成</el-radio-button> -->
        <el-radio-button label="5">退款单</el-radio-button>
        <el-radio-button label="6">已删除</el-radio-button>
      </el-radio-group>
    </el-form-item>
     <el-form-item label="支付方式：" >
      <el-radio-group v-model="payStatus" size="large"  fill="#FF1493" @change="queryPayStatus">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="weixin">微信支付</el-radio-button>
        <el-radio-button label="alipay">支付宝支付</el-radio-button>
        <el-radio-button label="yue">余额支付</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </ContentWrap>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="订单号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="用户姓名" prop="realName">
        <el-input
          v-model="queryParams.realName"
          placeholder="请输入用户姓名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="用户电话" prop="userPhone">
        <el-input
          v-model="queryParams.userPhone"
          placeholder="请输入用户电话"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
      </el-form-item>
    </el-form>
    
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="门店" align="center" prop="shopName" width="100" />
      <el-table-column label="桌号" align="center" prop="deskNumber" />
      <el-table-column label="订单号" align="center" prop="orderId" width="240">
        <template #default="scope">
          <span>
            <el-tag class="ml-2" type="danger" v-if="scope.row.orderType=='desk'">堂食</el-tag>
            <el-tag class="ml-2" type="danger" v-if="scope.row.orderType=='takeout'">外卖</el-tag>
            <el-tag class="ml-2" type="danger" v-if="scope.row.orderType=='takein'">自取</el-tag>
           {{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户id｜昵称" align="center"  width="120" >
        <template #default="scope">
          <span>{{ scope.row.uid }}|{{ scope.row.userRespVO.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名|电话" align="center" prop="realName" width="150">
        <template #default="scope">
          <span v-if="scope.row.orderType == 'takeout'">{{ scope.row.realName }}|{{ scope.row.userPhone }}</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" align="center" prop="userAddress" width="350">
        <template #default="scope">
          <div class="tabBox" v-for="(val, i ) in scope.row.storeOrderCartInfoDOList" :key="i">
              <div class="tabBox_img">
                  <img :src="val.image" />
              </div>
              <span class="tabBox_tit">{{ val.title + ' - ' }}{{val.spec}}</span>
              <span class="tabBox_pice">{{ '￥'+ val.price + ' x '+ val.number}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="实际支付" align="center">
        <template #default="scope">
         <span v-if="scope.row.paid == 1">{{ scope.row.payPrice }}</span>
         <span v-else>未支付</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center">
        <template #default="scope">
          <span v-if="scope.row.paid == 1">
           <span v-if="scope.row.payType=='yue'">余额支付</span>
           <span v-if="scope.row.payType=='weixin'">微信支付</span>
           <span v-if="scope.row.payType=='alipay'">支付宝支付</span>
          </span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="购买类型" align="center">
        <template #default="scope">
           <span v-if="scope.row.orderType=='takeout'">外卖</span>
           <span v-if="scope.row.orderType=='takein'">自取</span>
        </template>
      </el-table-column>
      <el-table-column
        label="支付时间"
        align="center"
        prop="payTime"
        :formatter="dateFormatter"
        width="120"
      />
      <el-table-column label="订单状态" align="center" prop="statusStr" />
      <el-table-column
        label="添加时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="120"
      />
      <el-table-column label="操作" align="center" fixed="right" width="150">
        <template #default="scope">
          <div class="flex justify-center items-center">
          <el-button
            v-if = "scope.row.statusStr == '未支付'"
            link
            type="primary"
            @click="openForm('updateOrder', scope.row.id)"
            v-hasPermi="['order:store-order:update']"
          >
            编辑
          </el-button>
          <el-button
            v-if = "scope.row.statusStr == '未发货'"
            link
            type="primary"
            @click="openForm('orderSend', scope.row.id)"
            v-hasPermi="['order:store-order:update']"
          >
            出单
          </el-button>
          <el-dropdown>
            <el-button type="primary" link><Icon icon="ep:d-arrow-right" /> 更多</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if = "scope.row.statusStr == '未支付'" @click="handlePay(scope.row.id)">确认付款</el-dropdown-item>
                <el-dropdown-item @click="openForm('orderDetail', scope.row.id)">订单详情</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <StoreOrderForm ref="formRef" @success="getList" />
  <OrderSend ref="formRef1" @success="getList" />
  <OrderSendInfo ref="formRef2" @success="getList" />
  <OrderDetail ref="formRef4" />
  </el-drawer>
</template>
<script setup lang="ts">
// import * as StoreOrderApi from '@/api/mall/order/storeOrder'
// import { formatDate } from '@/utils/formatTime'
//const message = useMessage() // 消息弹窗
import { dateFormatter } from '@/utils/formatTime'
import * as StoreOrderApi from '@/api/mall/order/storeOrder'
import StoreOrderForm from '@/views/mall/order/storeOrder/StoreOrderForm.vue'
import OrderSend from '@/views/mall/order/storeOrder/OrderSend.vue'
import OrderSendInfo from '@/views/mall/order/storeOrder/OrderSendInfo.vue'
import OrderDetail from '@/views/mall/order/storeOrder/OrderDetail.vue'
import type { TabsPaneContext } from 'element-plus'
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  orderId: "",
  realName: "",
  userPhone: "",
  createTime: [],
  orderStatus: "",
  payStatus: "",
  orderType: "",
  deskId: 0

})
const queryFormRef = ref() // 搜索的表单

const activeName = ref('')
const orderStatus = ref('')
const payStatus = ref('')
const dialogTitle = ref('') // 弹窗的标题
const drawer = ref(false)
/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  drawer.value = true
  dialogTitle.value = t('action.' + type)
  console.log('deskId:',id)
  queryParams.deskId = id
  getList()
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName, event)
  queryParams.orderType = tab.paneName 
  getList()
}

const queryOrderStatus = (value) => {
  queryParams.orderStatus = value
  getList()
}
const queryPayStatus = (value) => {
  queryParams.payStatus = value
  getList()
}

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await StoreOrderApi.getStoreOrderPage(queryParams)
    list.value = data.list
    //console.log("aa:",list.value)
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const formRef1 = ref()
const formRef2 = ref()
const formRef4 = ref()
const openForm = (type: string, id?: number) => {
  if (type == 'updateOrder') {
    formRef.value.open(type, id)
  } else if (type == 'orderSend') {
    formRef1.value.open(type, id)
  }else if (type == 'sendInfo') {
    formRef2.value.open(type, id)
  }else if (type == 'orderDetail') {
    formRef4.value.open(type, id)
  }
  
}


/** 确认付款按钮操作 */
const handlePay = async (id: number) => {
  try {
    // 删除的二次确认
    await message.confirm('修改为支付状态')
    // 发起删除
    await StoreOrderApi.payStoreOrder(id)
    message.success(t('common.updateSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}


</script>
<style scoped>
img {
        height: 36px;
        display: block;
    }
.tabBox{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center
    }
.tabBox_img{
    width: 36px;
    height: 36px;
  }
.tabBox_img img{
  width: 100%;
  height: 100%;
}
.tabBox_tit{
    width :60%;
    font-size: 12px !important;
    margin: 0 2px 0 10px;
    letter-spacing: 1px;
    padding: 5px 0;
    box-sizing: border-box;
    text-align: left;
  }
  .tabBox_pice{
    width :30%;
    font-size: 12px !important;
    margin: 0 2px 0 10px;
    letter-spacing: 1px;
    padding: 5px 0;
    box-sizing: border-box;
    text-align: left;
  }
</style>