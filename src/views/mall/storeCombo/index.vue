<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
             label-width="68px">
      <el-form-item label="店铺id" prop="shopId">
        <el-select v-model="queryParams.shopId" placeholder="请选择店铺id" clearable size="small">
          <el-option v-for="shop in shopList"
                     :key="shop.id" :label="shop.name" :value="shop.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="店铺名称" prop="shopName">
        <el-input v-model="queryParams.shopName" placeholder="请输入店铺名称" clearable
                  @keyup.enter="handleQuery"/>
      </el-form-item>
      <el-form-item label="套餐名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入套餐名称" clearable
                  @keyup.enter="handleQuery"/>
      </el-form-item>
      <el-form-item label="套餐简介" prop="intro">
        <el-input v-model="queryParams.intro" placeholder="请输入套餐简介" clearable
                  @keyup.enter="handleQuery"/>
      </el-form-item>
      <!--      <el-form-item label="关键词" prop="keyword">-->
      <!--        <el-input v-model="queryParams.keyword" placeholder="请输入关键词" clearable @keyup.enter="handleQuery"/>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="价格" prop="price">-->
      <!--        <el-input v-model="queryParams.price" placeholder="请输入价格" clearable @keyup.enter="handleQuery"/>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="排序" prop="sort">-->
      <!--        <el-input v-model="queryParams.sort" placeholder="请输入排序" clearable @keyup.enter="handleQuery"/>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="销量" prop="sales">-->
      <!--        <el-input v-model="queryParams.sales" placeholder="请输入销量" clearable @keyup.enter="handleQuery"/>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="库存" prop="stock">-->
      <!--        <el-input v-model="queryParams.stock" placeholder="请输入库存" clearable @keyup.enter="handleQuery"/>-->
      <!--      </el-form-item>-->
      <el-form-item label="是否上架" prop="isShow">
        <el-select v-model="queryParams.isShow" placeholder="请选择状态" clearable size="small">
          <el-option v-for="dict in getDictOptions(DICT_TYPE.PUBLISH_STATUS)"
                     :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="是否热卖" prop="isHot">-->
      <!--        <el-select v-model="queryParams.isHot" placeholder="请选择是否热卖" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="是否优惠" prop="isBenefit">-->
      <!--        <el-select v-model="queryParams.isBenefit" placeholder="请选择是否优惠" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="是否精品" prop="isBest">-->
      <!--        <el-select v-model="queryParams.isBest" placeholder="请选择是否精品" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="是否新品" prop="isNew">-->
      <!--        <el-select v-model="queryParams.isNew" placeholder="请选择是否新品" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="添加时间" prop="createTime">-->
      <!--        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"-->
      <!--                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作工具栏 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain size="mini" @click="handleAdd"
                   v-hasPermi="['shop:store-combo:create']"><Icon icon="ep:plus" />新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain  size="mini" @click="handleExport"
                   :loading="exportLoading"
                   v-hasPermi="['shop:store-combo:export']"><Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-col>
      <!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="套餐id" align="center" prop="id"/>
      <el-table-column label="店铺" align="center" prop="shopId">
        <template v-slot="scope">
          <div>
            {{ findNameById(scope.row.shopId) }}
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column label="店铺名称" align="center" prop="shopName"/>-->
      <el-table-column label="套餐名称" align="center" prop="name"/>
      <el-table-column label="套餐简介" align="center" prop="intro"/>
      <el-table-column label="关键词" align="center" prop="keyword"/>
      <!--      <el-table-column label="套餐图片" align="center" prop="image"/>-->
      <el-table-column label="价格" align="center" prop="price"/>
      <el-table-column label="排序" align="center" prop="sort"/>
      <el-table-column label="销量" align="center" prop="sales"/>
      <el-table-column label="库存" align="center" prop="stock"/>
      <el-table-column label="是否上架" align="center" prop="isShow">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.PUBLISH_STATUS" :value="scope.row.isShow"/>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" align="center" prop="isHot"/>
      <el-table-column label="是否优惠" align="center" prop="isBenefit"/>
      <el-table-column label="是否精品" align="center" prop="isBest"/>
      <el-table-column label="是否新品" align="center" prop="isNew"/>
      <el-table-column label="添加时间" align="center" prop="createTime" width="180">
        <template v-slot="scope">
          <span>{{ scope.row.createTime }}</span>
          <!--          <span>{{ parseTime(scope.row.createTime) }}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button v-if="false" size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['shop:store-combo:update']">修改
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['shop:store-combo:delete']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-show="total > 0" :total="total" :page="queryParams.pageNo"
                :limit="queryParams.pageSize"
                @pagination="getList"/>


    <el-dialog v-model="open" :title="title" width="70%" append-to-body>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="店铺" prop="shopId">
          <el-select v-model="form.shopId" placeholder="请选择店铺">
            <el-option v-for="shop in shopList"
                       :key="shop.id" :label="shop.name" :value="shop.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入套餐名称"/>
        </el-form-item>
        <el-form-item label="套餐简介" prop="intro">
          <el-input v-model="form.intro" placeholder="请输入套餐简介"/>
        </el-form-item>
        <el-form-item label="关键词" prop="keyword">
          <el-input v-model="form.keyword" placeholder="请输入关键词"/>
        </el-form-item>
        <el-form-item label="套餐图" prop="image">
          <Materials v-model="form.image" :num="1" type="image"/>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序"/>
        </el-form-item>

        <el-form-item label="库存" prop="stock">
          <el-input v-model="form.stock" placeholder="请输入库存"/>
        </el-form-item>
        <el-form-item label="是否上架" prop="isShow">
          <el-radio-group v-model="form.isShow">
            <el-radio v-for="dict in getDictOptions(DICT_TYPE.PUBLISH_STATUS)"
                      :key="dict.value" :label="dict.value">{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="套餐内容" prop="combos">
          <ComboInfo ref="comboInfoRef" @update-combos="updateCombos"/>

        </el-form-item>
        <!--        <el-form-item label="是否热卖" prop="isHot">-->
        <!--          <el-radio-group v-model="form.isHot">-->
        <!--            <el-radio :label="true">是</el-radio>-->
        <!--            <el-radio :label="false">否</el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="是否优惠" prop="isBenefit">-->
        <!--          <el-radio-group v-model="form.isBenefit">-->
        <!--            <el-radio :label="true">是</el-radio>-->
        <!--            <el-radio :label="false">否</el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="是否精品" prop="isBest">-->
        <!--          <el-radio-group v-model="form.isBest">-->
        <!--            <el-radio :label="true">是</el-radio>-->
        <!--            <el-radio :label="false">否</el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="是否新品" prop="isNew">-->
        <!--          <el-radio-group v-model="form.isNew">-->
        <!--            <el-radio :label="true">是</el-radio>-->
        <!--            <el-radio :label="false">否</el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  createStoreCombo,
  updateStoreCombo,
  deleteStoreCombo,
  getStoreCombo,
  getStoreComboPage,
  exportStoreComboExcel
} from "@/api/combo/storeCombo";
import download from "@/utils/download";
import {DICT_TYPE, getDictOptions} from "@/utils/dict";

