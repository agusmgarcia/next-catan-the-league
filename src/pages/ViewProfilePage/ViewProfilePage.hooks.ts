import { strings } from "@agusmgarcia/react-essentials-utils";
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
      defaultColor: user.defaultColor,
      email: user.id,
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
      photoURL: user.photoURL,
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
  }, [profileFromStore, users]);

  useEffect(() => {
    if (profileId === profileIdFromParams) return;
    if (Array.isArray(profileIdFromParams)) return;
    if (!profileIdFromParams) return;
    setProfileId(profileIdFromParams);
  }, [profileId, profileIdFromParams, setProfileId]);

  return { ...props, profile };
}
