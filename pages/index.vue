<template>
  <div>
    <pre>
      {{ recipes }}
    </pre>
  </div>
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

