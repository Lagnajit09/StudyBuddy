const users = [];

const addUser = ({ id, name }) => {
  name = name.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);

  if (existingUser) {
    return { error: "User already exists!" };
  }

  const user = { id, name };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  return user;
};

module.exports = { addUser, removeUser, getUser };
