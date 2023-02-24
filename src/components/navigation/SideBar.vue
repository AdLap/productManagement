<template>
  <VNavigationDrawer expand-on-hover rail>
    <VList>
      <VListItem
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="AdLap"
        subtitle="adlap@adlap.pl"
      />

      <VDivider />

      <VList density="compact" nav v-model="sideBarItems">
        <VListItem
          v-for="item in sideBarItems"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          rotuer
          :to="item.link"
        />
      </VList>
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
const sideBarItems = [
  { icon: 'mdi-account', title: 'Account', value: 'account', link: '/' },
  {
    icon: 'mdi-dialpad',
    title: 'Products',
    value: 'products',
    link: '/products'
  }
  // { icon: 'mdi-folder', title: 'Logout', value: 'logout', link: '/' }
]
</script>
