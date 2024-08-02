<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="会员卡名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入会员卡名称" />
          </el-form-item>
          <el-form-item label="会员卡样式" prop="styleImg">
            <el-image v-for="(item,key) in cardbg"
             :key="key"
             style="width: 100px; height: 60px;margin-right:10px;"
             :src="item.img"
             @click="selectImg(item)"
             :class="{'checked':item.id == checkedid}"
              />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="formData.sort" placeholder="请输入排序" />
          </el-form-item>
          <el-form-item label="是否有折扣" prop="isDiscount">
            <el-radio-group v-model="formData.isDiscount">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="折扣比例" prop="discount" v-show="formData.isDiscount == 1">
            <el-input v-model="formData.discount" placeholder="请输入折扣比例（例如：85折 填入85）" />
          </el-form-item>
          <el-form-item label="开卡赠送" prop="giveMethod">
              <el-checkbox label="赠送积分" v-model="integral" />
              <el-checkbox label="余额" v-model="mony" />
          </el-form-item>
          <el-form-item label="赠送积分数量" prop="integral" v-show="integral">
            <el-input v-model="formData.integral" placeholder="请输入赠送积分数量" />
          </el-form-item>
          <el-form-item label="赠送的余额" prop="mony" v-show="mony">
            <el-input v-model="formData.mony" placeholder="请输入赠送的余额" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="领取配置" name="second">
          <el-form-item label="有效期" prop="period">
            <el-input v-model="formData.period" placeholder="请输入有效期" />
            <el-text class="mx-1" type="warning">有效期单位天，0-表示永久</el-text>
          </el-form-item>
          <el-form-item label="购买的价格" prop="price">
            <el-input v-model="formData.price" placeholder="请输入购买的价格" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">关闭</el-radio>
              <el-radio :label="0">正常</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用的规则" prop="rule">
            <Editor v-model="formData.rule" height="150px" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as VipCardApi from '@/api/market/vipCard'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  name: undefined,
  styleImg: undefined,
  sort: undefined,
  isDiscount: undefined,
  discount: undefined,
  igiveMethod: undefined,
  integral: undefined,
  coupon: undefined,
  mony: undefined,
  period: undefined,
  price: undefined,
  status: undefined,
  rule: undefined
})
const formRules = reactive({
  name: [{ required: true, message: '会员卡名称不能为空', trigger: 'blur' }],
  styleImg: [{ required: true, message: '会员卡样式不能为空', trigger: 'blur' }],
  period: [{ required: true, message: '有效期不能为空', trigger: 'blur' }],
  price: [{ required: true, message: '购买价格不能为空', trigger: 'blur' }],
  // rule: [{ required: true, message: '使用的规则不能为空', trigger: 'blur' }],
})
const activeName = ref('first')
let protocol = window.location.protocol;
let currentDomain = window.location.hostname;
console.log('protocol:',protocol);
console.log('currentDomain:',currentDomain);
const hostUrl = protocol + '//' + currentDomain
console.log('hostUrl:',hostUrl);
const cardbg = ref([
  {
    id: 1,
    img: hostUrl + '/card01.jpg'
  },
  {
    id: 2,
    img: hostUrl + '/card02.jpg'
  },
  {
    id: 3,
    img: hostUrl + '/card03.jpg'
  }
])
const checkedid = ref(0)
const integral = ref(false)
const mony = ref(false)


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
      formData.value = await VipCardApi.getVipCard(id)
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
    const data = formData.value as unknown as VipCardApi.VipCardVO
    if (formType.value === 'create') {
      await VipCardApi.createVipCard(data)
      message.success(t('common.createSuccess'))
    } else {
      await VipCardApi.updateVipCard(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

const selectImg = (item) => {
  checkedid.value = item.id
  formData.value.styleImg = item.img
}



/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    name: undefined,
    styleImg: undefined,
    sort: 0,
    isDiscount: 0,
    discount: undefined,
    giveMethod: '',
    integral: undefined,
    coupon: undefined,
    mony: undefined,
    period: undefined,
    price: undefined,
    status: 0,
    rule: undefined
  }
  formRef.value?.resetFields()
}
</script>
<style scope>
.checked {
		border:solid;
    border-color:red;
	}
</style>
