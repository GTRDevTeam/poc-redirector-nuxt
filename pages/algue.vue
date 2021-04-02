<template>
  <div id="app" style="text-align:center;">
    {{ d }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  props: {
    msg: String
  },
  data: () => ({
    d: ''
  }),
  created(){
    if(process.browser){
      const url = '/.netlify/functions/mapalgolia'
      axios.get(url)
      .then(res => {
        this.d = res.data
      })
      .catch(err => console.error(err))
    }
  },
  head(){
    return {
      title: '',
      meta: [
         {
            hid: 'prerender-status-code',
            name: 'prerender-status-code',
            content: '301',
          },
      ]
    }
  }
}
</script>

