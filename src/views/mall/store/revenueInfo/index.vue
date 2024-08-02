<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true"
             label-width="68px">
      <el-form-item label="店铺id" prop="shopId" style="width: 200px;">
        <el-select v-model="queryParams.shopId" placeholder="请选择店铺id" clearable size="small">
          <el-option v-for="shop in shopList"
                     :key="shop.id" :label="shop.name" :value="shop.id"/>
        </el-select>
      </el-form-item>

<!--      <el-form-item label="套餐名称" prop="name">-->
<!--        <el-input v-model="queryParams.name" placeholder="请输入套餐名称" clearable-->
<!--                  @keyup.enter="handleQuery"/>-->
<!--      </el-form-item>-->
      <el-form-item label="查询时间" prop="times">
        <el-date-picker
          @change="changeTime"
          v-model="queryParams.times"
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item label="查询类型" prop="type" style="width: 200px;">
        <el-select v-model="queryParams.type" placeholder="请选择查询类型" clearable size="small">
          <el-option v-for="type in queryType"
                     :key="type.id" :label="type.name" :value="type.id"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="result" style="width: 100%">
      <el-table-column
        v-for="header in tableHeaders"
        :key="header.prop"
        :label="header.label"
        :prop="header.prop"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import * as revenueStatisticsApi from '@/api/mall/store/revenueInfo'
// 查询参数
import * as ShopApi from "@/api/mall/store/shop";
const defaultTime = new Date(2000, 1, 1, 12, 0, 0) // '12:00:00'
const queryParams = reactive({
  shopId: 0,
  type: 1,
  ...generateTimeJson()
});


//商店列表
const shopList = ref([])
const queryType = [
  {id:1,name: "支付维度"},
  {id:2,name: "商品维度"},

]
onMounted(() => {
  getShopList();
  getList()
});

const getShopList = async () => {
  try {
    const data = await ShopApi.getShopList()
    shopList.value = data

  } finally {

  }
}
const result = ref([])

const tableHeaders = ref([])
const getTableHeaders = (tempList) => {
  const keysMap = {
    "paymentType": "类型",
    "paymentTypeName": "类型名称",
    "paymentAmount": "支付金额",
    "paymentNum": "支付订单数量",
    "paymentRefundAmount": "退款金额",
    "paymentRefundNum": "退款订单数量",
    "vipRechargeAmount": "vip充值金额",
    "productName": "类型名称",
    "salesNum": "售出数量",
    "totalPrice": "售出总价",
    "payPrice": "收入金额",
    "refundAmount": "退款金额",
  }
  // 提取表头字段
  const headerFields = new Set();
  tempList.forEach(item => {
    Object.keys(item).forEach(key => headerFields.add(key));
  });

  const tableHeaders = Array.from(headerFields).map(field => ({
    label: keysMap.hasOwnProperty(field)?keysMap[field]:field,
    prop: field
  }));

  return tableHeaders
};

const getList = async () => {
  revenueStatisticsApi.revenueStatistics(queryParams).then(res => {
    result.value = res
    tableHeaders.value = getTableHeaders(res)
    console.log(tableHeaders)
  })
}
function formatDate(date) {
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);
  let hours = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);
  let seconds = ('0' + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function generateTimeJson() {
  let endTime = new Date();
  endTime.setHours(23, 59, 59, 999);

  let startTime = new Date();
  startTime.setMonth(startTime.getMonth() - 1);
  startTime.setHours(0, 0, 0, 0);

  let json = {
    startTime: formatDate(startTime),
    endTime: formatDate(endTime)
  };

  return json;
}

function changeTime(times){
  queryParams.startTime = times[0]
  queryParams.endTime = times[1]

}
</script>

<style scoped lang="scss">

</style>
