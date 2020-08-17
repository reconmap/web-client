import React from "react";
import Wrap from "./Wrap";

const Home = () => {
  return (
    <Wrap>
      <div className='flex justify-between items-center  w-full flex-col md:flex-row' >
        <div className='order-2 '>
          <h1 className="text-5xl md:text-6xl  font-bold">Recon<span className='text-gray-200'>Map</span></h1>
          <h2 className="text-2xl md:text-4xl max-w-xl text-gray-600">
            ReconMap is an open source security tool for InfoSec professionals
            that allows them to plan, execute and document reconnaissance
            projects for multiple targets.
              </h2>
        </div>
        <i data-feather={'award'} className=' text-red-600 order-1 md:order-3 p-5' />
      </div>

    </Wrap>
  );
};

export default Home;
