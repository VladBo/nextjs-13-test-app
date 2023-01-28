import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { withAuthentication } from "@/lib/api-middlewares/with-authentication";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const tags = await db.tag.findMany({
        where: { status: true },
      });
      return res.status(200).json({ tags });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  if (req.method === "POST") {
    const { label, etag, channelId } = req.body;

    const session = await getSession({ req });
    if (session) {
      const result = await db.tag.create({
        data: { title: label, etag, channelId },
      });
      res.json(result);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  }
}

export default withMethods(["GET", "POST"], withAuthentication(handler));
