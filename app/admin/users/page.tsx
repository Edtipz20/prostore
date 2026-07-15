import DeleteDialog from "@/components/shared/delete-diaglog";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers, deleteUser } from "@/lib/actions/user.action";
import { requireAdmin } from "@/lib/auth-guard";
import { formatId } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Users",
};

const AdminUserPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await requireAdmin();
  const { page = "1", query: searchText } = await props.searchParams;

  const users = await getAllUsers({ page: Number(page), query: searchText });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Users</h1>
        {searchText && (
          <div>
            Filtered by <i>&quot;{searchText}&quot;</i>{" "}
            <Link href="/admin/users">
              <Button variant="outline" size="sm">
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      {users.data.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No users has been made
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>ROLE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => (
                <TableRow key={user.id} className="border-gray-200">
                  <TableCell>{formatId(user.id)}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === "admin" ? (
                      <Badge variant="default">Admin</Badge>
                    ) : (
                      <Badge variant="secondary">User</Badge>
                    )}
                  </TableCell>

                  <TableCell className="flex gap-2">
                    {/* DETAILS */}
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/users/${user.id}`}>Edit</Link>
                    </Button>
                    {/* DELETE */}
                    <DeleteDialog id={user.id} action={deleteUser} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  {users.totalPages > 1 && (
                    <Pagination
                      page={Number(page) || 1}
                      totalPages={users?.totalPages}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;
