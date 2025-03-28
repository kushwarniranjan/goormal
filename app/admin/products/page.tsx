import Link from 'next/link';
import { getAllProducts, deleteProduct } from '@/lib/actions/product.action';
import { formatCurrency, formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';
import { requireAdmin } from '@/lib/auth-guard';
import AdminSearch from '@/components/admin/admin-search';

const AdminProductsPage = async (props: {
    searchParams: {
        page: string;
        query: string;
        category: string;
    };
}) => {
    await requireAdmin();

    const { page, query, category } = props.searchParams;
    const pageNumber = Number(page) || 1;
    const searchText = query || '';
    const selectedCategory = category || '';

    const products = await getAllProducts({
        query: searchText,
        page: pageNumber,
        category: selectedCategory
    });

    return (
        <div className="space-y-2">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <h1 className="h2-bold">Products</h1>
                    <AdminSearch /> {/* ✅ No Suspense needed */}
                    {searchText && (
                        <div>
                            Filtered by <i>&quot;{searchText}&quot;</i>{' '}
                            <Link href="/admin/products">
                                <Button variant="outline" size="sm">Remove Filter</Button>
                            </Link>
                        </div>
                    )}
                </div>
                <Button asChild variant="default">
                    <Link href="/admin/products/create">Create Product</Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>NAME</TableHead>
                        <TableHead className="text-right">PRICE</TableHead>
                        <TableHead>CATEGORY</TableHead>
                        <TableHead>STOCK</TableHead>
                        <TableHead>RATING</TableHead>
                        <TableHead className="w-[100px]">ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.data.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{formatId(product.id)}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.rating}</TableCell>
                            <TableCell className="flex gap-1">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                                </Button>
                                <DeleteDialog id={product.id} action={deleteProduct} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {products.totalPages > 1 && <Pagination page={pageNumber} totalPages={products.totalPages} />}
        </div>
    );
};



export default AdminProductsPage;