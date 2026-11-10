import { CLICK_TARGET_IDS } from "@/data/content";
import { incrementClick, readClicks } from "@/lib/clicks";

export async function GET() {
  return Response.json(await readClicks());
}

export async function POST(request: Request) {
  let id: unknown;
  try {
    id = ((await request.json()) as { id?: unknown }).id;
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (typeof id !== "string" || !CLICK_TARGET_IDS.includes(id)) {
    return Response.json({ error: "알 수 없는 대상입니다." }, { status: 400 });
  }
  return Response.json(await incrementClick(id));
}
