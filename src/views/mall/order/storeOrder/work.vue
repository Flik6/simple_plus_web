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
    <el-form-item label="选择门店" prop="orderId">
      <el-select
          v-model="queryParams.shopId"
        >
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>  
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-switch v-model="isNotice" active-text="订单提醒开启中" inactive-text="订单提醒关闭中" />
      </el-form-item> 
    </el-form>

  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
      <audio id="buttonAudio"  src="/voice_new_order.mp3" v-show="false" controls></audio>
      <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="最近订单" name="first">
            <el-row :gutter="24">
              <el-col :span="6" v-for="(order,k) in list" :key="k">
                <div >
                  <el-card class="box-card" :body-style="{ background:'#0a5ba6' }">
                    <template #header>
                      <div class="card-header" style="text-align:center">
                        订单号:{{ order.orderId }}
                      </div>
                    </template>
                    <template #default>
                      <div style="color:#ffffff;text-align:center;">
                        <div v-if="order.orderType == 'takeout'">
                          <div style="font-size:20px;font-weight: bolder;">外卖</div>
                          <div style="margin-top:5px">联系电话:{{ order.userPhone }}</div>
                        </div>
                        <div v-else-if="order.orderType == 'takein'">
                          <div style="font-size:20px;font-weight: bolder;">自取</div>
                          <div style="margin-top:5px">取餐号:{{ order.numberId }}</div>
                        </div>
                        <div v-else>
                          <div style="font-size:20px;font-weight: bolder;">堂食</div>
                          <div style="margin-top:5px">桌号:{{ order.deskNumber }},人数:{{ order.deskPeople }}</div>
                        </div>
                        <div style="font-size:20px;font-weight: bolder;">
                          <span v-if="order.storeOrderCartInfoDOList.length > 1">
                            多份菜品，请查看详情
                          </span>
                          <span v-else>{{ order.storeOrderCartInfoDOList[0].title }}×{{ order.storeOrderCartInfoDOList[0].number }}
                            {{ order.storeOrderCartInfoDOList[0].spec }}
                          </span>
                        </div>
                        
                        <div style="margin-top:30px;">  
                          <el-button
                            type="primary"
                            @click="openForm('orderDetail', order.id)"
                            v-hasPermi="['order:store-order:update']"
                          >详情</el-button>
                          <el-button
                            type="primary"
                            @click="openForm('orderSend', order.id)"
                            v-hasPermi="['order:store-order:update']"
                          >出单</el-button>
                        </div>
                      </div>
                    </template>
                    <template #footer>
                      <div style="text-align:center">下单时间:{{ formatDate(order.createTime) }}</div>
                  </template>
                  </el-card>
              </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="桌台数据" name="second"> 
            <el-form-item label="桌面状态：" >
              <el-radio-group v-model="queryParams.deskStatus" size="large"  fill="#FF1493" @change="queryStatus">
                <el-radio-button label="empty">空闲中</el-radio-button>
                <el-radio-button label="ing">就餐中</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-row :gutter="24">
              <el-col :span="4" v-for="(desk,k) in deskList" :key="k">
                <div >
                  <el-card class="box-card" :body-style="queryParams.deskStatus == 'empty' ? {background:'#8D9095'} : {background:'#F56C6C'}">
                    <template #header>
                      <div class="card-header" style="text-align:center;display:flex;justify-content:space-between;">
                        <span style="font-size:14px">{{ desk.shopName}}</span>
                        <span style="cursor:pointer;"> <Icon icon="ep:calendar" :size="20" @click="openForm('order', desk.id)" /></span>
                      </div>
                    </template>
                    <template #default>
                      <div style="color:#ffffff;text-align:center;">
                        <div>
                          <div style="font-size:36px;font-weight: bolder;">{{ desk.number }}</div>
                          <div style="font-size:20px;font-weight: bolder;" v-if="queryParams.deskStatus == 'empty'">空闲中</div>
                          <div style="font-size:20px;font-weight: bolder;" v-else>就餐中</div>
                        </div>
                      </div>
                    </template>
                    <template #footer>
                      <div style="text-align:center">{{ desk.lastOrderTime ? formatPast(desk.lastOrderTime) + '下单' : '从未下单' }}</div>
                  </template>
                  </el-card>
              </div>
              </el-col>
            </el-row>
          </el-tab-pane>
      </el-tabs> 
  </ContentWrap>

  <OrderSend ref="formRef1" @success="getList" />
  <OrderDetail ref="formRef4" />
  <Order ref="order"  />
