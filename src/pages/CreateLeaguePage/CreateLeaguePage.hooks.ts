import { filters } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { useLeagues, useUser } from "#src/store";

import type CreateLeaguePageProps from "./CreateLeaguePage.types";
import { type Step1Props } from "./Step1";
import { type Step2Props } from "./Step2";

export default function useCreateLeaguePage(props: CreateLeaguePageProps) {
  const { push } = useRouter();

  const { createLeague } = useLeagues();
  const { user } = useUser();

  const initialState = useMemo<State>(
    () => ({
      matchesCount: 0,
      name: "",
      players: (
        ["blue", "orange", "red", "white", "brown", "green"] as const
      ).map((color) =>
        color === user?.defaultColor
          ? {
              admin: true,
              color: user.defaultColor,
              id: user.id,
            }
          : {
              admin: false,
              color,
              id: "",
            },
      ),
    }),
    [user],
  );

  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const backDisabled = useMemo(() => {
    if (submitting) return true;
    if (step === 1) return true;
    return false;
  }, [step, submitting]);

  const disabled = useMemo(
    () => ({
      matchesCount: submitting,
      name: submitting,
      players: state.players.map((p) => ({
        admin: submitting || !p.id,
        id: submitting,
      })),
    }),
    [state.players, submitting],
  );

  const submitDisabled = useMemo(() => {
    if (submitting) return true;

    switch (step) {
      case 2:
        if (
          state.players.filter((p) => !!p.id).length < 2 ||
          state.players.every((p) => !p.admin) ||
          state.players.some((p) => !p.id && p.admin) ||
          state.players
            .filter((p) => !!p.id)
            .map((p) => p.id.toLowerCase())
            .filter(filters.distinct).length !==
            state.players.filter((p) => !!p.id).length
        )
          return true;

      case 1:
        if (!state.name || !state.matchesCount) return true;

      default:
        return false;
    }
  }, [state.matchesCount, state.name, state.players, step, submitting]);

  const onBack = useCallback(
    () => setStep((step) => (step > 1 ? ((step - 1) as typeof step) : step)),
    [],
  );

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const name = event.target.name;
      if (name === "name") {
        setState((prevState) => ({ ...prevState, [name]: event.target.value }));
        return;
      }

      if (name === "matchesCount") {
        setState((prevState) => ({
          ...prevState,
          [name]: event.target.valueAsNumber,
        }));
        return;
      }

      const [playerIndex, property] = name
        .replace(/^players\.(\d+)\.(\w+)$/, "$1.$2")
        .split(".");

      setState((prevState) => ({
        ...prevState,
        players: prevState.players.map((p, i) => {
          if (i !== +playerIndex) return p;

          if (property === "admin")
            return { ...p, [property]: event.target.checked };

          if (property === "id")
            return {
              ...p,
              admin: !!event.target.value ? p.admin : false,
              [property]: event.target.value,
            };

          return p;
        }),
      }));
    },
    [],
  );

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(() => {
    if (step === 1) {
      setStep(2);
      return;
    }

    setSubmitting(true);
    createLeague({ ...state, players: state.players.filter((p) => !!p.id) })
      .then((leagueId) => push(`/leagues/${leagueId}/view`))
      .catch(() => setSubmitting(false));
  }, [createLeague, push, state, step]);

  return {
    ...props,
    backDisabled,
    disabled,
    onBack,
    onChange,
    onSubmit,
    state,
    step,
    submitDisabled,
  };
}

type State = Step1Props["state"] & Step2Props["state"];
