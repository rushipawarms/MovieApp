import React, { Component } from 'react'
// import { movies } from './MoviesData'
import axios from 'axios'
let datat=[];
export default class Movies extends Component {
    
    constructor(){
        super();
        console.log("constructor called");
        this.state={
            hover:'',
            parr:[1],
            currentPage:1,
            Movie:[],
            favorite:[],
            data:[]
        }
    }
    async componentDidMount()
    {
       let responce= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=aba699ebc454a31d2112881a91615079&language=en-US&page=${this.state.currentPage}`)
       let data=responce.data
       console.log(data);
       this.setState({
           Movie:[...data.results]
       })
    }
    changeMovie=async()=>{
        let responce= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=aba699ebc454a31d2112881a91615079&language=en-US&page=${this.state.currentPage}`)
       let data=responce.data
       console.log(data);
       this.setState({
           Movie:[...data.results]
       })
    }
    nextPage=()=>{
        
        let temp=[];
        for(let i=1;i<=this.state.parr.length+1;i++){
            temp.push(i);
        }
        this.setState({
            parr:[...temp],
            currentPage:this.state.currentPage+1
        } ,this.changeMovie)
    }
    previousPage=()=>{
        if(this.state.currentPage>1)
        {
            this.setState({
                currentPage:this.state.currentPage-1
            },this.changeMovie)
        }
    }
    handleClick=(value)=>{
        if(this.state.currentPage!=value)
        {
            this.setState({
                currentPage:value
            },this.changeMovie)
        }
    }
    
    handleFavorite=(movie)=>{
        let olddata=JSON.parse(localStorage.getItem('movies') || "[]")
        if(this.state.favorite.includes(movie.id))
        {
            olddata=olddata.filter((m)=>m.id!=movie.id)
        }
        else{
            olddata.push(movie);
        }
        localStorage.setItem('movies',JSON.stringify(olddata))
        let temp=olddata.map((m)=>m.id)
     this.setState({
         favorite:[...temp]
     })
     
    }
    render() {
        // let movie=movies.results;
    //    console.log("render called");
        return (
            <>
            {
                this.state.Movie.length==0?
                <div class="spinner-border m-5" role="status">
                <span class="sr-only"></span>
              </div>:
            <div>
                <h3 style={{display:'flex', justifyContent:'center'}}>Treanding</h3>
                <div className="movies-list" >
                    {
                        this.state.Movie.map((obj)=>{
                            return(
                                <div className="card movies-card" onMouseEnter={()=>this.setState({hover:obj.id})} onMouseLeave={()=>this.setState({hover:''})} >
                                <img className="card-img-top movies-image" src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`} style={{height:'40vh'}} alt="Card image cap"/>
                                <div className="card-body ">
                                    <h5 className="card-title movies-title">{obj.original_title}</h5>
                                    {/* <p className="card-text moivie-text">{obj.overview}</p> */}
                                    <div className="buttonWrapper">
                                        {
                                            this.state.hover==obj.id &&
                                             <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavorite(obj)}>{this.state.favorite.includes(obj.id)? "Remove from favorite": "Add to Favorite"}</a>
                                        }
                                   
                                    </div>
                                    
                                </div>
                            </div>
                            )
                        })
                        
                    }
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a class="page-link" onClick={this.previousPage}>Previous</a></li>
                        {
                            this.state.parr.map((value)=>{
                                return(
                                    <li className="page-item"><a class="page-link" onClick={()=>this.handleClick(value)} >{value}</a></li>
                                )
                            })
                        }
                        
                        
                        <li class="page-item"><a class="page-link" onClick={this.nextPage} >Next</a></li>
                    </ul>
                </nav>
                </div>
            </div>
         }
          </>  
        )
    }
}
