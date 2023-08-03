<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="订单号" prop="orderCode">
        <el-input disabled v-model="formData.orderCode" placeholder="请输入订单号" />
      </el-form-item>
      <el-form-item label="退款金额" prop="refundAmount">
        <el-input disabled v-model="formData.refundAmount" placeholder="请输入退款金额" />
      </el-form-item>
      <el-form-item label="申请原因" prop="reasons">
        <el-input disabled v-model="formData.reasons" placeholder="请输入申请原因" />
      </el-form-item>
      <el-form-item label="说明" prop="explains">
        <el-input disabled v-model="formData.explains" placeholder="请输入说明" />
      </el-form-item>
      <el-form-item label="说明图片" prop="explainImg">
        <el-image style="width: 100px; height: 100px" :src="formData.explainImg"  />
      </el-form-item>
      <el-text size="large" type="danger">填写商家退货地址：</el-text>
      <el-form-item label="商家收货人" prop="consignee">
        <el-input v-model="formData.consignee" placeholder="请输入商家收货人" />
      </el-form-item>
      <el-form-item label="商家手机号" prop="phoneNumber">
        <el-input v-model="formData.phoneNumber" placeholder="请输入商家手机号" />
      </el-form-item>
      <el-form-item label="商家地址" prop="address">
        <el-input v-model="formData.address" placeholder="请输入商家地址" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm(1)" type="primary" :disabled="formLoading">确 定</el-button>
       <el-button @click="submitForm(2)" type="danger" :disabled="formLoading">拒 绝</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as StoreAfterSalesApi from '@/api/mall/order/storeAfterSales'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('订单审核') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  orderCode: undefined,
  refundAmount: undefined,
  serviceType: undefined,
  reasons: undefined,
  explains: undefined,
  explainImg: undefined,
  shipperCode: undefined,
  deliverySn: undefined,
  deliveryName: undefined,
  state: undefined,
  salesState: undefined,
  userId: undefined,
  consignee: undefined,
  phoneNumber: undefined,
  address: undefined,
  type: 0,
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  //dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await StoreAfterSalesApi.getStoreAfterSales(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async (type) => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    formData.value.type = type
    const data = formData.value 
    await StoreAfterSalesApi.updateStoreAfterSales(data)
    message.success(t('common.updateSuccess'))
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    type: 0,
    orderCode: undefined,
    refundAmount: undefined,
    serviceType: undefined,
    reasons: undefined,
    explains: undefined,
    explainImg: undefined,
    shipperCode: undefined,
    deliverySn: undefined,
    deliveryName: undefined,
    state: undefined,
    salesState: undefined,
    userId: undefined,
    consignee: undefined,
    phoneNumber: undefined,
    address: undefined
  }
  formRef.value?.resetFields()
}
</script>
