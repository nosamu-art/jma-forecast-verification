const DATA_BASE = "./data";
const STORAGE_KEY = "jma-forecast-verification-state";
const LANG_STORAGE_KEY = "jma-forecast-verification-lang";
const TRANSLATIONS = {
  en: {
    page_title: "Precipitation Verification Map (Non-official)",
    page_notice:
      "This site is for demonstration purposes. For disaster prevention decisions, refer to official JMA information. Accuracy may change over time and service may be discontinued without notice. It displays the next-day precipitation occurrence of the prefectural weather forecasts issued by JMA at 05:00, 11:00, and 17:00 each day.",
    label_month: "Month",
    label_time: "Time",
    label_metric: "Metric",
    label_region: "Region",
    section_national: "National",
    section_selected_region: "Region",
    section_regions: "Region Forecast Areas",
    section_areas: "Local Area Ranking",
    all_regions: "All",
    methodology_title: "Methodology and Usage Notes",
    m1_title: "1. Precipitation Threshold",
    m1_body: "This site classifies precipitation status using AMeDAS observations and the following threshold.",
    m1_yes: "Precipitation present: daily precipitation is 1.0 mm or more.",
    m1_no: "Precipitation absent: daily precipitation is less than 1.0 mm.",
    m1_diff:
      "Under JMA's standard, snow is treated as precipitation at 0.5 mm or more. This site uses 1.0 mm for all precipitation events because of data acquisition constraints, so the official accuracy values may differ slightly.",
    m2_title: "2. Forecasts and Time Window",
    m2_body:
      "The site verifies next-day forecasts in the prefectural weather forecasts issued at the following times.",
    m2_times: "Issuance times: 05:00, 11:00, and 17:00 every day.",
    m2_window: "Verification window: 00:00 to 24:00 on the day after issuance.",
    m2_extra:
      "In addition to JMA's regular verification at 05:00 and 17:00, this site also includes the next-day forecast contained in the 11:00 bulletin for a broader assessment.",
    m3_title: "3. Spatial Aggregation",
    m3_body: "The accuracy calculation follows JMA's objective verification method.",
    m3_unit: "Aggregation unit: local forecast area (e.g. Tokyo, southern Hyogo).",
    m3_logic:
      "Method: each AMeDAS station within a local forecast area is judged individually, and the results are averaged to obtain the area's accuracy score.",
    m3_effect:
      "This means that if rain falls only in part of a forecast area, the accuracy does not become 100%, which matches lived experience more closely.",
    notice_title: "Notes",
    notice_1: "This site is for demonstration purposes. For disaster prevention decisions, refer to official JMA information.",
    notice_2:
      "This site is a research and development demonstration and is not intended for actions based on its forecast accuracy.",
    notice_3:
      "It is not suitable for decisions related to safety or property protection. Please use official JMA information for disaster prevention decisions.",
    notice_4: "Accuracy changes over time, and the service may be discontinued without notice.",
    data_nodata: "No data",
    legend_show: "Show legend",
    legend_hide: "Hide legend",
    overall_title: "National",
    region_title: "Region Forecast Areas",
    area_title: "Local Area Ranking",
    region_all: "All",
    metric_accuracy: "Accuracy",
    metric_yes: "Precipitation-present accuracy",
    metric_no: "Precipitation-absent accuracy",
    metric_miss: "Miss rate",
    metric_false_alarm: "False alarm rate",
    metric_capture: "Capture rate",
    metric_success: "Consistency rate",
    legend_high: "85% or more",
    legend_mid_high: "75-85%",
    legend_mid_low: "65-75%",
    legend_low: "Under 65%",
    overall_region_suffix: "regions",
    overall_area_suffix: "areas",
    selected_rep: "Representative station",
    selected_region: "Region",
    selected_metric: "Metric",
    selected_collapse: "Minimize details",
    selected_expand: "Show details",
    selected_zoom_in: "Expand details",
    selected_zoom_out: "Compact details",
    selected_miss: "Miss rate",
    selected_false: "False alarm rate",
    selected_capture: "Capture rate",
    selected_yes: "Precipitation-present accuracy",
    selected_no: "Precipitation-absent accuracy",
    time_chart_title: "Issue time comparison",
    no_visible_areas: "No areas available for this selection.",
    footer:
      'Data Source &amp; Methodology: Weather Forecasts: <a href="https://agora.ex.nii.ac.jp/cps/weather/report/" target="_blank" rel="noreferrer">JMA Disaster Prevention Information XML History Database</a> (Provided by National Institute of Informatics) / Observations: JMA AMeDAS Daily Data / Processing: All verification scores are independently calculated by this system using the above data sources under <a href="https://creativecommons.org/licenses/by/4.0/deed.ja" target="_blank" rel="noreferrer">CC BY 4.0</a>.',
  },
  ja: {
    page_title: "降水有無 予報精度マップ（非公式）",
    page_notice:
      "本サイトはデモンストレーション目的であり、防災上の判断には気象庁の公式情報を参照してください。精度は随時変化し、予告なく提供を中止することがあります。気象庁から毎日 5時、11時、17時に発表される「府県天気予報」に対する翌日の降水の有無の精度を表示しています。",
    label_month: "年月",
    label_time: "時刻",
    label_metric: "指標",
    label_region: "地方",
    section_national: "全国",
    section_selected_region: "地方",
    section_regions: "地方予報区",
    section_areas: "一次細分区域ランキング",
    all_regions: "すべて",
    methodology_title: "利用条件と検証方法",
    m1_title: "1. 降水の有無の判定基準",
    m1_body: "本サイトでは、アメダス観測所による実況値に基づき、以下のしきい値で「降水の有無」を判定しています。",
    m1_yes: "降水あり: 日降水量の観測値が 1.0mm 以上",
    m1_no: "降水なし: 日降水量の観測値が 1.0mm 未満",
    m1_diff:
      "気象庁の基準では、雪の場合は 0.5mm 以上を降水ありとして扱います。本サイトではデータ取得の制約により、雪を含むすべての降水現象を一律で 1.0mm 以上として判定しているため、公式の適中率とわずかに差が出る場合があります。",
    m2_title: "2. 検証対象とする予報と時間帯",
    m2_body: "以下のタイミングで発表された「府県天気予報」における、翌日の予報を検証対象としています。",
    m2_times: "対象発表時刻: 毎日 5時、11時、17時",
    m2_window: "検証対象時間帯: 発表日の翌日 0時 〜 24時（24時間）",
    m2_extra:
      "気象庁の定期検証（5時発表および17時発表）に加え、本サイトでは11時発表の電文に含まれる翌日予報も集計対象に含めることで、より多角的な精度評価を行っています。",
    m3_title: "3. 地点の集計と空間的評価",
    m3_body: "精度の算出ロジックは、気象庁の公式客観検証手法に準拠しています。",
    m3_unit: "集計単位: 一次細分区域（例: 東京地方、兵庫県南部など）",
    m3_logic:
      "算出ロジック: 予報区（一次細分区域）内に含まれる全アメダス観測所（全国約600地点）ごとに個別に適中・不適中を判定し、その結果をエリア内で平均化して、当該予報区の適中率としています",
    m3_effect: "この手法により、予報区の一部だけで雨が降った場合に適中率が100%にならない、生活実感に即した評価になっています。",
    notice_title: "注意事項",
    notice_1: "本サイトはデモンストレーション目的であり、防災上の判断には気象庁の公式情報を参照してください。",
    notice_2: "本サイトは研究・開発用のデモンストレーションであり、この予報精度に基づいた行動を前提としていません。",
    notice_3: "利用者の生命・身体の安全や財産の保護に関する判断を目的とする利用には適しません。防災上の判断には気象庁の公式情報を参照してください。",
    notice_4: "精度は随時変化し、予告なく提供を中止することがあります。",
    data_nodata: "データなし",
    legend_show: "凡例を表示",
    legend_hide: "凡例を閉じる",
    overall_title: "全国",
    region_title: "地方予報区",
    area_title: "一次細分区域ランキング",
    region_all: "すべて",
    metric_accuracy: "適中率",
    metric_yes: "降水あり予報の適中率",
    metric_no: "降水なし予報の適中率",
    metric_miss: "見逃し率",
    metric_false_alarm: "空振り率",
    metric_capture: "捕捉率",
    metric_success: "一致率",
    legend_high: "85%以上",
    legend_mid_high: "75-85%",
    legend_mid_low: "65-75%",
    legend_low: "65%未満",
    overall_region_suffix: "件",
    overall_area_suffix: "件",
    selected_rep: "代表地点",
    selected_region: "地方",
    selected_metric: "指標",
    selected_collapse: "詳細を最小化",
    selected_expand: "詳細を表示",
    selected_zoom_in: "詳細を拡大",
    selected_zoom_out: "詳細をコンパクト表示",
    selected_miss: "見逃し率",
    selected_false: "空振り率",
    selected_capture: "捕捉率",
    selected_yes: "降水あり予報の適中率",
    selected_no: "降水なし予報の適中率",
    time_chart_title: "発表時刻別の比較",
    no_visible_areas: "表示できる区域がありません。",
    footer:
      'Data Source &amp; Methodology: Weather Forecasts: <a href="https://agora.ex.nii.ac.jp/cps/weather/report/" target="_blank" rel="noreferrer">JMA Disaster Prevention Information XML History Database</a> (Provided by National Institute of Informatics) / Observations: JMA AMeDAS Daily Data / Processing: All verification scores are independently calculated by this system using the above data sources under <a href="https://creativecommons.org/licenses/by/4.0/deed.ja" target="_blank" rel="noreferrer">CC BY 4.0</a>.',
  },
};

