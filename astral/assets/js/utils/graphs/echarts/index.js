import { LineChart } from "echarts/charts";
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from "echarts/features";
// Import the Canvas renderer
// Note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

/**
 * Get user preferred theme from their past choice or browser
 * @returns {String} User preferred theme
 */
function getPreferredTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme;
  }
  // Firefox with 'resistFingerprint' activated always returns light
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Register the required components
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export function embed(target, option) {
  let chart = echarts.init(target, getPreferredTheme());

  let chartOption = { ...option, backgroundColor: "rgba(0,0,0,0)" };

  // https://echarts.apache.org/en/api.html#echartsInstance.setOption
  // https://github.com/apache/echarts/issues/6202#issuecomment-315054637
  // https://stackoverflow.com/a/72211534
  chart.setOption(chartOption, true);

  window.addEventListener("resize", () => {
    if (chart) {
      chart.resize();
    }
  });

  // Listen for theme changes
  document.addEventListener("themeSwitch", event => {
    chart.dispose();

    chart = echarts.init(target, event.detail.theme);

    chart.setOption(chartOption, true);
  });
}
