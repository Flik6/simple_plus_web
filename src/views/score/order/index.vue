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
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="商品id" prop="productId">
        <el-input
          v-model="queryParams.productId"
          placeholder="请输入商品id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入数量"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="单个商品积分" prop="score">
        <el-input
          v-model="queryParams.score"
          placeholder="请输入单个商品积分"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="总消耗积分" prop="totalScore">
        <el-input
          v-model="queryParams.totalScore"
          placeholder="请输入总消耗积分"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="下单ip" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入下单ip"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="快递编号" prop="expressNumber">
        <el-input
          v-model="queryParams.expressNumber"
          placeholder="请输入快递编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="快递公司" prop="expressCompany">
        <el-input
          v-model="queryParams.expressCompany"
          placeholder="请输入快递公司"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="收货名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入收货名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="收货电话" prop="customerPhone">
        <el-input
          v-model="queryParams.customerPhone"
          placeholder="请输入收货电话"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="收货地址" prop="customerAddress">
        <el-input
          v-model="queryParams.customerAddress"
          placeholder="请输入收货地址"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="订单状态:0=取消订单,1=正常啊" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择订单状态:0=取消订单,1=正常啊"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="已支付:0=否" prop="havePaid">
        <el-input
          v-model="queryParams.havePaid"
          placeholder="请输入已支付:0=否"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="已发货:0=否" prop="haveDelivered">
        <el-input
          v-model="queryParams.haveDelivered"
          placeholder="请输入已发货:0=否"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="已收货:0=否" prop="haveReceived">
        <el-input
          v-model="queryParams.haveReceived"
          placeholder="请输入已收货:0=否"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="添加时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button type="primary" @click="openForm('create')" v-hasPermi="['score:order:create']">
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['score:order:export']"
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
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="商品id" align="center" prop="productId" />
      <el-table-column label="数量" align="center" prop="number" />
      <el-table-column label="单个商品积分" align="center" prop="score" />
      <el-table-column label="总消耗积分" align="center" prop="totalScore" />
      <el-table-column label="下单ip" align="center" prop="ip" />
      <el-table-column label="快递编号" align="center" prop="expressNumber" />
      <el-table-column label="快递公司" align="center" prop="expressCompany" />
      <el-table-column label="收货名称" align="center" prop="customerName" />
      <el-table-column label="收货电话" align="center" prop="customerPhone" />
      <el-table-column label="收货地址" align="center" prop="customerAddress" />
      <el-table-column label="订单状态:0=取消订单,1=正常啊" align="center" prop="status" />
      <el-table-column label="已支付:0=否" align="center" prop="havePaid" />
      <el-table-column label="已发货:0=否" align="center" prop="haveDelivered" />
      <el-table-column label="已收货:0=否" align="center" prop="haveReceived" />
      <el-table-column
        label="添加时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['score:order:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['score:order:delete']"
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
  <OrderForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts" name="ScoreOrder">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import * as OrderApi from '@/api/score/order'
import OrderForm from './OrderForm.vue'
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  userId: null,
  productId: null,
  number: null,
  score: null,
  totalScore: null,
  ip: null,
  expressNumber: null,
  expressCompany: null,
  customerName: null,
  customerPhone: null,
  customerAddress: null,
  status: null,
  havePaid: null,
  haveDelivered: null,
  haveReceived: null,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await OrderApi.getOrderPage(queryParams)
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
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await OrderApi.deleteOrder(id)
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
    const data = await OrderApi.exportOrder(queryParams)
    download.excel(data, '积分商城订单.xls')
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
