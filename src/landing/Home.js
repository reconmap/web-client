import React from "react";
import Wrap from "./Wrap";

const Home = () => {
  return (
    <Wrap>
      <div className='flex justify-between items-center  w-full' >

        <div>
          <h1 className="text-6xl font-bold">Recon<span className='text-gray-500'>Map</span></h1>
          <h2 className="text-4xl max-w-xl">
            ReconMap is an open source security tool for InfoSec professionals
            that allows them to plan, execute and document reconnaissance
            projects for multiple targets.
              </h2>
        </div>
          <i className='fa fa-mountain fa-10x text-red-600'/>
      </div>

    </Wrap>
  );
};

export default Home;
