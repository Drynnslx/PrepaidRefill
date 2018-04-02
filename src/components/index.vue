<template>
  <div id="#index">
    
    <mu-dialog :open="dialog" title="提示" @close="dialog=false">
      请输入正确手机号!
      <mu-flat-button slot="actions" primary @click="dialog=false" label="确定"/>
    </mu-dialog>
    <mu-dialog :open="dialogtwo" title="提示" @close="dialogtwo=false">
      账户余额不足!
      <mu-flat-button slot="actions" primary @click="dialogtwo=false" label="确定"/>
    </mu-dialog>

    <div class="phonenumbers">
      <mu-text-field v-model="phoneNumber" hintText="电话号码" type="number" icon="phone" labelFloat/>
      <mu-raised-button @click="CheckTel" label="充值" class="demo-raised-button" secondary/>
    </div>
    <div class="money">
      <mu-flat-button @click="recharge(1)" label="1" class="demo-flat-button" primary/>
      <mu-flat-button @click="recharge(5)" label="5" class="demo-flat-button" primary/>
      <mu-flat-button @click="recharge(10)" label="10" class="demo-flat-button" primary/>
      <mu-flat-button @click="recharge(30)" label="30" class="demo-flat-button" primary/>
      <mu-flat-button @click="recharge(50)" label="50" class="demo-flat-button" primary/>
      <mu-flat-button @click="recharge(100)" label="100" class="demo-flat-button" primary/>
      <mu-flat-button @click="recharge(200)" label="200" class="demo-flat-button" primary/>
      <mu-flat-button @click="recharge(300)" label="300" class="demo-flat-button" primary/>
    </div>
    
    

    

    
    
  </div>
</template>

<script>


export default {
  mounted(){
    // console.log(this.$parent.$parent.$refs.bottompaper._data.bottomNav = 'music')
    // console.log(this.$root.$children[0].$children[2]._data.bottomNav = 'music')
    // console.log(this.$root.$children[0].$refs.bottompaper.bottomNav = 'music')
  },
  data() {
    return{
      phoneNumber:'',
      rmbNumber:'',
      dialog:false,
      dialogtwo:false,
    } 
  },
  methods: {
    // 检测手机号是否允许充值
    // http://op.juhe.cn/ofpay/mobile/telcheck?cardnum=100&phoneno=13429667914&key=您申请的KEY
    CheckTel(){
        this.$http.get(this.$config.BaseUrl,{
          params: {
            type:'1',
            cardnum:this.rmbNumber,
            phoneno:this.phoneNumber,
          }
        })
        .then(success => {
          if(success.data.status == '200'){
            this.OnlineOrder()
          }else{
            this.dialog=true
          }
          // console.log(success);
        })
        .catch(error => {
          console.log(error);
        })
      },
      // 在线充值
      // http://op.juhe.cn/ofpay/mobile/onlineorder?key=KEY&phoneno=18913513535&cardnum=100&orderid=2014111111113&sign=fb1ed32a9540c24b03cc0c06aabbb642
      OnlineOrder(){
        this.$http.get(this.$config.OnlineOrderUrl,{
          params: {
            type:'2',
            cardnum:this.rmbNumber,
            phoneno:this.phoneNumber,
          } 
        })
        .then(success => {
            
          if(success.data.status == '200'){
            //充值成功后的订单信息
            //  console.log(success.data.result); 
            this.$utils.SetLocalStorage('uorderid',success.data.result)
            // 非父子组件数据访问
            this.$root.$children[0].$refs.bottompaper.bottomNav = 'music'
            this.$router.push({ path: '/about'})
          }else{
            // console.log(success.data.result.reason);
            // this.$root.$children[0].$refs.bottompaper.bottomNav = 'music'
            // this.$router.push({ path: '/about'})
            this.dialogtwo=true
            // alert(success.data.result.reason)
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      recharge(rmb){
        this.rmbNumber=rmb
      },
    }  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url("./../assets/css/func.less");
.phonenumbers{
  .Centerbox();
  .Center(7rem);
  width: 95%;
}
.money{
  .Centerbox();
  flex-wrap: wrap;
}
.mu-raised-button{
  margin-left: 0.5rem;
}
.container{
  display: flex;
}
.mu-text-field{
  width: 250px;
}
</style>
