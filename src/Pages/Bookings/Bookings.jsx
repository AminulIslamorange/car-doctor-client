import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingTable from "./BookingTable";
import axios from "axios";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(() => {

        axios.get(url, {withCredentials: true})
        .then(res => {
            setBookings(res.data);
        })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [url]);

    const handleDelete=id=>{
        const proced=confirm('Are You want to delete this?')
        if(proced){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method:'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.deletedCount>0){
                    alert('Deleted Successfully')
                    const remaining=bookings.filter(booking=>booking._id !==id);
                    setBookings(remaining);
                }
            })

        }
    }
    const handleApprove=id=>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:'confirm'})

        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                // update Status
                const remaining=bookings.filter(booking=>booking._id !==id);
                const updated=bookings.find(booking=>booking._id === id);
                updated.status='Approved'
                const newBooking=[updated,...remaining];
                setBookings(newBooking);
            }
        })

    }
    return (
        <div>
            <h3 className="text-3xl font-bold text-center">My Booking {bookings.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                            Delete
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                      {bookings.map(booking=><BookingTable
                      key={booking._id} booking={booking} handleDelete={handleDelete}handleApprove={handleApprove}></BookingTable>)}
                        
                       
                       
                    </tbody>
                    

                </table>
            </div>

        </div>
    );
};

export default Bookings;