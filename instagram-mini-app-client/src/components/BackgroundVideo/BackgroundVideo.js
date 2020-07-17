import React from 'react';

import classes from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
    const videoSource = "https://www.w3schools.com/tags/movie.mp4"
    return (
        <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    <h1>Instagram</h1>
                    <p>Duplicate of Instagram as a Mini Project</p>
                    <button type="button" className="btn btn-outline-dark">sign up</button>
                    <button type="button" className="btn btn-outline-dark">sign in</button>
                    <img
                        src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        alt="profile" />
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo