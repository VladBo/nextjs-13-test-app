import { Tag } from "@prisma/client";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { TagItemOperations } from "@/components/Dashboard/TagItemOperations";
import { Skeleton } from "@/components/ui/Skeleton";

interface TagItemProps {
  tag: Pick<Tag, "id" | "title" | "createdAt">;
}

export function TagItem({ tag }: TagItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/tags/${tag.id}`}
          className="font-semibold hover:underline">
          {tag.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(tag.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <TagItemOperations tag={{ id: tag.id, title: tag.title }} />
    </div>
  );
}

TagItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
