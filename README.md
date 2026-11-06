# NVAtlas 语料浏览器

一个无需依赖的静态网站，用于浏览 `NVAtlas-AI-Agent.csv` 中 500 条
英汉“名词—动词”平行语料。界面支持中文与 English 即时切换，并会记住
最近一次选择。

## 本地运行

请通过 HTTP 提供此文件夹，以便浏览器加载 CSV：

```sh
python3 -m http.server 8000
```

然后打开 <http://localhost:8000>。

## 部署

将以下文件上传至任意静态托管服务：

- `index.html`
- `styles.css`
- `app.js`
- `NVAtlas-AI-Agent.csv`

无需构建命令、后端、包管理器、外部字体、CDN 或图表库。托管服务需通过
HTTP 或 HTTPS 提供文件。

## 数据

CSV 会被直接读取，并始终作为唯一数据源。网站保留全部原文、条目级重复记录
以及繁简混用的中文。搜索和频次统计均在浏览器中完成。
