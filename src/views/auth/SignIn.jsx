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
import { EmailControl, PasswordControl } from "../../components/InputControl";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email не валидный")
    .required("Поле не должно быть пустым"),
  password: yup
    .string()
    .min(8, "Не менее 8 символов")
    .required("Поле не должно быть пустым"),
});

export const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  return (
    <div className={style.wrapperForm}>
      <ToastContainer />
      <Container>
        <h1 className={style.wrapperForm__title}>Войти</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            const result = signIn(values);

            const message =
              result === 200
                ? "Вы вошли успешно!"
                : "Неверный логин или пароль!";
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
              <PasswordControl props={props} />
              <Button caption={"Войти"} />
            </form>
          )}
        </Formik>
        <p className={style.wrapperForm__link}>
          Не зарегестрирован? <Link to="/signup">Регистрация</Link>
        </p>
      </Container>
    </div>
  );
};
