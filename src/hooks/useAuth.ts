import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser";

export const useAuth = () => {
  const history = useHistory();

  // const { function name inside of useMessage } = useMessage(name of export function)();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            // Assuming id: 10 is Admin
            const isAdmin = res.data.id === 10 ? true : false;
            setLoginUser({ ...res.data, isAdmin });
            showMessage({
              title: "Logged in successfully!",
              status: "success"
            });
            history.push("/home");
          } else {
            showMessage({
              title: "The user does not exist.",
              status: "error"
            });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({
            title: "Error! Please try again.",
            status: "error"
          });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};
