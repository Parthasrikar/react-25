import { useEffect, useState } from "react";

function Rcolor() {
  const [type, settype] = useState("hex");
  const [color, setcolor] = useState("#000000");

  function colorhexgenerate() {
    let hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let value = "#";
    for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * hex.length);
      value += hex[random];
    }
    setcolor(value);
  }
  function colorrgbgenerate() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    setcolor(`rgb(${r},${g},${b})`);
  }
  console.log(type, color);

  useEffect(()=> {
    ( type === "rgb" ? colorrgbgenerate() : colorhexgenerate());
  }, [type])

  return (
    <div
      className={`w-full min-h-screen p-2`}
      style={{ background: color, margin: "0px" }}
    >
      <div className="flex items-center justify-center gap-7 mt-3">
        <button
          onClick={() => settype("hex")}
          className="bg-white shadow-lg capitalize px-3 py-2 rounded text-black border-white border-2 font-medium"
        >
          create hex
        </button>
        
        <button
          onClick={() =>
            type == "hex" ? colorhexgenerate() : colorrgbgenerate()
          }
          className="bg-white shadow-lg capitalize px-3 py-2 rounded text-black border-white border-2 font-medium"
        >
          generate random color
        </button>

        <button
          onClick={() => settype("rgb")}
          className="bg-white shadow-lg capitalize px-3 py-2 rounded text-black border-white border-2 font-medium"
        >
          create rgb
        </button>
      </div>

      <div className="flex flex-col mt-20 gap-24 items-center">
        <h1 className="text-9xl text-white font-semibold">{type}</h1>
        <h3 className="text-7xl text-white font-bold">{color}</h3>
      </div>
    </div>
  );
}

export { Rcolor };
