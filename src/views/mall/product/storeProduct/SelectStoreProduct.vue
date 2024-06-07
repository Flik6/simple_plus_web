<template>
  <Dialog :title="dialogTitle"  :append-to-body="true" v-model="dialogVisible" width="70%">
    <div class="sync-dialog__div">
      <el-row :gutter="24">
        <el-col :span="6">
          <CateTree @node-click="handleDeptNodeClick"/>
        </el-col>
        <el-col :span="18">
          <el-row :gutter="24">
            <el-col style="margin: 10px 0;" :span="6" v-for="item in list" :key="item.id">
              <el-badge :hidden="!item.selected" style="width: 100%;height: 100%;" value="Yes">
                <el-card style="max-width: 480px;" @click="handleSelected(item)">
                  <template #header>{{ item.storeName }}</template>
                  <img
                    :src="item.image"
                    style="width: 100%;height: 80px;"
                  />
                </el-card>
              </el-badge>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col>
              <!-- 分页 -->
              <Pagination
                :total="total"
                v-model:page="queryParams.pageNo"
                v-model:limit="queryParams.pageSize"
                @pagination="getList"
              />
            </el-col>
          </el-row>
        </el-col>

      </el-row>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary"  @click="handleSubmit">确定</el-button>
      </div>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as StoreProductApi from '@/api/mall/product/product'
import CateTree from "@/views/mall/product/storeProduct/CateTree.vue";

const dialogTitle = ref('')
const dialogVisible = ref(false)
const loading = ref(false)
const list = ref([]) // 分类列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  storeName: null,
  isPostage: null,
  isShow: 1,
  stock: 1,
  cateId: null,
  shopName: null
})

const selectList = ref<{ id: any; storeName: any; price: any;image: any }[]>([])

const handleSelected = (data)=>{
  data.selected = data.selected ? data.selected = !data.selected : true;
  selectList.value.push({
    id: data.id,
    storeName: data.storeName,
    price: data.price,
    image:data.image,
  })
}
const openDialog = (title: string,optional: any) => {
  dialogTitle.value = title
  dialogVisible.value = true
  Object.assign(queryParams, optional);
}

defineExpose({
  openDialog
})

const handleSubmit = () => {
  emits('selected', selectList.value)
  list.value.map((item)=>{
    item.selected = false
  })
  selectList.value = []
  dialogVisible.value = false

}
const emits = defineEmits(['selected'])
/** 分类点击 */
const handleDeptNodeClick = async (row) => {
  queryParams.cateId = row.id
  await getList()
}

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await StoreProductApi.getStoreProductPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}
/** 初始化 **/
onMounted(() => {
  getList()
})
</script>


<style scoped lang="scss">
.sync-dialog__div{
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
