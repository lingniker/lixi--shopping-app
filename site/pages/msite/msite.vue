<template>
  <div>
    <section class="menu_right" ref="menuFoodList">
      <ul>
        <li v-for="(item, index) in menuList" :key="index">
          <header class="menu_detail_header">
            <section class="menu_detail_header_left">
              <strong class="menu_item_title">{{ item.name }}</strong>
              <span class="menu_item_description">{{ item.description }}</span>
            </section>
            <span
              class="menu_detail_header_right"
              @click="showTitleDetail(index)"
            ></span>
            <p class="description_tip" v-if="index == TitleDetailIndex">
              <span>{{ item.name }}</span>
              {{ item.description }}
            </p>
          </header>
          <section
            v-for="(foods, foodindex) in item.foods"
            :key="foodindex"
            class="menu_detail_list"
          >
            <router-link
              :to="{
                path: 'shop/foodDetail',
                query: {
                  image_path: foods.image_path,
                  description: foods.description,
                  month_sales: foods.month_sales,
                  name: foods.name,
                  rating: foods.rating,
                  rating_count: foods.rating_count,
                  satisfy_rate: foods.satisfy_rate,
                  foods,
                  shopId,
                },
              }"
              tag="div"
              class="menu_detail_link"
            >
              <section class="menu_food_img">
                <img :src="foods.image_path" />
              </section>
              <section class="menu_food_description">
                <h3 class="food_description_head">
                  <strong class="description_foodname">{{ foods.name }}</strong>
                  <ul v-if="foods.attributes.length" class="attributes_ul">
                    <li
                      v-if="attribute"
                      v-for="(attribute, foodindex) in foods.attributes"
                      :key="foodindex"
                      :style="{
                        color: '#' + attribute.icon_color,
                        borderColor: '#' + attribute.icon_color,
                      }"
                      :class="{ attribute_new: attribute.icon_name == '新' }"
                    >
                      <p
                        :style="{
                          color:
                            attribute.icon_name == '新'
                              ? '#fff'
                              : '#' + attribute.icon_color,
                        }"
                      >
                        {{
                          attribute.icon_name == "新"
                            ? "新品"
                            : attribute.icon_name
                        }}
                      </p>
                    </li>
                  </ul>
                </h3>
                <p class="food_description_content">{{ foods.description }}</p>
                <p class="food_description_sale_rating">
                  <span>月售{{ foods.month_sales }}份</span>
                  <span>好评率{{ foods.satisfy_rate }}%</span>
                </p>
                <p v-if="foods.activity" class="food_activity">
                  <span
                    :style="{
                      color: '#' + foods.activity.image_text_color,
                      borderColor: '#' + foods.activity.icon_color,
                    }"
                    >{{ foods.activity.image_text }}</span
                  >
                </p>
              </section>
            </router-link>
            <footer class="menu_detail_footer">
              <section class="food_price">
                <span>¥</span>
                <span>{{ foods.specfoods[0].price }}</span>
                <span v-if="foods.specifications.length">起</span>
              </section>
              <buy-cart
                :shopId="shopId"
                :foods="foods"
                @moveInCart="listenInCart"
                @showChooseList="showChooseList"
                @showReduceTip="showReduceTip"
                @showMoveDot="showMoveDotFun"
              ></buy-cart>
            </footer>
          </section>
        </li>
      </ul>
    </section>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
// import {imgBaseUrl} from 'src/config/env'
import headTop from "@site/components/header/head";
import footGuide from "@site/components/footer/footGuide";
import shopList from "@site/components/common/shoplist";
import { msiteAddress, msiteFoodTypes, cityGuess } from "@site/api/getData";
import "@site/plugins/swiper.min.js";
import "@site/style/swiper.min.css";

