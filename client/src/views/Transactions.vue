<template>
  <div class="home">
    <TransactionsList/>
  </div>
</template>

<script>
// @ is an alias to /src
import TransactionsList from '@/components/TransactionsList.vue'

export default {
  name: 'Transactions',
  components: {
    TransactionsList
  }
}
</script>
