import weekend from "../assets/weekend.png"

function Banner() {
  return (
    <>
        <div className="flex items-center justify-between w-2xl h-60 bg-amber-700 text-white m-12 rounded-4xl shadow-2xl shadow-amber-700">
            <h1 className="text-3xl font-calsans pl-10 text-amber-50">BLINDING LIGHT</h1>
            <p className="font-calsans pl-10 text-amber-50">Enjoy vivid emotions with this stunning music album. Each track is a story.</p>

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