<script>
import CardComponent from "./components/CardComponent.vue";

export default {
  components: {
    CardComponent,
  },
};
</script>

<template>
  <div class="flex flex-wrap gap">
    <CardComponent
      title="Orders"
      value="125"
      bottom-value="24"
      bottom-text=" new since last visit"
      icon="pi-shopping-cart"
    />
    <CardComponent
      title="Revenue"
      value="2.100€"
      bottom-value="52%"
      bottom-text=" more since last week"
      icon="pi-dollar"
    />
    <CardComponent
      title="Customers"
      value="28441"
      bottom-value="520"
      bottom-text=" new registrations"
      icon="pi-users"
    />
    <CardComponent
      title="Comments"
      value="152 unread"
      bottom-value="12"
      bottom-text=" new threads"
      icon="pi-comment"
    />
  </div>
</template>
