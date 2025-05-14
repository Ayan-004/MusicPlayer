import weekend from "../assets/weekend.png"

function Banner() {
  return (
        <div className="flex flex-row md:flex-row items-center justify-between bg-[#be5c2b] text-amber-50 m- md:m-10 md:w-3xl rounded-4xl shadow-2xl shadow-[#be5c2b] overflow-hidden">
          <div className="flex flex-col p-6 md:p-10">
            <h5 className="text-xs font-light pb-4">CURATED PLAYLIST</h5>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-calsans pb-3">BLINDING LIGHT</h1>
            <p className="text-xs mr-9 md:text-base font-light max-w-md">Enjoy vivid emotions with this stunning music album. Each track is a story.</p>
          </div>

            {/* <div className="flex justify-end"> */}
                <div className="w-xs md:w-96 h-32 md:h-72">
                    <img src={weekend} alt="artist photo" className="w-full h-full mt-7 md:mt-1 lg:mt-1 object-cover rounded-b-4xl md:rounded-bl-none" />
                </div>
            </div>
        // </div>
  )
}

export default Banner