import { getVisibleNavNodes } from "../../../server/db";

export async function GET() {
  try {
    const nodes = await getVisibleNavNodes();
    return Response.json(nodes.map(({ id, label, url, posX, posY }) => ({ id, label, url, posX, posY })));
  } catch (error) {
    console.error("[Nav Nodes] failed to load", error);
    return Response.json([], { status: 200 });
  }
}
