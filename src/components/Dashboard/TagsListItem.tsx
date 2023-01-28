import { TagsList } from "@prisma/client";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { TagsListItemOperations } from "@/components/Dashboard/TagsListItemOperations";
import { Skeleton } from "@/components/ui/Skeleton";

interface TagListItemProps {
  tagsList: Pick<TagsList, "id" | "title" | "createdAt">;
}

export function TagListItem({ tagsList }: TagListItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/tags-lists/${tagsList.id}`}
          className="font-semibold hover:underline">
          {tagsList.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(tagsList.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <TagsListItemOperations
        tagsList={{ id: tagsList.id, title: tagsList.title }}
      />
    </div>
  );
}

TagListItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
