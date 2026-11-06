"use strict";

const CSV_PATH = "NVAtlas-AI-Agent.csv";
const BATCH_SIZE = 30;
const REQUIRED_COLUMNS = ["id", "English", "Chinese", "English_Nominal", "Chinese_Verb"];

const TRANSLATIONS = {
  zh: {
    "meta.description": "浏览 500 组英汉平行语料，观察英语名词概念如何转化为中文动词。",
    "document.title": "NVAtlas — 名词化为动词",
    skip: "跳到主要内容",
    "brand.home": "NVAtlas 首页",
    "nav.label": "主导航",
    "nav.explore": "探索",
    "nav.patterns": "模式",
    "nav.about": "关于",
    "language.label": "选择界面语言",
    "theme.label": "主题",
    "theme.switchLight": "切换到浅色主题",
    "theme.switchDark": "切换到深色主题",
    "hero.eyebrow": "平行语料 · 英文 / 中文",
    "hero.title": "英语给出一个名词，中文让动作显形。",
    "hero.intro": "一部细读式平行语料图谱。收录 500 组对白，追踪英语名词概念如何在中文翻译中转化为动词。",
    "hero.explore": "浏览语料",
    "hero.method": "阅读方法",
    "featured.title": "一个高频转换",
    "featured.arrow": "转化为",
    "featured.loading": "正在读取语料中最常见的转换。",
    "featured.caption": "“{noun}”作为焦点名词出现在 {count} 条记录中。",
    "stats.label": "语料总量",
    "stats.records": "对白条目",
    "stats.nouns": "英语名词",
    "stats.verbs": "中文动词",
    "stats.patterns": "名动模式",
    "explore.eyebrow": "01 / 语料浏览",
    "explore.title": "在语境中，看清名词与动作的流转。",
    "explore.intro": "可搜索英汉任一语言，按英语名词追踪概念，或直接定位中文动词。",
    "filters.label": "筛选语料",
    "search.label": "搜索记录",
    "search.placeholder": "试试：认罪、attention、confession",
    "search.help": "可搜索英汉文本及记录 ID。",
    "filter.noun": "英语名词",
    "filter.allNouns": "全部名词",
    "filter.verb": "中文动词",
    "filter.allVerbs": "全部动词",
    "filters.active": "当前筛选条件",
    "filters.clear": "清除筛选",
    "results.loading": "正在加载语料…",
    "results.loadMore": "再载入 {count} 条记录",
    "results.summary": "显示 {visible} / {total} 条记录",
    "results.unavailable": "语料暂不可用",
    "empty.title": "这一角还没有记录。",
    "empty.copy": "试试更宽泛的关键词，或移除一个筛选条件。",
    "empty.action": "显示全部语料",
    "entry.mapping": "{noun} 转化为 {verb}",
    "entry.english": "英文",
    "entry.chinese": "中文",
    "filter.remove": "移除{filter}筛选条件",
    "filter.search": "搜索",
    "filter.nounShort": "名词",
    "filter.verbShort": "动词",
    "patterns.eyebrow": "02 / 模式",
    "patterns.title": "看见哪些表达汇聚在中心。",
    "patterns.intro": "最强的信号并不来自例外，而是反复出现的表达习惯。",
    "patterns.summary": "频次按语料条目计算。",
    "patterns.hint": "选择任一柱条，筛选下方示例。",
    "patterns.sources": "高频来源",
    "patterns.outcomes": "高频落点",
    "patterns.detail": "“{noun}”是出现最频繁的名词，共 {count} 条记录，占语料 {percentage}%。",
    "chart.nouns": "英语名词",
    "chart.verbs": "中文动词",
    "chart.aria": "{subject}频次图。选择柱条可筛选下方语料。",
    "chart.title": "{subject}频次",
    "chart.detail": "{label}：{count} 条",
    "chart.detailJoin": "；",
    "chart.bar": "按 {label} 筛选，共 {count} 条记录",
    "about.eyebrow": "03 / 阅读语料",
    "about.title": "文件里有什么，页面就呈现什么。",
    "about.intro": "这里是一座检索与阅读的索引，而不是新的翻译层。",
    "about.method1": "每条记录将一句英文与其中文译文并列，并标出焦点英语名词以及承载其动作的中文动词。",
    "about.method2": "页面逐字呈现原文，包括标点以及繁简混用的中文。拉丁字母搜索不区分大小写，中文字符按原样匹配。统计与频次图表按条目计数，重复句子仍会显示，并通过来源 ID 加以区分。",
    "about.method3": "本界面不添加修订、规范化、推译或语言学判断。",
    "source.eyebrow": "来源数据",
    "source.title": "NVAtlas AI Agent 语料",
    "source.meta": "500 条记录 · CSV · UTF-8",
    "source.download": "下载 CSV",
    "source.license": "本界面不对源语料的许可状态作任何声明。",
    "footer.description": "用于语言学细读的平行语料。",
    "footer.meta": "英文 / 中文 · {count} 条记录",
    "error.unterminated": "CSV 中存在未闭合的引号。",
    "error.empty": "语料 CSV 为空。",
    "error.missingColumns": "CSV 缺少必要字段：{columns}。",
    "error.missingValues": "第 {row} 行缺少一个或多个必要值。",
    "error.duplicateId": "CSV 中存在重复的记录 ID：{id}。",
    "error.noRecords": "语料 CSV 只有表头，没有记录。",
    "error.loadPrefix": "语料加载失败。",
    "error.loadSuffix": "请通过本地网页服务器打开此文件夹后重试。",
    "error.server": "服务器返回 {status} {statusText}。",
    "error.unknown": "未知加载错误。"
  },
  en: {
    "meta.description": "Explore 500 parallel English–Chinese examples of English nominal concepts expressed as Chinese verbs.",
    "document.title": "NVAtlas — Nominal to verbal",
    skip: "Skip to content",
    "brand.home": "NVAtlas home",
    "nav.label": "Primary navigation",
    "nav.explore": "Explore",
    "nav.patterns": "Patterns",
    "nav.about": "About",
    "language.label": "Choose interface language",
    "theme.label": "Theme",
    "theme.switchLight": "Switch to light theme",
    "theme.switchDark": "Switch to dark theme",
    "hero.eyebrow": "Parallel language · English / 中文",
    "hero.title": "When English names a thing, Chinese names the action.",
    "hero.intro": "A close-reading atlas of 500 dialogue pairs, tracing how English nominal concepts become Chinese verbs in translation.",
    "hero.explore": "Explore the corpus",
    "hero.method": "Read the method",
    "featured.title": "A recurring shift",
    "featured.arrow": "becomes",
    "featured.loading": "Reading the most frequent transformation in the corpus.",
    "featured.caption": "{count} examples use “{noun}” as the focal nominal.",
    "stats.label": "Corpus totals",
    "stats.records": "Dialogue pairs",
    "stats.nouns": "English nominals",
    "stats.verbs": "Chinese verbs",
    "stats.patterns": "Noun–verb patterns",
    "explore.eyebrow": "01 / Corpus browser",
    "explore.title": "Read the shifts in context.",
    "explore.intro": "Search either language, follow a nominal concept, or isolate a Chinese verb.",
    "filters.label": "Filter the corpus",
    "search.label": "Search records",
    "search.placeholder": "Try: confession, attention, 认罪",
    "search.help": "Search all text fields and record IDs.",
    "filter.noun": "English nominal",
    "filter.allNouns": "All nominals",
    "filter.verb": "Chinese verb",
    "filter.allVerbs": "All verbs",
    "filters.active": "Active filters",
    "filters.clear": "Clear filters",
    "results.loading": "Loading the corpus…",
    "results.loadMore": "Load {count} more records",
    "results.summary": "Showing {visible} of {total} records",
    "results.unavailable": "Corpus unavailable",
    "empty.title": "No records in this corner.",
    "empty.copy": "Try a looser search or remove one of the active filters.",
    "empty.action": "Show the whole corpus",
    "entry.mapping": "{noun} becomes {verb}",
    "entry.english": "English",
    "entry.chinese": "中文",
    "filter.remove": "Remove {filter} filter",
    "filter.search": "search",
    "filter.nounShort": "nominal",
    "filter.verbShort": "verb",
    "patterns.eyebrow": "02 / Patterns",
    "patterns.title": "See what gathers at the center.",
    "patterns.intro": "The strongest signals are not exceptions. They are repeated habits of expression.",
    "patterns.summary": "Frequency is calculated across corpus rows.",
    "patterns.hint": "Select any bar to filter the examples below.",
    "patterns.sources": "Most frequent sources",
    "patterns.outcomes": "Most frequent outcomes",
    "patterns.detail": "“{noun}” is the most frequent nominal, appearing in {count} rows ({percentage}% of the corpus).",
    "chart.nouns": "English nominals",
    "chart.verbs": "Chinese verbs",
    "chart.aria": "Top {subject} by corpus frequency. Select a bar to filter the examples below.",
    "chart.title": "Top {subject} by frequency",
    "chart.detail": "{label}: {count} records",
    "chart.detailJoin": "; ",
    "chart.bar": "Filter by {label}, {count} records",
    "about.eyebrow": "03 / Reading the corpus",
    "about.title": "What is in the file is what you see.",
    "about.intro": "The site is an index and a reading surface, not a new translation layer.",
    "about.method1": "Each row pairs an English sentence with its Chinese rendering, then identifies the focal English nominal and the Chinese verb that carries its action.",
    "about.method2": "Text is presented verbatim, including punctuation and mixed Simplified and Traditional Chinese. Search is case-insensitive for Latin letters and exact for Chinese characters. Statistics and frequency charts count rows, so repeated sentences remain visible and are distinguished by their source IDs.",
    "about.method3": "No corrections, normalizations, inferred translations, or linguistic judgments are added by this interface.",
    "source.eyebrow": "Source data",
    "source.title": "NVAtlas AI Agent corpus",
    "source.meta": "500 records · CSV · UTF-8",
    "source.download": "Download the CSV",
    "source.license": "The interface makes no claim about a license for the source corpus.",
    "footer.description": "A parallel corpus for close linguistic reading.",
    "footer.meta": "English / 中文 · {count} records",
    "error.unterminated": "The CSV contains an unterminated quoted field.",
    "error.empty": "The corpus CSV is empty.",
    "error.missingColumns": "The CSV is missing required columns: {columns}.",
    "error.missingValues": "Row {row} is missing one or more required values.",
    "error.duplicateId": "The CSV contains a duplicate record ID: {id}.",
    "error.noRecords": "The corpus CSV has headers but no records.",
    "error.loadPrefix": "The corpus could not be loaded.",
    "error.loadSuffix": "Serve this folder from a local web server and reload the page.",
    "error.server": "The server returned {status} {statusText}.",
    "error.unknown": "Unknown loading error."
  }
};

