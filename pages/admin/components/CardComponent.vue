<script>
export default {
  props: {
    title: {
      type: String,
      Required: true,
    },
    value: {
      type: Number,
      Required: true,
    },
    bottomValue: {
      type: Number,
      Required: true,
    },
    bottomText: {
      type: String,
      Required: true,
    },
    icon: {
      type: String,
      Required: false,
      default: "pi-shopping-cart",
    },
  },
};
</script>

<template>
  <div class="surface-card box-shadow p-3 br-default">
    <div class="flex jc-space-between-ai-start mb-3">
      <div>
        <span class="block text-lg font-semibold mb-3">
          <b>{{ title }}</b></span
        >
        <div class="text-xl">{{ value }}</div>
      </div>
      <div class="icon-container flex jc-ai-center">
        <i :class="['pi', icon, 'text-xl']"></i>
      </div>
    </div>
    <span>{{ bottomValue }}</span>
    <span>{{ bottomText }}</span>
  </div>
</template>

<style>
.surface-card {
  min-width: 18vw;
}

.icon-container {
  width: 3rem;
  height: 3rem;
  background-color: #00dc8020;
  color: var(--dark-primary);
  border-radius: 8px;
}
</style>
