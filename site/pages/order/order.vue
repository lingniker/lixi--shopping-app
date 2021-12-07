 <template>
  <div class="order_page">
    <head-top head-title="订单列表" go-back="true"></head-top>
    <ul class="order_list_ul">
      <li class="order_list_li" v-for="item in orderList" :key="item.id">
        <img
          :src="baseImgPath + item.shop_img_path"
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
                <p class="order_time">{{ parseTime(item.created_at) }}</p>
              </section>
              <p :class="'order_status status-' + item.send_status">
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
          </div>
        </section>
      </li>
    </ul>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import headTop from "@site/components/header/head";
import footGuide from "@site/components/footer/footGuide";
import { getOrderList } from "@site/api/getData";
import { baseImgPath } from '@site/config'

export default {
  data() {
    var userInfo = null;
    if (window.sessionStorage.getItem('appUserInfo')) {
      userInfo = JSON.parse(window.sessionStorage.getItem('appUserInfo'))
    }
    return {
      orderList: [],
      userInfo: userInfo,
      baseImgPath,
    };
  },
  mounted() {
    this.initData();
  },
  components: {
    headTop,
    footGuide,
  },
  methods: {
  //   //初始化获取信息
    async initData() {
      if (this.userInfo && this.userInfo.id) {
        let res = await getOrderList({ _user_id: this.userInfo.id });
        this.orderList = resizeTo
      } else {
      }
    },
    //显示详情页
    showDetail(item) {
      this.preventRepeat = false;
      window.sessionStorage.setItem('order', JSON.stringify(item))
      this.$router.push("/confirm-order");
    },
  }
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

<style lang="scss">
.status-1 {
  color: #409eff !important;
}
.status-2 {
  color: #67c23a !important;
}
.status-3 {
  color: #e6a23c !important;
}
.status-4 {
  color: #f56c6c !important;
}
</style>