<script>

  import CardComponent from "./components/CardComponent.vue"


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
    value=125
    bottomValue = 24
    bottomText = " new since last visit"
    icon="pi-shopping-cart"
    />
    <CardComponent
    title="Revenue"
    value=2.100€
    bottomValue = 52%
    bottomText = " more since last week"
    icon="pi-dollar"
    />
    <CardComponent
    title="Customers"
    value=28441
    bottomValue = 520
    bottomText = " new registrations"
    icon="pi-users"
    />
    <CardComponent
    title="Comments"
    value="152 unread"
    bottomValue = 12
    bottomText = " new threads"
    icon="pi-comment"
    />
    
  </div>
</template>
