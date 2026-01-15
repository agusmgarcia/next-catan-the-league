import { useUser } from "#src/store";

import type AppPageProps from "./AppPage.types";

export default function useAppPage(props: AppPageProps) {
  const { user } = useUser();

  return { ...props, user };
}