const state = {
  manifest: null,
  areas: [],
  summary: null,
  month: null,
  time: null,
  metric: "accuracy_pct",
  region: "all",
  lang: "en",
  selectedAreaCode: null,
  selectedAreaCollapsed: false,
  selectedAreaExpanded: false,
  map: null,
  markerLayer: null,
};

const els = {
  monthSelect: document.getElementById("monthSelect"),
  timeSelect: document.getElementById("timeSelect"),
  metricSelect: document.getElementById("metricSelect"),
  regionSelect: document.getElementById("regionSelect"),
  mobileRegionSelect: document.getElementById("mobileRegionSelect"),
  methodologyOpen: document.getElementById("methodologyOpen"),
  methodologyModal: document.getElementById("methodologyModal"),
  methodologyClose: document.getElementById("methodologyClose"),
  languageToggle: document.getElementById("languageToggle"),
  footer: document.querySelector(".app-footer"),
  overallValue: document.getElementById("overallValue"),
  overallMeta: document.getElementById("overallMeta"),
  overallMetrics: document.getElementById("overallMetrics"),
  regionList: document.getElementById("regionList"),
  regionCount: document.getElementById("regionCount"),
  areaTable: document.getElementById("areaTable"),
  areaCount: document.getElementById("areaCount"),
  selectedArea: document.getElementById("selectedArea"),
  legend: document.getElementById("legend"),
  legendToggle: document.getElementById("legendToggle"),
};

