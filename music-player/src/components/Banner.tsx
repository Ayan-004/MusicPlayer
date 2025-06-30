import weekend from "../assets/weekend.png";

function Banner() {
  return (
    <div className="flex flex-row md:flex-row items-center justify-between bg-[#be5c2b] text-amber-50 max-w-full w-full rounded-4xl shadow-2xl shadow-[#be5c2b] overflow-hidden">
      <div className="flex-1 flex flex-col p-6 md:p-10">
        <h5 className="text-xs font-light pb-4">CURATED PLAYLIST</h5>
        <h1 className="text-xl sm:text-2xl md:text-4xl font-calsans pb-3">
          BLINDING LIGHT
        </h1>
        <p className="text-xs mr-9 md:text-base font-light max-w-md">
          Enjoy vivid emotions with this stunning music album. Each track is a
          story.
        </p>
      </div>

      <div className="flex-shrink-0 w-28 h-32 md:w-56 md:h-72">
        <img
          src={weekend}
          alt="The Weeknd Blinding Lights album cover"
          className="w-full h-full mt-7 md:mt-0 object-cover rounded-b-4xl md:rounded-bl-none"
        />
      </div>
    </div>
  );
}

export default Banner;


{/* <div className="flex flex-row md:flex-row items-center justify-between bg-[#be5c2b] text-amber-50 md:m-6 md:w-2xl lg:w-xl xl:w-3xl xl:m-10 rounded-4xl shadow-2xl shadow-[#be5c2b] overflow-hidden"></div> */}

{/* <div className="flex flex-col p-6 md:p-10"></div> */}

      // <div className="w-xs md:w-96 h-32 md:h-72"></div>

{/* <img
          src={weekend}
          alt="artist photo"
          className="w-full h-full mt-7 md:mt-1 xl:mt-1 object-cover rounded-b-4xl md:rounded-bl-none"
        /> */}