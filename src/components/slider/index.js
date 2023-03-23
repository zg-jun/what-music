import React, { memo, useEffect, useState } from "react";
import { SliderContainer } from "./style";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

const Slider = (props) => {
  const { bannerList } = props;

  const [sliderSwiper, setSliderSwiper] = useState(null);

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: ".swiper-pagination" },
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((item) => {
            return (
              <div className="swiper-slide" key={item.imageUrl}>
                <div className="slider-nav">
                  <img
                    src={item.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
};

export default memo(Slider);
