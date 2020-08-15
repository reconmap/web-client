import React from "react";
import Wrap from "./Wrap";

const Home = () => {
  return (
    <Wrap>
      <img src="logo.png" alt="Reconmap logo" />
      <h1 className="text-6xl font-bold">ReconMap</h1>
      <h2 className="text-3xl max-w-xl">
        ReconMap is an open source security tool for InfoSec professionals
        that allows them to plan, execute and document reconnaissance
        projects for multiple targets.
          </h2>
    </Wrap>
  );
};

export default Home;
