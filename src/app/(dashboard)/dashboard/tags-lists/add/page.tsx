import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/Dashboard/Header";
import { Card } from "@/components/ui/Card";
import { DashboardShell } from "@/components/Dashboard/Shell";
import { TagsListForm } from "@/components/Forms/TagsListForm";

export default async function TagsListsPage() {
  const tags = await db.tag.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Tags lists"
        text="Create and manage tags lists."
      />
      <div className="grid gap-10">
        <TagsListForm tags={tags} />
      </div>
    </DashboardShell>
  );
}
