<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      v-loading="formLoading"
    >
      <el-form-item label="小程序版本" prop="env">
        <el-select
          v-model="formData.env"
          @change="changeEnv"
        >
          <el-option
            v-for="item in envList"
            :key="item.id"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="小程序二维码" >
        <el-image style="width: 200px; height: 200px" :src="qrcode.miniQrcode" :fit="fit" />
      </el-form-item>
      <el-form-item label="H5二维码" >
        <el-image style="width: 200px; height: 200px" :src="qrcode.normalQrcode" :fit="fit" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">下 载</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as ShopDeskApi from '@/api/mall/desk/shopDesk'
import download from '@/utils/download'


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
  number: undefined,
  miniQrcode: undefined,
  h5Qrcode: undefined,
  aliQrcode: undefined,
  note: undefined,
  orderCount: undefined,
  costAmount: undefined,
  lastOrderNo: undefined,
  lastOrderTime: undefined,
  lastOrderStatus: undefined,
  status: undefined,
  env: 'trial'
})
const formRules = reactive({
  shopId: [{ required: true, message: '门店不能为空', trigger: 'blur' }],
  number: [{ required: true, message: '桌号不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态：1=启用，2=禁用不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref
const envList = ref([
  {
    id: 1,
    name: '正式版',
    value: 'release'
  },
  {
    id: 2,
    name: '体验版',
    value: 'trial'
  },
  {
    id: 3,
    name: '开发版',
    value: 'develop'
  }
])
const qrcode = ref({})

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  //getList()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await ShopDeskApi.getShopDesk(id)
      formData.value.env = 'trial'
      qrcode.value = await ShopDeskApi.getQrcode({id:id,number:formData.value.number,shopId:formData.value.shopId,env:formData.value.env})
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

const changeEnv = async(value) => {
  console.log('value1:',value)
  qrcode.value = await ShopDeskApi.getQrcode({id:formData.value.id,number:formData.value.number,shopId:formData.value.shopId,env:value})
}


const submitForm = async () => {

  // 导出的二次确认
  await message.confirm('小程序二维码只能下载正式的哦')
  // 提交请求
  formLoading.value = true
  try {
    const res = await ShopDeskApi.downloadQrcode(formData.value.id)
    download.zip(res, formData.value.shopName+formData.value.number + '.zip')
    dialogVisible.value = false
  } finally {
    formLoading.value = false
  }
}



/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    shopId: undefined,
    shopName: undefined,
    number: undefined,
    miniQrcode: undefined,
    h5Qrcode: undefined,
    aliQrcode: undefined,
    note: undefined,
    orderCount: undefined,
    costAmount: undefined,
    lastOrderNo: undefined,
    lastOrderTime: undefined,
    lastOrderStatus: undefined,
    status: 1,
    env: 'trial'
  }
  formRef.value?.resetFields()
}
</script>
