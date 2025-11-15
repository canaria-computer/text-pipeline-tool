import type { RequestHandler } from "@builder.io/qwik-city";
import { app as honoApp } from "~/hono/";

export const onRequest: RequestHandler = async ({ request, send }) => {
  const response = await honoApp.fetch(request);
  send(response);
};
