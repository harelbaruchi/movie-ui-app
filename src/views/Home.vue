<template>
  <div class="home">

    <form @submit.prevent="searchMovies()" class="search-box">
<!--      <input type="button" value="get year" onclick="filterByYear()">-->
<!--      <v-btn @onClick ="filterByYear()"-->
<!--             elevation="2"-->
<!--             outlined-->
<!--      >pick your year</v-btn>-->

       <div class="row">

         <div class="col-3 col-md-4">
           <q-select outlined v-model="searchOption" :options="searchOptions" @change="loadYears()" label="find movie by" />
         </div>
         <div class="col-3 col-md-4">
           <q-input filled type="text" v-model="search" placeholder="search term" />
<!--           <input type="text" placeholder="look for a title" v-model="search">-->

         </div>
         <div class="col-3 col-md-4" v-if="this.searchOption=='movie'">

           <q-select  v-model="yearOption" :options="yearOptions" id="selectYear" label="pick Year" >


           </q-select>


         </div>
         <div class="col-3 col-md-4">

         </div>



       </div>


      <q-input type="submit" value="search"/>
    </form>
    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.id">

        <router-link :to="'/movie/'+ movie.id" class="movie-link">
          <div class="movie-img">

            <img :src="'https://image.tmdb.org/t/p/original/'+movie.poster_path" alt="movie poster"/>
            <div class="type">{{ movie.type }}</div>

          </div>
          <div class="detail">
            <p class="y">{{ movie.release_date }}</p>
            <h3>{{ movie.title }}</h3>
          </div>

        </router-link>

      </div>
    </div>


  </div>
</template>

<script>

// import {ref} from 'vue';

const axios = require('axios');
import env from '/src/env.js'

export default {

  data() {
    return {
      searchOption: '',
      yearOption: '',
      option: '',
      posterUrl: '',
      movieId: [],
      moviesFiltered: [],
      movies: [],
      movie: {},
      search: '',
      searchOptions: ['actor', 'director', 'movie'
      ],
      director: ''

    }
  },
  methods: {

filterByYear() {
      const filteredArr = [];
      this.movies.forEach(movie => {
        if (movie.description.includes(this.year)) {
          filteredArr.push(movie)
        }
      })
      this.movies = filteredArr;
      console.log('morty you little piece of shit')
    },

    searchMovies() {
      if (this.search !== '') {
        if (this.searchOption == 'director') {//if the user chose director

          axios.get(`https://api.themoviedb.org/3/search/person?api_key=${env.apikey}&language=en-US&page=1&include_adult=false&query=${this.search}`)
              .then(res => {
                this.moviesFiltered = res.data.results.filter(x => x.known_for_department = "directing");
                this.search = '';
                this.movies = this.moviesFiltered[0].known_for;


              })
        } else if (this.searchOption == 'actor') { //if the user chose actor
          axios.get(`https://api.themoviedb.org/3/search/person?api_key=${env.apikey}&language=en-US&page=1&include_adult=false&query=${this.search}`)
              .then(res => {
                this.moviesFiltered = res.data.results.filter(x => x.known_for_department = "acting");
                this.search = '';
                this.movies = this.moviesFiltered[0].known_for;
              })
        } else if (this.searchOption == 'movie') {// if the user chose Movie search

          axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${env.apikey}&language=en-US&page=1&include_adult=false&query=${this.search}`)
              .then(res => {
                if(this.yearOption==''){
                  this.search='';
                  this.movies = res.data.results;
                }else{
                  this.search='';
                  console.log(res.data.results);
                  this.movies=res.data.results.filter(x=>x.release_date.includes(this.yearOption))
                }

              })


        }
      }


    }
  },
  computed:{
    urlImage :()=>{
      return 'https://image.tmdb.org/t/p/original/'+this.posterUrl
    },
    yearOptions:()=> {
      let years=[];
      for(let i=1900; i<2023; i++){
        years.push(i);
      }
      return years
    }

  }

}
</script>
<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;
      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: white;
        margin-bottom: 16px;
      }

      p {
        color: white;
      }
    }
  }

  .search-box {



    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: white;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42b883;
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3B8070;
        }
      }
    }

  }

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;

    .movie {
      max-width: 50%;
      flex: 1 1 50%;
      padding: 16px 8px;

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .movie-img {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            height: 275px;
            object-fit: cover;
          }

          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42B883;
            color: #fff;
            bottom: 16px;
            left: 0px;
            text-transform: capitalize;
          }
        }

        .detail {
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .y {
            color: #AAA;
            font-size: 16px;
          }

          h3 {
            color: white;
            font-weight: 600;
            font-size: 18px;
          }

        }
      }
    }
  }
}

</style>