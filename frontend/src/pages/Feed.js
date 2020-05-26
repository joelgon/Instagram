import React, {Component} from 'react'
import io from 'socket.io-client'

import api from '../services/api'

import './Feed.css'

import more from '../assets/more.jpg'
import like from '../assets/coraçao.png'
import comment from '../assets/comment.png'
import send from '../assets/send1.png'

export default class Feed extends Component {
    state = {
        feed: [],
    }
    
    async componentDidMount()  {
        this.registerToSocket()

        const response = await api.get('posts')

        this.setState({ feed: response.data })
    }
    
    registerToSocket = () => {
        const socket = io('http://localhost:3333')

        socket.on('post', newPost => {
            this.setState({feed: [newPost, ...this.state.feed]})
        })

        socket.on('like', likedPost => {
            this.setState({ feed: this.state.feed.map(
                post => post._id === likedPost._id ? likedPost : post
            ) })
        })
    }

    handleLike = async id => {
        await api.post(`/posts/${id}/like`)
    }

    render(){
        return(
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id} >
                        <header>
                            <div className="user-info">
                                <span> <b> { post.author } </b> </span>
                                <span className="place"> { post.place } </span>
                            </div>

                            <img src={more} alt="Mais" width="30px"/>
                        </header>

                        <img src={`http://localhost:3333/files/${post.image}`} alt="" />

                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt="" width="35px"/>
                                </button>
                                <img src={comment} alt="" width="40px" />
                                <img src={send} alt="" width="35px" />
                            </div>
                            <strong> { post.likes } curtidas</strong>
                            <p> { post.description } <span> { post.hashtags } </span></p>
                        </footer>
                    </article>
                )) }
            </section>
        )
    }
}