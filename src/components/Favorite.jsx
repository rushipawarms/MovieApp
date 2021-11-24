import React, { Component } from 'react'
 import { movies } from './MoviesData'

export default class Favorite extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currentGenre:'All Genres',
            movies:[],
            currentSearch:'',
            limit:5,
            currentpage:1
        }
    }
    componentDidMount()
    {
       let data=JSON.parse(localStorage.getItem('movies')||"[]")
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let temp=[];
        data.forEach((obj) => {
            if(!(temp.includes(genreids[ obj.genre_ids[0]])))
            {
                temp.push(genreids[ obj.genre_ids[0]]);
            }
            
        });
        temp.unshift("All Genres"); 
        this.setState({
            genres:[...temp],
            movies:[...data]

        })
    }
    handleGenre=(genre)=>{
        this.setState({
            currentGenre:genre
        })
    }
    handleSearch=(text)=>{
      
        this.setState({
            currentSearch:text
        })
    }
    popularityDes=()=>{
        let items=[...this.state.movies];
        items.sort(function (a, b) {
            return b.popularity-a.popularity ;
          });
          this.setState({
              movies:[...items]
          })
    }
    popularityAsc=()=>{
        let items=[...this.state.movies];
        items.sort(function (a, b) {
            return a.popularity-b.popularity ;
          });
          this.setState({
              movies:[...items]
          })
    }
    ratingDes=()=>{
        let items=[...this.state.movies];
        items.sort(function (a, b) {
            return b.vote_average-a.vote_average ;
          });
          this.setState({
              movies:[...items]
          })
    }
    ratingAsc=()=>{
        let items=[...this.state.movies];
        items.sort(function (a, b) {
            return a.vote_average-b.vote_average ;
          });
          this.setState({
              movies:[...items]
          })
    }
    handlePage=(page)=>{
        this.setState({
            currentpage:page
        })

    }
    handleLimit=(value)=>{
        this.setState({
            limit:value
        })
    }
    handleDelete=(moivie)=>{
        let movieAfterDelete=[];
        movieAfterDelete=this.state.movies.filter((movieobj)=>{
            return movieobj.id!=moivie.id
        })
        this.setState({
            movies:[...movieAfterDelete]
        })
        localStorage.setItem('movies',JSON.stringify(movieAfterDelete))
        
    }
    render() {
        // let movie=movies.results;
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        // let temp=[];
        // movie.forEach((obj) => {
        //     if(!(temp.includes(genreids[ obj.genre_ids[0]])))
        //     {
        //         temp.push(genreids[ obj.genre_ids[0]]);
        //     }
            
        // });
        // temp.unshift("All Genres");
        // console.log(temp);
        let filterArray=[];
        if(this.state.currentSearch==='')
        {
              filterArray=[...this.state.movies];
        }
        else{
            filterArray=this.state.movies.filter((movieObj)=>{
                let title=movieObj.original_title.toLowerCase();
                console.log(title);
                return title.includes(this.state.currentSearch.toLowerCase())
            })
        }
       //console.log(filterArray);
        if(this.state.currentGenre!="All Genres")
        {
            filterArray=this.state.movies.filter((movObj)=>{
                return genreids[movObj.genre_ids[0]]==this.state.currentGenre
            })
              if(this.state.currentSearch==='')
        {
              filterArray=[...filterArray];
        }
        else{
            filterArray=filterArray.filter((movieObj)=>{
                let title=movieObj.original_title.toLowerCase();
                console.log(title);
                return title.includes(this.state.currentSearch.toLowerCase())
            })
        }
        }
        console.log(filterArray.length);
        let pages=Math.ceil(filterArray.length/this.state.limit);
        console.log(pages);
        let pageArray=[];
        for(let i=1;i<=pages;i++)
        {
            pageArray.push(i);
        }
        console.log(pageArray);
        let si=(this.state.currentpage-1)*this.state.limit;
        let li=si+(this.state.limit);
        filterArray=filterArray.slice(si,li);
        
        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12 "> 
                                <ul class="list-group fav-generes">
                                    {
                                        this.state.genres.map((obj)=>{
                                            return(
                                                    this.state.currentGenre==obj?
                                                    <li class="list-group-item" style={{background:'lightblue', fontWeight:'bold',}}>{obj}</li>
                                                    :<li class="list-group-item" onClick={()=>this.handleGenre(obj)} >{obj}</li>
                                            )
                                        })
                                    }
                                   
                                </ul>
                            </div>
                            <div className="col-lg-9 col-sm-12 fav-table"> 
                                <div className="row">
                                <input type="text" className="input-group-text col" value={this.state.currentSearch} onChange={(e)=>this.handleSearch(e.target.value)} placeholder="Search" />
                                <input type="Number" className="input-group-number col" value={this.state.limit} onChange={(e)=>this.handleLimit(e.target.value)} placeholder="Movies count on page"/>
                                </div>
                                <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.popularityDes}></i>Popularity<i class="fas fa-sort-down" onClick={this.popularityAsc}></i></th>
                                         <th scope="col"><i class="fas fa-sort-up" onClick={this.ratingDes} ></i>Rating<i class="fas fa-sort-down"onClick={this.ratingAsc} ></i></th>
                                          <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArray.map((movieObj)=>{
                                                return(
                                                    <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'4rem'}}/> {movieObj.original_title}</td>
                                                    <td>{genreids[ movieObj.genre_ids[0]]}</td>
                                                    <td>{ movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj)}>Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    </table>
                                </div>
                                    <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pageArray.map((page)=>{
                                                return(
                                                    <li class="page-item"><a class="page-link" onClick={()=>this.handlePage(page)}>{page}</a></li>
                                                )
                                            })
                                             
                                        }
                                       
                                    </ul>
                                    </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
