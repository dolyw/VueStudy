<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    let t = this
    t.$axios.get('https://note.wang64.cn/about/', {})
      .then(response => {
        console.log(response.data)
        const $ = t.$cheerio.load(response.data)
        var list = []
        $('.post-body').each((index, item) => {
          const tmpData = {
            text: $(item).find('p').text().trim()
          }
          list.push(tmpData)
        })
        console.log(list)
        t.msg = list[0].text
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => {
        // always executed
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
