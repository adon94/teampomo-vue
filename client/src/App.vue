<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'app',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Tiger Time',
    // all titles will be injected into this template
    titleTemplate: '%s | Home',
  },
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /* color: #2c3e50; */
    /* margin-top: 60px; */
}
a:focus, a:hover {
	text-decoration: none;
}
.btn-outline-white {
    color: #ffffff;
    background-color: transparent;
    background-image: none;
    border-color: #ffffff;
}
.btn-outline-white:hover {
    color: #e67e22;
    background-color: #ffffff;
    border-color: #ffffff;
}
.btn-outline-white:focus, .btn-outline-white.focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5);
}
.btn-outline-orange {
    color: #e67e22;
    background-color: transparent;
    background-image: none;
    border-color: #e67e22;
}
.btn-outline-orange:hover {
    color: #ffffff;
    background-color: #e67e22;
    border-color: #e67e22;
}
.btn-outline-orange:focus, .btn-outline-orange.focus {
    box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.5);
}
</style>
