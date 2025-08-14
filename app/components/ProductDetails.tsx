"use client";
import { Product } from "../types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface ProductDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductDetails({
  isOpen,
  onClose,
  product,
}: ProductDetailsProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2">{product.name}</h3>
            <p className="text-muted-foreground mb-4">{product.description}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Price:</span>
              <p className="text-primary font-medium">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div>
              <span className="text-muted-foreground">Stock:</span>
              <p>{product.stock} units</p>
            </div>

            <div>
              <span className="text-muted-foreground">Product ID:</span>
              <p className="font-mono text-xs">{product.id}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
