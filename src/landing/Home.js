import React from "react";
import Wrap from "./Wrap";
import { IconShield } from "../components/icons";

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
        <IconShield size='24'/>
      </div>

    </Wrap>
  );
};

export default Home;
