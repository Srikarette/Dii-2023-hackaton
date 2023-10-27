import axios from "axios";

export const create = async (data) => {
  await axios.post("http://localhost:5000/api/travel", data);
};
export const list = async () => {
  return await axios.get("http://localhost:5000/api/travel");
};