let currentLanguage = document.documentElement.dataset.language === "en" ? "en" : "zh";
let lastLoadError = null;

function t(key, values = {}) {
  const template = TRANSLATIONS[currentLanguage][key] ?? key;
  return Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
    template
  );
}

const elements = {
  filters: document.querySelector("#filters"),
  search: document.querySelector("#search-input"),
  noun: document.querySelector("#noun-filter"),
  verb: document.querySelector("#verb-filter"),
  clear: document.querySelector("#clear-filters"),
  activeFilters: document.querySelector("#active-filters"),
  summary: document.querySelector("#result-summary"),
  results: document.querySelector("#results"),
  loadMore: document.querySelector("#load-more"),
  error: document.querySelector("#data-error"),
  nounChart: document.querySelector("#noun-chart"),
  verbChart: document.querySelector("#verb-chart"),
  patternSummary: document.querySelector("#pattern-summary"),
  themeToggle: document.querySelector("#theme-toggle"),
  featuredPair: document.querySelector("#featured-pair"),
  featuredNoun: document.querySelector("#featured-noun"),
  featuredVerb: document.querySelector("#featured-verb"),
  featuredQuote: document.querySelector("#featured-quote"),
  featuredEnglish: document.querySelector("#featured-english"),
  featuredChinese: document.querySelector("#featured-chinese"),
  featuredCaption: document.querySelector("#featured-caption"),
  languageButtons: [...document.querySelectorAll("[data-language-choice]")],
  metaDescription: document.querySelector('meta[name="description"]'),
  stats: {
    records: document.querySelector("#stat-records"),
    nouns: document.querySelector("#stat-nouns"),
    verbs: document.querySelector("#stat-verbs"),
    patterns: document.querySelector("#stat-patterns")
  }
};

