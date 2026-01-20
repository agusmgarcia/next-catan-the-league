import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useProfile, useUsers } from "#src/store";

import type ViewProfilePageProps from "./ViewProfilePage.types";

export default function useViewProfilePage(props: ViewProfilePageProps) {
  const profileIdFromParams = useParams()?.id;

  const { profile: profileFromStore, profileId, setProfileId } = useProfile();
  const { users } = useUsers();

  const profile = useMemo(() => {
    if (!profileFromStore) return undefined;

    const user = users.find((u) => u.profileId === profileFromStore.id);
    if (!user) return undefined;

    return {
      ...profileFromStore,
      defaultColor: user.defaultColor,
      email: user.id,
      name: user.name,
      photoURL: user.photoURL,
    };
  }, [profileFromStore, users]);

  useEffect(() => {
    if (profileId === profileIdFromParams) return;
    if (Array.isArray(profileIdFromParams)) return;
    if (!profileIdFromParams) return;
    setProfileId(profileIdFromParams);
  }, [profileId, profileIdFromParams, setProfileId]);

  return { ...props, profile };
}
