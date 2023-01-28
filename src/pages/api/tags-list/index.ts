import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { withAuthentication } from "@/lib/api-middlewares/with-authentication";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const lists = await db.tagsList.findMany();
      return res.status(200).json({ lists });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  if (req.method === "POST") {
    try {
      const { title, tags } = req.body;

      const relatedTags = [];
      tags.forEach((tag) => {
        if (tag.__isNew__ === true) {
          relatedTags.push({ tag: { create: { title: tag.label } } });
        } else {
          relatedTags.push({ tag: { connect: { id: tag.value } } });
        }
      });

      const session = await getServerSession(req, res, authOptions);
      const user = session?.user;

      if (session) {
        const result = await db.tagsList.create({
          data: {
            title,
            authorId: user!.id,
            tags: {
              create: relatedTags,
            },
          },
          include: {
            tags: true,
          },
        });
        res.json(result);
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    } catch (error) {
      return res.status(500).end();
    }
  }
}

export default withMethods(["GET", "POST"], withAuthentication(handler));
