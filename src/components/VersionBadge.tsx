import { useEffect, useState } from 'react';

export default function VersionBadge() {
  const [ver, setVer] = useState<{ version?: string; commit?: string } | null>(null);

  useEffect(() => {
    fetch('/version.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setVer(data))
      .catch(() => {});
  }, []);

  if (!ver) return null;

  return (
    <div className="fixed bottom-2 right-4 z-50 text-xs text-muted-foreground bg-background/60 backdrop-blur px-2 py-1 rounded">
      v{ver.version}{ver.commit ? ` (${ver.commit})` : ''}
    </div>
  );
}
