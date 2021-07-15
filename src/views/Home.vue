<template>
  <div class="home">
    <!--   <div class="feature-card">-->
    <!--     <router-link to="/movie/tt0409591">-->
    <!--       <img src="https://static.wikia.nocookie.net/naruto/images/d/dd/Naruto_Uzumaki%21%21.png" alt="Naruto Poster " class="featured-img" />-->
    <!--       <div class="detail">-->
    <!--         <h3>Naruto</h3>-->
    <!--         <p>Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.</p>-->
    <!--       </div>-->
    <!--     </router-link>-->
    <!--   </div>-->

    <form @submit.prevent="searchMovies()" class="search-box">
<!--      <input type="button" value="get year" onclick="filterByYear()">-->
      <v-btn @click="filterByYear()" class="search-box">pick your year</v-btn>
      <select v-model="year">
        <option>(1979)</option>
        <option>(1980)</option>
        <option>(1981)</option>
        <option>(1982)</option>
        <option>(1983)</option>
        <option>(1984)</option>
        <option>(1985)</option>
        <option>(1986)</option>
        <option>(1987)</option>
        <option>(1988)</option>
        <option>(1989)</option>
        <option>(1990)</option>
        <option>(1991)</option>
        <option>(1992)</option>
        <option>(1993)</option>
        <option>(1994)</option>
        <option>(1995)</option>
        <option>(1996)</option>
        <option>(1997)</option>
        <option>(1998)</option>
        <option>(1999)</option>
        <option>(2000)</option>
        <option>(2001)</option>
        <option>(2002)</option>
        <option>(2003)</option>
        <option>(2004)</option>
        <option>(2005)</option>
        <option>(2006)</option>
        <option>(2007)</option>
        <option>(2008)</option>
        <option>(2009)</option>
        <option>(2010)</option>
        <option>(2011)</option>
        <option>(2012)</option>
        <option>(2013)</option>
        <option>(2014)</option>
        <option>(2015)</option>
        <option>(2016)</option>
        <option>(2017)</option>
        <option>(2018)</option>
        <option>(2019)</option>
        <option>(2020)</option>


      </select>


      <input type="text" placeholder="look for a title" v-model="search">
      <input type="submit" value="search"/>
    </form>
    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.id">

        <router-link :to="'/movie/'+ movie.id" class="movie-link">
          <div class="movie-img">
            <img :src="movie.image" alt="movie poster"/>
            <div class="type">{{ movie.type }}</div>

          </div>
          <div class="detail">
            <p class="y">{{ movie.description }}</p>
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
      year: '',
      movies: [],
      movie: {},
      search: ''
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

    searchMovies(){
      if(this.search !== ''){
        axios.get(`https://imdb-api.com/en/API/Search/${env.apikey}/${this.search}`).then(res => {
          this.movies = res.data.results;
          this.search = '';
          console.log(this.movies)
        })
      }
    }

    // SearchMovies() {
    //   if (search.value != "") {
    //     axios.get(`https://imdb-api.com/en/API/Search/${env.apikey}/${search.value}`)
    //         .then(response => {
    //           let mov = response.data.results;
    //
    //           movies.value = mov;
    //           search.value = "";
    //           console.log(movies)
    //         });
    //   }
    // },


    // setup() {
    //   let year = ref("");
    //   const search = ref("");
    //   let movies = ref([]);
    //  axios.get(`https://imdb-api.com/en/API/Search/${env.apikey}/${search.value}`)
    // .then(res =>res.json())
    // .then(data=>{
    //   console.log(res.data);
    //
    //     movies.value= res.filter(x=>x.Year==data.year);
    //     search.value="";
    // });
    //     }
    //
    //   }
    //   // return {
    //   //   search,
    //   //   movies,
    //   //   SearchMovies
    //   //
    //   // }
    // }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

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