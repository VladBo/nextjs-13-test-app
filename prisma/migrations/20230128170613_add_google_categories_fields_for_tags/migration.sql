/*
  Warnings:

  - You are about to drop the `_TagToTagsList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelId` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etag` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TagToTagsList" DROP CONSTRAINT "_TagToTagsList_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTagsList" DROP CONSTRAINT "_TagToTagsList_B_fkey";

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "channelId" TEXT NOT NULL,
ADD COLUMN     "etag" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TagToTagsList";

-- CreateTable
CREATE TABLE "TagsOnTagsLists" (
    "tagId" TEXT NOT NULL,
    "tagsListId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnTagsLists_pkey" PRIMARY KEY ("tagId","tagsListId")
);

-- AddForeignKey
ALTER TABLE "TagsOnTagsLists" ADD CONSTRAINT "TagsOnTagsLists_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnTagsLists" ADD CONSTRAINT "TagsOnTagsLists_tagsListId_fkey" FOREIGN KEY ("tagsListId") REFERENCES "tags_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
