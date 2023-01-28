import { redirect } from "next/navigation";
import Link from "next/link";
import { cache } from "react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";
import { DashboardHeader } from "@/components/Dashboard/Header";
import { DashboardShell } from "@/components/Dashboard/Shell";
import { TagListItem } from "@/components/Dashboard/TagsListItem";
import { EmptyPlaceholder } from "@/components/Dashboard/EmptyPlaceholder";

const getListsForUser = cache(async (userId: User["id"]) => {
  return await db.tagsList.findMany({
    where: {
      authorId: userId,
    },
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

export default async function TagsListsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const lists = await getListsForUser(user.id);

  return (
    <DashboardShell>
      <DashboardHeader heading="Tags" text="Create and manage tags.">
        <Link
          href="/dashboard/tags-lists/add"
          className="relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
          Create list
        </Link>
      </DashboardHeader>
      <div>
        {lists?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {lists.map((list) => (
              <TagListItem key={list.id} tagsList={list} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No tags lists created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any tags lists yet. Start creating content.
            </EmptyPlaceholder.Description>
            <Link
              href="/dashboard/tags-lists/add"
              className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
