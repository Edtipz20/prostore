import DeleteDialog from "@/components/shared/delete-diaglog";
import Pagination from "@/components/shared/pagination";
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
import { deleteProduct, getAllProducts } from "@/lib/actions/product.actions";
import { formatCurreny, formatId } from "@/lib/utils";
import Link from "next/link";

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const queryText = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    query: queryText,
    page,
    category,
  });

  console.log(products);
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>
      {products.data.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No product has been made
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead className="w-25">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">
                  {formatCurreny(product.price)}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="flex gap-1">
                  {/* EDIT */}
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/product/${product.id}`}>Edit</Link>
                  </Button>
                  {/* DELETE */}
                  <DeleteDialog id={product.id} action={deleteProduct} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {products?.totalPages && products.totalPages > 1 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  {products.totalPages > 1 && (
                    <Pagination
                      page={Number(page) || 1}
                      totalPages={products?.totalPages}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
    </div>
  );
};

export default AdminProductsPage;
