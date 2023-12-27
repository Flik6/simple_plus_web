<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="店铺名称" prop="shopName">
        <el-input
          v-model="queryParams.shopName"
          placeholder="请输入店铺名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="桌号" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>  
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['desk:shop-desk:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('batchCreate')"
          v-hasPermi="['desk:shop-desk:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 批量新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['desk:shop-desk:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button
          type="warning"
          plain
          @click="batchDownload"
          :loading="downLoading"
          v-hasPermi="['desk:shop-desk:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 批量下载点餐码
        </el-button>
        <el-button
          type="danger"
          plain
          @click="handleImport"
          :loading="exportLoading"
          v-hasPermi="['desk:shop-desk:export']"
        >
          <Icon icon="ep:upload" class="mr-5px" /> 导入
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExportTemplate"
          :loading="exportLoading"
          v-hasPermi="['desk:shop-desk:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 下载导入模板
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list">
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="店铺名称" align="center" prop="shopName" />
      <el-table-column label="桌号" align="center" prop="number" />
      <el-table-column label="下单数" align="center" prop="orderCount" />
      <el-table-column label="消费金额" align="center" prop="costAmount" />
      <el-table-column
        label="上次下单时间"
        align="center"
        prop="lastOrderTime"
        width="170"
      >
      <template #default="scope" >
          <span v-if="scope.row.lastOrderTime">{{formatDate(scope.row.lastOrderTime)}}</span>
          <span v-else>无</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center" prop="status" >
        <template #default="scope">
          <span v-if="scope.row.status == 1">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="170"
      />
      <el-table-column label="操作" align="center" width="250" fixed="right">
        <template #default="scope">
          <el-button
            link
            type="success"
            @click="openForm('qrcode', scope.row.id)"
            v-hasPermi="['desk:shop-desk:update']"
          >
            二维码
          </el-button>
          <el-button
            link
            type="primary"
            @click="openForm('order', scope.row.id)"
            v-hasPermi="['desk:shop-desk:update']"
          >
            相关订单
          </el-button>
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['desk:shop-desk:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['desk:shop-desk:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <ShopDeskForm ref="formRef" @success="getList" />

  <!-- 表单弹窗：批量添加 -->
  <ShopDeskForm2 ref="formRef2" @success="getList" />

  <!-- 表单弹窗：二维码 -->
  <ShopDeskForm3 ref="formRef3"  />
  <!-- 用户导入对话框 -->
  <UserImportForm ref="importFormRef" @success="getList" />

  <Order ref="order"  />
</template>

<script setup lang="ts" name="ShopDesk">
import { dateFormatter,formatDate } from '@/utils/formatTime'
import download from '@/utils/download'
import * as ShopDeskApi from '@/api/mall/desk/shopDesk'
import ShopDeskForm from './ShopDeskForm.vue'
import ShopDeskForm2 from './ShopDeskForm2.vue'
import ShopDeskForm3 from './ShopDeskForm3.vue'
import UserImportForm from './UserImportForm.vue'
import Order from './Order.vue'
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  shopId: null,
  shopName: null,
  number: null,
  miniQrcode: null,
  h5Qrcode: null,
  aliQrcode: null,
  note: null,
  orderCount: null,
  costAmount: null,
  lastOrderNo: null,
  lastOrderTime: [],
  lastOrderStatus: null,
  status: null,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中
const downLoading = ref(false)

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ShopDeskApi.getShopDeskPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const formRef2 = ref()
const formRef3 = ref()
const order = ref()
const openForm = (type: string, id?: number) => {
  if(type == 'batchCreate'){
    formRef2.value.open(type, id)
  }else if(type == 'qrcode'){
    formRef3.value.open(type, id)
  }else if(type == 'order'){
    order.value.open(type, id)
  }else{
    formRef.value.open(type, id)
  }
 
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await ShopDeskApi.deleteShopDesk(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await ShopDeskApi.exportShopDesk(queryParams)
    download.excel(data, '门店 - 桌号.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 下载模板 */
const handleExportTemplate = async () => {
  try {
    
    // 发起导出
    exportLoading.value = true
    const data = await ShopDeskApi.exportShopDeskTemplate()
    download.excel(data, '批量导入桌号模板.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 下载 */
const batchDownload = async () => {
  try {
    await message.confirm('小程序二维码只能下载正式的哦')
    // 发起导出
    downLoading.value = true
    const res = await ShopDeskApi.downloadQrcode(0)
    download.zip(res, 'qrcode.zip')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 用户导入 */
const importFormRef = ref()
const handleImport = () => {
  importFormRef.value.open()
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
