import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

function runGit(args) {
  return execFileSync("git", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function getGitConfig(key) {
  try {
    return runGit(["config", "--get", key]);
  } catch {
    return "";
  }
}

if (!existsSync(".git")) {
  runGit(["init"]);
}

runGit(["config", "core.hooksPath", ".githooks"]);

console.log("Git 與開發日誌 hook 已設定完成。");
console.log("提交流程：git add <檔案> -> git commit -m \"修改摘要\"");

const userName = getGitConfig("user.name");
const userEmail = getGitConfig("user.email");

if (!userName || !userEmail) {
  console.log("");
  console.log("尚未設定 Git 作者資訊，第一次 commit 前請執行：");
  console.log('git config user.name "你的名稱"');
  console.log('git config user.email "你的信箱"');
}