function metricMeta(key = state.metric) {
  return state.manifest.metrics.find((metric) => metric.key === key);
}

function loadStoredState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadStoredLang() {
  return localStorage.getItem(LANG_STORAGE_KEY) || "en";
}

function saveStoredLang() {
  localStorage.setItem(LANG_STORAGE_KEY, state.lang);
}

function saveStoredState() {
  const payload = {
    month: state.month,
    time: state.time,
    metric: state.metric,
    region: state.region,
    selectedAreaCode: state.selectedAreaCode,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function openMethodologyModal() {
  els.methodologyModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeMethodologyModal() {
  els.methodologyModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function t(key) {
  return TRANSLATIONS[state.lang][key] || TRANSLATIONS.en[key] || key;
}

function metricLabel(key) {
  const labels = {
    accuracy_pct: state.lang === "ja" ? t("metric_accuracy") : t("metric_accuracy"),
    precip_yes_accuracy_pct: t("metric_yes"),
    precip_no_accuracy_pct: t("metric_no"),
    miss_rate_pct: t("metric_miss"),
    false_alarm_rate_pct: t("metric_false_alarm"),
    capture_rate_pct: t("metric_capture"),
    success_rate_pct: t("metric_success"),
  };
  return labels[key] || key;
}

function metricOrder(key) {
  const order = {
    accuracy_pct: 0,
    miss_rate_pct: 1,
    false_alarm_rate_pct: 2,
    capture_rate_pct: 3,
    precip_yes_accuracy_pct: 4,
    precip_no_accuracy_pct: 5,
  };
  return order[key] ?? 999;
}

const DISPLAY_METRIC_KEYS = [
  "accuracy_pct",
  "miss_rate_pct",
  "false_alarm_rate_pct",
  "capture_rate_pct",
  "precip_yes_accuracy_pct",
  "precip_no_accuracy_pct",
];

const FIXED_REGION_AREAS = {
  北海道地方: "石狩地方",
  東北地方: "宮城県東部",
  関東甲信地方: "東京都東京地方",
  北陸地方: "新潟県下越",
  東海地方: "愛知県西部",
  近畿地方: "大阪府",
  中国地方: "広島県南部",
  四国地方: "愛媛県中予",
  九州北部地方: "福岡県福岡地方",
  九州南部地方: "鹿児島県薩摩地方",
  沖縄地方: "沖縄本島地方本島中南部",
};

const DEFAULT_NATIONAL_AREA = "京都府南部";

function renderMetricCard(key, value, tag = "div") {
  const activeClass = key === state.metric ? " is-active" : "";
  return `
    <${tag} class="metric-cell${activeClass}" data-metric="${key}" role="button" tabindex="0" aria-pressed="${key === state.metric}">
      <span>${metricLabel(key)}</span>
      <strong>${formatPct(value)}</strong>
    </${tag}>
  `;
}

function selectMetric(key) {
  if (!key || key === state.metric) {
    return;
  }
  state.metric = key;
  els.metricSelect.value = key;
  saveStoredState();
  renderAll(false);
}

function selectTime(time) {
  if (!time || time === state.time) {
    return;
  }
  state.time = time;
  els.timeSelect.value = time;
  saveStoredState();
  renderAll(false);
}

function handleMetricCardAction(event) {
  const card = event.target.closest("[data-metric]");
  if (!card) {
    return;
  }
  selectMetric(card.dataset.metric);
}

function handleMetricCardKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  const card = event.target.closest("[data-metric]");
  if (!card) {
    return;
  }
  event.preventDefault();
  selectMetric(card.dataset.metric);
}

function handleTimeBarAction(event) {
  const bar = event.target.closest("[data-time]");
  if (!bar) {
    return;
  }
  selectTime(bar.dataset.time);
}

function handleTimeBarKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  const bar = event.target.closest("[data-time]");
  if (!bar) {
    return;
  }
  event.preventDefault();
  selectTime(bar.dataset.time);
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "ja" ? "ja" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key === "footer") {
      el.innerHTML = t("footer");
    } else {
      el.textContent = t(key);
    }
  });
  els.languageToggle.textContent = state.lang === "en" ? "JP" : "EN";
  els.languageToggle.setAttribute("aria-label", state.lang === "en" ? "日本語に切り替え" : "Switch to English");
  els.methodologyOpen.setAttribute("aria-label", state.lang === "en" ? "Show methodology and usage notes" : "利用条件と検証方法を表示");
  document.title = t("page_title");
  populateSelects();
  populateRegions();
  renderLegend();
  renderOverall();
  renderRegions();
  renderAreas();
  renderMap();
}