const state = {
  query: "",
  noun: "",
  verb: "",
  limit: BATCH_SIZE
};

const corpus = {
  records: [],
  nounCounts: new Map(),
  verbCounts: new Map(),
  pairCounts: new Map(),
  loaded: false
};

function parseCSV(text) {
  const source = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (inQuotes) {
      if (character === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        inQuotes = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      inQuotes = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n" || character === "\r") {
      if (character === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.length > 0)) {
    rows.push(row);
  }

  if (inQuotes) {
    throw new Error(t("error.unterminated"));
  }

  return rows;
}

function recordsFromCSV(text) {
  const rows = parseCSV(text);
  if (rows.length === 0) {
    throw new Error(t("error.empty"));
  }

  const headers = rows[0].map((header) => header.trim());
  const missing = REQUIRED_COLUMNS.filter((column) => !headers.includes(column));
  if (missing.length > 0) {
    throw new Error(t("error.missingColumns", { columns: missing.join(currentLanguage === "zh" ? "、" : ", ") }));
  }

  const indexes = Object.fromEntries(headers.map((header, index) => [header, index]));
  const seenIds = new Set();
  const records = [];

  rows.slice(1).forEach((row, rowIndex) => {
    const id = (row[indexes.id] || "").trim();
    const english = row[indexes.English] ?? "";
    const chinese = row[indexes.Chinese] ?? "";
    const englishNominal = row[indexes.English_Nominal] ?? "";
    const chineseVerb = row[indexes.Chinese_Verb] ?? "";

    const values = [id, english, chinese, englishNominal, chineseVerb];
    if (values.some((value) => value.trim().length === 0)) {
      throw new Error(t("error.missingValues", { row: rowIndex + 2 }));
    }
    if (seenIds.has(id)) {
      throw new Error(t("error.duplicateId", { id }));
    }

    seenIds.add(id);
    records.push({
      id,
      english,
      chinese,
      englishNominal,
      chineseVerb
    });
  });

  if (records.length === 0) {
    throw new Error(t("error.noRecords"));
  }

  return records;
}

function increment(map, key) {
  map.set(key, (map.get(key) || 0) + 1);
}

function buildCorpus(records) {
  const nounCounts = new Map();
  const verbCounts = new Map();
  const pairCounts = new Map();

  records.forEach((record) => {
    increment(nounCounts, record.englishNominal);
    increment(verbCounts, record.chineseVerb);
    increment(pairCounts, `${record.englishNominal}\u0000${record.chineseVerb}`);
  });

  corpus.records = records;
  corpus.nounCounts = nounCounts;
  corpus.verbCounts = verbCounts;
  corpus.pairCounts = pairCounts;
  corpus.loaded = true;
}

function sortedCounts(map, locale = "en") {
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label, locale));
}

