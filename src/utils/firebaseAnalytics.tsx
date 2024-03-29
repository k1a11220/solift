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

export const onPressCreateInitiative = (
  uid: string,
  keyResultId: number,
  initiativeId: number
) => {
  Analytics.logEvent("onPressCreateInitiative", {
    uid: uid,
    keyResultId: keyResultId,
    latestInitiativeId: initiativeId,
    purpose: "How many people are creating initiatives?",
  });
};

export const createObjective = (uid: string, name: string) => {
  Analytics.logEvent("createObjective", {
    uid: uid,
    objectiveName: name,
    purpose: "Objective names",
  });
};

export const createKeyResult = (uid: string, oid: number, name: string) => {
  Analytics.logEvent("createKeyResult", {
    uid: uid,
    objectiveId: oid,
    keyResultName: name,
    purpose: "KeyResult names",
  });
};

export const createInitiative = (uid: string, kid: number, name: string) => {
  Analytics.logEvent("createInitiative", {
    uid: uid,
    keyResultId: kid,
    initiativeName: name,
    purpose: "Initiative names",
  });
};

export const clickInitiative = (
  uid: string,
  kid: number,
  name: string,
  hasDone: boolean
) => {
  Analytics.logEvent("clickInitiative", {
    uid: uid,
    keyResultId: kid,
    initiativeName: name,
    hasDone: hasDone,
    purpose: "Initiative names",
  });
};

export const clickDeleteInitiative = (
  uid: string,
  kid: number,
  name: string,
  hasDone: boolean
) => {
  Analytics.logEvent("deleteInitiative", {
    uid: uid,
    keyResultId: kid,
    initiativeName: name,
    hasDone: hasDone,
    purpose: "Initiative names",
  });
};

export const clickEditInitiative = (
  uid: string,
  kid: number,
  name: string,
  hasDone: boolean
) => {
  Analytics.logEvent("deleteInitiative", {
    uid: uid,
    keyResultId: kid,
    initiativeName: name,
    hasDone: hasDone,
    purpose: "Initiative names",
  });
};
