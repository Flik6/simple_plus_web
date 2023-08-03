<template>
 <el-drawer v-model="drawer" :title="dialogTitle" size="40%">
    <div>
      <el-descriptions title="订单信息" :column="2">
        <el-descriptions-item label="订单号">{{ DetailData.orderCode }}</el-descriptions-item>
        <el-descriptions-item label="服务类型">   
           <span v-if="DetailData.serviceType==0">仅退款</span>
           <span v-if="DetailData.serviceType==1">退货退款 </span>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
           <span v-if="DetailData.state==0">等待审核</span>
           <span v-if="DetailData.state==1">已审核 </span>
           <span v-if="DetailData.state==2">用户已发货</span>
           <span v-if="DetailData.state==3">退款成功</span>
        </el-descriptions-item>
        <el-descriptions-item label="售后状态">
           <span v-if="DetailData.salesState==0">正常</span>
           <span v-if="DetailData.salesState==1">用户取消 </span>
           <span v-if="DetailData.salesState==2">商家拒绝</span>
        </el-descriptions-item>
        <el-descriptions-item label="退款金额">{{ DetailData.refundAmount }}</el-descriptions-item>
        <el-descriptions-item label="申请原因">{{ DetailData.reasons }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ DetailData.explains }}</el-descriptions-item>
        <el-descriptions-item label="说明图片">
          <el-image style="width: 100px; height: 100px" :src="DetailData.explainImg"  />
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(DetailData.createTime)}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="商家收货信息" :column="2">
        <el-descriptions-item label="收货人">{{ DetailData.consignee }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ DetailData.phoneNumber }}</el-descriptions-item>
        <el-descriptions-item label="收货地址">{{ DetailData.address }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="用户退货物流信息" :column="2">
        <el-descriptions-item label="快递公司">{{ DetailData.deliveryName }}</el-descriptions-item>
        <el-descriptions-item label="快递单号">{{ DetailData.deliverySn }} <el-button type="primary">物流追踪</el-button></el-descriptions-item>
      </el-descriptions>
      <!-- <el-button @click="innerDrawer = true">Click me!</el-button>
      <el-drawer
        v-model="innerDrawer"
        title="I'm inner Drawer"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <p>_(:зゝ∠)_</p>
      </el-drawer> -->
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import * as StoreAfterSalesApi from '@/api/mall/order/storeAfterSales'
import { formatDate } from '@/utils/formatTime'

const { t } = useI18n() // 国际化
// const message = useMessage() // 消息弹窗
const dialogTitle = ref('') // 弹窗的标题
const drawer = ref(false)
const DetailData = ref({})
/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  drawer.value = true
  dialogTitle.value = t('action.' + type)
  DetailData.value =  await StoreAfterSalesApi.getStoreAfterSales(id)
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗
</script>
<style scoped>
</style>