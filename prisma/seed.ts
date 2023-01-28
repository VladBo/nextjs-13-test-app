import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CategoriesResponse {
  items: [
    {
      id: number;
      title: string;
      etag: string;
      snippet: {
        title: string;
        channelId: string;
      };
    }
  ];
}

async function main() {
  const YOUTUBE_API = "https://youtube.googleapis.com/youtube/v3";

  const res = await fetch(
    `${YOUTUBE_API}/videoCategories?part=snippet&regionCode=US&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data: CategoriesResponse = await res.json();

  if (data) {
    const tags = [];
    data.items.map(({ snippet = {}, etag }) => {
      tags.push({ title: snippet.title, etag, channelId: snippet.channelId });
    });
    const result = await prisma.tag.createMany({
      data: tags,
      skipDuplicates: true,
    });
    console.log(result);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
