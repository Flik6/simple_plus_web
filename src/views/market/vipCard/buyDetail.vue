<template>
 <el-drawer v-model="drawer" :title="dialogTitle" size="50%">
    <div>
      <el-table  :data="list">
        <el-table-column label="订单号" align="center" prop="extendField" width="190" />
        <el-table-column label="用户id｜昵称" align="center"  width="150" >
          <template #default="scope">
            <span>{{ scope.row.uid }}|{{ scope.row.userRespVO ? scope.row.userRespVO.nickname : '无' }}</span>
          </template>
        </el-table-column>
          <el-table-column label="账单标题" align="center" prop="title" width="150" />
          <el-table-column label="明细数字(元)" align="center" prop="number" width="120" />
          <el-table-column label="状态" align="center" prop="number">
                <template #default="scope">
                  <span v-if="scope.row.status == 1">已支付</span>
                  <span v-else>未支付</span>
                </template>
          </el-table-column>
          <el-table-column
            label="添加时间"
            align="center"
            prop="createTime"
            :formatter="dateFormatter"
            width="170"
          />
        </el-table>
        <!-- 分页 -->
        <Pagination
          :total="total"
          v-model:page="queryParams.pageNo"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
        />
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import * as UserBillApi from '@/api/member/userBill'
import { dateFormatter } from '@/utils/formatTime'

const { t } = useI18n() // 国际化
// const message = useMessage() // 消息弹窗
const dialogTitle = ref('') // 弹窗的标题
const drawer = ref(false)
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  uid: null,
  linkId: null,
  pm: null,
  title: null,
  category: null,
  type: 'vip_card',
  number: null,
  balance: null,
  mark: null,
  createTime: [],
  status: null
})
/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  drawer.value = true
  dialogTitle.value = t('action.' + type)
  queryParams.linkId = id
  getList()
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗


/** 查询列表 */
const getList = async () => {
  try {
    const data = await UserBillApi.getUserBillPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
</style>