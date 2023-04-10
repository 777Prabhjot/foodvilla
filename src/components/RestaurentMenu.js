import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { IMG_CDN_URL } from "../contants";
import Shimmer from "./shimmer";

const ResMenu=()=>{
    const params = useParams();
    const {id}=params;
    console.log(id)
    useEffect(()=>{
        getRestaurantInfo();
    },[]);

    const [restaurant,setRestaurant]=useState(null);

    async function getRestaurantInfo(){
        
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=9.957813344607038&lng=76.24363493174314&restaurantId=${id}&submitAction=ENTER`);
        const json = await data.json();
        // console.log(json.data);
        
        // feeDetails.restaurantId
        setRestaurant(json.data?.cards[0]?.card?.card?.info);
    }
    
    return (!restaurant)?<Shimmer/>:(
        <>
        
        {/* <h1>Restaurent ID : {id}</h1> */}
        <h1>{restaurant.name}</h1>
        <img src={IMG_CDN_URL+ restaurant.cloudinaryImageId}/>
         {/* {console.log(restaurant.cloudinaryImageId)}; */}
        <h2>{restaurant.city}</h2>
        <h2>{restaurant.costForTwo}</h2>
        <h2>{restaurant.avgRating}Stars</h2>

        </>
        
    )
}
export  default ResMenu;