import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const[services,setServices]=useState([]);
    useEffect(()=>{
        fetch('services.json')
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[])
    return (
        <div className="mt-8">
            <div className="item-center text-center space-y-5">
                <h3 className="text-3xl font-bold text-orange-600">Service</h3>
                <p className="text-6xl">Our Service Area</p>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised<br/> words which dont look even slightly believable. </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-4">

                {services.map(service=><ServiceCard
                key={service._id}
                service={service}></ServiceCard>)}
            </div>
            
        </div>
    );
};

export default Services;