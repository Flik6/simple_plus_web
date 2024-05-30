<template>
  <div>
    <div class="divBox">
      <el-row :gutter="24" class="baseInfo">
        <el-col :xs="12" :sm="12" :lg="6" class="ivu-mb">
          <el-card :bordered="false" dis-hover :padding="12">
            <template #header>
              <div  class="acea-row row-between-wrapper">
                <span>会员总数</span>
                <el-tag type="success">全平台</el-tag>
              </div>
            </template>
            <div class="content" v-if="count">
              <span class="content-number spBlock mb15"><count-to :start-val="0" :end-val="count.userCount" :duration="2600" class="card-panel-num" /></span>
              <el-divider />
              <div class="acea-row row-between-wrapper">
                <span class="content-time">今日订单数</span>
                <span>{{ count.todayCount }} 单</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="ivu-mb">
          <el-card :bordered="false" dis-hover :padding="12">
            <template #header>
              <div class="acea-row row-between-wrapper">
                <span>订单总数</span>
                <el-tag type="success">全平台</el-tag>
              </div>
            </template>
            <div class="content" v-if="count">
              <span class="content-number spBlock mb15"><count-to :start-val="0" :end-val="count.orderCount" :duration="3000" class="card-panel-num" /></span>
              <el-divider />
              <div class="acea-row row-between-wrapper">
                <span class="content-time">昨日订单数</span>
                <span>{{ count.proCount }} 单</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="ivu-mb">
          <el-card :bordered="false" dis-hover :padding="12">
            <template #header>
              <div  class="acea-row row-between-wrapper">
                <span>总金额</span>
                <el-tag type="success">全平台</el-tag>
              </div>
            </template>
            <div class="content" v-if="count">
              <span class="content-number spBlock mb15"><count-to :start-val="0" :end-val="count.priceCount" :duration="3200" class="card-panel-num" /></span>
              <el-divider />
              <div class="acea-row row-between-wrapper">
                <span class="content-time">近七天订单数</span>
                <span>{{ count.lastWeekCount }} 单</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="ivu-mb">
          <el-card :bordered="false" dis-hover :padding="12">
            <template #header>
              <div class="acea-row row-between-wrapper">
                <span>商品总数</span>
                <el-tag type="success">全平台</el-tag>
              </div>
            </template>
            <div class="content" v-if="count">
              <span class="content-number spBlock mb15"><count-to :start-val="0" :end-val="count.goodsCount" :duration="3600" class="card-panel-num" /></span>
              <el-divider />
              <div class="acea-row row-between-wrapper">
                <span class="content-time">本月订单数</span>
                <span>{{ count.monthCount }} 单</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :class="prefixCls" :gutter="20" justify="space-between">
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <el-card class="mb-20px" shadow="hover">
            <el-skeleton :loading="loading" :rows="2" animated>
              <template #default>
                <div :class="`${prefixCls}__item flex justify-between`">
                  <div>
                    <div
                      :class="`${prefixCls}__item--icon ${prefixCls}__item--peoples p-16px inline-block rounded-6px`"
                    >
                      <Icon :size="40" icon="svg-icon:money" />
                    </div>
                  </div>
                  <div class="flex flex-col justify-between">
                    <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`"
                    >店铺今日销售额
                    </div>
                    <CountTo
                      :duration="2600"
                      :decimals="2"
                      :end-val="count.todayPrice"
                      :start-val="0"
                      class="text-20px font-700 text-right"
                    />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </el-col>

        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <el-card class="mb-20px" shadow="hover">
            <el-skeleton :loading="loading" :rows="2" animated>
              <template #default>
                <div :class="`${prefixCls}__item flex justify-between`">
                  <div>
                    <div
                      :class="`${prefixCls}__item--icon ${prefixCls}__item--message p-16px inline-block rounded-6px`"
                    >
                      <Icon :size="40" icon="svg-icon:money" />
                    </div>
                  </div>
                  <div class="flex flex-col justify-between">
                    <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`"
                    >昨日销售额
                    </div>
                    <CountTo
                      :duration="2600"
                      :decimals="2"
                      :end-val="count.proPrice"
                      :start-val="0"
                      class="text-20px font-700 text-right"
                    />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </el-col>

        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <el-card class="mb-20px" shadow="hover">
            <el-skeleton :loading="loading" :rows="2" animated>
              <template #default>
                <div :class="`${prefixCls}__item flex justify-between`">
                  <div>
                    <div
                      :class="`${prefixCls}__item--icon ${prefixCls}__item--money p-16px inline-block rounded-6px`"
                    >
                      <Icon :size="40" icon="svg-icon:money" />
                    </div>
                  </div>
                  <div class="flex flex-col justify-between">
                    <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`"
                    >周销售额
                    </div>
                    <CountTo
                      :duration="2600"
                      :decimals="2"
                      :end-val="count.lastWeekPrice"
                      :start-val="0"
                      class="text-20px font-700 text-right"
                    />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </el-col>

        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <el-card class="mb-20px" shadow="hover">
            <el-skeleton :loading="loading" :rows="2" animated>
              <template #default>
                <div :class="`${prefixCls}__item flex justify-between`">
                  <div>
                    <div
                      :class="`${prefixCls}__item--icon ${prefixCls}__item--shopping p-16px inline-block rounded-6px`"
                    >
                      <Icon :size="40" icon="svg-icon:money" />
                    </div>
                  </div>
                  <div class="flex flex-col justify-between">
                    <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`"
                    >月度销售额
                    </div>
                    <CountTo
                      :duration="2600"
                      :decimals="2"
                      :end-val="count.monthPrice"
                      :start-val="0"
                      class="text-20px font-700 text-right"
                    />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="space-between">
        <el-col xs="24" :sm="24" :md="24" :lg="24"  :xl="24" >
          <el-card class="mb-20px" shadow="hover">
            <el-skeleton :loading="loading" animated>
              <Echart :height="300" :options="dailySalesData" />
            </el-skeleton>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <PanelGroupT />
    <div class="divBox">
      <el-card shadow="never" class="mt-10px">
        <template #header>
          <div class="flex justify-between h-3">
            <span>{{ t('workplace.notice') }}</span>
            <el-link type="primary" :underline="false">{{ t('action.more') }}</el-link>
          </div>
        </template>
        <el-skeleton :loading="loading" animated>
          <div v-for="(item, index) in notice" :key="`dynamics-${index}`">
            <div class="flex items-center">
              <img :src="avatar" alt="" class="w-35px h-35px rounded-[50%] mr-20px" />
              <div>
                <div class="text-14px">
                    {{ item.type == 1 ? '通知' : '公告' }} : {{ item.title }}
                </div>
                <div class="mt-15px text-12px text-gray-400">
                  {{ formatTime(item.createTime, 'yyyy-MM-dd') }}
                </div>
              </div>
            </div>
            <el-divider />
          </div>
        </el-skeleton>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as StoreOrderApi from '@/api/mall/order/storeOrder'
