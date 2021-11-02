import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";

export const useAuth = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            history.push("/home");
          } else {
            alert("The user does not exist.");
          }
        })
        .catch(() => alert("You are not albe to login"))
        .finally(() => setLoading(false));
    },
    [history]
  );
  return { login };
};
