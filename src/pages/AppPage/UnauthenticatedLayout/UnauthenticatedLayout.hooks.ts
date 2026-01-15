import { useCallback, useMemo, useState } from "react";

import { useUser } from "#src/store";

import type UnauthenticatedLayoutProps from "./UnauthenticatedLayout.types";

export default function useUnauthenticatedLayout(
  props: UnauthenticatedLayoutProps,
) {
  const { login, userLoading } = useUser();

  const [rawGoogleLogingLoading, setRawGoogleLogingLoading] = useState(false);

  const googleLogingLoading = useMemo(
    () => userLoading || rawGoogleLogingLoading,
    [rawGoogleLogingLoading, userLoading],
  );

  const googleLoginDisabled = useMemo(
    () => googleLogingLoading,
    [googleLogingLoading],
  );

  const googleLoginOnClick = useCallback(() => {
    setRawGoogleLogingLoading(true);
    login().catch(() => setRawGoogleLogingLoading(false));
  }, [login]);

  return {
    ...props,
    googleLoginDisabled,
    googleLogingLoading,
    googleLoginOnClick,
  };
}
