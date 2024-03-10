import request from '@/config/axios'

export interface WithdrawalVO {
  id: number
  uid: number
  shopId: number
  shopName: string
  amount: number
  type: byte
  status: byte
  refuse: string
  month: string
  residueAmount: number
}

// 查询提现管理列表
export const getWithdrawalPage = async (params: WithdrawalPageReqVO) => {
  return await request.get({ url: `/store/withdrawal/page`, params })
}

// 查询提现管理详情
export const getWithdrawal = async (id: number) => {
  return await request.get({ url: `/store/withdrawal/get?id=` + id })
}

// 新增提现管理
export const createWithdrawal = async (data: WithdrawalVO) => {
  return await request.post({ url: `/store/withdrawal/create`, data })
}

// 修改提现管理
export const updateWithdrawal = async (data: WithdrawalVO) => {
  return await request.put({ url: `/store/withdrawal/update`, data })
}

// 删除提现管理
export const deleteWithdrawal = async (id: number) => {
  return await request.delete({ url: `/store/withdrawal/delete?id=` + id })
}

// 导出提现管理 Excel
export const exportWithdrawal = async (params) => {
  return await request.download({ url: `/store/withdrawal/export-excel`, params })
}
