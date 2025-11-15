import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import myCounter from "./counter";

export const app = new Hono().basePath("/api");
app.get("/hello", (c) => c.json({ message: "Hello from Hono!" }));

app.post("/data", (c) => c.json({ status: "success" }));

app.get("/sse", async (c) => {
  return streamSSE(c, async (stream) => {
    const counter = myCounter();

    while (true) {
      const message = `It is ${new Date().toISOString()}`;
      await stream.writeSSE({
        data: message,
        event: "time-update",
        id: String(counter()),
      });
      await stream.sleep(1000);
    }
  });
});
