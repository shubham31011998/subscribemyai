import ProtectedRoute from "@/components/protectedRoute"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      </div>
    </ProtectedRoute>
  )
}
