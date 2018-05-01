<template lang="pug">
  .pb-5
    v-card(flat v-if="recipe")
      v-card-title.primary.white--text
        h1.headline.py-3.px-2 {{ recipe.title }}
        v-spacer
        v-btn(
          color="white--text"
          :to="{name: 'receita-id', params: {id: recipe.id}}"
          icon nuxt
        )
          v-icon edit
      v-card-text.pa-5
        h2.accent--text.mb-4 Ingredientes
        ul
          li(v-for="item in recipe.ingredients") {{ item }}
        h2.accent--text.mt-5.mb-3 Modo de preparo
        ul
          li(v-for="item in recipe.preparation") {{ item }}
        h2.accent--text.mt-5.mb-3(v-if="recipe.tips") Dicas & Comentários
        ul
          li(v-for="item in recipe.tips") {{ item }}
    div(v-else) Carregando...
    v-btn(
      @click="goBack"
      slot="activator"
      color="grey lighten-2"
      fixed fab bottom left depressed
    )
      v-icon keyboard_arrow_left
</template>

<script>
import { db } from '~/plugins/firestore'
export default {
  data: () => ({
    recipe: null
  }),
  head: () => ({
    title: this.recipe ? this.recipe.title : 'Receita'
  }),
  firestore() {
    return {
      recipe: db.collection('recipes').doc(this.$route.params.id)
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style scoped>
ul {
  padding-left: 0;
}
li {
  line-height: 1.5;
  margin-bottom: 0.25em;
}
</style>