export default {
  data() {
    return {
      menuList: [
        {
          name: "热销榜",
          description: "大家喜欢吃，才叫真好吃。",
          id: 2,
          restaurant_id: 2,
          foods: [
            {
              _id: "61a4968424d5d647a804f9c0",
              tips: "574评价 月售956份",
              item_id: 1,
              category_id: 2,
              restaurant_id: 2,
              activity: {
                image_text_color: "f1884f",
                icon_color: "f07373",
                image_text: "就今天",
              },
              image_path: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F21%2F53%2F5b6bac5f26eff_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640804017&t=a2f9c283ce320f029a3f1e8db3611f09",
              name: "超级美食",
              __v: 0,
              specfoods: [
                {
                  specs_name: "默认",
                  name: "超级美食",
                  item_id: 1,
                  sku_id: 1,
                  food_id: 1,
                  restaurant_id: 2,
                  _id: "61a4968424d5d647a804f9c1",
                  specs: [],
                  stock: 1000,
                  checkout_mode: 1,
                  is_essential: false,
                  recent_popularity: 512,
                  sold_out: false,
                  price: 20,
                  promotion_stock: -1,
                  recent_rating: 2.7,
                  packing_fee: 0,
                  pinyin_name: "",
                  original_price: 0,
                },
              ],
              satisfy_rate: 24,
              satisfy_count: 506,
              attributes: [{ icon_color: "5ec452", icon_name: "新" }],
              is_essential: false,
              server_utc: "2021-11-29T08:49:29.886Z",
              specifications: [],
              rating_count: 574,
              month_sales: 956,
              description: "超级好看",
              attrs: [],
              display_times: [],
              pinyin_name: "",
              is_featured: 0,
              rating: 4.9,
            },
          ],
          type: 1,
          icon_url: "5da3872d782f707b4c82ce4607c73d1ajpeg",
          is_selected: true,
          __v: 1,
        },
      ],
      geohash: "", // city页面传递过来的地址geohash
      msiteTitle: "请选择地址...", // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址
    };
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      // const address = await cityGuess();
      // this.geohash = address.latitude + "," + address.longitude;
    } else {
      // this.geohash = this.$route.query.geohash;
    }
    //保存geohash 到vuex
    // this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    // let res = await msiteAddress(this.geohash);
    // this.msiteTitle = res.name;
    // // 记录当前经度纬度
    // // this.RECORD_ADDRESS(res);

    // this.hasGetData = true;
  },
  // mounted() {
  //   //获取导航食品类型列表
  //   msiteFoodTypes(this.geohash)
  //     .then((res) => {
  //       let resLength = res.length;
  //       let resArr = [...res]; // 返回一个新的数组
  //       let foodArr = [];
  //       for (let i = 0, j = 0; i < resLength; i += 8, j++) {
  //         foodArr[j] = resArr.splice(0, 8);
  //       }
  //       this.foodTypes = foodArr;
  //     })
  //     .then(() => {
  //       //初始化swiper
  //       new Swiper(".swiper-container", {
  //         pagination: ".swiper-pagination",
  //         loop: true,
  //       });
  //     });
  // },
  components: {
    headTop,
    shopList,
    footGuide,
  },
  computed: {},
  methods: {
    // ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"]),
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "@site/style/mixin";
.link_search {
  left: 0.8rem;
  @include wh(0.9rem, 0.9rem);
  @include ct;
}
.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -0.5rem;
  .title_text {
    @include sc(0.8rem, #fff);
    text-align: center;
    display: block;
  }
}
.msite_nav {
  padding-top: 2.1rem;
  background-color: #fff;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;
  .swiper-container {
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
    .swiper-pagination {
      bottom: 0.2rem;
    }
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}
.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      img {
        margin-bottom: 0.3rem;
        @include wh(1.8rem, 1.8rem);
      }
      figcaption {
        text-align: center;
        @include sc(0.55rem, #666);
      }
    }
  }
}
.shop_list_container {
  margin-top: 0.4rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header {
    .shop_icon {
      fill: #999;
      margin-left: 0.6rem;
      vertical-align: middle;
      @include wh(0.6rem, 0.6rem);
    }
    .shop_header_title {
      color: #999;
      @include font(0.55rem, 1.6rem);
    }
  }
}
.menu_right {
  flex: 4;
  overflow-y: auto;
  .menu_detail_header {
    width: 100%;
    padding: 0.4rem;
    position: relative;
    @include fj;
    align-items: center;
    .menu_detail_header_left {
      width: 11rem;
      white-space: nowrap;
      overflow: hidden;
      .menu_item_title {
        @include sc(0.7rem, #666);
        font-weight: bold;
      }
      .menu_item_description {
        @include sc(0.5rem, #999);
        width: 30%;
        overflow: hidden;
      }
    }
    .menu_detail_header_right {
      @include wh(0.5rem, 1rem);
      display: block;
      @include bis("../../images/icon_point.png");
      background-size: 100% 0.4rem;
      background-position: left center;
    }
    .description_tip {
      background-color: #39373a;
      opacity: 0.95;
      @include sc(0.5rem, #fff);
      position: absolute;
      top: 1.5rem;
      z-index: 14;
      width: 8rem;
      right: 0.2rem;
      padding: 0.5rem 0.4rem;
      border: 1px;
      border-radius: 0.2rem;
      span {
        color: #fff;
        line-height: 0.6rem;
        font-size: 0.55rem;
      }
    }
    .description_tip::after {
      content: "";
      position: absolute;
      @include wh(0.4rem, 0.4rem);
      background-color: #39373a;
      top: -0.5rem;
      right: 0.7rem;
      transform: rotate(-45deg) translateY(0.41rem);
    }
  }
  .menu_detail_list {
    background-color: #fff;
    padding: 0.6rem 0.4rem;
    border-bottom: 1px solid #f8f8f8;
    position: relative;
    overflow: hidden;
    .menu_detail_link {
      display: flex;
      .menu_food_img {
        margin-right: 0.4rem;
        img {
          @include wh(2rem, 2rem);
          display: block;
        }
      }
      .menu_food_description {
        width: 100%;
        .food_description_head {
          @include fj;
          margin-bottom: 0.2rem;
          .description_foodname {
            @include sc(0.7rem, #333);
          }
          .attributes_ul {
            display: flex;
            li {
              font-size: 0.3rem;
              height: 0.6rem;
              line-height: 0.35rem;
              padding: 0.1rem;
              border: 1px solid #666;
              border-radius: 0.3rem;
              margin-right: 0.1rem;
              transform: scale(0.8);
              p {
                white-space: nowrap;
              }
            }
            .attribute_new {
              position: absolute;
              top: 0;
              left: 0;
              background-color: #4cd964;
              @include wh(2rem, 2rem);
              display: flex;
              align-items: flex-end;
              transform: rotate(-45deg) translate(-0.1rem, -1.5rem);
              border: none;
              border-radius: 0;
              p {
                @include sc(0.4rem, #fff);
                text-align: center;
                flex: 1;
                transform: scale(0.8) translate(0.1rem, -0.1rem);
              }
            }
          }
        }
        .food_description_content {
          @include sc(0.5rem, #999);
          line-height: 0.6rem;
        }
        .food_description_sale_rating {
          line-height: 0.8rem;
          span {
            @include sc(0.5rem, #333);
          }
        }
        .food_activity {
          line-height: 0.4rem;
          span {
            font-size: 0.3rem;
            border: 1px solid currentColor;
            border-radius: 0.3rem;
            padding: 0.08rem;
            display: inline-block;
            transform: scale(0.8);
            margin-left: -0.35rem;
          }
        }
      }
    }
    .menu_detail_footer {
      margin-left: 2.4rem;
      font-size: 0;
      margin-top: 0.3rem;
      @include fj;
      .food_price {
        span {
          font-family: "Helvetica Neue", Tahoma, Arial;
        }
        span:nth-of-type(1) {
          @include sc(0.5rem, #f60);
          margin-right: 0.05rem;
        }
        span:nth-of-type(2) {
          @include sc(0.7rem, #f60);
          font-weight: bold;
          margin-right: 0.3rem;
        }
        span:nth-of-type(3) {
          @include sc(0.5rem, #666);
        }
      }
    }
  }
}
</style>