const message = useMessage() // 消息弹窗

import {ref, reactive} from 'vue';
import ComboInfo from "@/views/mall/storeCombo/ComboInfo.vue";
import * as ShopApi from "@/api/mall/store/shop";
// 套餐详情ref
const comboInfoRef = ref(null);
// 遮罩层
const loading = ref(true);
// 导出遮罩层
const exportLoading = ref(false);
// 显示搜索条件
const showSearch = ref(true);
// 总条数
const total = ref(0);
// 套餐列表
const list = ref([]);
// 弹出层标题
const title = ref("");
// 是否显示弹出层
const open = ref(false);
// 查询参数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  shopId: null,
  shopName: null,
  name: null,
  intro: null,
  keyword: null,
  image: null,
  price: null,
  sort: null,
  sales: null,
  stock: null,
  isShow: null,
  isHot: null,
  isBenefit: null,
  isBest: null,
  isNew: null,
  createTime: [],
});
// 表单参数
const form = ref({
  id: undefined,
  shopId: 0,
  shopName: "",
  name: "",
  intro: "",
  image: "",
  keyword: "",
  price: "",
  sort: "",
  sales: "",
  stock: "",
  isShow: "true",
  isHot: false,
  isBenefit: false,
  isBest: false,
  isNew: false,
  combos: [],
});
//商店列表
const shopList = ref([])
const reset = () => {
  form.value = {
    id: undefined,
    shopId: 0,
    shopName: "",
    name: "",
    intro: "",
    keyword: "",
    image: "",
    price: "",
    sort: "",
    sales: "",
    stock: "",
    isShow: "true",
    isHot: false,
    isBenefit: false,
    isBest: false,
    isNew: false,
    combos: [],
  }
  formRef.value?.resetFields();
  comboInfoRef.value?.resetComboList();
};
const formRef = ref()


