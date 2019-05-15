import React from 'react';

import { img1, img2, img3, img4 } from '../../images';
import "./photoG.css"

class PhotoG extends React.Component {
    constructor() {
        super();
        this.delay = 3000;
        //move to mock? yes
        this.images = [
            { url: img1, color: '#b37968', comment: 'Снігурчик, давно їх не бачила' },
            { url: img2, color: '#2b2c2f', comment: 'Моя голова, як брекети ставила робила' },
            { url: img3, color: '#04656c', comment: 'Крісло королівське, в креденсі такі є, хочу собі' },
            { url: img4, color: '#2b2c2f', comment: 'Лампа, просто класна лапма' }
        ];
        this.activeImageIndex = 0;
        this.state = {
            activeImage: {}
        }
    }

    componentDidMount() {
        if (this.images && this.images.length) {
            this.images.forEach(image => {
                image.viewCount = 0;
            });
            this.setImageAndInterval();
        }
    }

    componentWillUnmount() {
        clearInterval(this.setActiveImageInterval);
    }

    setImage = (index) => {
        this.activeImageIndex = index;
        this.setImageAndInterval();
    }

    setImageAndInterval = () => {
        if (this.setActiveImageInterval) {
            clearInterval(this.setActiveImageInterval);
        }
        this.setActiveImage();
        this.setActiveImageInterval = setInterval(this.setActiveImage, this.delay);
    }

    setActiveImage = () => {
        let image = this.images[this.activeImageIndex++];
        image.viewCount++;
        this.setState({
            activeImage: image
        });

        if (this.activeImageIndex === this.images.length) {
            this.activeImageIndex = 0;
        }
    }

    render() {
        const { activeImage } = this.state;

        return (
            <div id="photoG" style={{ color: activeImage.color }} >
                <div className="image" style={{ backgroundImage: "url(" + activeImage.url + ")" }}></div>
                <div className="view-count-container">
                    <div className="view-count">
                        {activeImage.viewCount}
                    </div>
                </div>
                <div className="comment-container">
                    <div className="comment">
                        {activeImage.comment}
                    </div>
                </div>
                <div className="controls-container">
                    {
                        this.images.map((image, index) => (
                            <div
                                className="img-button"
                                key={index}
                                onClick={() => this.setImage(index)}>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default PhotoG;