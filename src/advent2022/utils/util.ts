import { dirname } from "path";
import { fileURLToPath } from "url";

export function currDir(filename: string): string {
  return dirname(fileURLToPath(import.meta.url)) + "/data/" + filename;
}
