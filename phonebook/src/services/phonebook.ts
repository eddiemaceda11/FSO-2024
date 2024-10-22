import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(BASE_URL).then((res) => res.data);
};

const addNew = (newPerson) => {
  return axios.post(BASE_URL, newPerson).then((res) => res.data);
};

const deletePerson = (id) => {
  console.log(typeof id);
  const num = id.toString();
  return axios.delete(`${BASE_URL}/${num}`).then((res) => res);
};

export default {
  getAll,
  addNew,
  deletePerson,
};
