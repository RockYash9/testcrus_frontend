import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { MovieCardType } from '@/types/types';
import Moviecard from './MovieCard';

const MovieCarousel = () => {

    

    const [movies, setMovies] = React.useState<MovieCardType[]>([])
    const [user, setUser] = React.useState<any>(null)
    const getMovies = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => res.json())
            .then((data) => {
                if(data.ok){
                    //console.log(data)
                    setMovies(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getUser = async () => {

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            if(response.ok) {
                setUser(response.data)
                
            }
            else
            {
                window.location.href = '/auth/signin'

            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    React.useEffect(() => {
        getMovies()
        getUser()
    }, [])

  return (
    <div className='sliderout'>
        <Swiper
                slidesPerView={1}
                spaceBetween={1}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 2,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 2,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 2,
                    },
                    '@1.50': {
                        slidesPerView: 6,
                        spaceBetween: 2,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    movies.map((movie) => {
                        return (
                            <SwiperSlide >
                                <Moviecard  
                                movie={movie}
                                user={user}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
    </div>
  )
}

export default MovieCarousel