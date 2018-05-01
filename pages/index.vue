<template lang="pug">
  div
    pre {{ recipes }}
</template>

<script>
import { db } from '~/plugins/firestore'
export default {
  data: () => ({
    recipes: []
  }),
  firestore() {
    return {
      recipes: db.collection('recipes').orderBy('createdAt')
    }
  }
}
</script>

