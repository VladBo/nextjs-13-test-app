import { redirect } from "next/navigation";
import Link from "next/link";
import { cache } from "react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/Dashboard/Header";
import { DashboardShell } from "@/components/Dashboard/Shell";
import { TagItem } from "@/components/Dashboard/TagItem";
import { EmptyPlaceholder } from "@/components/Dashboard/EmptyPlaceholder";

const getTags = cache(async () => {
  return await db.tag.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
});

export default async function TagsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const tags = await getTags();

  return (
    <DashboardShell>
      <DashboardHeader heading="Tags" text="Create and manage tags.">
        <Link
          href="/dashboard/tags/add"
          className="relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
          Create tag
        </Link>
      </DashboardHeader>
      <div>
        {tags?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {tags.map((tag) => (
              <TagItem key={tag.id} tag={tag} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No tags created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any tags yet. Start creating tags.
            </EmptyPlaceholder.Description>
            <Link
              href="/dashboard/tags/add"
              className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
