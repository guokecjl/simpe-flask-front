<template>
  <div>
    <div id="base">
      <div class="side">
      </div>
      <div class="content-outter">
        <div class="content">
          <div class="lang-change">
            <div class="lang-item">
              <img src="../assets/img/flag-cn.png" alt="chinese"
                   class="flag">
              <span>简体中文</span>
            </div>
          </div>
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

  .side {
    width: 420px;
    display: inline-flex;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 22;
    background: #42b983;
    left: 0px;
  }

  .content-outter {
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .content {
    padding-left: 420px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    @height: 40px;
    min-height: 100vh;
    padding-bottom: 40px;
    flex-direction: column;
  }

  .lang-change {
    width: 100%;
    text-align: right;
    position: fixed;
    top: 40px;
    right: 32px;

    .flag {
      width: 20px;
      vertical-align: middle;
      margin-right: 14px;
    }

    .lang-item {
      height: 34px;
      line-height: 34px;
      padding: 0 8px;
      cursor: pointer;

      &:hover {
        background: #EDF1F8;
        border-radius: 3px;
      }
    }
  }

  .copyright {
    @left: 420px;
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
