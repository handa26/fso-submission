import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

const create = (objectData) => {
  const request = axios.post(baseUrl, objectData);

  return request
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);

  return request
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

const update = (id, objectData) => {
  const request = axios.put(`${baseUrl}/${id}`, objectData);

  return request
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export default {
  getAll,
  create,
  deletePerson,
  update,
};