function normaliseSearch(value) {
  return value.trim().toLocaleLowerCase();
}

function recordMatches(record) {
  if (state.noun && record.englishNominal !== state.noun) {
    return false;
  }
  if (state.verb && record.chineseVerb !== state.verb) {
    return false;
  }
  if (!state.query) {
    return true;
  }

  const haystack = [
    record.id,
    record.english,
    record.chinese,
    record.englishNominal,
    record.chineseVerb
  ].join(" ").toLocaleLowerCase();

  return haystack.includes(normaliseSearch(state.query));
}

function filteredRecords() {
  return corpus.records.filter(recordMatches);
}

function formatNumber(value) {
  return new Intl.NumberFormat(currentLanguage === "zh" ? "zh-CN" : "en-US").format(value);
}

function setStats() {
  elements.stats.records.textContent = formatNumber(corpus.records.length);
  elements.stats.nouns.textContent = formatNumber(corpus.nounCounts.size);
  elements.stats.verbs.textContent = formatNumber(corpus.verbCounts.size);
  elements.stats.patterns.textContent = formatNumber(corpus.pairCounts.size);

  document.querySelectorAll(".footer-meta").forEach((element) => {
    element.textContent = t("footer.meta", { count: formatNumber(corpus.records.length) });
  });
}

function populateFilters() {
  const nounOptions = sortedCounts(corpus.nounCounts)
    .sort((left, right) => left.label.localeCompare(right.label, "en"));
  const verbOptions = sortedCounts(corpus.verbCounts, "zh-Hans");
  const selectedNoun = state.noun;
  const selectedVerb = state.verb;
  const countLabel = (label, count) => currentLanguage === "zh"
    ? `${label}（${count}）`
    : `${label} (${count})`;

  elements.noun.replaceChildren(new Option(t("filter.allNouns"), ""));
  elements.verb.replaceChildren(new Option(t("filter.allVerbs"), ""));
  nounOptions.forEach(({ label, count }) => {
    elements.noun.add(new Option(countLabel(label, count), label));
  });
  verbOptions.forEach(({ label, count }) => {
    elements.verb.add(new Option(countLabel(label, count), label));
  });

  elements.noun.value = selectedNoun;
  elements.verb.value = selectedVerb;
  elements.noun.disabled = !corpus.loaded;
  elements.verb.disabled = !corpus.loaded;
}

