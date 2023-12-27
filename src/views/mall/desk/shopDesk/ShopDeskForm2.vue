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
      <el-form-item label="桌号前缀" prop="numberPre">
        <el-input v-model="formData.numberPre" placeholder="比如:Y" />
      </el-form-item>
      <el-form-item label="桌号范围" prop="startNumber">
        <el-input style="width:100px" v-model="formData.startNumber" placeholder="1" />
        <span style="padding:0 15px;background:#E5EAF3">-</span>
        <el-input style="width:100px" v-model="formData.endNumber" placeholder="99" />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="formData.note" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as ShopDeskApi from '@/api/mall/desk/shopDesk'
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
  numberPre: undefined,
  startNumber: undefined,
  endNumber: undefined,
  note: undefined,
  status: undefined
})
const formRules = reactive({
  shopId: [{ required: true, message: '门店不能为空', trigger: 'blur' }],
  numberPre: [{ required: true, message: '桌号前缀不能为空', trigger: 'blur' }],
  startNumber: [{ required: true, message: '桌号开始不能为空', trigger: 'blur' }],
  endNumber: [{ required: true, message: '桌号结束不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态：1=启用，2=禁用不能为空', trigger: 'blur' }]
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
      formData.value = await ShopDeskApi.getShopDesk(id)
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
    const data = formData.value as unknown
    await ShopDeskApi.batchAddShopDesk(data)
    message.success(t('common.createSuccess'))
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
    status: 1
  }
  formRef.value?.resetFields()
}
</script>
