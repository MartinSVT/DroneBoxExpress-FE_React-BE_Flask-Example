export const localData = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        const stored = localStorage.getItem(key);
        return stored == null ? undefined : JSON.parse(stored);
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};


export function getUserDataFromLocal() {
    let userId = localData.get("userId");
    let username = localData.get("username");
    let token = localData.get("token");
    let isStaff = localData.get("isStaff");
    let result = {
      userId: userId,
      username: username,
      token: token,
      isStaff: isStaff,
    }
    return result
  }