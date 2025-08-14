"use client";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";
import { ProductDetails } from "../components/ProductDetails";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search } from "lucide-react";

// Mock data for demonstration
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    stock: 25,
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    description:
      "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Made from 100% organic materials.",
    price: 29.99,
    stock: 50,
  },
  {
    id: "3",
    name: "Smart Coffee Maker",
    description:
      "WiFi-enabled coffee maker with programmable settings and smartphone app control. Brew perfect coffee every time.",
    price: 149.99,
    stock: 15,
  },
  {
    id: "4",
    name: "Yoga Mat Premium",
    description:
      "Non-slip premium yoga mat with excellent grip and cushioning for all yoga practices. Eco-friendly materials.",
    price: 79.99,
    stock: 30,
  },
  {
    id: "5",
    name: "JavaScript: The Complete Guide",
    description:
      "Comprehensive guide to modern JavaScript programming with practical examples and projects. Updated for 2024.",
    price: 39.99,
    stock: 100,
  },
  {
    id: "6",
    name: "Moisturizing Face Cream",
    description:
      "Hydrating face cream with natural ingredients suitable for all skin types. Dermatologist tested and approved.",
    price: 24.99,
    stock: 75,
  },
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(true);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Selected items
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialProducts[0]
  );
  const [productToDelete, setProductToDelete] = useState<string>("");

  // Filter products based on search
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleEditProduct = (productData: Omit<Product, "id">) => {
    if (!selectedProduct) return;

    const updatedProduct: Product = {
      ...productData,
      id: selectedProduct.id,
    };

    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedProduct.id ? updatedProduct : product
      )
    );
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== productToDelete)
    );
    setProductToDelete("");
    setShowDeleteDialog(false);
  };

  const openEditForm = (product: Product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const openDeleteDialog = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteDialog(true);
  };

  const productToDeleteName =
    products.find((p) => p.id === productToDelete)?.name || "";

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Product Management</h1>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Add Product Button */}
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No products found matching your search criteria."
                : "No products available."}
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={openProductDetails}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        <ProductForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddProduct}
          title="Add New Product"
        />

        <ProductForm
          isOpen={showEditForm}
          onClose={() => {
            setShowEditForm(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleEditProduct}
          product={selectedProduct || undefined}
          title="Edit Product"
        />

        <ProductDetails
          isOpen={showProductDetails}
          onClose={() => {
            setShowProductDetails(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />

        <DeleteConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setProductToDelete("");
          }}
          onConfirm={handleDeleteProduct}
          productName={productToDeleteName}
        />
      </div>
    </div>
  );
}
