import * as Analytics from "expo-firebase-analytics";

export const onPressCreateObjective = (uid: string, id: number) => {
  Analytics.logEvent("onPressCreateObjective", {
    uid: uid,
    /*
     * We want to know if the user came from from the swipe card as
     * opposed to from chat or a deep link.
     */
    latestObjectiveId: id,
    /*
     * This may be too specific and not very useful, but maybe down the line * we could investigate why a certain user is more popular than others.
     */
    // user: uid,
    /*
     * We can use this information later to compare against other events.
     */
    screen: "profile",
    purpose: "How many people are creating objectives?",
  });
};

export const onPressCreateKeyResult = (
  uid: string,
  objectiveId: number,
  keyResultId: number
) => {
  Analytics.logEvent("onPressCreateKeyResult", {
    uid: uid,
    objectiveId: objectiveId,
    latestKeyResultId: keyResultId,
    purpose: "How many people are creating keyResults?",
  });
};
