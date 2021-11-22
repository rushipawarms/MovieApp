import React, { Component } from 'react'
import { movies } from './MoviesData'
export default class Poster extends Component {
    render() {
        let movie=movies.results[0];
        return (
            <>
            {
                movie==''?
                <div class="spinner-grow text-primary" role="status">
                <span class="sr-only"></span>
              </div>
                :
                <div>
                <div className="card poster-card" >
                    <img className="card-img-top poster-image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="Card image cap"/>
                    <div className="card-body ">
                        <h1 className="card-title poster-title">{movie.original_title}</h1>
                        <p className="card-text poster-text">{movie.overview}</p>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
            </div>
            }
           

            </>

           
        )
    }
}
