"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status } from "@prisma/client";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DeleteProductPayload,
  ToggleProductStatusPayload,
} from "@/lib/validators/product";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";

type RecievedProduct = {
  id: string;
  bookName: string;
  price: number;
  status: Status;
};
interface ProductsTableProps {
  _products: RecievedProduct[];
}

const ProductsTable: FC<ProductsTableProps> = ({ _products }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<RecievedProduct[]>(_products);

  // optimistic updates used for marking product as sold
  const { mutate: markProductAsSold } = useMutation({
    mutationFn: async (productId: string) => {
      const payload: ToggleProductStatusPayload = {
        productId,
      };

      setProducts((prevProducts) => {
        const idx = prevProducts.findIndex((p) => p.id === productId)!;
        const status = prevProducts[idx].status;
        prevProducts[idx] = {
          ...prevProducts[idx],
          status: status === "SOLD" ? "NOT_SOLD" : "SOLD",
        };
        return prevProducts;
      });

      const response = await axios.post("/api/product/toggle-status", payload);
    },
  });

  // optimistic updates NOT used for deleting product
  const { mutate: deleteProduct, isLoading: isDeleting } = useMutation({
    mutationFn: async (productId: string) => {
      const payload: DeleteProductPayload = {
        productId,
      };
      const respone = await axios.delete("/api/product", {
        data: payload,
      });
    },
    onSuccess: (data, productId, context) => {
      console.log("done");
      setOpen(false);
      setProducts((prevProducts) => {
        return prevProducts.filter((p) => p.id !== productId);
      });
    },
  });

  return (
    <Table>
      <TableCaption>
        {products.length > 0 ? "Your products" : "You have no products"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          {/* <TableHead className="">Index</TableHead> */}
          <TableHead className="w-[1rem]"></TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((prd, index) => {
            return (
              <TableRow key={prd.id}>
                {/* <TableCell className="font-medium">{index + 1}</TableCell> */}
                <TableCell className="w-[1rem]">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Product</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DialogTrigger
                          asChild
                        >
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem
                          onClick={() => {
                            markProductAsSold(prd.id);
                          }}
                        >
                          {prd.status === "NOT_SOLD"
                            ? "Mark as sold"
                            : "Mark as not sold"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. Are you sure you want to
                          permanently delete this product?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        {/* <DialogClose asChild> */}
                        <Button
                          variant={"destructive"}
                          disabled={isDeleting}
                          isLoading={isDeleting}
                          onClick={() => deleteProduct(prd.id)}
                        >
                          Delete
                        </Button>
                        {/* </DialogClose> */}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{prd.bookName}</TableCell>
                <TableCell>
                  {prd.status === "NOT_SOLD" ? "Not Sold" : "Sold"}
                </TableCell>
                <TableCell className="text-right">{prd.price}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
