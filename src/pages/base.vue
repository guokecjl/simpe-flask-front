<template>
  <div>
    <div id="base">
      <div class="content-outter">
        <div class="content">
          <router-view></router-view>
        </div>
        <p class="copyright" v-on:click="reverseMessage">{{message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Base',
        data() {
            return {
                message: 'Copyright © 2019 XIDIAN'
            }
        },
        methods: {
            reverseMessage: function () {
                this.message = this.message.split('').reverse().join('')
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
  #base {
    width: 100%;
    position: relative;
  }
  .content-outter {
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    @height: 40px;
    min-height: 100vh;
    padding-bottom: 40px;
    flex-direction: column;
  }


  .copyright {
    @left: 0px;
    position: fixed;
    left: @left;
    bottom: 22px;
    color: #002059;
    opacity: 0.2;
    text-align: center;
    width: calc(~'100% - @{left}');
  }

  @media screen and (max-width: 1000px) {
    .side {
      display: none;
    }

    .content {
      padding-left: 0;
      width: 100%;
    }

    .copyright {
      left: 0;
      width: 100%;
    }
  }

</style>
