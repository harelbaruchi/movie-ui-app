<template>
  <div class="feature-card">

      <img :src="'https://image.tmdb.org/t/p/original/'+movie.poster_path" alt="movie Poster " class="featured-img" />
      <div class="detail">
        <h3>{{movie.title}}</h3>
        <p>{{movie.overview}}</p>
      </div>

  </div>

 <v-input type="button" onclick="history.go(-1)">Back to search</v-input>
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

      fetch(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${env.apikey}&language=en-US`)
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