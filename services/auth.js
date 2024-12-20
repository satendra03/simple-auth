const userAuthMap = new Map();

export const setUser = (id, user) => {
    userAuthMap.set(id, user);
};

export const getUser = (id) => {
    return userAuthMap.get(id);
};