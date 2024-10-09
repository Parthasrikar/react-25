import { useState } from "react"
import {FaStar} from "react-icons/fa"
import "./styles.css"

function StarRating({noOfStars = 5}) {
    const [rating , setrating] = useState(0);
    const [hover, sethover] = useState(0);

    function handleClick(index) {
        setrating(index);
    }
    function handleMouseMove(index) {
        sethover(index);
    }
    function handleMouseLeave() {
        sethover(rating);
    }


    return <div className="flex h-32 justify-center mt-20">
        {
            [...Array(noOfStars)].map( (_,index)=> {
                index += 1;
                return <FaStar
                    key={index}
                    size={40}
                    className={index <= (hover || rating) ? "active" : "inactive"}
                    onClick={()=> handleClick(index)}
                    onMouseMove={()=> handleMouseMove(index)}
                    onMouseLeave={()=> handleMouseLeave()}
                />
            })
        }
    </div>
}

export { StarRating}