<template>
  <div v-if="type == 'image'">
    <ul
      v-for="(item, index) in value"
      :key="index"
      class="el-upload-list el-upload-list--picture-card"
    >
      <li
        tabindex="0"
        class="el-upload-list__item is-ready"
        :style="'width: ' + width + 'px;height: ' + height + 'px'"
      >
        <div>
          <img :src="item" alt="" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions">
            <span
              v-if="index != 0"
              class="el-upload-list__item-preview"
              @click="moveMaterial(index, 'up')"
            >
            <Icon icon="ep:back" />
            </span>
            <span class="el-upload-list__item-preview" @click="zoomMaterial(index)">
              <i class="el-icon-view"></i>
              <Icon icon="ep:view" />
            </span>
            <span class="el-upload-list__item-delete" @click="deleteMaterial(index)">
              <Icon icon="ep:delete" />
            </span>
            <span
              v-if="index != value.length - 1"
              class="el-upload-list__item-preview"
              @click="moveMaterial(index, 'down')"
            >
              <Icon icon="ep:right" />
            </span>
          </span>
        </div>
      </li>
    </ul>
    <div
      v-if="num > value.length"
      tabindex="0"
      class="el-upload el-upload--picture-card"
      :style="'width: ' + width + 'px;height: ' + height + 'px;' + 'line-height:' + height + 'px;'"
      @click="toSeleteMaterial">
      <Icon icon="ep:plus" />
    </div>

    <el-dialog title="图片素材库" append-to-body v-model="listDialogVisible" width="70%">
      <el-container>
        <el-aside width="100px">
          <div style="margin-bottom: 10px">
            <el-button class="el-icon-plus" size="small" @click="handleMaterialgroupAdd()">
              添加分组
            </el-button>
          </div>
          <el-tabs
            v-model="materialgroupObjId"
            v-loading="materialgroupLoading"
            tab-position="left"
            @tab-click="tabClick"
          >
            <el-tab-pane v-for="item in materialgroupList" :key="item.id" :name="item.id">
              <template #label>
                <span> {{ item.name }}</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-main>
          <el-card>
            <template #header>
              <div>
                <el-row>
                  <el-col :span="12">
                    <span>{{ materialgroupObj.name }}</span>
                    <span v-if="materialgroupObj.id != '-1'">
                      <el-button
                        size="small"
                        type="text"
                        class="el-icon-edit"
                        style="margin-left: 10px"
                        @click="handleMaterialgroupEdit(materialgroupObj)"
                        >重命名</el-button
                      >
                      <el-button
                        size="small"
                        type="text"
                        class="el-icon-delete"
                        style="margin-left: 10px; color: red"
                        @click="materialgroupDelete(materialgroupObj)"
                        >删除</el-button
                      >
                    </span>
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <el-upload
                      :action="uploadApi"
                      :headers="headers"
                      :file-list="[]"
                      :on-progress="handleProgress"
                      :before-upload="beforeUpload"
                      :on-success="handleSuccess"
                      :data="{ type: 1 }"
                      multiple
                    >
                      <el-button size="small" type="primary">批量上传</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
              </div>
            </template>
            <div v-loading="tableLoading">
              <el-alert
                v-if="tableData.length <= 0"
                title="暂无数据"
                type="info"
                :closable="false"
                center
                show-icon
              />
              <el-checkbox-group v-model="urls" :max="num - value.length">
                <el-row :gutter="5">
                  <el-col v-for="(item, index) in tableData" :key="index" :span="4">
                    <el-card :body-style="{ padding: '5px' }">
                      <el-image
                        style="width: 100%; height: 100px"
                        :src="item.url"
                        fit="contain"
                        :preview-src-list="[item.url]"
                        :z-index="9999"
                      />
                      <div>
                        <el-checkbox class="material-name" :label="item.url"> 选择 </el-checkbox>
                        <el-row>
                          <el-col :span="24" class="col-do">
                            <el-button type="text" size="medium" @click="materialDel(item)"
                              >删除</el-button
                            >
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-checkbox-group>

              <el-pagination
                v-model:current-page="page.currentPage"
                :page-sizes="[12, 24]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
                class="pagination"
                @size-change="sizeChange"
                @current-change="pageChange"
              />
            </div>
          </el-card>
        </el-main>
      </el-container>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="listDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureUrls">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Materials">
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import {
  getList as materialgroupPage,
  addObj as materialgroupAdd,
  delObj as materialgroupDel,
  putObj as materialgroupEdit
} from '@/api/tools/materialgroup'
import { getPage, addObj, delObj } from '@/api/tools/material'
import { getAccessToken } from '@/utils/auth'

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    }
  },
  // 素材类型
  type: {
    type: String
  },
  // 素材限制数量，默认5个
  num: {
    type: Number,
    default() {
      return 5
    }
  },
  // 宽度
  width: {
    type: Number,
    default() {
      return 150
    }
  },
  // 宽度
  height: {
    type: Number,
    default() {
      return 150
    }
  }
})