function setFeaturedExample() {
  const topNoun = sortedCounts(corpus.nounCounts)[0];
  if (!topNoun) {
    return;
  }

  const related = corpus.records.filter((record) => record.englishNominal === topNoun.label);
  const verbFrequency = new Map();
  related.forEach((record) => increment(verbFrequency, record.chineseVerb));
  const topVerb = sortedCounts(verbFrequency, "zh-Hans")[0];
  const example = related.find((record) => record.chineseVerb === topVerb.label) || related[0];

  elements.featuredNoun.textContent = topNoun.label;
  elements.featuredVerb.textContent = topVerb.label;
  elements.featuredEnglish.textContent = example.english;
  elements.featuredChinese.textContent = example.chinese;
  elements.featuredCaption.textContent = t("featured.caption", {
    noun: topNoun.label,
    count: formatNumber(topNoun.count)
  });
  elements.featuredPair.hidden = false;
  elements.featuredQuote.hidden = false;
}

function appendHighlightedText(container, text, query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    container.textContent = text;
    return;
  }

  const escaped = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(expression);
  const lowerQuery = cleanQuery.toLocaleLowerCase();

  const fragment = document.createDocumentFragment();
  parts.forEach((part) => {
    if (part.toLocaleLowerCase() === lowerQuery) {
      const mark = document.createElement("mark");
      mark.textContent = part;
      fragment.append(mark);
    } else if (part) {
      fragment.append(document.createTextNode(part));
    }
  });
  container.replaceChildren(fragment);
}

function createEntry(record) {
  const article = document.createElement("article");
  article.className = "corpus-entry";

  const meta = document.createElement("div");
  meta.className = "entry-meta";

  const id = document.createElement("span");
  id.className = "entry-id";
  id.textContent = `ID ${record.id}`;

  const mapping = document.createElement("div");
  mapping.className = "mapping-mini";
  mapping.setAttribute("aria-label", t("entry.mapping", {
    noun: record.englishNominal,
    verb: record.chineseVerb
  }));

  const noun = document.createElement("span");
  noun.className = "noun";
  noun.textContent = record.englishNominal;

  const arrow = document.createElement("span");
  arrow.className = "arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "→";

  const verb = document.createElement("span");
  verb.className = "verb";
  verb.lang = "zh-Hans";
  verb.textContent = record.chineseVerb;

  mapping.append(noun, arrow, verb);
  meta.append(id, mapping);

  const text = document.createElement("div");
  text.className = "entry-text";

  const source = document.createElement("div");
  const sourceLabel = document.createElement("span");
  sourceLabel.className = "language-label";
  sourceLabel.textContent = t("entry.english");
  const sourceText = document.createElement("p");
  sourceText.className = "source-text";
  sourceText.lang = "en";
  appendHighlightedText(sourceText, record.english, state.query);
  source.append(sourceLabel, sourceText);

  const target = document.createElement("div");
  const targetLabel = document.createElement("span");
  targetLabel.className = "language-label";
  targetLabel.textContent = t("entry.chinese");
  targetLabel.lang = "zh";
  const targetText = document.createElement("p");
  targetText.className = "target-text";
  targetText.lang = "zh";
  appendHighlightedText(targetText, record.chinese, state.query);
  target.append(targetLabel, targetText);

  text.append(source, target);
  article.append(meta, text);
  return article;
}

