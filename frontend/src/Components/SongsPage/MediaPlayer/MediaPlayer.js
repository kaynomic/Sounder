import React from 'react';
import './MediaPlayer.css';
// import ReactPlayer from 'react-player'

export default function MediaPlayer() {



    return (
        <>
            {/* <ReactPlayer url='https://soundcloud.com/miami-nights-1984/accelerated' /> */}
            <div className="media-container">
                {/* add song */}

                {/* <div className="widget-container">
                    <MediaPlayer />
                </div> */}

                <section className="media-info">
                    <div className="media-info-content">
                        {/* {song.name}
                        {song.artist} */}
                        <span>
                            Song
                        </span>
                        <span>
                            Artist
                        </span>
                    </div>
                    <div>
                        <i class="fa-regular fa-heart fa-xl"></i>
                    </div>
                </section>
                <section className="media-controller-container">
                    <div className="media-controller">
                        <span>
                            <i class="fa-solid fa-shuffle fa-xl"></i>
                        </span>
                        <span>
                            <i class="fa-solid fa-backward fa-xl"></i>
                        </span>
                        <span className="fa-play-container">
                            <i class="fa-solid fa-play fa-xl"></i>
                        </span>
                        <span>
                            <i class="fa-solid fa-forward fa-xl"></i>
                        </span>
                        <span>
                            <i class="fa-solid fa-repeat fa-xl"></i>
                        </span>
                    </div>

                </section>
                <section className="media-volume">
                    <div>
                        <span>
                            <i class="fa-solid fa-volume-high fa-xl"></i>
                        </span>
                        <span className="volume-slider-container">
                            <input className="volume-slider" type="range" min="-10" max="10" />
                        </span>
                        <span>
                            <i class="fa-solid fa-up-right-and-down-left-from-center fa-xl"></i>
                        </span>
                    </div>
                </section>
            </div>
        </>
    )
}
