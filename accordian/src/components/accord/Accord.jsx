import { useState } from "react";
import data from "./data";
function Accord() {
  const [selected, setseleected] = useState(null);
  const [mulenable, setmulenable] = useState(false);
  const [mulsel, setmulsel] = useState([]);

  function handlesingle(sid) {
    setseleected(selected == sid ? null : sid);
  }
  function handlemulti(sid) {
    let cpymul = [...mulsel];
    let findid = cpymul.indexOf(sid);
    if (findid == -1) {
      cpymul.push(sid);
    } else {
      cpymul.splice(findid, 1);
    }
    setmulsel(cpymul);
  }
  console.log(selected, mulsel);

  return (
    <div className="w-full flex items-center justify-center pt-12 p-5 mb-20">
      <div className="flex flex-col w-1/2">
        <button
          onClick={() => {
            setmulenable(!mulenable);
            setmulsel([]);
          }}
          className={`self-center px-5 py-2 text-white ${mulenable ? "bg-green-800" : "bg-gray-900"} mb-5 rounded `}
        >
          ENABLE MULTIPLE SELECTION
        </button>{" "}
        {/* Restrict the button width */}
        {data && data.length > 0 ? (
          <div>
            {data.map((dataitem) => {
              return (
                <div
                  key={dataitem.id}
                  onClick={
                    mulenable
                      ? () => handlemulti(dataitem.id)
                      : () => handlesingle(dataitem.id)
                  }
                  className="p-5 shadow-md mb-3 w-full cursor-pointer text-white bg-gray-900 rounded-lg"
                >
                  <div className="flex justify-between gap-12">
                    <h3 className="text-md">{dataitem.question}</h3>
                    <span>+</span>
                  </div>
                  <div>
                    {mulenable
                      ? mulsel.indexOf(dataitem.id) !== -1 && (
                          <div className="text-sm mt-1">{dataitem.answer}</div>
                        )
                      : selected == dataitem.id && <div className="text-sm mt-3">{dataitem.answer}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>no data found</div>
        )}
      </div>
    </div>
  );
}

export { Accord };
