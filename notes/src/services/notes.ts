import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

import { type Note } from "../types";

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  return request
    .then((response) => response.data.concat(nonExisting))
    .catch((error) => {
      console.log("fail");
    });
};

const create = (newObject: Note) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const update = (id: number, newObject: Note) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data).;
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};
