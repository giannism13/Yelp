import ImageGallery from 'react-image-gallery';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const ImagesHolder = (props) => {
    const { images, ...rest } = props;

    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
    };

    return (<Slider {...settings}>
        {images.map((img, idx) =>
            <div className="h-full w-full" key={`img-${idx}`} >
                <div style={{ backgroundImage: `url(${img.original}`, height: "500px" }} className="bg-gray-100 bg-center bg-contain  bg-no-repeat w-full" />
            </div>
        )}

    </Slider>);
}

export default ImagesHolder