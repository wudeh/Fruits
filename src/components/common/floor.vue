<template>
  <div>
    <div class="floor-title">{{ this.floorName }}</div>
    <div class="floor-anomaly">
      <div class="floor_1" @click="anomalyClick(1)">
        <img :src="this.floor_1.image" width="100%" />
      </div>
      <div class="floor-right">
        <div class="floor_2" @click="anomalyClick(2)">
          <img :src="this.floor_2.image" width="100%" />
        </div>
        <div class="floor_3" @click="anomalyClick(3)">
          <img :src="this.floor_3.image" width="100%" />
        </div>
      </div>
    </div>
    <div class="others">
      <div v-for="(item, index) in floorData.slice(3)" :key="index">
        <img v-lazy="item.image" width="100%" @click="goDetail(item.goodsId)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "floorComponent",
  data() {
    return {
      floor_1: {},
      floor_2: {},
      floor_3: {}
    };
  },
  props: ["floorData", "floorName"],
  watch: {
    floorData(val) {
      this.floor_1 = val[0];
      this.floor_2 = val[1];
      this.floor_3 = val[2];
    }
  },
  methods: {
    goDetail(goodsId) {
      this.$router.push({ name: "DetailGoodsInfo", query: { goodsId } });
    },
    // 不规则楼层要单独判断
    anomalyClick(number) {
      switch (number) {
        case 1:
          this.$router.push({
            name: "DetailGoodsInfo",
            query: { goodsId: this.floor_1.goodsId }
          });
          break;
        case 2:
          this.$router.push({
            name: "DetailGoodsInfo",
            query: { goodsId: this.floor_2.goodsId }
          });
          break;
        case 3:
          this.$router.push({
            name: "DetailGoodsInfo",
            query: { goodsId: this.floor_3.goodsId }
          });
          break;
      }
    }
  }
};
</script>

<style scoped>
.floor-title {
  padding: 0.3rem 0;
  font-size: 0.875rem;
  color: #e5017d;
  text-align: center;
}
.floor-anomaly {
  display: flex;
  border-bottom: 0.0625rem solid #ccc;
}
.floor_1 {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-right: 0.0625rem solid #ccc;
}
.floor-right {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.floor_2 {
  border-bottom: 0.0625rem solid #ccc;
}
.others {
  display: flex;
  flex-wrap: wrap;
}
.others div {
  width: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.others div:nth-child(odd) {
  border-right: 0.0625rem solid #ccc;
}
</style>
