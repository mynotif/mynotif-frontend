import { useSubscription } from "../context/subscription";

export const useIsSubscribed = (): boolean | undefined => {
  const { active } = useSubscription();

  return active;
};
