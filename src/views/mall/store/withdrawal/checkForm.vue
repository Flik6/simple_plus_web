<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      v-loading="formLoading"
    >
      <el-form-item label="提现金额" prop="amount">
        <el-input v-model="formData.amount" placeholder="请输入提现金额" />
      </el-form-item>
      <el-form-item label="提现到银行卡" prop="bankId">
        <el-descriptions column="1">
          <el-descriptions-item label="银行名称：">{{userBank.bankName}}</el-descriptions-item>
          <el-descriptions-item label="银行卡号：">{{userBank.bankCode}}</el-descriptions-item>
          <el-descriptions-item label="真实姓名：">{{userBank.name}}</el-descriptions-item>
          <el-descriptions-item label="手机号码：">{{userBank.bankMobile}}</el-descriptions-item>
        </el-descriptions>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">未审核</el-radio>
          <el-radio :label="1">待到账</el-radio>
          <el-radio :label="2">审核拒绝</el-radio>
          <el-radio :label="3">已到账</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核拒绝原因" prop="refuse">
        <el-input v-model="formData.refuse" placeholder="请输入审核拒绝原因" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as WithdrawalApi from '@/api/mall/store/withdrawal'
// import * as UserBankApi from '@/api/mall/store/userBank'
import * as ShopApi from '@/api/mall/store/shop'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  uid: undefined,
  shopId: undefined,
  shopName: undefined,
  amount: undefined,
  type: undefined,
  status: undefined,
  refuse: undefined,
  month: undefined,
  residueAmount: undefined,
})
const formRules = reactive({
  // shopId: [{ required: true, message: '门店不能为空', trigger: 'blur' }],
  // amount: [{ required: true, message: '提现金额不能为空', trigger: 'blur' }],
  // bankId: [{ required: true, message: '银行卡不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref
const shopList = ref([])
//const bankList = ref([])
const userBank = ref({})

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  getList()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await WithdrawalApi.getWithdrawal(id)
      console.log('formData.value:',formData.value.userBank)
      userBank.value = formData.value.userBank
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
    const data = formData.value as unknown as WithdrawalApi.WithdrawalVO
    if (formType.value === 'create') {
      await WithdrawalApi.createWithdrawal(data)
      message.success(t('common.createSuccess'))
    } else {
      await WithdrawalApi.updateWithdrawal(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

// const getBank = async(value) => {
//   const data = await UserBankApi.getUserBankList(value)
//   bankList.value = data
// }

const getList = async () => {
  try {
    const data = await ShopApi.getShopList()
    shopList.value = data

  } finally {
    
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    uid: undefined,
    shopId: undefined,
    shopName: undefined,
    amount: undefined,
    type: undefined,
    status: undefined,
    refuse: undefined,
    month: undefined,
    residueAmount: undefined
  }
  formRef.value?.resetFields()
}
</script>