function createEmptyState() {
  const empty = document.createElement("div");
  empty.className = "empty-state";

  const title = document.createElement("h3");
  title.textContent = t("empty.title");

  const copy = document.createElement("p");
  copy.textContent = t("empty.copy");

  const button = document.createElement("button");
  button.type = "button";
  button.className = "button";
  button.textContent = t("empty.action");
  button.addEventListener("click", clearFilters);

  empty.append(title, copy, button);
  return empty;
}

function createChip(label, type) {
  const chip = document.createElement("span");
  chip.className = "filter-chip";

  const text = document.createElement("span");
  text.textContent = label;

  const remove = document.createElement("button");
  remove.type = "button";
  const filterName = type === "search"
    ? t("filter.search")
    : type === "nominal" ? t("filter.nounShort") : t("filter.verbShort");
  remove.setAttribute("aria-label", t("filter.remove", { filter: filterName }));
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    if (type === "search") {
      state.query = "";
      elements.search.value = "";
    } else if (type === "nominal") {
      state.noun = "";
      elements.noun.value = "";
    } else {
      state.verb = "";
      elements.verb.value = "";
    }
    state.limit = BATCH_SIZE;
    commitState();
  });

  chip.append(text, remove);
  return chip;
}

function updateActiveFilters() {
  const chips = [];
  if (state.query) {
    chips.push(createChip(`“${state.query}”`, "search"));
  }
  if (state.noun) {
    chips.push(createChip(state.noun, "nominal"));
  }
  if (state.verb) {
    chips.push(createChip(state.verb, "verb"));
  }
  elements.activeFilters.replaceChildren(...chips);

  const hasFilters = Boolean(state.query || state.noun || state.verb);
  elements.clear.disabled = !hasFilters;
}

