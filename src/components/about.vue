<template>
  <div id="about">
    <mu-timeline v-if="showInfo">
      <mu-timeline-item>
        <span slot="time">订单状态</span>
        <span slot="des">{{localInfo.reason}}</span>
      </mu-timeline-item>
      <mu-timeline-item>
        <span slot="time">手机号</span>
        <span slot="des">{{localInfo.result.game_userid}}</span>
      </mu-timeline-item>
      <mu-timeline-item>
        <span slot="time">订单项目</span>
        <span slot="des">{{localInfo.result.cardname}}</span>
      </mu-timeline-item>
      <mu-timeline-item>
        <span slot="time">订单编号</span>
        <span slot="des">{{localInfo.result.uorderid}}</span>
      </mu-timeline-item>
      <mu-timeline-item>
        <span slot="time">实际扣费</span>
        <span slot="des">{{localInfo.result.ordercash}}元</span>
      </mu-timeline-item>
      <mu-timeline-item>
        <span slot="time">充值结果</span>
        <span slot="des">{{statusInfo == '0' ? '充值中' : statusInfo == '1' ? '充值成功' : '充值失败'}}</span>
      </mu-timeline-item>
      <mu-timeline-item>
        <span>更多</span>
      </mu-timeline-item>
    </mu-timeline>
    <div class="errorpage" v-else>
      <img src="./../assets/imgs/imgs-4.png" alt="">
      <h2>请先充值下单</h2>
    </div>
  </div>
</template>



<script>
export default {
  mounted(){
    if(this.$utils.GetLocalStorage('uorderid') == null){
      this.showInfo = false
    }else{
      this.localInfo=this.$utils.GetLocalStorage('uorderid')
      this.getInfo()
      this.showInfo = true
    }
  },
  data() {
    return{
      localInfo:{},
      showInfo:false,
      statusInfo:'0'
    }
  },
  methods:{
    getInfo(){
      // console.log( this.$utils.GetLocalStorage('uorderid'))
        this.$http.get(this.$config.InquiryOrder,{
          params: {
            type:'3',
            orderid:this.localInfo.result.uorderid
          }
        })
        .then(success => {
          if(success.data.status == '200'){
            // console.log(success.data.result.result.game_state)
            this.statusInfo=success.data.result.result.game_state
          }else{
            alert('您的手机号不允许充值')
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>


<style scoped>
  img{
    width: 80%;
    padding: 0;
  }
  .errorpage{
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
  }
</style>

