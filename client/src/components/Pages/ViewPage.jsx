import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import axios from "axios";
const ViewPage = () => {
  const [data, isData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let res = await axios.get("/api/upload");
    isData(res.data);
  };
  const ImageOrVideo = item => {
    let lastThree = item.substr(item.length - 3);
    console.log(lastThree);
    if (lastThree === "jpg" || lastThree === "png" || lastThree === "lob") {
      return <img src={item} alt="balabala" height="100%" width="100%" />;
    } else {
      return <video controls src={item} height="100%" width="100%" />;
    }
  };
  return (
    <div>
      <Hero data="List of uploads" />
      <div className="container">
        <div className="row">
          {data.length === 0 ? (
            <h1 className="text-center">No data...</h1>
          ) : (
            data.map(d => {
              return (
                <React.Fragment>
                  <div
                    className="col col-sm-4 d-flex flex-column my-5"
                    style={{ height: "230px" }}
                    key={d._id}
                  >
                    {ImageOrVideo(`http://209.97.164.121/${d.upload}`)}
                    <a
                      style={{ zIndex: 1000 }}
                      className="btn btn-primary"
                      href={`http://209.97.164.121/${d.upload}`}
                      download={`http://209.97.164.121/${d.upload}`}
                    >
                      Download
                    </a>
                  </div>
                  {/* <button type="submit" onClick={`window.open(${d.upload})`}>
                    Download!
                  </button> */}
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
