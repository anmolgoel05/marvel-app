import React from "react";
import { Card } from "./Card";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { getCharacters } from "../utils/utils";

export const Main = () => {
  const [url, setUrl] = useState();
  const [item, setItem] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    let fetch = async () => {
      const characters = await getCharacters();
      setItem(characters);
    };
    fetch();
  }, []);

  const searchMarvel = async () => {
    const characters = await getCharacters(search);
    setItem(characters);
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
