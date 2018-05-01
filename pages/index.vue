<template lang="pug">
  div
    v-card(flat)
      v-card-title.primary.white--text
        .headline.py-3.px-2 Receitas
      v-card-text
        v-list
          v-list-tile(
            v-for="(item, index) in recipes"
            :key="index"
            @click="open(item.id)"
          )
            v-list-tile-content
              v-list-tile-title {{ item.title }}
</template>

<script>
import { db } from '~/plugins/firestore'
export default {
  data: () => ({
    recipes: []
  }),
  firestore: () => ({
    recipes: db.collection('recipes')
  }),
  methods: {
    open(id) {
      this.$router.push({
        name: 'receita-id',
        params: { id }
      })
    }
  }
}
</script>