const headers = ref({
  // Authorization: getToken()
  Authorization: 'Bearer ' + getAccessToken(),
})
//const value = ref(props.value)
const dialogVisible = ref(false)
const url = ref('')
const listDialogVisible = ref(false)
const listDialogVisible2 = ref(false)
const materialgroupList = ref([])
const materialgroupObjId = ref('')
const materialgroupObj = ref({})
const materialgroupLoading = ref(false)
const tableData = ref([])
const resultNumber = ref(0)
const page = ref({
  total: 0, // 总页数
  currentPage: 1, // 当前页数
  pageSize: 12, // 每页显示多少条
  ascs: [], // 升序字段
  descs: 'create_time' // 降序字段
})
const tableLoading = ref(false)
const groupId = ref(null)
const urls = ref([])

const value = computed({
  get() {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue
    }
    return [props.modelValue]
    
  }
})

// const store = useStore()

const uploadApi = import.meta.env.VITE_UPLOAD_URL

function moveMaterial(index, type) {
  if (type == 'up') {
    const tempOption = value.value[index - 1]
    value.value[index - 1] = value.value[index]
    value.value[index] = tempOption
  }
  if (type == 'down') {
    const tempOption = value.value[index + 1]
    value.value[index + 1] = value.value[index]
    value.value[index] = tempOption
  }
}
function zoomMaterial(index) {
  dialogVisible.value = true
  url.value = value.value[index]
}
function deleteMaterial(index) {
  // 修改为新的提示
  ElMessageBox.confirm('是否确认删除？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(function () {
    value.value.splice(index, 1)
    urls.value = []
    emit('update:modelValue', value.value)
  })
}
function toSeleteMaterial() {
  listDialogVisible.value = true
  listDialogVisible2.value = true
  if (tableData.value.length <= 0) {
    getMaterialgroupPage()
  }
}
function getMaterialgroupPage() {
  materialgroupLoading.value = true
  materialgroupPage({
    total: 0, // 总页数
    page: 1, // 当前页数
    size: 100, // 每页显示多少条
    ascs: [], // 升序字段
    sort: 'create_time,desc' // 降序字段
  }).then((response) => {
    materialgroupLoading.value = false
    materialgroupList.value = response
    materialgroupList.value.unshift({
      id: '-1',
      name: '全部分组'
    })

    tabClick({
      index: 0
    })
  })
}
function materialgroupDelete(materialgroupObj) {
  ElMessageBox.confirm('是否确认删除该分组？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(function () {
    materialgroupDel(materialgroupObj.id).then(function () {
      getMaterialgroupPage()
    })
  })
}
function handleMaterialgroupEdit(materialgroupObj) {
  ElMessageBox.prompt('请输入分组名', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: materialgroupObj.name
  })
    .then(({ value }) => {
      materialgroupEdit({
        id: materialgroupObj.id,
        name: value
      }).then(function () {
        materialgroupObj.name = value
        materialgroupList.value[materialgroupObj.index] = materialgroupObj
      })
    })
    .catch(() => {})
}
function handleMaterialgroupAdd() {
  ElMessageBox.prompt('请输入分组名', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      materialgroupAdd({
        name: value
      }).then(function () {
        getMaterialgroupPage()
      })
    })
    .catch(() => {})
}
function tabClick(tab) {
  urls.value = []
  const index = Number(tab.index)
  materialgroupObj.value = materialgroupList.value[index]

  console.log('🚀 ~ file: Materials.vue:351 ~ tabClick ~ materialgroupObj:', materialgroupObj)

  materialgroupObj.value.index = index
  materialgroupObjId.value = materialgroupObj.value.id

  page.value.currentPage = 1
  page.value.total = 0
  if (materialgroupObj.value.id != '-1') {
    groupId.value = materialgroupObj.value.id
  } else {
    groupId.value = null
  }
  getMaterialPage(page.value)
}
function getMaterialPage(initPage) {
  tableLoading.value = true
  getPage(
    Object.assign(
      {
        page: initPage.currentPage - 1,
        size: initPage.pageSize,
        descs: initPage.descs,
        ascs: initPage.ascs,
        sort: 'create_time,desc'
      },
      {
        groupId: groupId.value
      }
    )
  )
    .then((response) => {
      console.log('🚀 ~ file: Materials.vue:382 ~ .then ~ response:', response.list)
      console.log('🚀 ~ file: Materials.vue:382 ~ .then ~ response:', response.total)
      page.value.total = response.total
      page.value.currentPage = initPage.currentPage
      page.value.pageSize = initPage.pageSize
      tableData.value = response.list
      console.log('🚀 ~ file: Materials.vue:387 ~ .then ~ tableData.value:', tableData.value)
      tableLoading.value = false
    })
    .catch((error) => {
      console.log('🚀 ~ file: Materials.vue:391 ~ getMaterialPage ~ error:', error)
      tableLoading.value = false
    })
}
function sizeChange(val) {
  console.log(val)
  page.value.currentPage = 1
  page.value.pageSize = val
  getMaterialPage(this.page)
}
function pageChange(val) {
  console.log(val)
  page.value.currentPage = val
  // this.page.pageSize = val
  getMaterialPage(page.value)
}
function materialDel(item) {
  ElMessageBox.confirm('是否确认删除该素材？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(function () {
    delObj(item.id).finally(function () {
      console.log('getMaterialPage')
      getMaterialPage(page.value)
    })
  })
}
function handleProgress(event) {
  console.log(event)
}
function handleSuccess(response, file, fileList) {
  addObj({
    type: '1',
    groupId: groupId.value != '-1' ? groupId.value : null,
    name: file.name,
    url: response.data
  }).then(() => {
    resultNumber.value++
    //console.log('res:', resultNumber.value)
    //console.log('fileList:',fileList.length)
    if (fileList.length === resultNumber.value) {
      getMaterialPage(page.value)
      //resultNumber.value = 0
    }
  })
}
function beforeUpload(file) {
  const isPic =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/gif' ||
    file.type === 'image/jpg'
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isPic) {
    this.$message.error('上传图片只能是 JPG、JPEG、PNG、GIF 格式!')
    return false
  }
  if (!isLt2M) {
    this.$message.error('上传头像图片大小不能超过 2MB!')
  }
  return isPic && isLt2M
}

const emit = defineEmits(['update:modelValue'])
function sureUrls() {
  urls.value.forEach((item) => {
    value.value[value.value.length] = item
  })
  listDialogVisible.value = false
  if (urls.value.length > 1) {
    emit('update:modelValue', urls.value)
  } else {
    emit('update:modelValue', urls.value[0])
  }
  
  
}
</script>

<style lang="scss" scoped>
.el-icon-circle-close {
  color: red;
}

.material-name {
  padding: 8px 0px;
}

.col-do {
  text-align: center;
}

.button-do {
  padding: unset !important;
  font-size: 12px;
}
</style>
