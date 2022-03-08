import React, { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
//provider
import { AuthContext } from "../../provider";
//style
import style from "./AuthStyles.module.css";
//components
import {
  EmailControl,
  LoginControl,
  PasswordControl,
} from "../../components/InputControl";
import { Button } from "../../components/Button";

const schema = yup.object().shape({
  login: yup.string().required("Поле не должно быть пустым"),
  email: yup
    .string()
    .email("email не валидный")
    .required("Поле не должно быть пустым"),
  password: yup
    .string()
    .min(8, "Не менее 8 символов")
    .required("Поле не должно быть пустым"),
});

export const SignUp = () => {
  const { signUp } = useContext(AuthContext);

  return (
    <div className={style.wrapperForm}>
      <ToastContainer />

      <h1 className={style.wrapperForm__title}>Регистрация</h1>
      <Formik
        initialValues={{ login: "", email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          const result = signUp(values);
          const message =
            result === 201
              ? "Вы зарегестрированы!"
              : "Такой пользователь уже существует.";
          toast.info(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <EmailControl props={props} />
            <LoginControl props={props} />
            <PasswordControl props={props} />
            <Button caption={"Регистрация"} />
          </form>
        )}
      </Formik>
      <p className={style.wrapperForm__link}>
        Имеется логин? <Link to="/signin">Войти</Link>{" "}
      </p>
    </div>
  );
};
