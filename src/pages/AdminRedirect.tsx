import { useEffect } from "react";

export default function AdminRedirect() {
  useEffect(() => {
    // vždy s lomítkem, aby se načetl public/admin/index.html
    window.location.replace("/admin/");
  }, []);
  return null;
}