function formatPct(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }
  return `${Number(value).toFixed(1)}%`;
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }
  return Number(value).toLocaleString("ja-JP");
}

function colorFor(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "#9aa6ab";
  }
  const numeric = Number(value);
  const higherIsBetter = metricMeta().higher_is_better;
  const score = higherIsBetter ? numeric : 100 - numeric;
  if (score >= 85) return "#087f5b";
  if (score >= 75) return "#0b7285";
  if (score >= 65) return "#f08c00";
  return "#c92a2a";
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

function populateSelects() {
  const stored = loadStoredState();
  els.monthSelect.innerHTML = state.manifest.months
    .map((month) => `<option value="${month.key}">${month.key}</option>`)
    .join("");
  els.timeSelect.innerHTML = state.manifest.times
    .map((time) => `<option value="${time}">${state.lang === "ja" ? `${time}時` : `${time}:00`}</option>`)
    .join("");
  els.metricSelect.innerHTML = state.manifest.metrics
    .slice()
    .sort((a, b) => metricOrder(a.key) - metricOrder(b.key))
    .map((metric) => `<option value="${metric.key}">${metricLabel(metric.key)}</option>`)
    .join("");

  state.month = state.manifest.months[state.manifest.months.length - 1].key;
  state.time = state.manifest.times.includes("11") ? "11" : state.manifest.times[0];
  state.metric = state.manifest.default_metric;
  if (stored.month && state.manifest.months.some((month) => month.key === stored.month)) {
    state.month = stored.month;
  }
  if (stored.time && state.manifest.times.includes(stored.time)) {
    state.time = stored.time;
  }
  if (stored.metric && state.manifest.metrics.some((metric) => metric.key === stored.metric)) {
    state.metric = stored.metric;
  }
  els.monthSelect.value = state.month;
  els.timeSelect.value = state.time;
  els.metricSelect.value = state.metric;
}

