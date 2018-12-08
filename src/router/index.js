import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

import Layout from '../views/layout/Layout'

Vue.use(Router)



export const constantRouterMap = [
{ path: '/login', component: _import('login/index'), hidden: true },
// { path: '/404', component: _import('404'), hidden: true },
{
  path: '/',
  component: Layout,
  redirect: 'dashboard',
  name: '根目录',
  hidden: true,
  children: [{ path: 'dashboard', component: _import('dashboard/index') }]
},
{
  path: '/menu/menu',
  component: Layout,
  redirect: 'dashboard',
  name: '功能列表',
  hidden: true,
  children: [{ path: 'dashboard', component: _import('dashboard/index') }]
},
// {
//   path: '/update/update',
//   component: Layout,
//   redirect: 'dashboard',
//   name: '更新功能',
//   hidden: true,
//   children: [{ path: 'dashboard', component: _import('dashboard/index') }]
// },
// {
//   path: '/batchquery/batchquery',
//   component: Layout,
//   redirect: 'dashboard',
//   name: '批量查询功能',
//   hidden: true,
//   children: [{ path: 'dashboard', component: _import('dashboard/index') }]
// },
// {
//   path: '/batchupdate/batchupdate',
//   component: Layout,
//   redirect: 'dashboard',
//   name: '批量更改功能',
//   hidden: true,
//   children: [{ path: 'dashboard', component: _import('dashboard/index') }]
// }
// { path: '*', redirect: '/404', hidden: true},
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),

  routes: constantRouterMap
})


// export const asyncRouterMap = [
  
  
//   {
//     path:'/menu',
//     component:Layout,
//     redirect:'menu',
//     name:'查询功能',
//     children:[
//       {path:'queryMerchantByOrganization',component:_import('query/queryMerchantByOrganization'),name:'网销数据获取'},
//       {path:'listLklAndBankMerchant',component:_import('query/listLklAndBankMerchant'),name:'银行和拉卡拉商户号查询'},
//       {path:'getLklMerchantName',component:_import('query/getLklMerchantName'),name:'查询拉卡拉商户协议'},
//       {path:'listStoreKeepers',component:_import('query/listStoreKeepers'),name:'查询商户或门店组织'},
//       {path:'listRiskChannel',component:_import('query/listRiskChannel'),name:'风险渠道商户核查'},
//       {path:'alipaynobymerchantsn',component:_import('query/alipaynobymerchantsn'),name:'根据商户号查支付通道参数'},
//       {path:'getAllUsername',component:_import('query/getAllUsername'),name:'用户列表'},
//       {path:'getMayaAndPcTransaction',component:_import('query/getMayaAndPcTransaction'),name:'查询商户终端交易'},
//       {path:'queryLakalaContract',component:_import('query/queryLakalaContract'),name:'查询拉卡拉进件状态'},
//       {path:'getAllAgent',component:_import('query/getAllAgent'),name:'Agent列表'}
      
//     ] 
//   },
//   {
//     path:'/update',
//     component:Layout,
//     redirect:'update',
//     name:'修改功能',
//     children:[
//       {path:'relevanceUserAndMenu',component:_import('update/relevanceUserAndMenu'),name:'用户权限变更'},
//       {path:'listRefund',component:_import('update/listRefund'),name:'退款入口'},
//       {path:'updateAgentByChannel',component:_import('update/updateAgentByChannel'),name:'商户支付通道切换'},
//       {path:'createActivityWhiteList',component:_import('update/createActivityWhiteList'),name:'添加红包白名单'},
//       {path:'contractMerchant',component:_import('update/contractMerchant'),name:'商户进件报备'},
//       {path:'addBlacklist',component:_import('update/addBlacklist'),name:'广告黑名单添加'},
//       {path:'batchUpdateAgent',component:_import('update/batchUpdateAgent'),name:'批量切换商户交易通道'},
//       {path:'updateWeixinMiniConfig',component:_import('update/updateWeixinMiniConfig'),name:'微信小程序交易配置'},
//       {path:'deleteUsername',component:_import('update/deleteUsername'),name:'注销商户手机号'},
//       {path:'removeCachedParams',component:_import('update/removeCachedParams'),name:'清理商户缓存'},
//       {path:'listUpdateMerchantSingleMaxOfTran',component:_import('update/listUpdateMerchantSingleMaxOfTran'),name:'批量修改商户交易限额'},
//       {path:'fixOrder',component:_import('update/fixOrder'),name:'订单勾兑'},
//       {path:'voicePackManager',component:_import('update/voicePackManager'),name:'语音包管理'},
//       {path:'applyStatements',component:_import('update/applyStatements'),name:'商户对账单任务配置'},
//       {path:'tradeParamsManager',component:_import('update/tradeParamsManager'),name:'报备管理平台'},
//       {path:'alipayAuthentication',component:_import('update/alipayAuthentication'),name:'支付宝授权管理'},
//     ]
//   },
//   {
//     path:'/batchquery',
//     component:Layout,
//     redirect:'batchquery',
//     name:'批量查询功能',
//     children:[
//       {path:'wftReport',component:_import('batchquery/wftReport'),name:'手动对账入口'}  
//     ]
//   },
//   {
//     path:'/batchupdate',
//     component:Layout,
//     redirect:'batchupdate',
//     name:'批量修改功能',
//     children:[
//       {path:'duplicateClientSnOfOrderByExcel',component:_import('batchupdate/duplicateClientSnOfOrderByExcel'),name:'配置商户订单允许重复'},
//       {path:'appGatedRuleByExcel',component:_import('batchupdate/appGatedRuleByExcel'),name:'添加商户注销账号白名单'},
//       {path:'insertRiskBlackByExcel',component:_import('batchupdate/insertRiskBlackByExcel'),name:'风控黑名单添加'},
//       {path:'sendRiskExcel',component:_import('batchupdate/sendRiskExcel'),name:'邮件发送入口'},
//       {path:'sendFileToOss',component:_import('batchupdate/sendFileToOss'),name:'上传文件至oss'},
//     ]
    
//   }
// ]
