 <template>
  <div class="order_page">
    <head-top head-title="订单列表" go-back="true"></head-top>
     <!-- v-load-more="loaderMore" -->
    <ul class="order_list_ul">
      <li class="order_list_li" v-for="item in orderList" :key="item.id">
          <!-- :src="imgBaseUrl + item.restaurant_image_url" -->
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F338%2F63325.jpg&refer=http%3A%2F%2Fimg.sccnn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640804017&t=36da07beaf303c4c2ad2295271dc96e3"
          class="restaurant_image"
        />
        <section class="order_item_right">
          <section @click="showDetail(item)">
            <header class="order_item_right_header">
              <section class="order_header">
                <h4>
                  <span class="ellipsis">{{ item.shop_name }} </span>
                  <svg fill="#333" class="arrow_right">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#arrow-right"
                    ></use>
                  </svg>
                </h4>
                <p class="order_time">{{ item.created_at }}</p>
              </section>
              <p class="order_status">
                {{ item.send_label }}
              </p>
            </header>
            <section class="order_basket">
              <p class="order_name ellipsis">
                {{ item.shop_name }}
              </p>
              <p class="order_amount">¥{{ item.shop_price_total }}</p>
            </section>
          </section>
          <div class="order_again">
            <compute-time
              v-if="item.send_label == '等待支付'"
              :time="item.time_pass"
            ></compute-time>
            <!-- <router-link
              :to="{
                path: '/shop',
                query: { geohash, id: item.restaurant_id },
              }"
              tag="span"
              class="buy_again"
              v-else
              >再来一单</router-link
            > -->
          </div>
        </section>
      </li>
    </ul>
    <foot-guide></foot-guide>
    <!-- <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition> -->
  </div>
</template>

<script>
// import { mapState, mapMutations } from "vuex";
import headTop from "@site/components/header/head";
// import computeTime from "@site/components/common/computeTime";
// import loading from "@site/components/common/loading";
// import { getImgPath } from "@site/components/common/mixin";
import footGuide from "@site/components/footer/footGuide";
import { getOrderList } from "@site/api/getData";
// import { loadMore } from "@site/components/common/mixin";
// import { imgBaseUrl } from "@site/config/env";

export default {
  data() {
    var userInfo = null;
    if (window.sessionStorage.getItem('userInfo')) {
      userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    }
    return {
      // orderList: null, //订单列表
      orderList: [{"_id":"61a5713424d5d647a804fa07","restaurant_id":2,"restaurant_image_url":"17d6ae939c71.png","restaurant_name":"测试商铺","formatted_created_at":"2021-11-30 08:32","order_time":1638232372652,"time_pass":21,"total_amount":64,"total_quantity":1,"unique_id":6,"id":6,"user_id":2,"address_id":2,"__v":0,"top_show":0,"timeline_node":{"in_processing":0,"actions":[]},"status_code":0,"status_bar":{"color":"f60","image_type":"","sub_title":"15分钟内支付","title":"等待支付"},"restaurant_type":0,"remind_reply_count":0,"rated_point":0,"pay_remain_seconds":0,"operation_upload_photo":0,"operation_rebuy":2,"operation_rate":0,"operation_pay":0,"operation_confirm":0,"is_pindan":0,"is_new_pay":1,"is_deletable":1,"is_brand":0,"basket":{"pindan_map":[],"packing_fee":{"price":0,"quantity":1,"name":"餐盒","category_id":1},"group":[[{"name":"超级美食","price":20,"quantity":3,"_id":"61a5711224d5d647a804fa05","specs":[""],"new_specs":[],"attrs":[]}]],"extra":[],"deliver_fee":{"quantity":1,"price":4,"name":"配送费","category_id":2},"abandoned_extra":[]}}],
      userInfo: userInfo
      // offset: 0,
      // preventRepeat: false, //防止重复获取
      // showLoading: true, //显示加载动画
      // imgBaseUrl,
    };
  },
  mounted() {
    this.initData();
  },
  // mixins: [loadMore],
  components: {
    headTop,
    footGuide,
    // loading,
    // computeTime,
  },
  // computed: {
  //   ...mapState(["userInfo", "geohash"]),
  // },
  methods: {
  //   ...mapMutations(["SAVE_ORDER"]),
  //   //初始化获取信息
    async initData() {
      if (this.userInfo && this.userInfo.id) {
        let res = await getOrderList({ user_id: this.userInfo.id });
        this.orderList = res.row
        // this.orderList = [...res];
        // console.log('res---->', res)
        // this.hideLoading();
      } else {
        // console.log('res------->', this.userInfo)
        // this.hideLoading();
      }
    },
  //   //加载更多
  //   async loaderMore() {
  //     if (this.preventRepeat) {
  //       return;
  //     }
  //     this.preventRepeat = true;
  //     this.showLoading = true;
  //     this.offset += 10;
  //     //获取信息
  //     let res = await getOrderList(this.userInfo.user_id, this.offset);
  //     this.orderList = [...this.orderList, ...res];
  //     this.hideLoading();
  //     if (res.length < 10) {
  //       return;
  //     }
  //     this.preventRepeat = false;
  //   },
    //显示详情页
    showDetail(item) {
      this.preventRepeat = false;
      window.sessionStorage.setItem('order', JSON.stringify(item))
      this.$router.push("/confirm-order");
    },
  //   //生产环境与发布环境隐藏loading方式不同
  //   hideLoading() {
  //     this.showLoading = false;
  //   },
  },
  // watch: {
  //   userInfo: function (value) {
  //     if (value && value.user_id && !this.orderList) {
  //       this.initData();
  //     }
  //   },
  // },
};
</script>
  
<style lang="scss" scoped>
@import "@site/style/mixin";

.order_page {
  background-color: #f1f1f1;
  margin-bottom: 1.95rem;
  p,
  span,
  h4 {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.order_list_ul {
  padding-top: 1.95rem;
  padding-bottom: 1.95rem;
  .order_list_li {
    background-color: #fff;
    display: flex;
    margin-bottom: 0.5rem;
    padding: 0.6rem 0.6rem 0;
    .restaurant_image {
      @include wh(2rem, 2rem);
      margin-right: 0.4rem;
    }
    .order_item_right {
      flex: 5;
      .order_item_right_header {
        border-bottom: 0.025rem solid #f5f5f5;
        padding-bottom: 0.3rem;
        @include fj;
        .order_header {
          h4 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            @include sc(0.75rem, #333);
            line-height: 1rem;
            width: 9rem;

            .arrow_right {
              @include wh(0.4rem, 0.4rem);
              fill: #ccc;
              margin-right: 0.2rem;
            }
          }
          .order_time {
            @include sc(0.55rem, #999);
            line-height: 0.8rem;
          }
        }
        .order_status {
          @include sc(0.6rem, #333);
        }
      }
      .order_basket {
        @include fj;
        line-height: 2rem;
        border-bottom: 0.025rem solid #f5f5f5;
        .order_name {
          @include sc(0.6rem, #666);
          width: 10rem;
        }
        .order_amount {
          @include sc(0.6rem, #f60);
          font-weight: bold;
        }
      }
      .order_again {
        text-align: right;
        line-height: 1.6rem;
        .buy_again {
          @include sc(0.55rem, #3190e8);
          border: 0.025rem solid #3190e8;
          padding: 0.1rem 0.2rem;
          border-radius: 0.15rem;
        }
      }
    }
  }
}
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.7s;
}
.loading-enter,
.loading-leave-active {
  opacity: 0;
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
</style>
