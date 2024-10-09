import { Accord } from "./components/Accord/Accord";
import { Rcolor } from "./components/random-color/Rcolor";
import { StarRating } from "./components/star-rating/StarRating";
import { ImageSlider } from "./components/Image-slider/ImageSlider";
import { LoadMoreProducts } from "./components/load-more/LoadMoreProducts";

function App() {

  return <div>
      {/* <Accord></Accord> */}
      {/* <Rcolor></Rcolor> */}
      {/* <StarRating noOfStars={10}></StarRating> */}
      {/* <ImageSlider url={'https://picsum.photos/v2/list'} limit={"10"}></ImageSlider> */}
      <LoadMoreProducts></LoadMoreProducts>
    </div>
}

export default App
