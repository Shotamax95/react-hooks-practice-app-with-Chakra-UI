import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useHistory();

  // const { function name inside of useMessage } = useMessage(name of export function)();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
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
          }
        })
        .catch(() =>
          showMessage({
            title: "Error! Please try again.",
            status: "error"
          })
        )
        .finally(() => setLoading(false));
    },
    [history, showMessage]
  );
  return { login, loading };
};
