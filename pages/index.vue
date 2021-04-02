<template>
  <div id="app" style="text-align:center;">
    <img src="https://flevix.com/wp-content/uploads/2019/07/Ring-Loading-1.gif" alt="redirecting">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  props: {
    msg: String
  },
  created(){
    if(process.browser){
      const url = '/.netlify/functions/map'
      axios.get(url)
      .then(res => {
        window.location.href = res.data
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

