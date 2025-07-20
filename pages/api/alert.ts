import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { page, time, userAgent } = req.body;

  // TODO: Validate data, check user subscription, IP whitelist, etc.

  console.log(`⚠️ DevTools opened on page: ${page} at ${time}`);
  console.log(`User Agent: ${userAgent}`);

  // TODO: Trigger email/SMS alert here

  res.status(200).json({ message: "Alert received" });
}
