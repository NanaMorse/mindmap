/**
 * @fileOverview client端配置信息 / settings for client file
 * */

// 获取环境变量信息 / get environment variable
const { is_dev, is_prod } = process.env;

export default {
  /**
   * @description socket服务器地址 / socket server location
   * */
  get socketServer() {
    // 需要变动的时候配置这里
    const devServer = 'ws://localhost:3000';
    const prodServer = 'ws://localhost:3000';

    if (is_dev) return devServer;
    if (is_prod) return prodServer;
  },
}