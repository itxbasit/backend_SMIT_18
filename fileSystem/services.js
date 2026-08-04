import fsExtra from "fs-extra";
import path from "path";
import { cwd } from "process";

export function filePath(fileName) {
  const folder = path.join(cwd(), "assets", "file");
  fsExtra.mkdir(folder, { recursive: true });
  const filePath = path.join(folder, fileName);

  return filePath;
}
