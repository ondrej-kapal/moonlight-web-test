import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ArticlesPage from "../pages/ArticlesPage";
import ArticleDetail from "../pages/ArticleDetail";
import AdminPage from "../pages/AdminPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
