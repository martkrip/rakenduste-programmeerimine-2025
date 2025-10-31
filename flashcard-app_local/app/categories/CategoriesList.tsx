"use client";
import Link from "next/link";
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
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <CreateCategory />

      <div className="space-y-4 mt-6">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center justify-between gap-2"
            >
              <span className="text-lg font-semibold">{category.name}</span>

              <div className="flex flex-wrap gap-2">
                {/* Button to go to the cards list for this category */}
                <Link
                  href={`/categories/${category.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  View Cards
                </Link>

                <Link
                  href={`/categories/${category.id}/play`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Play Mode
                </Link>

                <Link
                  href={`/stats/${category.id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Stats
                </Link>

                <UpdateCategory
                  categoryId={category.id}
                  currentName={category.name}
                />
                <DeleteCategory categoryId={category.id} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
