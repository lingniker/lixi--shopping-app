<template>
  <div class="confirmOrderContainer">
    <!-- <section v-if="!showLoading"> -->
    <section>
      <head-top
        head-title="确认订单"
        goBack="true"
        signin-up="confirmOrder"
      ></head-top>
      <div
        :to="{
          path: '/confirmOrder/chooseAddress',
          query: { id: checkoutData.cart.id, sig: checkoutData.sig },
        }"
        class="address_container"
      >
        <div class="address_empty_left">
          <svg class="location_icon">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#location"
            ></use>
          </svg>
          <div class="add_address" v-if="!choosedAddress">
            请添加一个收货地址
          </div>
          <div v-else class="address_detail_container">
            <header>
              <span>{{ userInfo?.user_name }}</span>
              <span>{{ userInfo?.sex == 2 ?   "女士" : "先生 " }}</span>
              <span>{{ userInfo?.mobile }}</span>
            </header>
            <div class="address_detail">
              <span
                v-if="choosedAddress.tag"
                :style="{ backgroundColor: iconColor(choosedAddress.tag) }"
                >{{ choosedAddress.tag }}</span
              >
              <p>{{ userInfo?.address_name }}</p>
            </div>
          </div>
        </div>
        <svg class="address_empty_right">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#arrow-right"
          ></use>
        </svg>
      </div>
      <section class="delivery_model container_style">
        <p class="deliver_text">送达时间</p>
        <section class="deliver_time">
          <p>尽快送达 | 预计 {{ checkoutData.delivery_reach_time }}</p>
          <p v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</p>
        </section>
      </section>
      <section class="pay_way container_style">
        <header class="header_style">
          <span>支付方式</span>
          <div class="more_type" @click="showPayWayFun">
            <span>在线支付</span>
            <svg class="address_empty_right">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </div>
        </header>
        <section class="hongbo">
          <span>红包</span>
          <span>暂时只在 APP 中支持</span>
        </section>
      </section>
      <section class="food_list">
        <header v-if="checkoutData.cart.restaurant_info && foods">
          <img
            :src="baseImgPath + foods.img_path"
          />
          <span class="shop_name"> {{ foods.shop_name }}</span>
        </header>
        <ul class="food_list_ul" v-if="checkoutData.cart.groups">
          <li
            class="food_item_style"
          >
            <p class="food_name ellipsis">{{ foods.shop_name }}</p>
            <div class="num_price">
              <span>x 1</span>
              <span>¥{{ foods.price }}</span>
            </div>
          </li>
        </ul>
        <div class="food_item_style" v-if="checkoutData.cart.extra">
          <p class="food_name ellipsis">
            发货地址
          </p>
          <div class="num_price">
            <span></span>
            <span> {{ foods.address_name }} </span>
          </div>
        </div>
        <div class="food_item_style">
          <p class="food_name ellipsis">运费</p>
          <div class="num_price">
            <span></span>
            <span>¥ {{ 0 }}</span>
          </div>
        </div>
        <div class="food_item_style total_price">
          <p class="food_name ellipsis">订单 ¥{{ foods.price }}</p>
          <div class="num_price">
            <span>{{ order_status[order.send_status] }} ¥{{ foods.price }}</span>
          </div>
        </div>
      </section>
      <section class="pay_way container_style">
        <div
          :to="{
            path: '/confirmOrder/remark',
            query: { id: checkoutData.cart.id, sig: checkoutData.sig },
          }"
          class="header_style"
        >
          <span>订单备注</span>
          <div class="more_type">
            <span class="ellipsis">{{
              remarkText || inputText ? remarklist : "口味、偏好等"
            }}</span>
            <svg class="address_empty_right">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </div>
        </div>
        <div
          :to="checkoutData.invoice.is_available ? '/confirmOrder/invoice' : ''"
          class="hongbo"
          :class="{ support_is_available: checkoutData.invoice.is_available }"
        >
          <span>发票抬头</span>
          <span>
            {{ checkoutData.invoice.status_text }}
            <svg class="address_empty_right">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </div>
      </section>
      <section class="confrim_order">
        <p>{{ order_status[order.send_status] }} ¥{{ foods.price }}</p>
        <p @click="confrimOrder">{{ status[order.send_status] }}</p>
      </section>
      <transition name="fade">
        <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
      </transition>
      <transition name="slid_up">
        <div class="choose_type_Container" v-if="showPayWay">
          <header>支付方式</header>
          <ul>
            <li
              v-for="item in checkoutData.payments"
              :key="item.id"
              :class="{ choose: payWayId == item.id }"
            >
              <span
                >{{ item.name
                }}<span v-if="!item.is_online_payment">{{
                  item.description
                }}</span></span
              >
              <svg
                class="address_empty_right"
                @click="choosePayWay(item.is_online_payment, item.id)"
              >
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#select"
                ></use>
              </svg>
            </li>
          </ul>
        </div>
      </transition>
    </section>
    <!-- <loading v-if="showLoading"></loading> -->
    <alert-tip
      v-if="showAlert"
      @closeTip="closeTip"
      :alertText="alertText"
    ></alert-tip>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import headTop from "@site/components/header/head";
