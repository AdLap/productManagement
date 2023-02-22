<template>
  <VList lines="one">
    <VListItem
      v-for="product in products"
      :key="product.id"
      :title="product.title"
      @click="goToCard"
    >
      <VRow class="pa-5 align-center">
        <VCol cols="2" class="d-none d-sm-flex">
          <VImg max-width="200" :src="product.images[0]" cover>
            <template v-slot:placeholder>
              <VRow class="fill-height ma-0" align="center" justify="center">
                <VProgressCircular indeterminate color="grey-lighten-5" />
              </VRow>
            </template>
          </VImg>
        </VCol>
        <VCol cols="11" sm="8">
          <VCardText>
            {{ product.description }}
          </VCardText>
        </VCol>
        <VCol cols="2">
          <VBtn>
            actions
            <VMenu activator="parent">
              <VList>
                <VListItem
                  v-for="(item, index) in cardActions"
                  :key="index"
                  :value="index"
                  :prepend-icon="item.icon"
                >
                  <VBtn @click="item.action">{{ item.name }}</VBtn>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </VCol>
      </VRow>
    </VListItem>
  </VList>
</template>

<script setup lang="ts">
import type { CardActions, Products } from '@/type/types'

defineProps<{
  products: Products
  cardActions: CardActions[]
  goToCard: () => void
}>()
</script>
