"use client"
import React from 'react'
import '../Popup.css'
import { toast } from 'react-toastify'
const LocationPopup = (
    {
        setShowLocationPopup
    }: {
        setShowLocationPopup: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {
    const [cities, setCities] = React.useState<any[]>([])

    const getcities = async () => {
        const indianCities = [
            "Jabalpur",
            "Mumbai",
            "Delhi",
            "Bangalore",
            "Hyderabad",
            "Chennai",
            "Kolkata",
            "Pune",
            "Ahmedabad",
            "Jaipur",
            "Surat",
            "Lucknow",
            "Kanpur",
            "Nagpur",
            "Indore",
            "Thane",
            "Bhopal",
            "Visakhapatnam",
            "Pimpri-Chinchwad",
            "Patna",
            "Vadodara",
            "Kharghar"
        ];

        const cities = indianCities.map((city) => {
            return {
                label: city,
                value: city
            }

        })

        setCities(cities)
    }

    React.useEffect(() => {
        getcities()
    }, [])

    const [selectedCity, setSelectedCity] = React.useState<any>(null)



    const handleSave = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/changeCity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                city: selectedCity
            })
        })
        .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    // toast(data.message, {
                    //     type: 'success'
                    // })
                    setShowLocationPopup(false)
                    window.location.reload()
                }
                else
                {
                    toast(data.message, {
                        type:'error'
                    })
                }
            })
            .catch((err) => {
                toast(err.message, {
                    type: 'error'
                })
                console.log(err)
            })
    }
  return (
    <div className='popup-bg'>
            <div className='popup-cont'>
                <select className='select'
                    onChange={(e) => {
                        setSelectedCity(e.target.value)}}
                >
                    <option value="" disabled selected>Select your city</option>
                    {
                        cities.map((city: any) => {
                            return <option key={city.value} value={city.value}>{city.label}</option>
                        })
                    }
                </select>

                <button className='btn'
                    onClick={handleSave}
                >Save</button>
            </div>
        </div>
  )
}

export default LocationPopup