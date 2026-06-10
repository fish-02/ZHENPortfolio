import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const logFile = "開發日誌.md";
const marker = "<!-- AUTO_LOG_START -->";
const messageFile = process.argv[2];

function git(args) {
  return execFileSync("git", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function getCommitMessage() {
  if (!messageFile) return "未提供摘要";

  const lines = readFileSync(messageFile, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  return lines[0] || "未提供摘要";
}

function getTimestamp() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const value = (type) => parts.find((part) => part.type === type)?.value;
  return `${value("year")}-${value("month")}-${value("day")} ${value("hour")}:${value("minute")}`;
}

function getFileChanges() {
  const output = git([
    "diff",
    "--cached",
    "--name-status",
    "--",
    ".",
    `:(exclude)${logFile}`,
  ]);

  if (!output) return [];

  return output.split(/\r?\n/).map((line) => {
    const [rawStatus, ...paths] = line.split("\t");
    const status = rawStatus[0];
    const path = paths.at(-1);

    return { status, path };
  });
}

function getLineStats() {
  const output = git([
    "diff",
    "--cached",
    "--numstat",
    "--",
    ".",
    `:(exclude)${logFile}`,
  ]);
  const stats = new Map();

  if (!output) return stats;

  for (const line of output.split(/\r?\n/)) {
    const [added, deleted, ...paths] = line.split("\t");
    stats.set(paths.at(-1), { added, deleted });
  }

  return stats;
}

const labels = {
  A: "新增 Added",
  M: "修改 Modified",
  D: "刪除 Deleted",
  R: "重新命名 Renamed",
  C: "複製 Copied",
  T: "類型變更 Type changed",
  U: "未合併 Unmerged",
};

const changes = getFileChanges();
if (changes.length === 0) process.exit(0);

const stats = getLineStats();
const fileLines = changes.map(({ status, path }) => {
  const lineStat = stats.get(path);
  const detail =
    lineStat && lineStat.added !== "-"
      ? `，+${lineStat.added} / -${lineStat.deleted} 行`
      : "";

  return `- \`${path}\`：${labels[status] || status}${detail}`;
});

const entry = [
  `## ${getTimestamp()}`,
  "",
  `**更動摘要 Change summary：** ${getCommitMessage()}`,
  "",
  "**更動檔案 Changed files：**",
  ...fileLines,
  "",
  "---",
  "",
].join("\n");

const current = readFileSync(logFile, "utf8");
if (!current.includes(marker)) {
  throw new Error(`${logFile} 缺少自動紀錄標記：${marker}`);
}

writeFileSync(logFile, current.replace(marker, `${marker}\n\n${entry}`), "utf8");
git(["add", "--", logFile]);

