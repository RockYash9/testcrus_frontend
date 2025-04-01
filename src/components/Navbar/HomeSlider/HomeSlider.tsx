import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from 'next/image';

const width = window.innerWidth;
const height = window.innerHeight;
const HomeSlider = () => {

    const [banners, setBanners] = useState([
        {
            imgUrl: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1729153882466_web10.jpg'
        },
        
        {
            imgUrl: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1728295167844_webshowcase1240x300.jpg'
        },
        {
            imgUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/jigra-et00370844-1728285023.jpg'
        },
        {
            imgUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/vicky-vidya-ka-woh-wala-video-et00395211-1727072634.jpg'
        },
        {
            imgUrl: 'https://th.bing.com/th?id=OIP.au6xK9NEc3k7bHpmVtSvBQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
        }
    ])
  return (
    <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
       {
            banners.map((banner,index) =>{
                return (
                    <SwiperSlide key={index}>
                        <Image src={banner.imgUrl} alt="" width={width} height={height/2}
                            style={{
                                objectFit: "cover"
                            }} />
                    </SwiperSlide>
                )
            })
       }
      </Swiper>
      
  )
}

export default HomeSlider