import weekend from "../assets/weekend.png"

function Banner() {
  return (
    <>
        <div className="flex items-center w-3xl h-60 bg-[#903e15] text-amber-50 m-12 rounded-4xl shadow-2xl shadow-[#903e15]">
          <div className="flex flex-col">
            <h5 className="text-xs font-light pl-10 pb-7">CURATED PLAYLIST</h5>
            <h1 className="text-3xl font-calsans pl-10 pb-5">BLINDING LIGHT</h1>
            <p className="font-light pl-10 pb-5">Enjoy vivid emotions with this stunning music album. Each track is a story.</p>
          </div>

            <div className="flex justify-end">
                <div className="w-72 h-70 mb-10 overflow-hidden">
                    <img src={weekend} alt="artist photo" className="w-full h-full object-cover rounded-br-4xl" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Banner