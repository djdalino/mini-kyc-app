import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import axios from "axios";
const ViewPage = props => {
  const itemId = props.match.params.id;
  const [singleData, setSingleData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let res = await axios.get("/api/upload");
    let items = res.data;
    let allData = items.filter(item => item.userId === itemId);

    setSingleData(allData);
  };
  const ImageOrVideo = item => {
    let lastThree = item.substr(item.length - 3);
    if (lastThree === "jpg" || lastThree === "png" || lastThree === "lob") {
      return <img src={item} alt={item} height="100%" width="100%" />;
    } else {
      return <video controls src={item} height="100%" width="100%" />;
    }
  };
  return (
    // <div className="mt-5">
    //   <Hero data="List of uploads" />
    //   <div className="container">
    //     <div
    //       className="col col-sm-4 d-flex flex-column my-5"
    //       style={{ height: "230px" }}
    //       key={singleData._id}
    //     >
    //       {ImageOrVideo(`http://localhost:5000/${singleData.upload}`)}
    //       <a
    //         style={{ zIndex: 1000 }}
    //         className="btn btn-primary"
    //         href={`http://localhost:5000/${singleData.upload}`}
    //         download={`http://localhost:5000/${singleData.upload}`}
    //       >
    //         Download
    //       </a>
    //     </div>
    //   </div>
    <div>
      <Hero data="List of uploads" />
      <div className="container">
        <div className="row">
          {singleData.length === 0 ? (
            <h1 className="text-center">No data...</h1>
          ) : (
            singleData.map(d => {
              return (
                <div
                  className="col col-12 col-sm-4 d-flex flex-column my-5"
                  style={{ height: "230px" }}
                  key={d._id}
                >
                  {ImageOrVideo(`/${d.upload}`)}
                  <a
                    style={{ zIndex: 1000 }}
                    className="btn btn-primary"
                    href={`/${d.upload}`}
                    target="_blank"
                    download={`/${d.upload}`}
                  >
                    Download
                  </a>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