function renderResults(options = {}) {
  if (!corpus.loaded) {
    return;
  }

  const matches = filteredRecords();
  const visibleCount = Math.min(state.limit, matches.length);
  const visible = matches.slice(0, visibleCount);
  elements.results.setAttribute("aria-busy", "false");
  elements.results.replaceChildren();

  if (matches.length === 0) {
    elements.results.append(createEmptyState());
  } else {
    const fragment = document.createDocumentFragment();
    visible.forEach((record) => fragment.append(createEntry(record)));
    elements.results.append(fragment);
  }

  elements.summary.textContent = t("results.summary", {
    visible: formatNumber(visibleCount),
    total: formatNumber(matches.length)
  });

  elements.loadMore.hidden = visibleCount >= matches.length;
  elements.loadMore.textContent = t("results.loadMore", {
    count: formatNumber(Math.min(BATCH_SIZE, matches.length - visibleCount))
  });

  updateActiveFilters();
  writeUrl();

  if (options.scrollToResults) {
    document.querySelector("#explore").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function commitState() {
  renderResults();
}

function writeUrl() {
  const parameters = new URLSearchParams();
  if (state.query) {
    parameters.set("q", state.query);
  }
  if (state.noun) {
    parameters.set("noun", state.noun);
  }
  if (state.verb) {
    parameters.set("verb", state.verb);
  }
  if (state.limit > BATCH_SIZE) {
    parameters.set("shown", String(state.limit));
  }
  parameters.set("lang", currentLanguage);

  const next = parameters.toString();
  const url = `${window.location.pathname}${next ? `?${next}` : ""}${window.location.hash}`;
  window.history.replaceState(null, "", url);
}

function restoreUrlState() {
  const parameters = new URLSearchParams(window.location.search);
  const requestedNoun = parameters.get("noun") || "";
  const requestedVerb = parameters.get("verb") || "";
  const shown = Number.parseInt(parameters.get("shown") || "", 10);

  state.query = parameters.get("q") || "";
  state.noun = corpus.nounCounts.has(requestedNoun) ? requestedNoun : "";
  state.verb = corpus.verbCounts.has(requestedVerb) ? requestedVerb : "";
  state.limit = Number.isFinite(shown) && shown > BATCH_SIZE
    ? Math.min(shown, corpus.records.length)
    : BATCH_SIZE;

  elements.search.value = state.query;
  elements.noun.value = state.noun;
  elements.verb.value = state.verb;
}

function clearFilters() {
  state.query = "";
  state.noun = "";
  state.verb = "";
  state.limit = BATCH_SIZE;
  elements.search.value = "";
  elements.noun.value = "";
  elements.verb.value = "";
  commitState();
  elements.search.focus();
}

function filterAndScroll(type, value) {
  state.limit = BATCH_SIZE;
  if (type === "noun") {
    state.noun = value;
    elements.noun.value = value;
  } else {
    state.verb = value;
    elements.verb.value = value;
  }
  renderResults({ scrollToResults: true });
}

function truncateLabel(label, maxLength) {
  if (label.length <= maxLength) {
    return label;
  }
  return `${label.slice(0, Math.max(1, maxLength - 1))}…`;
}

function renderChart(container, data, type) {
  if (!data.length) {
    return;
  }

  const width = Math.max(260, Math.floor(container.clientWidth || 480));
  const isTarget = type === "verb";
  const rowHeight = width < 380 ? 42 : 44;
  const top = 8;
  const bottom = 8;
  const height = top + bottom + rowHeight * data.length;
  const labelWidth = width < 380 ? 98 : width < 520 ? 126 : 160;
  const valueWidth = 38;
  const barMax = Math.max(40, width - labelWidth - valueWidth - 10);
  const maximum = Math.max(...data.map((item) => item.count));
  const maxLabelLength = width < 380 ? 12 : width < 520 ? 17 : 23;

  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "group");
  const chartSubject = type === "noun" ? t("chart.nouns") : t("chart.verbs");
  svg.setAttribute("aria-label", t("chart.aria", { subject: chartSubject }));

  const title = document.createElementNS(svgNamespace, "title");
  title.textContent = t("chart.title", { subject: chartSubject });
  const description = document.createElementNS(svgNamespace, "desc");
  description.textContent = data
    .map((item) => t("chart.detail", { label: item.label, count: formatNumber(item.count) }))
    .join(t("chart.detailJoin"));
  svg.append(title, description);

  data.forEach((item, index) => {
    const y = top + index * rowHeight;
    const group = document.createElementNS(svgNamespace, "g");
    group.classList.add("chart-bar");
    if (isTarget) {
      group.classList.add("targets");
    }
    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute("aria-label", t("chart.bar", {
      label: item.label,
      count: formatNumber(item.count)
    }));

    const label = document.createElementNS(svgNamespace, "text");
    label.classList.add("chart-label");
    if (isTarget) {
      label.classList.add("target-label");
    }
    label.setAttribute("x", "0");
    label.setAttribute("y", String(y + 22));
    label.textContent = truncateLabel(item.label, maxLabelLength);

    const labelTitle = document.createElementNS(svgNamespace, "title");
    labelTitle.textContent = item.label;
    label.append(labelTitle);

    const track = document.createElementNS(svgNamespace, "rect");
    track.classList.add("bar-track");
    track.setAttribute("x", String(labelWidth));
    track.setAttribute("y", String(y + 9));
    track.setAttribute("width", String(barMax));
    track.setAttribute("height", "16");
    track.setAttribute("rx", "1");

    const fill = document.createElementNS(svgNamespace, "rect");
    fill.classList.add("bar-fill");
    fill.setAttribute("x", String(labelWidth));
    fill.setAttribute("y", String(y + 9));
    fill.setAttribute("width", String(Math.max(3, (item.count / maximum) * barMax)));
    fill.setAttribute("height", "16");
    fill.setAttribute("rx", "1");

    const focus = document.createElementNS(svgNamespace, "rect");
    focus.classList.add("bar-focus");
    focus.setAttribute("x", String(labelWidth - 2));
    focus.setAttribute("y", String(y + 7));
    focus.setAttribute("width", String(barMax + 4));
    focus.setAttribute("height", "20");
    focus.setAttribute("fill", "transparent");

    const value = document.createElementNS(svgNamespace, "text");
    value.classList.add("chart-value");
    value.setAttribute("x", String(width));
    value.setAttribute("y", String(y + 22));
    value.setAttribute("text-anchor", "end");
    value.textContent = String(item.count);

    group.append(label, track, fill, focus, value);
    group.addEventListener("click", () => filterAndScroll(type, item.label));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        filterAndScroll(type, item.label);
      }
    });
    svg.append(group);
  });

  container.replaceChildren(svg);
}