function populateRegions() {
  const stored = loadStoredState();
  const regions = [...new Set(state.areas.map((area) => area.region_name))].sort(
    (a, b) => regionSortKey(a) - regionSortKey(b),
  );
  const regionOptions = [
    `<option value="all">${t("region_all")}</option>`,
    ...regions.map((region) => `<option value="${region}">${region}</option>`),
  ].join("");
  els.regionSelect.innerHTML = regionOptions;
  els.mobileRegionSelect.innerHTML = regionOptions;
  if (stored.region && (stored.region === "all" || regions.includes(stored.region))) {
    state.region = stored.region;
  }
  els.regionSelect.value = state.region;
  els.mobileRegionSelect.value = state.region;
}

function regionAreaCounts() {
  return state.areas.reduce((counts, area) => {
    counts[area.region_name] = (counts[area.region_name] || 0) + 1;
    return counts;
  }, {});
}

function regionLatitudes() {
  return state.areas.reduce((latitudes, area) => {
    if (!latitudes[area.region_name]) {
      latitudes[area.region_name] = [];
    }
    latitudes[area.region_name].push(area.lat);
    return latitudes;
  }, {});
}

function regionSortKey(regionName) {
  const order = [
    "北海道地方",
    "東北地方",
    "関東甲信地方",
    "東海地方",
    "北陸地方",
    "近畿地方",
    "中国地方",
    "四国地方",
    "九州北部地方",
    "九州南部地方",
    "沖縄地方",
  ];
  const index = order.indexOf(regionName);
  return index === -1 ? order.length : index;
}

