"use client";
import Link from "next/link"
import CreateCategory from "./CreateCategory";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";

type Category = {
  id: number;
  name: string;
};

type CategoryListProps = {
  categories: Category[];
};

export default function CategoriesList({ categories }: CategoryListProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="'text-2xl font-bold mb-4">Categories</h1>

      <CreateCategory />

      <div className="space-y-4 mt-6">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-between items-center bg-white rounded-lg shadow p-4"
            >
              <Link
                href={`/categories/${category.id}`}
                className="text-gray-800 font-medium hover:underline"
              >
                {category.name}
              </Link>
              <DeleteCategory categoryId={category.id} />
              <UpdateCategory
                categoryId={category.id}
                currentName={category.name}
              />
              <Link
                href={`/categories/${category.id}/play`}
                className="btn btn-blue"
              >
                Play Mode
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
