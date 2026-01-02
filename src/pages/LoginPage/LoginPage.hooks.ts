import { useCallback, useMemo, useState } from "react";

import { useUser } from "#src/store";

import type LoginPageProps from "./LoginPage.types";

export default function useLoginPage(props: LoginPageProps) {
  const { login, userLoading } = useUser();

  const [loading, setLoading] = useState(false);

  const loginLoading = useMemo(
    () => userLoading || loading,
    [loading, userLoading],
  );

  const loginDisabled = useMemo(() => loginLoading, [loginLoading]);

  const loginOnClick = useCallback(() => {
    setLoading(true);
    login().finally(() => setLoading(false));
  }, [login]);

  return {
    ...props,
    loginDisabled,
    loginLoading,
    loginOnClick,
  };
}
