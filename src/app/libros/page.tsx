import Link from "next/link";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface OpenLibraryResponse {
  docs: Book[];
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch(
    "https://openlibrary.org/search.json?q=literatura&limit=6&lang=es",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Error al cargar los libros");
  }

  const data: OpenLibraryResponse = await res.json();
  return data.docs;
}

export default async function LibrosPage() {
  const books = await getBooks();
  const timestamp = new Date().toLocaleString("es-ES");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-amber-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:text-amber-200">
              Feria del Libro
            </Link>
            <nav>
              <Link
                href="/"
                className="text-amber-100 hover:text-white transition-colors"
              >
                Volver al Inicio
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-amber-900 mb-4 text-center">
            Catalogo de Libros
          </h1>
          <p className="text-center text-gray-600 mb-2">
            Pagina dinamica - datos obtenidos de Open Library API
          </p>
          <p className="text-center text-sm text-gray-500 mb-8">
            Ultima actualizacion: {timestamp}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.key}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-amber-100 flex items-center justify-center">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={book.title}
                      className="h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">📖</div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-amber-900 mb-2 line-clamp-2">
                    {book.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-1">
                    {book.author_name?.[0] || "Autor desconocido"}
                  </p>
                  {book.first_publish_year && (
                    <p className="text-gray-500 text-xs">
                      Publicado: {book.first_publish_year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Feria del Libro 2025 - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
