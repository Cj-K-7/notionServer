const { userAgentData } = window.navigator as any;

type Key = "brands" | "isMobile" | "platform";

const navigatorInfos = new Map<Key, any>();

navigatorInfos.set("brands", userAgentData.brands);
navigatorInfos.set("isMobile", userAgentData.mobile);
navigatorInfos.set("platform", userAgentData.platform);

console.log(navigatorInfos);

export default navigatorInfos;
