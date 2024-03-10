import request from '@/config/axios'

export interface StoreRevenueVO {
  id: number
  shopId: number
  shopName: string
  type: byte
  amount: number
  uid: number
}

// 查询店铺收支明细列表
export const getStoreRevenuePage = async (params: StoreRevenuePageReqVO) => {
  return await request.get({ url: `/mall/store-revenue/page`, params })
}

// 查询店铺收支明细详情
export const getStoreRevenue = async (id: number) => {
  return await request.get({ url: `/mall/store-revenue/get?id=` + id })
}

// 新增店铺收支明细
export const createStoreRevenue = async (data: StoreRevenueVO) => {
  return await request.post({ url: `/mall/store-revenue/create`, data })
}

// 修改店铺收支明细
export const updateStoreRevenue = async (data: StoreRevenueVO) => {
  return await request.put({ url: `/mall/store-revenue/update`, data })
}

// 删除店铺收支明细
export const deleteStoreRevenue = async (id: number) => {
  return await request.delete({ url: `/mall/store-revenue/delete?id=` + id })
}

// 导出店铺收支明细 Excel
export const exportStoreRevenue = async (params) => {
  return await request.download({ url: `/mall/store-revenue/export-excel`, params })
}
