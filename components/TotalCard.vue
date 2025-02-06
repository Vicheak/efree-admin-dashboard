<template>
  <div>
    <div class="row">
      <div
        class="col-12 col-lg-6 col-xl-4"
        v-for="(item, index) in props.items"
        :key="index"
      >
        <div class="card widget-1">
          <div class="card-body">
            <div class="widget-content">
              <div
                class="widget-round"
                :style="{
                  borderColor: item.iconColor,
                }"
              >
                <div class="bg-round">
                  <Icon
                    class="svg-fill"
                    :name="item.icon"
                    :color="item.iconColor"
                  />
                  <svg
                    class="half-circle svg-fill"
                    :style="{
                      fill: item.iconColor,
                    }"
                  >
                  <use xlink:href="/svg/icon-sprite.svg#halfcircle"></use>
                  </svg>
                </div>
              </div>

              <div>
                <!-- <h5>{{ currency(item.amount, item.symbol) }}</h5> -->
                <h5 v-if="nullToVoid(item.valueType) == '' || item.valueType == 'amount'">{{ currency(item.amount, item.symbol) }}</h5>
                <h5 v-else>{{ item.amount }}</h5>
                <span class="f-light">{{ $t(item.title) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  type itemType = {
    icon: string;
    iconColor: string;
    title: string;
    valueType: String,
    amount: number | string;
    symbol: string;
  };
  interface Props {
    items: Array<itemType>;
  }
  const props = defineProps<Props>();
</script>
