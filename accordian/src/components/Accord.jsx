import { data } from "./data";
import {useState} from "react";

export function Accord() {
  const [selected, setSelected] = useState(null);
  function singleselection(idgot) {
    if(selected == idgot) setSelected(null);
    else setSelected(idgot);
    console.log(idgot);
    
  }

  return (
    <div className="wrapper">
      <div className="accordion">
        {
            data && data.length>0 ?
            (data.map(dataitem => (
                <div onClick={()=> singleselection(dataitem.id)} className="item" key={dataitem.id}>
                    <div className="title">
                    <h3>{dataitem.question}</h3>
                    <span>+</span>
                    <div className="content">
                        {
                            selected == dataitem.id ?
                            (<div>{dataitem.answer}</div>)
                            : null
                        }
                    </div>
                    </div>
                </div>
            )))
            : (<div>no data found</div>)
        }
      </div>
    </div>
  );
}
