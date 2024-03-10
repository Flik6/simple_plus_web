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
      <el-form-item label="门店名称" prop="shopName">
        <el-input
          v-model="queryParams.shopName"
          placeholder="请输入门店名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择状态"
          clearable
          class="!w-240px"
        >
          <el-option label="未审核" value="0" />
          <el-option label="待到账" value="1" />
          <el-option label="审核拒绝" value="2" />
          <el-option label="已到账" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['store:withdrawal:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增提现
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list">
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="门店名称" align="center" prop="shopName" />
      <el-table-column label="提现金额" align="center" prop="amount" />
      <el-table-column label="提现银行卡" prop="type" width="200">
        <template #default="scope">
          <div>银行名称：{{ scope.row.userBank.bankName}}</div>
          <div>银行卡号：{{ scope.row.userBank.bankCode}}</div>
          <div>真实姓名：{{ scope.row.userBank.name}}</div>
          <div>手机号码：{{ scope.row.userBank.bankMobile}}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
         <span v-if="scope.row.status == 0">未审核</span>
         <span v-else-if="scope.row.status == 1">待到账</span>
         <span v-else-if="scope.row.status == 2">审核拒绝</span>
         <span v-else>已到账</span>
        </template>
      </el-table-column>
      <el-table-column label="审核拒绝原因" align="center" prop="refuse" />
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
            type="danger"
            @click="openForm('check', scope.row.id)"
            v-hasPermi="['store:withdrawal:check']"
          >
            审核
          </el-button>
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['store:withdrawal:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['store:withdrawal:delete']"
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
  <WithdrawalForm ref="formRef" @success="getList" />
  <checkForm ref="formRef2" @success="getList" />
</template>

<script setup lang="ts" name="StoreWithdrawal">
import { dateFormatter } from '@/utils/formatTime'
import * as WithdrawalApi from '@/api/mall/store/withdrawal'
import WithdrawalForm from './WithdrawalForm.vue'
import checkForm from './checkForm.vue'
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  uid: null,
  shopId: null,
  shopName: null,
  amount: null,
  type: null,
  status: null,
  refuse: null,
  month: null,
  residueAmount: null,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await WithdrawalApi.getWithdrawalPage(queryParams)
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
const openForm = (type: string, id?: number) => {
  if(type == 'check'){
    formRef2.value.open(type, id)
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
    await WithdrawalApi.deleteWithdrawal(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}


/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
