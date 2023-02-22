<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="product in products"
      :key="product.id"
      @click="goToCart"
    >
      <VCard class="product-card-grid text-sx-center ma-3">
        <VImg :src="product.images[0]" cover class="mx-auto" max-width="200">
          <template v-slot:placeholder>
            <VRow class="fill-height ma-0" align="center" justify="center">
              <VProgressCircular indeterminate color="grey-lighten-5" />
            </VRow>
          </template>
        </VImg>
        <VCardTitle>
          {{ product.title }}
        </VCardTitle>
        <VCardText>
          {{ product.description }}
        </VCardText>
        <VCardActions class="justify-end">
          <VBtn>
            <VIcon icon="mdi-menu" />
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
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import type { Products, CardActions } from '@/type/types'
defineProps<{
  products: Products
  cardActions: CardActions[]
  goToCart: () => void
}>()
</script>