import * as NoticeApi from '@/api/system/notice'
import PanelGroupT from './PanelGroupT.vue'
import { formatTime } from '@/utils'
import { useUserStore } from '@/store/modules/user'
import avatarImg from '@/assets/imgs/avatar.gif'
import {useDesign} from "@/hooks/web/useDesign";

import { dailySalesOption} from "@/views/Home/echarts-data";
import {cloneDeep, set} from "lodash-es";
const userStore = useUserStore()
const avatar = userStore.getUser.avatar ? userStore.getUser.avatar : avatarImg
const { t } = useI18n()
const count = ref({
        todayPrice: 0,
        todayCount: 0,
        proPrice: 0,
        proCount: 0,
        monthPrice: 0,
        monthCount: 0,
        lastWeekCount: 0,
        lastWeekPrice: 0,
        userCount: 0,
        orderCount: 0,
        priceCount: 0,
        goodsCount: 0
})
const loading = ref(true)
const notice = ref([])
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('panel')

let dailySalesData = ref({})
/** 查询列表 */
const getData = async () => {
  try {
    const data = await StoreOrderApi.getShopCount()

    count.value = data

    dailySalesData.value = getDailySalesPriceBarChartData(data.dailySales)

    // 周销售额统计
    // set(
    //   dailySalesPriceBarChartData,
    //   'title.text',
    //   '周销售额统计'
    // )
    // set(
    //   dailySalesPriceBarChartData,
    //   'xAxis.data',
    //   chartOption.map(item=>item.pay_time)
    // )
    // set(dailySalesPriceBarChartData, 'series', [
    //   {
    //     name: '当日收入',
    //     data: chartOption.map(item=>item.dailySalesPrice),
    //     type: 'bar'
    //   }
    // ])
    //
    // // 周订单数统计
    // set(
    //   dailySalesCountBarChartData,
    //   'title.text',
    //   '周订单数统计'
    // )
    // set(
    //   dailySalesCountBarChartData,
    //   'xAxis.data',
    //   chartOption.map(item=>item.pay_time)
    // )
    // set(dailySalesCountBarChartData, 'series', [
    //   {
    //     name: '当日订单',
    //     data: chartOption.map(item=>item.dailyOrderCount),
    //     type: 'bar'
    //   }
    // ])
  } finally {
  }
}