// 表单校验
const rules = reactive({

  shopId: [{required: true, message: "店铺名称不能为空", trigger: "blur"}],
  name: [{required: true, message: "套餐名称不能为空", trigger: "blur"}],
  intro: [{required: true, message: "套餐简介不能为空", trigger: "blur"}],
  keyword: [{required: true, message: "关键词不能为空", trigger: "blur"}],
  image: [{required: true, message: "套餐图片不能为空", trigger: "blur"}],
  price: [{required: true, message: "价格不能为空", trigger: "blur"}],
  sort: [{required: true, message: "排序不能为空", trigger: "blur"}],
  sales: [{required: true, message: "销量不能为空", trigger: "blur"}],
  stock: [{required: true, message: "库存不能为空", trigger: "blur"}],
  isShow: [{required: true, message: "是否上架不能为空", trigger: "blur"}],
  isHot: [{required: true, message: "是否热卖不能为空", trigger: "blur"}],
  isBenefit: [{required: true, message: "是否优惠不能为空", trigger: "blur"}],
  isBest: [{required: true, message: "是否精品不能为空", trigger: "blur"}],
  isNew: [{required: true, message: "是否新品不能为空", trigger: "blur"}],
  combos: [{required: true, message: "套餐不能为空", trigger: "blur"}],
});

onMounted(() => {
  getShopList();
  getList();

});

const updateCombos = (combos) => {
  form.value.combos = combos;
}

const getList = async () => {
  loading.value = true;
  try {
    const response = await getStoreComboPage(queryParams);
    list.value = response.list;
    total.value = response.total;
  } catch (error) {
    console.error('Error fetching list:', error);
  } finally {
    loading.value = false;
  }
};

const cancel = () => {
  reset();
  open.value = false;
};

const handleQuery = () => {
  queryParams.pageNo = 1;
  getList();
};

const resetQuery = () => {
  reset();
  handleQuery();
};

const handleAdd = () => {
  reset();
  open.value = true;
  title.value = "添加套餐";
};

const handleUpdate = async (row) => {
  reset();
  const id = row.id;
  try {
    const response = await getStoreCombo(id);
    console.log(response)
    form.value = response
    // Object.assign(form, response.data);
    open.value = true;
    title.value = "修改套餐";
  } catch (error) {
    console.error('Error fetching combo:', error);
  }
};

const submitForm = async () => {
  // 校验表单
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return

  if (form.value.id != null) {
    updateStoreCombo(form.value).then(() => {
      message.success("修改成功");
      open.value = false;
      getList();
    });
  } else {
    createStoreCombo(form.value).then(() => {
      message.success("新增成功");
      cancel()
      getList();
    });

  }
};

const handleDelete = async (row) => {
  const id = row.id;
  try {
    await message.confirm(`是否确认删除套餐编号为"${id}"的数据项?`);
    await deleteStoreCombo(id);
    getList();
    message.success("删除成功");
  } catch (error) {
    console.error('Error deleting combo:', error);
  }
};

const handleExport = async () => {
  let params = {...queryParams};
  params.pageNo = undefined;
  params.pageSize = undefined;
  try {
    await message.confirm('是否确认导出所有套餐数据项?');
    exportLoading.value = true;
    const response = await exportStoreComboExcel(params);
    download.excel(response, '套餐.xls');
    exportLoading.value = false;
  } catch (error) {
    console.error('Error exporting combo:', error);
  }
};

const getShopList = async () => {

  try {
    const data = await ShopApi.getShopList()
    let temp = [{id: 0, name: '全部'}]
    shopList.value = [...temp, ...data]

  } finally {

  }
}
function findNameById(id) {
  const foundItem = shopList.value.find(item => item.id === id);
  return foundItem? foundItem.name : '未找到';
}
</script>

<style scoped lang="scss">

</style>
