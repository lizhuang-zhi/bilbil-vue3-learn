<script setup lang="ts">
import { ref } from "vue";

const a: string = "hello world123";
const b: string = "<h1>hello world1</h1>";

const event = "click"; // 事件名称[click, mouseover, mouseout, ...]
const clickBtn = () => {
  console.log("点击按钮....");
};
const parentEvent = () => {
  console.log("点击父级按钮....");
};

// v-once演示
const onceVal = ref("只有当a改变时才会重新渲染");
const changeC = () => {
  onceVal.value = "改变c"; // 点击不会改变
};

// // v-memo演示
// const arr = ref([1, 2, 3]);
// const changeArr = () => {
//   arr.value.push(4);
// };
</script>

<template>
  <div>
    <!-- v-html和v-text -->
    <div v-text="a"></div>
    <div v-html="b"></div>

    <!-- 事件绑定 -->
    <div class="parent" @click="parentEvent">
      <!-- .stop阻止冒泡 -->
      <!-- .once保证事件只触发一次 -->
      <div @[event].stop="clickBtn">点击按钮</div>
    </div>

    <!-- v-once和v-meemo -->
    <div>-------------演示v-once------------</div>
    <div v-once>{{ onceVal }}</div>
    <button @click="changeC">点击也无法改变上面的值</button>

    <!-- vue3.2新增v-memo -->
    <!-- 
      使用场景: 大量dom渲染的微小优化
     -->
    <!-- <div>-------------演示v-memo------------</div>
    <div v-for="(item, index) in arr" :key="index" v-memo="[item == 2]">
      {{ item }}
    </div>
    <button @click="changeArr">改变arr</button> -->
  </div>
</template>

<style scoped lang="less">
</style>
