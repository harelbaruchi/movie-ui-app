<template>
  <div class="feature-card">

      <img :src="movie.Poster" alt="movie Poster " class="featured-img" />
      <div class="detail">
        <h3>{{movie.Title}}</h3>
        <p>{{movie.Plot}}</p>
      </div>

  </div>
  <v-btn
      elevation="2"
      to="/"
  ></v-btn>
</template>

<script>
import {ref, onBeforeMount} from "vue";
import {useRoute} from "vue-router"
import env from '/src/env.js'



export default {
  setup(){
    const movie=ref({});
    const route= useRoute();

    onBeforeMount(()=>{
      fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`)
      .then(response=>response.json())
      .then(data=>{
        movie.value= data;
      });
    });
    return{
      movie
    }
  }
}
</script>

<style lang="scss">
.feature-card{
  position: relative;
  .featured-img{
    display: block;
    width: 100%;
    height: 300px;
    object-fit: cover;
    position: relative;
    z-index: 0;
  }
  .detail{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0,0.6);
    padding: 16px;
    z-index: 1;
    h3{
      color: white;
      margin-bottom: 16px;
    }
    p{
      color: white;
    }
  }
}
</style>