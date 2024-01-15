import request from '@/config/axios'

export interface VipCardVO {
  id: number
  name: string
  styleImg: string
  sort: number
  isDiscount: boolean
  discount: number
  igiveMethod: string
  integral: number
  coupon: string
  mony: number
  period: number
  price: number
  status: boolean
  rule: string
}

// 查询会员卡列表
export const getVipCardPage = async (params: VipCardPageReqVO) => {
  return await request.get({ url: `/card/vip-card/page`, params })
}

// 查询会员卡详情
export const getVipCard = async (id: number) => {
  return await request.get({ url: `/card/vip-card/get?id=` + id })
}

// 新增会员卡
export const createVipCard = async (data: VipCardVO) => {
  return await request.post({ url: `/card/vip-card/create`, data })
}

// 修改会员卡
export const updateVipCard = async (data: VipCardVO) => {
  return await request.put({ url: `/card/vip-card/update`, data })
}

// 删除会员卡
export const deleteVipCard = async (id: number) => {
  return await request.delete({ url: `/card/vip-card/delete?id=` + id })
}

// 导出会员卡 Excel
export const exportVipCard = async (params) => {
  return await request.download({ url: `/card/vip-card/export-excel`, params })
}
