import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";


const BookService = () => {
    const{user}=useContext(AuthContext);
    const service = useLoaderData();
    const { title,_id,price,img } = service;
    const handleBookService=event=>{
        event.preventDefault();

        const form=event.target;
        const name=form.name.value;
        const date=form.date.value;
        const email=user?.email;
       const bookings={
            customerName:name,
            email:email,
            img,
            date:date,
            service:title,
            service_id:_id,
            price
        }
        fetch('http://localhost:5000/bookings',{
            method:'POST',
            headers:{
                'content-type':'application/json'

            },
            body:JSON.stringify(bookings)
        })
        
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.insertedId){
                alert('Service Book Successfully')
            }
        });



    }
    return (
        <div>
             <h3 className="text-center text-3xl">Service:{title}</h3>
          <form onSubmit={handleBookService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" defaultValue={user?.displayName} name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" defaultValue={user?.email} name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name="ammont" defaultValue={' $ '+ price} className="input  input-bordered" required />

                    </div>
                </div>
                <div className="form-control mt-6">
                    
                    <input className="btn btn-primary btn-block" type="submit" value='Confirm Order' />
                </div>
            </form>


        </div>
    );
};

export default BookService;