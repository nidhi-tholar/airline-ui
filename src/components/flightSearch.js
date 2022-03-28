import UserNavBar from "./userHeader";

const FlightSearch = () =>{
   return (
       <div>
           <UserNavBar/>
           <FlightSeacrhInput/>
       </div>
   );
}


const Flight = () => {
    return (
        <div>
            <span>Flight</span>
        </div>
    )
}

const FlightSeacrhInput = () => {
    return (
        <div>
            <span>FlightSeacrhInput</span>
        </div>
    )
}


export default FlightSearch;