</template>

<script setup lang="ts" name="StoreOrder">
import * as StoreOrderApi from '@/api/mall/order/storeOrder'
import * as ShopApi from '@/api/mall/store/shop'
import * as ShopDeskApi from '@/api/mall/desk/shopDesk'
import OrderSend from './OrderSend.vue'
import OrderDetail from './OrderDetail.vue'
import Order from '@/views/mall/desk/shopDesk/Order.vue'
import type { TabsPaneContext } from 'element-plus'
import { formatPast,formatDate } from '@/utils/formatTime'

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 50,
  orderStatus: 1,
  deskStatus: "empty",
  type: 'work',
  shopId: undefined
})
const queryFormRef = ref() // 搜索的表单

const activeName = ref('first')
const isNotice = ref(true)
const shopList = ref([])
const deskList = ref([])



const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName, event)
}

const getShopList = async () => {
  try {
    const data = await ShopApi.getShopList()
    shopList.value = data

  } finally {
    
  }
}

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await StoreOrderApi.getStoreOrderPage(queryParams)
    list.value = data.list
    //console.log("aa:",list.value)
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 查询列表 */
const getDeskList = async () => {
  loading.value = true
  try {
    const data = await ShopDeskApi.getShopDeskPage(queryParams)
    deskList.value = data.list
  } finally {
    loading.value = false
  }
}

setInterval(function() {
  orderNotice()
},4000);

setInterval(function() {
  getList()
  getDeskList()
},5000);


const orderNoticeVoice = () => {
  if(isNotice.value){
    ElNotification({
      title: '新订单通知',
      message: '你有个新的订单哦，请注意查看！',
      type: 'success',
      duration: 1000
    })
    let buttonAudio = document.getElementById('buttonAudio')
    buttonAudio.play().catch((err)=>{
      console.log(err)
    });
  }

}

const orderNotice = async() => {
  const data = await StoreOrderApi.orderNoticeUrl()
  if(data > 0){
    orderNoticeVoice()
  }
}

//orderNotice()

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

const formRef1 = ref()
const formRef4 = ref()
const order = ref()
const openForm = (type: string, id?: number) => {
  if (type == 'orderSend') {
    formRef1.value.open(type, id)
  }else if (type == 'orderDetail') {
    formRef4.value.open(type, id)
  }else if(type == 'order'){
    order.value.open(type, id)
  }

  
}

const queryStatus = (value) => {
  queryParams.deskStatus = value
   //queryParams.deskStatus = tab.paneName
  getDeskList()
 
}

/** 初始化 **/
onMounted(() => {
  getList()
  getShopList()
  getDeskList()

})
</script>

<style scoped  >
 img {
        height: 36px;
        display: block;
    }
.tabBox{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center
    }
.tabBox_img{
    width: 36px;
    height: 36px;
  }
.tabBox_img img{
  width: 100%;
  height: 100%;
}
.tabBox_tit{
    width :60%;
    font-size: 12px !important;
    margin: 0 2px 0 10px;
    letter-spacing: 1px;
    padding: 5px 0;
    box-sizing: border-box;
    text-align: left;
  }
  .tabBox_pice{
    width :30%;
    font-size: 12px !important;
    margin: 0 2px 0 10px;
    letter-spacing: 1px;
    padding: 5px 0;
    box-sizing: border-box;
    text-align: left;
  }

</style>