/**
 * @fileOverview 客户端与服务端共用的事件tag名 / the common event tags for both client and server
 * 希望能找到client端与server端共用文件编译的最佳实践
 * */

/**
 * @description 服务端事件Tag / Server side event tags
 * */
export const ServerEventTags = {
  // 获取store数据
  RECEIVE_STORE_DATA: 'RECEIVE_STORE_DATA',
  // 获取ACTION拘束
  RECEIVE_BROADCAST_ACTION: 'RECEIVE_BROADCAST_ACTION'
};

/**
 * @description 客户端事件Tag / Client side event tags
 * */
export const ClientEventTags = {
  // 同步store信息
  SYNC_STORE: 'SYNC_STORE',
  // 同步action信息
  SYNC_ACTION: 'SYNC_ACTION'
};