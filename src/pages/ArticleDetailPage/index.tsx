import { Link, useParams } from "react-router-dom";

export default function ArticleDetailPage() {
  const { id } = useParams();
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Detail článku: {id}</h1>
      <Link to="/" className="text-blue-600 hover:underline">← Zpět na Home</Link>
    </div>
  );
}
