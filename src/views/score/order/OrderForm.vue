<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="formData.userId" placeholder="请输入用户id" />
      </el-form-item>
      <el-form-item label="商品id" prop="productId">
        <el-input v-model="formData.productId" placeholder="请输入商品id" />
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="formData.number" placeholder="请输入数量" />
      </el-form-item>
      <el-form-item label="单个商品积分" prop="score">
        <el-input v-model="formData.score" placeholder="请输入单个商品积分" />
      </el-form-item>
      <el-form-item label="总消耗积分" prop="totalScore">
        <el-input v-model="formData.totalScore" placeholder="请输入总消耗积分" />
      </el-form-item>
      <el-form-item label="下单ip" prop="ip">
        <el-input v-model="formData.ip" placeholder="请输入下单ip" />
      </el-form-item>
      <el-form-item label="快递编号" prop="expressNumber">
        <el-input v-model="formData.expressNumber" placeholder="请输入快递编号" />
      </el-form-item>
      <el-form-item label="快递公司" prop="expressCompany">
        <el-input v-model="formData.expressCompany" placeholder="请输入快递公司" />
      </el-form-item>
      <el-form-item label="收货名称" prop="customerName">
        <el-input v-model="formData.customerName" placeholder="请输入收货名称" />
      </el-form-item>
      <el-form-item label="收货电话" prop="customerPhone">
        <el-input v-model="formData.customerPhone" placeholder="请输入收货电话" />
      </el-form-item>
      <el-form-item label="收货地址" prop="customerAddress">
        <el-input v-model="formData.customerAddress" placeholder="请输入收货地址" />
      </el-form-item>
      <el-form-item label="订单状态:0=取消订单,1=正常啊" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="已支付:0=否" prop="havePaid">
        <el-input v-model="formData.havePaid" placeholder="请输入已支付:0=否" />
      </el-form-item>
      <el-form-item label="已发货:0=否" prop="haveDelivered">
        <el-input v-model="formData.haveDelivered" placeholder="请输入已发货:0=否" />
      </el-form-item>
      <el-form-item label="已收货:0=否" prop="haveReceived">
        <el-input v-model="formData.haveReceived" placeholder="请输入已收货:0=否" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as OrderApi from '@/api/score/order'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  userId: undefined,
  productId: undefined,
  number: undefined,
  score: undefined,
  totalScore: undefined,
  ip: undefined,
  expressNumber: undefined,
  expressCompany: undefined,
  customerName: undefined,
  customerPhone: undefined,
  customerAddress: undefined,
  status: undefined,
  havePaid: undefined,
  haveDelivered: undefined,
  haveReceived: undefined
})
const formRules = reactive({
  userId: [{ required: true, message: '用户id不能为空', trigger: 'blur' }],
  productId: [{ required: true, message: '商品id不能为空', trigger: 'blur' }],
  number: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
  score: [{ required: true, message: '单个商品积分不能为空', trigger: 'blur' }],
  totalScore: [{ required: true, message: '总消耗积分不能为空', trigger: 'blur' }],
  expressNumber: [{ required: true, message: '快递编号不能为空', trigger: 'blur' }],
  expressCompany: [{ required: true, message: '快递公司不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '订单状态:0=取消订单,1=正常啊不能为空', trigger: 'blur' }],
  havePaid: [{ required: true, message: '已支付:0=否不能为空', trigger: 'blur' }],
  haveDelivered: [{ required: true, message: '已发货:0=否不能为空', trigger: 'blur' }],
  haveReceived: [{ required: true, message: '已收货:0=否不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await OrderApi.getOrder(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as OrderApi.OrderVO
    if (formType.value === 'create') {
      await OrderApi.createOrder(data)
      message.success(t('common.createSuccess'))
    } else {
      await OrderApi.updateOrder(data)
      message.success(t('common.updateSuccess'))
    }
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
    userId: undefined,
    productId: undefined,
    number: undefined,
    score: undefined,
    totalScore: undefined,
    ip: undefined,
    expressNumber: undefined,
    expressCompany: undefined,
    customerName: undefined,
    customerPhone: undefined,
    customerAddress: undefined,
    status: undefined,
    havePaid: undefined,
    haveDelivered: undefined,
    haveReceived: undefined
  }
  formRef.value?.resetFields()
}
</script>
