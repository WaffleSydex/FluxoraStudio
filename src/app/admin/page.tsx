import Dashboard from "@/components/admin/Dashboard";

// The dashboard is interactive and per-user; never prerender it at build time.
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <Dashboard />;
}
