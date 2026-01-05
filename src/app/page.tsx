import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Hero Section */}
      <header className="bg-amber-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Feria del Libro</h1>
          <p className="text-xl text-amber-100">
            Descubre el mundo a traves de la lectura
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-amber-900 mb-6">
            Bienvenidos a la Feria del Libro
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Un espacio dedicado a los amantes de la literatura. Explora miles de
            titulos, conoce a tus autores favoritos y sumérgete en el
            maravilloso mundo de los libros.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-semibold text-amber-800 mb-2">
                Miles de Titulos
              </h3>
              <p className="text-gray-600 text-sm">
                Encuentra libros de todos los generos y epocas
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">✍️</div>
              <h3 className="font-semibold text-amber-800 mb-2">
                Autores Destacados
              </h3>
              <p className="text-gray-600 text-sm">
                Conoce a escritores nacionales e internacionales
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🎭</div>
              <h3 className="font-semibold text-amber-800 mb-2">Eventos</h3>
              <p className="text-gray-600 text-sm">
                Charlas, talleres y presentaciones
              </p>
            </div>
          </div>

          <Link
            href="/libros"
            className="inline-block bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
          >
            Explorar Libros
          </Link>
        </section>
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
