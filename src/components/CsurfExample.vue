<template>
  <div>
    Hi here
    <div>
      <button @click="firstQuery">First</button> {{ first }}
    </div>
    <div>
      <button @click="secondQuery">Second</button> {{ second }}
    </div>
    {{ csrfToken }}
    <div>
      <button @click="thirdQuery">Third</button> {{ third }}
    </div>
    <div>
      <button @click="clear">Clear</button>
    </div>
  </div>
</template>

<script>
const url = 'http://localhost:3000/'
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
}
export default {
  name: 'CsurfExample',
  data() {
    return {
      first: '',
      second: '',
      third: '',
      csrfToken: ''
    }
  },
  methods: {
    async firstQuery() {
      const response = await fetch(`${url}first`)
      this.first = await response.text()
    },
    async secondQuery() {
      const response = await fetch(`${url}second`,{
        methods: 'GET',
        headers
      })
      this.second = await response.json()
      this.csrfToken = this.second.csrfToken
    },
    async thirdQuery() {
      const response = await fetch(`${url}third`,{
        method: 'POST',
        headers: {
          ...headers,
          "CSRF-Token": this.csrfToken
        },
        credentials: "same-origin",
        mode: "cors"
      })
      this.third = await response.text()
    },
    clear() {
      this.first = '';
      this.second = '';
      this.third = '';
      this.csrfToken = '';
    }
  }
}
</script>
