import MD5 from "crypto-js/md5";
import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;
const apikey = process.env.REACT_APP_API_KEY;
const getHash = (ts) => {
  let privatekey = process.env.REACT_APP_PRIVATE_KEY;

  return MD5(ts + privatekey + apikey);
};

const getCharacters = async (search) => {
  let ts = Date.now().toString();
  let hash = getHash(ts);

  let baseUrl = `${API_URL}/v1/public/characters`;
  let url = `${baseUrl}?ts=${ts}&apikey=${apikey}&hash=${hash}`;
  if (!!search) {
    baseUrl = `${API_URL}/v1/public/characters?nameStartsWith=${search}`;
    url = `${baseUrl}&ts=${ts}&apikey=${apikey}&hash=${hash}`;
  }

  try {
    let response = await axios.get(url);
    let results = response.data.data.results;
    return results;
  } catch (err) {
    console.error(err);
    return;
  }
};

export { getCharacters };
