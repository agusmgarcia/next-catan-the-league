import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useProfile, useUsers } from "#src/store";

import type ViewProfilePageProps from "./ViewProfilePage.types";

export default function useViewProfilePage(props: ViewProfilePageProps) {
  const profileId = useParams()?.id;

  const { profile: profileFromStore, setProfileId } = useProfile();
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
    if (profileFromStore?.id === profileId) return;
    if (Array.isArray(profileId)) return;
    setProfileId(profileId);
  }, [profileFromStore?.id, profileId, setProfileId]);

  return { ...props, profile };
}
