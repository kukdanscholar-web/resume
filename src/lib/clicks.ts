import { promises as fs } from "node:fs";
import path from "node:path";

export type ClickCounts = Record<string, number>;

const CLICKS_FILE = path.join(process.cwd(), "data", "clicks.json");

// 동시에 들어온 요청이 서로의 기록을 덮어쓰지 않도록 한 줄로 세운다.
let queue: Promise<unknown> = Promise.resolve();

export async function readClicks(): Promise<ClickCounts> {
  try {
    return JSON.parse(await fs.readFile(CLICKS_FILE, "utf-8")) as ClickCounts;
  } catch {
    return {};
  }
}

export function incrementClick(id: string): Promise<ClickCounts> {
  const next = queue.then(async () => {
    const counts = await readClicks();
    counts[id] = (counts[id] ?? 0) + 1;
    await fs.mkdir(path.dirname(CLICKS_FILE), { recursive: true });
    await fs.writeFile(CLICKS_FILE, JSON.stringify(counts, null, 2), "utf-8");
    return counts;
  });
  queue = next.catch(() => undefined);
  return next;
}
