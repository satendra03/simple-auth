// for sstateufull authentication
// const userAuthMap = new Map(); 

// For stateless authentication
import jwt from 'jsonwebtoken';
const secrect = process.env.SECECT || 'youShoudUseYourOwnSecretItShouldBeA256bitEncryptedString';

export const setUser = (user) => {
    // userAuthMap.set(id, user);
    return jwt.sign({ ...user }, secrect);
};

export const getUser = (token) => {
    // return userAuthMap.get(id);
    if(!token) return null;
    try {
        const user = jwt.verify(token, secrect);
        return user;
    } catch (e) {
        return null;
    }
};