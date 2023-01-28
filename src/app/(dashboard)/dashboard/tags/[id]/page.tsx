import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/Dashboard/Header";
import { DashboardShell } from "@/components/Dashboard/Shell";

export default async function TagPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Tags" text="Create tags."></DashboardHeader>
      {/* <div>
        {tags?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {tags.map((tag) => (
              <ListItem key={tag.id} listItem={tags} />
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
      </div> */}
    </DashboardShell>
  );
}
