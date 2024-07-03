// 新增店铺收支明细
import request from '@/config/axios'

export const revenueStatistics = async (data) => {
  return await request.post({ url: `/mall/revenue-info/statistics`, data })
}
