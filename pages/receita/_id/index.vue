<template lang="pug">
  .pb-5
    v-form(v-model="form.valid" ref="form" lazy-validation @submit.prevent="save")
      v-card(flat)
        v-card-title.primary.white--text
          h1.headline.py-3.px-2
            span(v-if="isNew") Adicionar receita
            span(v-else) Editar receita
        v-card-text
          v-text-field.mb-2(
            v-model.trim="recipe.title"
            label="Título"
            :rules="rules.required"
            required
          )
          v-text-field.mb-2(
            v-model="recipe.ingredients"
            label="Ingredientes"
            :rules="rules.required"
            required textarea
          )
          v-text-field.mb-2(
            v-model="recipe.preparation"
            label="Modo de preparo"
            :rules="rules.required"
            required textarea
          )
          v-text-field.mb-2(
            v-model="recipe.tips"
            label="Dicas & Comentários"
            textarea
          )
    v-btn(
      @click="goBack"
      slot="activator"
      color="grey lighten-2"
      fixed fab bottom left depressed
    )
      v-icon keyboard_arrow_left
    v-btn(
      @click="save"
      slot="activator"
      color="accent"
      fixed fab bottom right depressed
    )
      v-icon save
</template>

<script>
import { db } from '~/plugins/firestore'
export default {
  asyncData({ params }) {
    return {
      isNew: params.id === 'nova'
    }
  },
  data: () => ({
    recipe: {},
    rules: {
      required: [v => !!v || 'Campo obrigatório.']
    },
    form: {
      valid: false,
      disabled: false
    }
  }),
  firestore() {
    if (this.isNew) {
      return {}
    } else {
      return {
        recipe: db.collection('recipes').doc(this.$route.params.id)
      }
    }
  },
  methods: {
    goBack() {
      if (this.isNew) {
        return this.$router.push({ name: 'index' })
      }
      this.$router.push({
        name: 'receita-id-view',
        params: { id: this.$route.params.id }
      })
    },
    getRecipe() {
      return {
        title: this.recipe.title,
        ingredients: this.recipe.ingredients.split(/\n/g),
        preparation: this.recipe.preparation.split(/\n/g),
        tips: this.recipe.tips ? this.recipe.tips.split(/\n/g) : null
      }
    },
    create() {
      db.collection('recipes').add(this.getRecipe())
      this.goBack()
    },
    update() {
      db
        .collection('recipes')
        .doc(this.$route.params.id)
        .set(this.getRecipe())
      this.goBack()
    },
    save() {
      if (!this.$refs.form.validate()) return alert('Campos inválidos')
      if (this.isNew) {
        this.create()
      } else {
        this.update()
      }
    }
  }
}
</script>