function setupMap() {
  state.map = L.map("map", {
    zoomControl: false,
    preferCanvas: true,
  }).setView([37.8, 137.8], 5);

  L.control.zoom({ position: "topright" }).addTo(state.map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 11,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(state.map);

  state.markerLayer = L.layerGroup().addTo(state.map);

  window.addEventListener("resize", () => {
    state.map.invalidateSize();
  });
  setTimeout(() => state.map.invalidateSize(), 0);
}

async function loadMonth(month) {
  state.summary = await fetchJson(`${DATA_BASE}/summary/${month}.json`);
}

function currentRows(level) {
  return state.summary[level].filter((row) => row.time === state.time);
}

function currentSummaryRow() {
  if (state.region === "all") {
    return {
      row: currentRows("overall")[0],
      title: t("section_national"),
      metaLabel: null,
    };
  }

  const regionRow = currentRows("regions").find((row) => row.region_name === state.region);
  return {
    row: regionRow,
    title: state.region,
    metaLabel: t("section_selected_region"),
  };
}

function issueTimeRows(level, predicate = () => true) {
  const order = new Map(state.manifest.times.map((time, index) => [time, index]));
  return state.summary[level]
    .filter(predicate)
    .sort((a, b) => (order.get(a.time) ?? 999) - (order.get(b.time) ?? 999));
}

function renderTimeChart(rows) {
  const points = rows
    .map((row) => ({ row, value: Number(row?.[state.metric]) }))
    .filter((point) => !Number.isNaN(point.value));

  if (!points.length) {
    return "";
  }

  return `
    <div class="time-chart">
      <div class="time-chart-head">
        <strong>${t("time_chart_title")}</strong>
        <span>${metricLabel(state.metric)}</span>
      </div>
      <div class="time-bars" role="img" aria-label="${t("time_chart_title")} ${metricLabel(state.metric)}">
        ${points
          .map((point) => {
            const label = state.lang === "ja" ? `${point.row.time}時` : `${point.row.time}:00`;
            const height = Math.max(6, Math.min(100, point.value));
            const fillColor = colorFor(point.value);
            const activeClass = point.row.time === state.time ? " is-active" : "";
            return `
              <div class="time-bar${activeClass}" data-time="${point.row.time}" role="button" tabindex="0" aria-pressed="${point.row.time === state.time}">
                <strong>${formatPct(point.value)}</strong>
                <span class="bar-track"><span class="bar-fill" style="height:${height}%; background:${fillColor}"></span></span>
                <em>${label}</em>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function areaLookup() {
  return new Map(state.areas.map((area) => [area.area_code, area]));
}

function areaRowsByCode() {
  return new Map(currentRows("areas").map((row) => [row.area_code, row]));
}

function enrichedAreas() {
  const summaryLookup = areaRowsByCode();
  return state.areas
    .map((area) => ({ ...area, ...(summaryLookup.get(area.area_code) || {}) }))
    .filter((row) => row.lat && row.lng)
    .filter((row) => state.region === "all" || row.region_name === state.region);
}

function renderLegend() {
  const labels = [
    ["#087f5b", t("legend_high")],
    ["#0b7285", t("legend_mid_high")],
    ["#f08c00", t("legend_mid_low")],
    ["#c92a2a", t("legend_low")],
  ];
  els.legend.innerHTML = [
    `<strong>${metricLabel(state.metric)}</strong>`,
    ...labels.map(
      ([color, label]) =>
        `<div class="legend-row"><span class="swatch" style="background:${color}"></span><span>${label}</span></div>`,
    ),
    `<div class="legend-row"><span class="swatch" style="background:#9aa6ab"></span><span>${t("data_nodata")}</span></div>`,
  ].join("");
  if (els.legendToggle) {
    els.legendToggle.setAttribute("aria-label", els.legend.classList.contains("is-open") ? t("legend_hide") : t("legend_show"));
  }
}

function renderMap() {
  state.markerLayer.clearLayers();
  const rows = enrichedAreas();
  const bounds = [];

  rows.forEach((row) => {
    const value = row[state.metric];
    const selected = state.selectedAreaCode === row.area_code;
    const marker = L.circleMarker([row.lat, row.lng], {
      radius: selected ? 10 : 7,
      color: selected ? "#075360" : "#ffffff",
      weight: selected ? 4 : 2,
      fillColor: value === null || value === undefined ? "#9aa6ab" : colorFor(value),
      fillOpacity: selected ? 1 : 0.88,
    });
    marker.bindPopup(`
      <p class="popup-title">${row.area_name}</p>
      <p class="popup-meta">${row.region_name} / ${row.station_name}</p>
      <p>${metricLabel(state.metric)}: <strong>${formatPct(value)}</strong></p>
    `);
    marker.on("click", () => {
      state.selectedAreaCode = row.area_code;
      state.selectedAreaCollapsed = false;
      state.selectedAreaExpanded = false;
      state.map.panTo([row.lat, row.lng], { animate: true });
      renderAll(false);
    });
    marker.addTo(state.markerLayer);
    bounds.push([row.lat, row.lng]);
  });

  if (bounds.length && state.region !== "all") {
    state.map.fitBounds(bounds, { padding: [32, 32], maxZoom: 7 });
  }
}

function renderOverall() {
  const summary = currentSummaryRow();
  const row = summary.row;
  const titleEl = document.querySelector('[data-i18n="section_national"]');
  els.overallValue.textContent = formatPct(row?.[state.metric]);
  const timeSuffix = state.lang === "ja" ? "時" : ":00";
  if (titleEl) {
    titleEl.textContent = summary.title;
  }
  els.overallMeta.textContent = summary.metaLabel
    ? `${summary.metaLabel}: ${state.region} / ${state.month} / ${state.time}${timeSuffix} / ${metricLabel(state.metric)}`
    : `${state.month} / ${state.time}${timeSuffix} / ${metricLabel(state.metric)}`;

  els.overallMetrics.innerHTML = DISPLAY_METRIC_KEYS
    .map((key) => renderMetricCard(key, row?.[key]))
    .join("");

  const chartRows =
    state.region === "all"
      ? issueTimeRows("overall")
      : issueTimeRows("regions", (item) => item.region_name === state.region);
  els.overallMetrics.innerHTML += renderTimeChart(chartRows);
}

function sortedByMetric(rows) {
  const higherIsBetter = metricMeta().higher_is_better;
  return [...rows].sort((a, b) => {
    const av = Number(a[state.metric] ?? (higherIsBetter ? -Infinity : Infinity));
    const bv = Number(b[state.metric] ?? (higherIsBetter ? -Infinity : Infinity));
    return higherIsBetter ? bv - av : av - bv;
  });
}

function renderRegions() {
  const rows = currentRows("regions").slice();
  rows.sort((a, b) => regionSortKey(a.region_name) - regionSortKey(b.region_name));
  const counts = regionAreaCounts();
  els.regionCount.textContent =
    state.lang === "ja" ? `${rows.length}件` : `${rows.length} regions`;
  els.regionList.innerHTML = rows
    .map(
      (row) => `
        <div class="rank-row${row.region_name === state.region ? " is-active" : ""}" data-region="${row.region_name}">
          <div class="row-name">
            <strong>${row.region_name}</strong>
            <span>${state.lang === "ja" ? "区域" : "Areas"}=${formatNumber(counts[row.region_name] ?? row.area_count)}</span>
          </div>
          <div class="row-value" style="color:${colorFor(row[state.metric])}">${formatPct(row[state.metric])}</div>
        </div>
      `,
    )
    .join("");

  els.regionList.querySelectorAll(".rank-row").forEach((row) => {
    row.addEventListener("click", () => {
      state.region = state.region === row.dataset.region ? "all" : row.dataset.region;
      els.regionSelect.value = state.region;
      els.mobileRegionSelect.value = state.region;
      state.selectedAreaCode = null;
      renderAll();
    });
  });
}

function selectRegion(region) {
  state.region = region;
  els.regionSelect.value = region;
  els.mobileRegionSelect.value = region;
  state.selectedAreaCode = null;
  saveStoredState();
  renderAll();
}

function selectedAreaRow(rows) {
  if (state.selectedAreaCode) {
    const selected = rows.find((row) => row.area_code === state.selectedAreaCode);
    if (selected) return selected;
  }

  if (state.region !== "all") {
    const fixedAreaName = FIXED_REGION_AREAS[state.region];
    if (fixedAreaName) {
      const fixed = rows.find((row) => row.area_name === fixedAreaName);
      if (fixed) return fixed;
    }
  }

  if (state.region === "all") {
    const defaultArea = rows.find((row) => row.area_name === DEFAULT_NATIONAL_AREA);
    if (defaultArea) return defaultArea;
  }

  return sortedByMetric(rows)[0];
}

function renderSelectedArea(row, rows) {
  if (!row) {
    els.selectedArea.innerHTML = `<p>${t("no_visible_areas")}</p>`;
    return;
  }
  const chartRows = issueTimeRows("areas", (item) => item.area_code === row.area_code);
  els.selectedArea.classList.toggle("is-collapsed", state.selectedAreaCollapsed);
  els.selectedArea.classList.toggle("is-expanded", state.selectedAreaExpanded);
  els.selectedArea.innerHTML = `
    <div class="selected-area-head">
      <div>
        <h3>${row.area_name}</h3>
        <p>${row.region_name} / ${t("selected_rep")}: ${row.station_name}</p>
      </div>
      <div class="selected-actions">
        <button class="icon-button selected-zoom" type="button" aria-label="${state.selectedAreaExpanded ? t("selected_zoom_out") : t("selected_zoom_in")}" aria-pressed="${state.selectedAreaExpanded}">
          ${state.selectedAreaExpanded ? "□" : "↗"}
        </button>
        <button class="icon-button selected-toggle" type="button" aria-label="${state.selectedAreaCollapsed ? t("selected_expand") : t("selected_collapse")}" aria-expanded="${!state.selectedAreaCollapsed}">
          ${state.selectedAreaCollapsed ? "+" : "−"}
        </button>
      </div>
    </div>
    <div class="selected-area-body">
      <dl>
        ${DISPLAY_METRIC_KEYS.map((key) => renderMetricCard(key, row[key])).join("")}
      </dl>
      ${renderTimeChart(chartRows)}
    </div>
  `;
}

function renderAreas() {
  const rows = enrichedAreas();
  const sorted = sortedByMetric(rows);
  const selected = selectedAreaRow(rows);

  els.areaCount.textContent =
    state.lang === "ja" ? `${rows.length}件` : `${rows.length} areas`;
  renderSelectedArea(selected, rows);
  els.areaTable.innerHTML = sorted
    .slice(0, 30)
    .map(
      (row) => `
        <div class="area-row" data-area-code="${row.area_code}">
          <div class="row-name">
            <strong>${row.area_name}</strong>
            <span>${row.region_name} / ${row.station_name}</span>
          </div>
          <div class="row-value" style="color:${colorFor(row[state.metric])}">${formatPct(row[state.metric])}</div>
        </div>
      `,
    )
    .join("");

  els.areaTable.querySelectorAll(".area-row").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedAreaCode = row.dataset.areaCode;
      state.selectedAreaCollapsed = false;
      state.selectedAreaExpanded = false;
      const selected = enrichedAreas().find((area) => area.area_code === state.selectedAreaCode);
      if (selected) {
        state.map.panTo([selected.lat, selected.lng], { animate: true });
      }
      saveStoredState();
      renderAll(false);
    });
  });

}

