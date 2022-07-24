const {createProxyMiddleware:proxy} = require('http-proxy-middleware')

module.exports = function (app){
    app.use(
        proxy('/api1',{
            target:'http://localhost:5000',
            changeOrigin:true,   // 控制服务器收到的响应头中的Host字段的值
            pathRewrite:{'^/api1':''}
        }),
        // proxy('/api2',{
        //     target:'http://localhost:5001',
        //     changeOrigin:true,
        //     pathRewrite:{'^/api2':''}
        // })
    )
}