<script>


export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>

    <li class="nav-list-entry">
        <a :href="link" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
            <i :class="['pi', icon,'mr-2']"></i>
            <span class="font-medium">{{title}}</span>
        </a>
    </li>

</template>




<style>

.nav-list-entry{
    margin: 10px 0;
    border-radius: 8px;
}

.nav-list-entry:hover{
    background-color: #ecedf1;
}

</style>