<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="100px"
    >
      <el-form-item label="会员卡名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入会员卡名称"
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
          v-hasPermi="['card:vip-card:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['card:vip-card:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list">
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="会员卡名称" align="center" prop="name" />
      <el-table-column label="折扣比例" align="center" prop="discount">
        <template #default="scope">
          <span>{{ scope.row.discount }}折</span>
         </template>
      </el-table-column>
      <el-table-column label="有效期" align="center" prop="period">
        <template #default="scope">
          <span v-if="scope.row.period == 0">永久</span>
          <span v-else>{{ scope.row.period }}天</span>
         </template>
      </el-table-column>
      <el-table-column label="购买的价格" align="center" prop="price" />
      <el-table-column label="赠送积分" align="center" prop="integral" />
      <el-table-column label="赠送的金额" align="center" prop="mony" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column
        label="添加时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="170"
      />
      <el-table-column label="操作" align="center" width="190">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['card:vip-card:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['card:vip-card:delete']"
          >
            删除
          </el-button>
          <el-button
              link
              type="primary"
              @click="openForm('buyDetail', scope.row.id)"
            >
              购买记录
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
  <VipCardForm ref="formRef" @success="getList" />
  <buyDetail ref="formRef1" />

</template>

<script setup lang="ts" name="VipCard">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import * as VipCardApi from '@/api/market/vipCard'
import VipCardForm from './VipCardForm.vue'
import buyDetail from './buyDetail.vue'
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  name: null,
  styleImg: null,
  sort: null,
  isDiscount: null,
  discount: null,
  igiveMethod: null,
  integral: null,
  coupon: null,
  mony: null,
  period: null,
  price: null,
  status: null,
  rule: null,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await VipCardApi.getVipCardPage(queryParams)
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
const formRef1 = ref()
const openForm = (type: string, id?: number) => {
  if (type == 'update' || type == 'create') {
    formRef.value.open(type, id)
  }else if (type == 'buyDetail') {
    formRef1.value.open(type, id)
  }
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await VipCardApi.deleteVipCard(id)
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
    const data = await VipCardApi.exportVipCard(queryParams)
    download.excel(data, '会员卡.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