const getDailySalesPriceBarChartData= (data)=>{
  let series = [
    {
      type: 'bar',
      name: "日销售金额",
      data: data.map(item=>item.dailySalesPrice)
    },
    {
      type: 'bar',
      name: "日订单数",
      data: data.map(item=>item.dailyOrderCount)
    }
  ]
  let result = cloneDeep(dailySalesOption)
  set(result,'title.text','店铺周销售')
  set(result,'xAxis.data',data.map(item=>item.pay_time))
  set(result,'legend.data',series.map(item=>item.name))
  set(result,'series',series)
  return result
}
/** 查询公告列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await NoticeApi.getNoticePage({})
    notice.value = data.list
  } finally {
  }
}


/** 初始化 **/
onMounted(() => {
  getData()
  getList()
  loading.value = false
})


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$prefix-cls: #{$namespace}-panel;

.#{$prefix-cls} {
  &__item {
    &--peoples {
      color: #40c9c6;
    }

    &--message {
      color: #36a3f7;
    }

    &--money {
      color: #f4516c;
    }

    &--shopping {
      color: #34bfa3;
    }

    &:hover {
      :deep(.#{$namespace}-icon) {
        color: #fff !important;
      }

      .#{$prefix-cls}__item--icon {
        transition: all 0.38s ease-out;
      }

      .#{$prefix-cls}__item--peoples {
        background: #40c9c6;
      }

      .#{$prefix-cls}__item--message {
        background: #36a3f7;
      }

      .#{$prefix-cls}__item--money {
        background: #f4516c;
      }

      .#{$prefix-cls}__item--shopping {
        background: #34bfa3;
      }
    }
  }
}
.acea-row {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -o-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    /* 辅助类 */
}

/* 上下两边居中对齐 */
.acea-row.row-between-wrapper {
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.baseInfo {
  ::v-deep .el-card__header {
    padding: 15px 20px !important;
  }
}

.ivu-mb {
  margin-bottom: 10px;
}
.up,
.el-icon-caret-top {
  color: #f5222d;
  font-size: 12px;
  opacity: 1 !important;
}

.down,
.el-icon-caret-bottom {
  color: #39c15b;
  font-size: 12px;
  /*opacity: 100% !important;*/
}

.content {
  &-number {
    font-size: 30px;
  }
  &-time {
    font-size: 14px;
    /*color: #8C8C8C;*/
  }
}
.spBlock {
  display: block;
}
</style>
