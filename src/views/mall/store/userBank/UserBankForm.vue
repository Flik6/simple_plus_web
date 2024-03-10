<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
    <el-form-item label="选择店铺" prop="shopId">
        <el-select
          v-model="formData.shopId"
          placeholder="选择店铺"
        >
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName">
        <el-input v-model="formData.bankName" placeholder="请输入银行名称" />
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCode">
        <el-input v-model="formData.bankCode" placeholder="请输入银行卡号" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="bankMobile">
        <el-input v-model="formData.bankMobile" placeholder="请输入手机号" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as UserBankApi from '@/api/mall/store/userBank'
import * as ShopApi from '@/api/mall/store/shop'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  shopId: undefined,
  shopName: undefined,
  uid: undefined,
  type: undefined,
  bankName: undefined,
  name: undefined,
  bankCode: undefined,
  bankMobile: undefined,
  zfbCode: undefined,
  wxCode: undefined,
  zfbImg: undefined,
  wxImg: undefined,
  status: undefined,
  refuse: undefined,
  bankIcon: undefined,
  bankType: undefined
})
const formRules = reactive({
  shopId: [{ required: true, message: '门店不能为空', trigger: 'blur' }],
  bankName: [{ required: true, message: '银行名称不能为空', trigger: 'blur' }],
  bankCode: [{ required: true, message: '银行卡号不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
  bankMobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref
const shopList = ref([])
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
      formData.value = await UserBankApi.getUserBank(id)
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
    const data = formData.value as unknown as UserBankApi.UserBankVO
    if (formType.value === 'create') {
      await UserBankApi.createUserBank(data)
      message.success(t('common.createSuccess'))
    } else {
      await UserBankApi.updateUserBank(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

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
    shopId: undefined,
    shopName: undefined,
    uid: undefined,
    type: undefined,
    bankName: undefined,
    name: undefined,
    bankCode: undefined,
    bankMobile: undefined,
    zfbCode: undefined,
    wxCode: undefined,
    zfbImg: undefined,
    wxImg: undefined,
    status: undefined,
    refuse: undefined,
    bankIcon: undefined,
    bankType: undefined
  }
  formRef.value?.resetFields()
}
</script>
