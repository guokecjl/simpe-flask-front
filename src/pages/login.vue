<template>
  <div>
    <input type="button">
    <div id="card">
      <Form-item prop="emial">
        <InputField icon="icon-email" type="email">
          <span slot="prepend"></span>
        </InputField>
      </Form-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">

</style>
