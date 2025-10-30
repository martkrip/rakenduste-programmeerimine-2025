import Link from "next/link";
import { AuthButton } from "@/components/auth-button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Auth button at the top */}
      <div className="absolute top-4 right-4">
        <AuthButton />
      </div>

      <div className="flex flex-col items-center gap-6 max-w-md text-center p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold">Kripsaar Flashcards</h1>
        <p className="text-gray-700">
          You must be authenticated to access your categories. Please log in
          first.
        </p>
        <Link
          href="/categories"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Go to Categories
        </Link>
      </div>
    </main>
  );
}
