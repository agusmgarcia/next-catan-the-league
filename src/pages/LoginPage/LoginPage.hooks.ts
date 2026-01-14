import { useCallback, useMemo, useState } from "react";

import { useUser } from "#src/store";

import type LoginPageProps from "./LoginPage.types";

export default function useLoginPage(props: LoginPageProps) {
  const { login } = useUser();

  const [loginLoading, setLoginLoading] = useState(false);

  const loginDisabled = useMemo(() => loginLoading, [loginLoading]);

  const loginOnClick = useCallback(() => {
    setLoginLoading(true);
    login().catch(() => setLoginLoading(false));
  }, [login]);

  return {
    ...props,
    loginDisabled,
    loginLoading,
    loginOnClick,
  };
}
