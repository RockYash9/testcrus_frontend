"use client"
import React from 'react'
import './ProfilePage.css'

const page = () => {
    const [bookings, setBookings] = React.useState<any>(null)
    const [user, setUser] = React.useState<any>(null)

    const getBookings = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/getuserbookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'

        })
        .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    // Filter out null entries and bookings with a null or undefined movieId
                    const validBookings = data.data.filter((booking: any) => booking && booking.movieId !== null && booking.movieId !== undefined);
                    setBookings(validBookings);
                } else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getUserData = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setUser(data.data)
                } else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getBookings()
        getUserData()
    }, [])

    return (
        <div className='profile'>
            <h1 className='head'>Profile</h1>
            <div className='user'>
                <h2>User Details</h2>
                <div className='details'>
                    <div className='detail'>
                        <h3>Name</h3>
                        <p>{user?.name}</p>
                    </div>
                    <div className='detail'>
                        <h3>Email</h3>
                        <p>{user?.email}</p>
                    </div>

                    <div className='detail'>
                        <h3>City</h3>
                        <p>{user?.city}</p>
                    </div>
                </div>
            </div>

            <div className='bookings'>
                <h2>Bookings</h2>
                <div className='details'>
                    {
                        bookings?.map((booking: any) => {
                            return (
                                <div className='booking' key={booking._id}>
                                    <div className='detail'>
                                        <h3>Movie</h3>
                                        <p>{booking.movieId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Screen</h3>
                                        <p>{booking.screenId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Seats</h3>
                                        <p>{booking.seats.map((seat: any, index: any) => {
                                            return (
                                                <span key={index}>
                                                    {seat.row}{seat.col}{seat.seat_id}, 
                                                </span>
                                            )
                                        })}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Price</h3>
                                        <p>{booking.totalPrice}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Payment Type</h3>
                                        <p>{booking.paymentType}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Payment Id</h3>
                                        <p>{booking.paymentId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Show Date</h3>
                                        <p>{booking.showDate}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Show Time</h3>
                                        <p>{booking.showTime}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default page
