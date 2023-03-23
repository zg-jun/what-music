import React from "react";
import Slider from "../../components/slider";

function Recommend() {
  // mock
  const bannerList = Array(5)
    .fill({})
    .map((item) => {
      return {
        imageUrl:
          "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
      };
    });

  return (
    <div>
      <Slider bannerList={bannerList} />
    </div>
  );
}

export default React.memo(Recommend);
