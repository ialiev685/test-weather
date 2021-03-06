import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const checkHaveUser = (values, dataStorage) => {
  const dataStorageParse = JSON.parse(dataStorage);

  const result = dataStorageParse.find(({ email }) => email === values.email);
  return result;
};

const cityesId = ["2643743", "524894", "1816670", "5128638", "2988506"];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = (values) => {
    const dataStorage = localStorage.getItem("users");

    if (dataStorage === null) {
      values.signin = false;
      values.citiesId = cityesId;
      const dataJson = JSON.stringify([values]);
      localStorage.setItem("users", dataJson);
      return 201; //user создан
    }

    const checkUser = checkHaveUser(values, dataStorage);
    if (checkUser) {
      return 409; //user существует
    } else {
      const dataStorageParse = JSON.parse(dataStorage);

      values.signin = false;

      const dataJson = JSON.stringify([...dataStorageParse, values]);
      localStorage.setItem("users", dataJson);

      return 201; //user создан
    }
  };

  const signIn = (values) => {
    const dataStorage = localStorage.getItem("users");

    if (dataStorage === null) return 401; //не авторизирован

    const checkUser = checkHaveUser(values, dataStorage);

    if (checkUser) {
      if (checkUser.password === values.password) {
        const dataStorageParse = JSON.parse(dataStorage);

        const dataStorageUpdate = dataStorageParse.map((item) => {
          if (item.email === values.email) return { ...item, signin: true };
          return item;
        });

        const dataJson = JSON.stringify(dataStorageUpdate);

        localStorage.setItem("users", dataJson);
        localStorage.setItem("currentUser", checkUser.email);

        setUser(checkUser);
        return 200;
      }
      return 400; // неверный пароль
    }

    return 401; //не авторизирован
  };

  const signOut = () => {
    const curUserStorage = localStorage.getItem("currentUser");
    const dataStorage = localStorage.getItem("users");

    const checkUser = checkHaveUser({ email: curUserStorage }, dataStorage);

    if (checkUser) {
      const dataStorageParse = JSON.parse(dataStorage);

      const dataStorageUpdate = dataStorageParse.map((item) => {
        if (item.email === curUserStorage) return { ...item, signin: false };
        return item;
      });

      const dataJson = JSON.stringify(dataStorageUpdate);

      localStorage.setItem("users", dataJson);
      localStorage.removeItem("currentUser");

      setUser(null);
      return 200;
    }
    return 404; // не найдено
  };

  const currentUser = () => {
    const curUserStorage = localStorage.getItem("currentUser");
    const dataStorage = localStorage.getItem("users");

    if (dataStorage === null) return 401; //не авторизирован

    const checkUser = checkHaveUser({ email: curUserStorage }, dataStorage);

    if (checkUser) {
      if (checkUser.signin) {
        setUser(checkUser);
        return 200;
      }
      return 401;
    }
    return 404;
  };

  const deleteCity = (index) => {
    const dataStorage = localStorage.getItem("users");

    if (dataStorage === null) return 401; //не авторизирован

    const dataStorageParse = JSON.parse(dataStorage);

    const dataStorageUpdate = dataStorageParse.map((item) => {
      if (item.email === user.email) {
        item.citiesId.splice(index, 1);
        return { ...item, cityesId: item.citiesId };
      }
      return item;
    });

    const dataJson = JSON.stringify(dataStorageUpdate);

    localStorage.setItem("users", dataJson);

    return 200;
  };

  const addCity = (id) => {
    const dataStorage = localStorage.getItem("users");

    if (dataStorage === null) return 401; //не авторизирован

    const dataStorageParse = JSON.parse(dataStorage);

    const dataStorageUpdate = dataStorageParse.map((item) => {
      if (item.email === user.email) {
        const newCitiesId = item.citiesId.push(String(id));

        return { ...item, cityesId: newCitiesId };
      }
      return item;
    });

    const dataJson = JSON.stringify(dataStorageUpdate);

    localStorage.setItem("users", dataJson);

    return 200;
  };

  useEffect(() => {
    currentUser();
  }, []);

  const value = {
    signUp,
    signIn,
    signOut,
    user,
    setUser,
    currentUser,
    addCity,
    deleteCity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