function renderAll(adjustMap = true) {
  state.map.invalidateSize();
  renderLegend();
  renderOverall();
  renderRegions();
  renderAreas();
  renderMap();
  if (adjustMap && state.region === "all") {
    state.map.setView([37.8, 137.8], 5);
  }
  saveStoredState();
}

function attachEvents() {
  els.methodologyOpen.addEventListener("click", openMethodologyModal);
  els.methodologyClose.addEventListener("click", closeMethodologyModal);
  els.methodologyModal.addEventListener("click", (event) => {
    if (event.target && event.target.dataset && event.target.dataset.close === "true") {
      closeMethodologyModal();
    }
  });
  els.languageToggle.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "ja" : "en";
    saveStoredLang();
    applyLanguage();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.methodologyModal.hidden) {
      closeMethodologyModal();
    }
  });

  els.monthSelect.addEventListener("change", async () => {
    state.month = els.monthSelect.value;
    await loadMonth(state.month);
    saveStoredState();
    renderAll();
  });

  els.timeSelect.addEventListener("change", () => {
    selectTime(els.timeSelect.value);
  });

  els.metricSelect.addEventListener("change", () => {
    selectMetric(els.metricSelect.value);
  });

  els.regionSelect.addEventListener("change", () => {
    selectRegion(els.regionSelect.value);
  });

  els.mobileRegionSelect.addEventListener("change", () => {
    selectRegion(els.mobileRegionSelect.value);
  });

  els.overallMetrics.addEventListener("click", handleMetricCardAction);
  els.overallMetrics.addEventListener("keydown", handleMetricCardKeydown);
  els.overallMetrics.addEventListener("click", handleTimeBarAction);
  els.overallMetrics.addEventListener("keydown", handleTimeBarKeydown);
  els.selectedArea.addEventListener("click", handleMetricCardAction);
  els.selectedArea.addEventListener("keydown", handleMetricCardKeydown);
  els.selectedArea.addEventListener("click", handleTimeBarAction);
  els.selectedArea.addEventListener("keydown", handleTimeBarKeydown);
  els.selectedArea.addEventListener("click", (event) => {
    if (!event.target.closest(".selected-toggle")) {
      return;
    }
    state.selectedAreaCollapsed = !state.selectedAreaCollapsed;
    if (state.selectedAreaCollapsed) {
      state.selectedAreaExpanded = false;
    }
    renderAll(false);
  });
  els.selectedArea.addEventListener("click", (event) => {
    if (!event.target.closest(".selected-zoom")) {
      return;
    }
    state.selectedAreaCollapsed = false;
    state.selectedAreaExpanded = !state.selectedAreaExpanded;
    renderAll(false);
  });

  els.legendToggle.addEventListener("click", () => {
    const isOpen = els.legend.classList.toggle("is-open");
    els.legendToggle.setAttribute("aria-expanded", String(isOpen));
    els.legendToggle.setAttribute("aria-label", isOpen ? t("legend_hide") : t("legend_show"));
  });
}

async function init() {
  state.manifest = await fetchJson(`${DATA_BASE}/manifest.json`);
  state.areas = await fetchJson(`${DATA_BASE}/areas.json`);
  state.lang = loadStoredLang();
  populateSelects();
  populateRegions();
  setupMap();
  attachEvents();
  await loadMonth(state.month);
  applyLanguage();
  renderAll();
}

init().catch((error) => {
  document.body.innerHTML = `<main class="error"><h1>Failed to load data</h1><p>${error.message}</p></main>`;
});
