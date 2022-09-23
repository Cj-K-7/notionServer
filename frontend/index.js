const baseURL = location.origin;

const getUsers = async () =>
  await (await fetch("/api/users", { headers: { method: "GET" } })).json();

const getDataBase = async (id) =>
  await (
    await fetch(`/api/db?id=${id}`, { headers: { method: "GET" } })
  ).json();

const API = {
  getUsers,
  getDataBase,
};

API.getUsers().then((res) => res);
API.getDataBase(
  "7c44f37100c04f629a058a209560828a?v=48fc15d2752141a095ffcbf6bb4ab647"
).then((res) => console.log(res));
