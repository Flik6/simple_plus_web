<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible" width="1000px">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="92px"
      v-loading="formLoading"
      :inline="true"
    >
      <!-- <el-row :gutter="20"  > -->
        <el-row :gutter="20">
          <el-col class="mb15">
            <el-form-item label="规格名称" prop="ruleName">
              <el-input v-model="formData.ruleName" placeholder="请输入规格名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="(item,index) in formData.ruleValue" :key="index">
          <el-form-item label=" ">
            <div class="acea-row row-middle" style="display: block;width: 100%;">
              <span class="mr5">{{ item.value }}</span>
              <Icon icon="ep:circle-close" @click="handleRemove(index)" />
            </div>
            <div>
              <span v-for="(j,indexn) in item.detail" :key="indexn">
                <el-popover placement="right" :width="300" trigger="click">
                  <template #reference>
                    <el-tag
                      class="mb5"
                      style="margin: 2px 4px 2px 0;"
                      closable
                      :name="j"
                      @close="handleRemove2(item.detail,indexn)">
                      {{ j }}
                    </el-tag>
                  </template>
                   <p>可选数</p>
                  <el-select
                    v-model="item.info[j].num"
                    placeholder="Select"
                    size="large"
                    style="width: 240px"
                    @change="((val)=>{changeNumEvent(val,item.info,j)})"
                  >
                    <el-option
                      v-for="val in 3"
                      :key="val"
                      :label="val"
                      :value="val"
                    />
                  </el-select>
                </el-popover>
              </span>
<!--              <el-tag class="mb5" style="margin: 2px 4px 2px 0;" closable v-for="(j,indexn) in item.detail" :name="j"-->
<!--               :key="indexn" @close="handleRemove2(item.detail,indexn)">-->
<!--                {{ j }}-->
<!--              </el-tag>-->
               <el-input
                 placeholder="请输入属性名称"
                 v-model="item.detail.attrsVal"
                 style="width: 170px"
               >
                <template #append><el-button type="primary" @click="createAttr(item.detail.attrsVal,index)">添加</el-button></template>
              </el-input>

            </div>
          </el-form-item>
        </el-row>
        <el-row :gutter="20" v-if="isBtn" style="align-items: center;">
        <!-- <el-col :span="24" v-if="isBtn" style="background-color: gray;"> -->
           <el-col :span="6" >
            <el-form-item class="full-container" label="规格：">
              <el-input placeholder="请输入规格" v-model="attrsName"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item  class="full-container"  label="规格值：">
              <el-input v-model="attrsVal" placeholder="请输入规格值"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item  class="full-container" label="绑定规格：">
              <el-select
                v-model="bindType"
                :disabled="!formData.ruleValue || formData.ruleValue.length==0"
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="请输入规格值"
                style="width: 240px"
              >
                <el-option
                  v-for="item in 6"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item  class="full-container" label="可选数">
              <el-input :disabled="!formData.ruleValue || formData.ruleValue.length==0" v-model="chooseNum" placeholder="可选数"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button type="primary" @click="createAttrName">确定</el-button>
            <el-button @click="offAttrName">取消</el-button>
          </el-col>
        <!-- </el-col> -->
        </el-row>
      <!-- </el-row> -->
    <el-button type="primary"  @click="addBtn" v-if="!isBtn" class="ml95 mt10">添加新规格</el-button>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as StoreProductRuleApi from '@/api/mall/shop/storeProductRule'
import {ref} from "vue";

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const isBtn = ref(false)
const attrsName = ref('')
const attrsVal = ref('')
const chooseNum = ref(1)
const bindType = ref([])

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: 0,
  ruleName: '',
  ruleValue: [],
  info:{}
})
const formRules = reactive({
  ruleName: [{ required: true, message: '规格名称不能为空', trigger: 'blur' }],
  ruleValue: [{ required: true, message: '规格值不能为空', trigger: 'blur' }]
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
      formData.value = await StoreProductRuleApi.getStoreProductRule(id)
      formData.value.ruleValue.map(item => {
          item.detail.forEach((value) => {
            if (!item.info) item.info = {}
            if (!item.info[value])item.info[value] = {
                num: 1,
                bindType: [],
            };
          });
        })
      // formData.value.info = formData.value.info ? formData.value.ruleValue.map(item => {
      //   item.detail.forEach((value) => {
      //     item.info[value] = "";
      //   });
      // }) :{}
      console.log(formData.value)
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
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as StoreProductRuleApi.StoreProductRuleVO
    if (formType.value === 'create') {
      await StoreProductRuleApi.createStoreProductRule(data,0)
      message.success(t('common.createSuccess'))
    } else {
      await StoreProductRuleApi.createStoreProductRule(data,data.id)
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
    ruleName: undefined,
    ruleValue: undefined
  }
  formRef.value?.resetFields()
}
var arr = []
const handleRemove = (index) => {
  formData.value.ruleValue.splice(index, 1);
  arr.splice(index, 1);
}
const handleRemove2 = (item, index) => {
  item.splice(index, 1);
}
const createAttr = (num, idx) => {
    if (num) {
        formData.value.ruleValue[idx].detail.push(num);
        formData.value.ruleValue[idx].info[num]={
          num: 1,
          bindType:[]
        }
        var hash = {};
        formData.value.ruleValue[idx].detail = formData.value.ruleValue[idx].detail.reduce(function (item, next) {
          hash[next] ? '' : hash[next] = true && item.push(next);
          return item
        }, [])
    } else {
        message.success(t('shop.productRuleAttrAdd'))
      }
}
const addBtn = () => {
  isBtn.value = true
}

const createAttrName = () => {
  console.log(1111)
  if (attrsName.value && attrsVal.value) {
    let temp_key = attrsVal.value
    let data = {
      value: attrsName.value,
      detail: [attrsVal.value],
      info:{
        [temp_key]:{
            num:1,
            bindType:[]
        }
      }
    }

    if (!formData.value.ruleValue) formData.value.ruleValue = []
    formData.value.ruleValue.push(data)

    formData.value.ruleValue.info[attrsVal.value] = {
      num: chooseNum.value,
      bindType: bindType.value
    }
    console.log(formData.value)
    
    //arr.push(data)

    var hash = {}
    formData.value.ruleValue = formData.value.ruleValue.reduce(function (item, next) {
            /* eslint-disable */
            hash[next.value] ? '' : hash[next.value] = true && item.push(next);
            return item
    }, [])

     attrsName.value = ''
     attrsVal.value = ''
     isBtn.value = false
          
  } else {
    message.success(t('shop.productRuleAdd'))
  }
  
}
const offAttrName = () => {
  isBtn.value = false
}
const changeNumEvent = (val,info, key: any) => {
  if(!info[key]) info[key] ={}
  info[key].num = val

}

</script>

<style scoped>
.full-container{
  width: 100%;
  height: 100%;
}
.mb15 {
    margin-bottom: 15px !important;
}
.mb5 {
    margin-bottom: 5px !important;
}
.mr20 {
    margin-right: 20px !important;
}

.mr5 {
    margin-right: 5px !important;
}
.mr15 {
    margin-right: 15px !important;
}
.ml95 {
    margin-left: 95px !important;
}
.mt10{
    margin-top: 10px;
}

.acea-row {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -o-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    /* 辅助类 */
}
.acea-row.row-middle {
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

</style>
