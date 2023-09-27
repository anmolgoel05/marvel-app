import React from "react";
import { Card } from "./Card";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { getAllCharacters, getCharacterByName } from "../utils/utils";

export const Main = () => {
  const [url, setUrl] = useState();
  const [item, setItem] = useState();
  const [search, setSearch] = useState("");
  // useEffect(()=>{
  //   const fetch=async()=>{
  //     const res=await axios.get(url)
  //     setItem(res.data.data.results);
  //   }
  //   fetch();
  // },[url])

  useEffect(() => {
    let fetch = async () => {
      const characters = await getAllCharacters();
      console.log("characters", characters);

      setItem(characters);
    };
    fetch();
    console.log("item", item);
  }, []);

  const searchMarvel = () => {
    setUrl(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`
    );
    //debugger;
    //getCharacterByName(search);
  };

  return (
    <>
      <div className="header">
        <div className="bg">
          <img src="./Images/bg.png" alt="" />
        </div>
        <div className="search-bar">
          <img src="./Images/logo.jpg" alt="logo" />
          <input
            type="search"
            placeholder="Search Here"
            className="search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={searchMarvel}
          />
        </div>
      </div>
      <div className="content">{!item ? <p>Not Found</p> : <Card data={item} />}</div>
    </>
  );
};
