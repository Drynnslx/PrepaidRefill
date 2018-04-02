// OpenId：JH367b3463773fc80af931fb54b7cf84f6

var express = require('express')
var request = require('request')

var crypto=require('crypto');  

var app = express()

var GorderId=''


var config = {
  telcheck: 'http://op.juhe.cn/ofpay/mobile/telcheck',
  onlineorder:'http://op.juhe.cn/ofpay/mobile/onlineorder',
  key: '4a2df970266fb8492c0e888824863b63',
  openid:'JH367b3463773fc80af931fb54b7cf84f6',
  inquiryorder:'http://op.juhe.cn/ofpay/mobile/ordersta'
}
// 允许跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",'Bmy')
  if(req.method=="OPTIONS") res.send(200); 
  else  next();
});

// 检查是否能充值
app.get('/telcheck', function (req, res) {
  console.log(Url(req.query))
  request(Url(req.query), (error, response, body) => {
    console.log(body)
    if(JSON.parse(body).error_code == 0){
      res.json({
        status: '200',
        result: JSON.parse(body)
      })
    }else{
      res.json({
        status: '404',
        result: JSON.parse(body)
      })
    }
      
  })
})

// 手机充值
app.get('/onlineorder', function (req, res) {

// 测试假数据
// res.json({
//   status:'200',
//   result:{
//     reason: "订单提交成功，等待充值",
//     result: {
//         cardid: "10002", /*充值的卡类ID*/
//         cardnum: "1", /*数量*/
//         ordercash: 1.06, /*进货价格*/
//         cardname: "安徽联通话费1元", /*充值名称*/
//         sporder_id: "J18033014214960920757717", /*聚合订单号*/
//         uorderid:"2018330142457339727",/*商户自定的订单号*/    
//         game_userid: "15555192560", /*充值的手机号码*/
//        game_state: "0" /*充值状态:0充值中 1成功 9撤销，刚提交都返回0*/
//     },
//     error_code: 0
//   }
// })


  request(Url(req.query), (error, response, body) => {
    console.log(body)
    if(JSON.parse(body).error_code == 0){
      res.json({
        status: '200',
        result: JSON.parse(body)
      })
    }else{
      res.json({
        status: '404',
        result: JSON.parse(body)
      })
    }    
  })
})

// 订单查询
app.get('/inquiryorder', function (req, res) {
 Url(req.query)
  // request(Url(req.query), (error, response, body) => {
  //   console.log(body)
  //   if(JSON.parse(body).error_code == 0){
  //     res.json({
  //       status: '200',
  //       result: JSON.parse(body)
  //     })
  //   }else{
  //     res.json({
  //       status: '404',
  //       result: JSON.parse(body)
  //     })
  //   }
      
  // })
})

function Url(par){
  switch(par.type){
    case '1':
    return `${config.telcheck}?cardnum=${par.cardnum}&phoneno=${par.phoneno}&key=${config.key}`
    // console.log(`${config.telcheck}?cardnum=${par.cardnum}&phoneno=${par.phoneno}&key=${config.key}`)
    break;
    case '2':
    return `${config.onlineorder}?key=${config.key}&phoneno=${par.phoneno}&cardnum=${par.cardnum}&orderid=${randoms()}&sign=${md5s(par.phoneno,par.cardnum)}`
      // console.log(`${config.onlineorder}?key=${config.key}&phoneno=${par.phoneno}&cardnum=${par.cardnum}&orderid=${randoms()}&sign=${md5s(par.phoneno,par.cardnum)}`)
    break;
    case '3':
     return `${config.inquiryorder}?key=${config.key}&orderid=${par.orderid}`
      // console.log(`${config.inquiryorder}?key=${config.key}&orderid=${par.orderid}`)
    break;
    default:
    break;
  }
  
}
// 生产随机订单号
function randoms(){
  var myDate=new Date();
  var y=myDate.getFullYear(); //获取当前时间
  var m=myDate.getMonth()+1;
  var d=myDate.getDate();
  var h=myDate.getHours();
  var ms=myDate.getMinutes();
  var s=myDate.getSeconds();
  var rd=parseInt(Math.random()*1000000)
  //  console.log(`${y}${m}${d}${h}${ms}${s}${rd}`)
   GorderId = `${y}${m}${d}${h}${ms}${s}${rd}` 
   return GorderId
}

// md5数据加密
function md5s(pho,cdm){
  var signs=config.openid+config.key+pho+cdm+GorderId
  return crypto.createHash("md5").update(signs).digest('hex')
}

var server = app.listen(3000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});