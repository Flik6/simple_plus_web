<template>
  <div style="width: 100%">
    <el-card style="width: 100%" v-for="(item,index) in comboList" :key="index">
      <template #header>
        <div style="display: flex;flex-direction: row;">
          <div>属性：{{ item.attrName }} - {{ item.products.length }} 选 {{ item.optionalNum }}</div>
          <el-button @click="removeCombo(index)">删除</el-button>
        </div>

      </template>

      <div class="card-container">
        <el-card v-for="(product, i) in item.products" :key="i" class="card-item">
          <div>{{ product.storeName }}</div>
          <el-image :src="product.image" class="card-image" fit="cover"/>
          <el-form-item label="商品份数" >
            <el-select placeholder="请输入商品份数" v-model="product.productNum">
              <el-option v-for="(num,index) in 10" :key="index" :value="num">{{ num }}</el-option>
            </el-select>
          </el-form-item>
        </el-card>
      </div>
    </el-card>
    <el-card style="width: 100%">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="套餐属性名称" prop="attrName">
          <el-input v-model="form.attrName" placeholder="请输入套餐属性名称"/>
        </el-form-item>
        <el-form-item label="可选数量" prop="optionalNum">
          <el-input v-model.number="form.optionalNum" placeholder="请输入属性可选数量"/>
        </el-form-item>
        <el-form-item label="套餐内容" prop="products">
          <el-button type="primary" @click="handleSelectProduct">添加商品</el-button>
          <span v-if="form.products.length>0">{{ form.products.length }}个商品</span>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm">确定添加</el-button>

    </el-card>
    <SelectStoreProduct ref="selectProductRef" @selected="handleSelected"/>
  </div>
</template>

<script setup lang="ts">

import SelectStoreProduct from "@/views/mall/product/storeProduct/SelectStoreProduct.vue";
import {reactive, ref} from "vue";

const rules = reactive({
  attrName: [{required: true, message: "店铺名称不能为空", trigger: "blur"}],
  optionalNum: [{required: true, message: "套餐名称不能为空", trigger: "blur"}],
  combos: [{required: true, message: "套餐商品不能为空", trigger: "blur"}],
})
const comboList = ref([])
// const comboInfo = ref({
//   id: undefined,
//   attrName: "",
//   optionalNum: undefined,
//   products: [],
// })

const formRef = ref()
const form = ref({
  attrName: "",
  optionalNum: undefined,
  products: [],
})
const resetForm = () => {
  form.value = {
    attrName: "",
    optionalNum: undefined,
    products: [],
  }
  formRef.value?.resetFields()
}
const selectProductRef = ref()

const handleSelectProduct = () => {
  selectProductRef.value.openDialog("选择商品", {specType: 0})
}
const handleSelected = (selectList) => {
  selectList.forEach(item => {
    if (!item.hasOwnProperty("productNum")){
      item.productNum = 1
    }
  })
  form.value.products = selectList
  console.log(selectList)
  // selectProductAttr.value.intro = selectList
  // console.log(selectProductAttr.value)
  // console.log(manyFormValidate.value)
}

const emits = defineEmits(['update-combos'])

const removeCombo = (index) => {
  comboList.value.splice(index, 1)
  emits("update-combos", comboList.value)

}

const resetComboList = () => {
  comboList.value = []
}

defineExpose({ resetComboList });

const submitForm = async () => {
  // 校验表单
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return

  comboList.value.push({...form.value})
  emits("update-combos", comboList.value)
  resetForm()
}
</script>

<style scoped lang="scss">
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* 卡片之间的间距 */
}

.card-item {
  flex: 1 1 calc(33.3333% - 16px); /* 三个一行，并考虑到间距 */
  box-sizing: border-box; /* 包含 padding 和 border 在内的完整宽度和高度 */
  height: 200px; /* 卡片固定高度 */
  display: flex; /* 设置为 flex 布局，使得内容垂直居中 */
  flex-direction: column; /* 子元素垂直排列 */
}

.card-content {
  flex: 1; /* 卡片内容垂直撑满 */
  display: flex; /* 设置为 flex 布局，使得内容垂直居中 */
  flex-direction: column; /* 子元素垂直排列 */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.card-content > * {
  margin-bottom: 10px; /* 子元素间距 */
}

.card-image {
  height: 100px;
  width: 100%;
  flex: 1; /* 图片撑满 */
  object-fit: cover; /* 自适应宽高比，填充整个卡片 */
  border-radius: 4px;
}
</style>
