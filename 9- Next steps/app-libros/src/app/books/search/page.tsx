"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // Simulación de datos de búsqueda (puedes reemplazar esto con tu lógica real)
  const isLoading = false; // Cambia esto según tu lógica
  const error = false; // Cambia esto según tu lógica
  const data: Book[] = [
    {
      id: "1",
      volumeInfo: {
        title: "Libro de ejemplo",
        authors: ["Autor Ejemplo"],
        imageLinks: { thumbnail: "/example-thumbnail.jpg" },
      },
    },
  ]; // Reemplaza con los datos reales

  if (isLoading) return <p className="text-center mt-10">⏳ Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">⚠️ Error al buscar libros</p>;
  if (!data?.length) return <p className="text-center mt-10">No se encontraron libros.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Resultados para: <span className="text-purple-600">{query}</span>
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((book: Book) => (
          <li
            key={book.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <a href={`/books/${book.id}`} className="block">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Image
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  width={200}
                  height={300}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {book.volumeInfo.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {book.volumeInfo.authors?.join(", ")}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">⏳ Cargando resultados...</p>}>
      <SearchResults />
    </Suspense>
  );
}