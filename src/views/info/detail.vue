<template>
  <div class="">
    {{data.id}}
    {{data.row}}
    
  </div>

</template>

<script>
import { reactive, onMounted, ref, watch } from "@vue/composition-api";
export default {
  name: '',
  setup(props, { root }) {
    const data = reactive({
      id: root.$route.params.id,
      row: root.$route.params.row || JSON.parse(root.$store.getters["Info/info"]),
    })
    onMounted(() => {
      
      console.log(data.row.title)
    })

    return {
      data
    }
  }
}
</script>

<style scoped>

</style>