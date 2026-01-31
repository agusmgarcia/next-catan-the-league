import { useMemo } from "react";

import { useUsers } from "#src/store";

import type Step2Props from "./Step2.types";

export default function useStep2(props: Step2Props) {
  const { users: usersFromStore } = useUsers();

  const users = useMemo(
    () =>
      usersFromStore.reduce(
        (result, user) => {
          result[user.id] = user.photoURL;
          return result;
        },
        {} as Record<string, string>,
      ),
    [usersFromStore],
  );

  return { ...props, users };
}