let chartRenderFrame = 0;
function renderCharts() {
  window.cancelAnimationFrame(chartRenderFrame);
  chartRenderFrame = window.requestAnimationFrame(() => {
    renderChart(elements.nounChart, sortedCounts(corpus.nounCounts).slice(0, 9), "noun");
    renderChart(elements.verbChart, sortedCounts(corpus.verbCounts, "zh-Hans").slice(0, 9), "verb");
  });
}

function setPatternSummary() {
  const topNoun = sortedCounts(corpus.nounCounts)[0];
  if (!topNoun) {
    return;
  }
  const percentage = Math.round((topNoun.count / corpus.records.length) * 100);
  elements.patternSummary.textContent = t("patterns.detail", {
    noun: topNoun.label,
    count: formatNumber(topNoun.count),
    percentage
  });
}

function showDataError(error) {
  lastLoadError = error;
  elements.results.setAttribute("aria-busy", "false");
  elements.results.replaceChildren();
  elements.error.hidden = false;
  elements.error.textContent = `${t("error.loadPrefix")} ${error.message} ${t("error.loadSuffix")}`;
  elements.summary.textContent = t("results.unavailable");
  elements.clear.disabled = true;
  elements.loadMore.hidden = true;
}

function applyLanguage(language, options = {}) {
  currentLanguage = language === "en" ? "en" : "zh";
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.documentElement.dataset.language = currentLanguage;
  document.title = t("document.title");
  elements.metaDescription.setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  elements.languageButtons.forEach((button) => {
    const isCurrent = button.dataset.languageChoice === currentLanguage;
    button.setAttribute("aria-pressed", String(isCurrent));
  });
  syncThemeToggle();
  populateFilters();

  if (corpus.loaded) {
    setStats();
    setFeaturedExample();
    setPatternSummary();
    renderCharts();
    renderResults();
  } else if (lastLoadError) {
    showDataError(lastLoadError);
  }

  if (options.persist !== false) {
    localStorage.setItem("nvatlas-language", currentLanguage);
  }
  if (options.updateUrl !== false) {
    writeUrl();
  }
}

function wireEvents() {
  elements.search.addEventListener("input", () => {
    state.query = elements.search.value;
    state.limit = BATCH_SIZE;
    commitState();
  });

  elements.noun.addEventListener("change", () => {
    state.noun = elements.noun.value;
    state.limit = BATCH_SIZE;
    commitState();
  });

  elements.verb.addEventListener("change", () => {
    state.verb = elements.verb.value;
    state.limit = BATCH_SIZE;
    commitState();
  });

  elements.clear.addEventListener("click", clearFilters);

  elements.languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.languageChoice);
    });
  });

  elements.loadMore.addEventListener("click", () => {
    state.limit += BATCH_SIZE;
    renderResults();
    const entries = elements.results.querySelectorAll(".corpus-entry");
    entries[Math.max(0, entries.length - BATCH_SIZE)]?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement
      || target instanceof HTMLTextAreaElement
      || target instanceof HTMLSelectElement
      || target?.isContentEditable;

    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      elements.search.focus();
    }
    if (event.key === "Escape" && document.activeElement === elements.search && elements.search.value) {
      elements.search.value = "";
      state.query = "";
      state.limit = BATCH_SIZE;
      commitState();
    }
  });

  elements.themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("nvatlas-theme", next);
    syncThemeToggle();
  });

  window.addEventListener("resize", renderCharts, { passive: true });
}

function syncThemeToggle() {
  const isDark = document.documentElement.dataset.theme === "dark";
  elements.themeToggle.setAttribute(
    "aria-label",
    isDark ? t("theme.switchLight") : t("theme.switchDark")
  );
}

async function initialise() {
  wireEvents();
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const initialLanguage = requestedLanguage === "en" || requestedLanguage === "zh"
    ? requestedLanguage
    : currentLanguage;
  applyLanguage(initialLanguage, { persist: false, updateUrl: false });

  try {
    const response = await fetch(CSV_PATH, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(t("error.server", {
        status: response.status,
        statusText: response.statusText
      }));
    }

    const text = await response.text();
    const records = recordsFromCSV(text);
    buildCorpus(records);

    setStats();
    populateFilters();
    restoreUrlState();
    setFeaturedExample();
    setPatternSummary();
    renderCharts();
    renderResults();
  } catch (error) {
    console.error(error);
    showDataError(error instanceof Error ? error : new Error(t("error.unknown")));
  }
}

initialise();