import alertTip from "@site/components/common/alertTip";
import loading from "@site/components/common/loading";
import {
  checkout,
  getAddress,
  placeOrders,
  getAddressList,
  validateOrders,
  update
} from "@site/api/getData";
import { baseImgPath } from "@site/config";

export default {
  data() {
    var userInfo = {};
    if (window.sessionStorage.getItem('appUserInfo')) {
      userInfo = JSON.parse(window.sessionStorage.getItem('appUserInfo'))
    }
    var foods = {};
    if (window.sessionStorage.getItem('foods')) {
      foods = JSON.parse(window.sessionStorage.getItem('foods'))
    }
    var order = {};
    if (window.sessionStorage.getItem('order')) {
      order = JSON.parse(window.sessionStorage.getItem('order'))
      if (order.id) {
        foods.id = order.shop_id
        foods.shop_name = order.shop_name 
        foods.address_name = order.shop_address_name 
        foods.address_id = order.shop_address_id 
        foods.price = order.shop_price
        foods.price = order.shop_price_total
        foods.img_path = order.shop_img_path
      }
    }
    // console.log('foods', foods)
    return {
      geohash: "", //geohash位置信息
      status:{
        "1": '待付款',
        "2": '待发货',
        "3": '待收货',
        "4": '订单完成' 
      },
      order_status:{
        "1": '待付款',
        "2": '已支付'
      },
      shopId: null, //商店id值
      showLoading: true, //显示加载动画
      checkoutData: {"__v":0,"id":14,"delivery_reach_time":"14:27","sig":"947701","_id":"61a5bcfa24d5d647a804fa08","is_support_ninja":1,"is_support_coupon":false,"deliver_times_v2":[],"deliver_times":[],"payments":[{"description":"（商家仅支持在线支付）","disabled_reason":"","id":1,"name":"在线支付","select_state":1,"_id":"61a5bcfa24d5d647a804fa0a","promotion":[],"is_online_payment":true},{"description":"（商家不支持货到付款）","disabled_reason":"商家仅支持在线支付","id":2,"name":"货到付款","select_state":-1,"_id":"61a5bcfa24d5d647a804fa09","promotion":[],"is_online_payment":false}],"invoice":{"status_text":"不需要开发票","is_available":true},"cart":{"id":14,"deliver_amount":4,"is_deliver_by_fengniao":true,"original_total":24,"phone":"18378743666","restaurant_id":2,"restaurant_info":{"_id":"61a495e824d5d647a804f997","name":"测试商铺","address":"上海市浦东新区德州路198号","id":2,"latitude":31.167419,"longitude":121.497938,"location":[121.497938,31.167419],"phone":"18378743666","category":"快餐便当/简餐","__v":0,"supports":[{"description":"已加入“外卖保”计划，食品安全有保障","icon_color":"999999","icon_name":"保","id":7,"name":"外卖保","_id":"61a495e824d5d647a804f99a"},{"description":"准时必达，超时秒赔","icon_color":"57A9FF","icon_name":"准","id":9,"name":"准时达","_id":"61a495e824d5d647a804f999"},{"description":"该商家支持开发票，请在下单时填写好发票抬头","icon_color":"999999","icon_name":"票","id":4,"name":"开发票","_id":"61a495e824d5d647a804f998"}],"status":0,"recent_order_num":903,"rating_count":492,"rating":4,"promotion_info":"我们的商铺","piecewise_agent_fee":{"tips":"配送费约¥5"},"opening_hours":["05:30/23:30"],"license":{"catering_service_license_image":"17d6ae978303.png","business_license_image":"17d6ae948c92.png"},"is_new":true,"is_premium":true,"image_path":"17d6ae939c71.png","identification":{"registered_number":"","registered_address":"","operation_period":"","licenses_scope":"","licenses_number":"","licenses_date":"","legal_person":"","identificate_date":null,"identificate_agency":"","company_name":""},"float_minimum_order_amount":20,"float_delivery_fee":5,"distance":"","order_lead_time":"","description":"测试使用商铺","delivery_mode":{"color":"57A9FF","id":1,"is_solid":true,"text":"蜂鸟专送"},"activities":[{"icon_name":"减","name":"满减优惠","description":"满30减5，满60减8","icon_color":"f07373","id":1,"_id":"61a495e824d5d647a804f99b"}]},"restaurant_minimum_order_amount":20,"total":24,"service_fee_explanation":0,"restaurant_status":1,"promise_delivery_time":0,"ontime_status":0,"must_pay_online":0,"must_new_user":0,"is_ontime_available":0,"is_online_paid":1,"is_address_too_far":false,"extra":[{"description":"","_id":"61a5bcfa24d5d647a804fa0b","type":0,"quantity":1,"price":0,"name":"餐盒"}],"groups":[[{"id":1,"name":"超级美食","packing_fee":0,"price":20,"quantity":1,"sku_id":1,"stock":1000,"_id":"61a5bcfa24d5d647a804fa0c","specs":[""],"new_specs":[],"extra":[null],"attrs":[]}]]}}, //数据返回值
      shopCart: null, //购物车数据
      baseImgPath, //图片域名
      showPayWay: false, //显示付款方式
      payWayId: 1, //付款方式
      showAlert: false, //弹出框
      alertText: null, //弹出框内容
      "cartList":[],
      "remarkText":'',
      "inputText": '',
      "invoice": '',
      "choosedAddress": {},
      "userInfo": userInfo,
      "foods": foods,
      order: order
    };
  },
  created() {
    //获取上个页面传递过来的geohash值
    this.geohash = this.$route.query.geohash;
    //获取上个页面传递过来的shopid值
    this.shopId = this.$route.query.shopId;
    // this.INIT_BUYCART();
    // this.SAVE_SHOPID(this.shopId);
    //获取当前商铺购物车信息
    this.shopCart = this.cartList[this.shopId];
  },
  mounted() {
    if (this.geohash) {
      this.initData();
      // this.SAVE_GEOHASH(this.geohash);
    }
    if (!(this.userInfo && this.userInfo.user_id)) {
      // this.showAlert = true;
      // this.alertText = '您还没有登录';
    }
  },
  components: {
    headTop,
    alertTip,
    loading,
  },
  computed: {
    // ...mapState([
    //   "cartList",
    //   "remarkText",
    //   "inputText",
    //   "invoice",
    //   "choosedAddress",
    //   "userInfo",
    // ]),
    //备注页返回的信息进行处理
    remarklist: function () {
      let str = new String();
      if (this.remarkText) {
        Object.values(this.remarkText).forEach((item) => {
          str += item[1] + "，";
        });
      }
      //是否有自定义备注，分开处理
      if (this.inputText) {
        return str + this.inputText;
      } else {
        return str.substr(0, str.lastIndexOf("，"));
      }
    },
  },
  methods: {
    ...mapMutations([
      "INIT_BUYCART",
      "SAVE_GEOHASH",
      "CHOOSE_ADDRESS",
      "NEED_VALIDATION",
      "SAVE_CART_ID_SIG",
      "SAVE_ORDER_PARAM",
      "ORDER_SUCCESS",
      "SAVE_SHOPID",
    ]),
    //初始化数据
    async initData() {
      let newArr = new Array();
      Object.values(this.shopCart).forEach((categoryItem) => {
        Object.values(categoryItem).forEach((itemValue) => {
          Object.values(itemValue).forEach((item) => {
            newArr.push({
              attrs: [],
              extra: {},
              id: item.id,
              name: item.name,
              packing_fee: item.packing_fee,
              price: item.price,
              quantity: item.num,
              sku_id: item.sku_id,
              specs: [item.specs],
              stock: item.stock,
            });
          });
        });
      });
      //检验订单是否满足条件
      // this.checkoutData = 
      // await checkout(this.geohash, [newArr], this.shopId);
      // this.SAVE_CART_ID_SIG({
      //   cart_id: this.checkoutData.cart.id,
      //   sig: this.checkoutData.sig,
      // });
      this.initAddress();
      this.showLoading = false;
    },
    //获取地址信息，第一个地址为默认选择地址
    async initAddress() {
      if (this.userInfo && this.userInfo.user_id) {
        const addressRes = await getAddressList(this.userInfo.user_id);
        if (addressRes instanceof Array && addressRes.length) {
          // this.CHOOSE_ADDRESS({ address: addressRes[0], index: 0 });
        }
      }
    },
    //显示付款方式
    showPayWayFun() {
      this.showPayWay = !this.showPayWay;
    },
    //选择付款方式
    choosePayWay(is_online_payment, id) {
      if (is_online_payment) {
        this.showPayWay = !this.showPayWay;
        this.payWayId = id;
      }
    },
    //地址备注颜色
    iconColor(name) {
      switch (name) {
        case "公司":
          return "#4cd964";
        case "学校":
          return "#3190e8";
      }
    },
    //确认订单
    async confrimOrder() {
      if (this.userInfo.id) {
        if (this.order.id) {
            if (this.order.order_status === '1') { // 1未支付
              this.$router.push("/confirm-order/payment");
            } else {
              if (this.order.send_status == '2') {
                console.log('待发货')
                this.showAlert = true;
                this.alertText = "你好，你的订单商家正在处理，即将发货，请耐心等待。";
              } else if (this.order.send_status == '3') {
                console.log('确定收到货物')
                this.showAlert = true;
                this.alertText = "你好，商品是否送到你手上。请确认";
              } else if (this.order.send_status == '4') {
                this.showAlert = true;
                this.alertText = "你好，你的订单已完成。";
              }
            }
          } else {
          var data = {
            user_id: this.userInfo.id,
            user_name: this.userInfo.user_name,
            user_address_id: this.userInfo.address_id,
            user_address_name: this.userInfo.address_name,
            shop_id: this.foods.id,
            shop_name: this.foods.shop_name,
            shop_img_path: this.foods.img_path,
            shop_address_name: this.foods.address_name,
            shop_address_id: this.foods.address_id,
            shop_price: this.foods.price,
            shop_price_total: this.foods.price,
            shop_number: '1',
          }
          validateOrders(data).then((data)=>{
            window.sessionStorage.setItem('order', JSON.stringify(data))
            this.$router.push("/confirm-order/payment");
          })
        }
      } else {
        this.showAlert = true
        this.alertText = '请登录'
      }
    },
    closeTip() {
      this.showAlert = false
      if (this.order.send_status == '3') {
        update(this.order).then((res)=>{
          console.log('res', res)
          this.order.send_status = '4'
        })
      }
    }
  },
  watch: {
    userInfo: function (value) {
      if (value && value.user_id) {
        this.initAddress();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@site/style/mixin";

.confirmOrderContainer {
  padding-top: 1.95rem;
  padding-bottom: 3rem;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.container_style {
  background-color: #fff;
  margin-top: 0.4rem;
  padding: 0 0.7rem;
}
.address_container {
  min-height: 3.5rem;
  @include fj;
  align-items: center;
  padding: 0 0.6rem;
  background: url(/images/address_bottom.png) left bottom repeat-x;
  background-color: #fff;
  background-size: auto 0.12rem;
  .address_empty_left {
    display: flex;
    align-items: center;
    .location_icon {
      @include wh(0.8rem, 0.8rem);
      fill: $blue;
      margin-right: 0.2rem;
    }
    .add_address {
      @include sc(0.7rem, #333);
    }
    .address_detail_container {
      margin-left: 0.2rem;
      header {
        @include sc(0.65rem, #333);
        span:nth-of-type(1) {
          font-size: 0.8rem;
          font-weight: bold;
        }
      }
      .address_detail {
        width: 100%;
        display: flex;
        align-items: center;
        span {
          @include sc(0.5rem, #fff);
          border-radius: 0.15rem;
          background-color: #ff5722;
          height: 0.6rem;
          line-height: 0.6rem;
          padding: 0 0.2rem;
          margin-right: 0.3rem;
        }
        p {
          @include sc(0.55rem, #777);
        }
      }
    }
  }
}
.address_empty_right {
  @include wh(0.6rem, 0.6rem);
  fill: #999;
}
.delivery_model {
  border-left: 0.2rem solid $blue;
  min-height: 4rem;
  @include fj;
  align-items: center;
  .deliver_text {
    @include sc(0.8rem, #333);
    font-weight: bold;
    padding-left: 0.3rem;
  }
  .deliver_time {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    p:nth-of-type(1) {
      @include sc(0.7rem, $blue);
    }
    p:nth-of-type(2) {
      @include sc(0.5rem, #fff);
      background-color: $blue;
      width: 2.4rem;
      margin-top: 0.5rem;
      text-align: center;
      border-radius: 0.12rem;
      padding: 0.1rem;
    }
  }
}
.pay_way {
  .header_style {
    @include fj;
    line-height: 2rem;
    span:nth-of-type(1) {
      @include sc(0.7rem, #666);
    }
    .more_type {
      span:nth-of-type(1) {
        @include sc(0.6rem, #aaa);
        width: 10rem;
        display: inline-block;
        text-align: right;
        vertical-align: middle;
      }
      svg {
        @include wh(0.5rem, 0.5rem);
        fill: #ccc;
      }
    }
  }
  .hongbo {
    @include fj;
    border-top: 0.025rem solid #f5f5f5;
    span {
      @include sc(0.6rem, #aaa);
      line-height: 2rem;
      svg {
        @include wh(0.5rem, 0.5rem);
        vertical-align: middle;
        fill: #ccc;
      }
    }
    span:nth-of-type(2) {
      color: #aaa;
    }
  }
  .support_is_available {
    span {
      color: #666;
    }
  }
}
.food_list {
  background-color: #fff;
  margin-top: 0.4rem;
  header {
    padding: 0.7rem;
    border-bottom: 0.025rem solid #f5f5f5;
    img {
      @include wh(1.2rem, 1.2rem);
      vertical-align: middle;
    }
    span {
      @include sc(0.8rem, #333);
    }
  }
  .food_list_ul {
    padding-top: 0.5rem;
  }
  .food_item_style {
    @include fj;
    line-height: 1.8rem;
    padding: 0 0.7rem;
    span,
    p {
      @include sc(0.65rem, #666);
    }
    .food_name {
      width: 11rem;
    }
    .num_price {
      flex: 1;
      @include fj;
      align-items: center;
      span:nth-of-type(1) {
        color: #f60;
      }
    }
  }
  .total_price {
    border-top: 0.025rem solid #f5f5f5;
  }
}
.confrim_order {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2rem;
  p {
    line-height: 2rem;
    @include sc(0.75rem, #fff);
  }
  p:nth-of-type(1) {
    background-color: #3c3c3c;
    flex: 5;
    padding-left: 0.7rem;
  }
  p:nth-of-type(2) {
    flex: 2;
    background-color: #56d176;
    text-align: center;
  }
}
.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 203;
}
.choose_type_Container {
  min-height: 10rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 204;
  header {
    background-color: #fafafa;
    @include sc(0.7rem, #333);
    text-align: center;
    line-height: 2rem;
  }
  ul {
    li {
      @include fj;
      padding: 0 0.7rem;
      line-height: 2.5rem;
      align-items: center;
      span {
        @include sc(0.7rem, #ccc);
      }
      svg {
        @include wh(0.8rem, 0.8rem);
        fill: #eee;
      }
    }
    .choose {
      span {
        color: #333;
      }
      svg {
        fill: #4cd964;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slid_up-enter-active,
.slid_up-leave-active {
  transition: all 0.3s;
}
.slid_up-enter,
.slid_up-leave-active {
  transform: translate3d(0, 10rem, 0);
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}

.shop_name{
  display: inline-block;
  margin-left: 10px;
}
</style>
