/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */


module.exports = () => {
  const exports = {};

  exports.cluster = {
    listen: {
      port: 80,
      hostname: '47.75.106.53'// 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    }
  };

  return exports;
};
