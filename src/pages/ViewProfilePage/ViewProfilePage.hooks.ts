import { strings } from "@agusmgarcia/react-essentials-utils";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useProfile, useUser, useUsers } from "#src/store";

import type ViewProfilePageProps from "./ViewProfilePage.types";

export default function useViewProfilePage(props: ViewProfilePageProps) {
  const profileIdFromParams = useParams()?.["id"];

  const playerImageRef = useRef<HTMLInputElement>(null);

  const { profile: profileFromStore, profileId, setProfileId } = useProfile();
  const { users } = useUsers();
  const { updateUser, user: userFromStore } = useUser();

  const [photoURL, setPhotoURL] = useState(userFromStore?.photoURL);

  const profile = useMemo(() => {
    if (!profileFromStore) return undefined;

    const user = users.find((u) => u.profileId === profileFromStore.id);
    if (!user) return undefined;

    return {
      defaultColor: user.defaultColor,
      email: user.id,
      id: profileFromStore.id,
      leaguesCount:
        profileFromStore.activeLeaguesCount +
        profileFromStore.completedLeaguesCount,
      leaguesCountString: strings.replace("${leaguesCount?League:Leagues}", {
        leaguesCount:
          profileFromStore.activeLeaguesCount +
          profileFromStore.completedLeaguesCount,
      }),
      leaguesWinCount: profileFromStore.leaguesWinCount,
      leaguesWinCountString: strings.replace(
        "${leaguesWinCount?Championship:Championships}",
        { leaguesWinCount: profileFromStore.leaguesWinCount },
      ),
      matchesCount: profileFromStore.matchesCount,
      matchesCountString: strings.replace("${matchesCount?Match:Matches}", {
        matchesCount: profileFromStore.matchesCount,
      }),
      name: user.name,
      photoURL:
        userFromStore?.profileId === profileFromStore.id
          ? photoURL || user.photoURL
          : user.photoURL,
      points: profileFromStore.totalPoints,
      pointsString: strings.replace("${points?Point:Points}", {
        points: profileFromStore.totalPoints,
      }),
      victoriesCount: profileFromStore.victoriesCount,
      victoriesCountString: strings.replace(
        "${victoriesCount?Victory:Victories}",
        { victoriesCount: profileFromStore.victoriesCount },
      ),
    };
  }, [photoURL, profileFromStore, userFromStore?.profileId, users]);

  const onPlayerImageClick = useCallback(() => {
    const playerImage = playerImageRef.current;
    if (!playerImage) return;
    playerImage.click();
  }, []);

  const onPlayerImageChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    async (event) => {
      if (!userFromStore?.id) return;

      const file = event.target.files?.[0];
      if (!file) return;

      const photoURL = URL.createObjectURL(file);
      setPhotoURL(photoURL);

      try {
        await updateUser({ id: userFromStore.id, photoURL });
      } catch {
        setPhotoURL(userFromStore.photoURL);
      } finally {
        URL.revokeObjectURL(photoURL);
      }
    },
    [updateUser, userFromStore?.id, userFromStore?.photoURL],
  );

  useEffect(() => {
    setPhotoURL(userFromStore?.photoURL);
  }, [userFromStore?.photoURL]);

  useEffect(() => {
    if (profileId === profileIdFromParams) return;
    if (Array.isArray(profileIdFromParams)) return;
    if (!profileIdFromParams) return;
    setProfileId(profileIdFromParams);
  }, [profileId, profileIdFromParams, setProfileId]);

  return {
    ...props,
    onPlayerImageChange,
    onPlayerImageClick,
    playerImageRef,
    profile,
    user: userFromStore,
  };
}
