// Single client entry: every module enhances markup that already works without JS.
import "./reveal";
import { initMenu } from "./menu";
import { initDirections } from "./directions";
import { initPriceTabs } from "./tabs";
import { initStickyCall } from "./sticky";

initMenu();
initDirections();
initPriceTabs();
initStickyCall();
