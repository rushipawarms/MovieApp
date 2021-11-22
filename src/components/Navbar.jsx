import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div style= {{display:"flex", padding:'1rem'}}>
                <h1>Movies App</h1>
                <h2 style={{marginLeft:'2rem'}}>Favorite</h2>
            </div>
        )
    }
}
