import { http, HttpResponse } from "msw";
import data from "./data.json";
export const handlers = [
  http.get("/blocks", () => {
    let mockBlocks = localStorage.getItem("blocks");
    if (!mockBlocks) {
      localStorage.setItem("blocks", JSON.stringify(data));
      mockBlocks = JSON.stringify(data);
    }

    return HttpResponse.json(JSON.parse(mockBlocks));
  }),

  http.post("/blocks", async ({ request }) => {
    const body = await request.json();
    if (!!body) {
      localStorage.setItem("blocks", JSON.stringify(body));
    }

    return HttpResponse.json(body);
  }),
];
