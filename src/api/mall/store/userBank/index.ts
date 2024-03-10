import request from '@/config/axios'

export interface UserBankVO {
  id: number
  userId: number
  shopName: number
  uid: string
  type: boolean
  bankName: string
  name: string
  bankCode: string
  bankMobile: string
  zfbCode: string
  wxCode: string
  zfbImg: string
  wxImg: string
  status: byte
  refuse: string
  bankIcon: string
  bankType: string
}

// 查询提现账户列表
export const getUserBankPage = async (params: UserBankPageReqVO) => {
  return await request.get({ url: `/store/user-bank/page`, params })
}

// 查询提现账户详情
export const getUserBank = async (id: number) => {
  return await request.get({ url: `/store/user-bank/get?id=` + id })
}

// 新增提现账户
export const createUserBank = async (data: UserBankVO) => {
  return await request.post({ url: `/store/user-bank/create`, data })
}

// 修改提现账户
export const updateUserBank = async (data: UserBankVO) => {
  return await request.put({ url: `/store/user-bank/update`, data })
}

// 删除提现账户
export const deleteUserBank = async (id: number) => {
  return await request.delete({ url: `/store/user-bank/delete?id=` + id })
}

// 导出提现账户 Excel
export const exportUserBank = async (params) => {
  return await request.download({ url: `/store/user-bank/export-excel`, params })
}

export const getUserBankList = async (shopId) => {
  return await request.get({ url: `/store/user-bank/list?shopId=`+shopId })
}
