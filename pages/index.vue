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
  mounted(){
    if(process.browser){
      console.log('bro')
      const instance = window.location.host.split('.dev')[0]
      let from = window.location.href.split('/')[window.location.href.split('/').length -1]
      const url = '/.netlify/functions/map'
      axios.get(`${url}?from=${from}&instance=${instance}`)
      .then(res => {
        res;
        window.location.href = res.data
      })
      .catch(err => console.error(err))
    }
    else {
      console.info('no bro :(')
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

