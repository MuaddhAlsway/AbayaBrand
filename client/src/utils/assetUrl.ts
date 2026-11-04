const assets = import.meta.glob("../assets/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
export function assetUrl(value: string): string { if (value.startsWith("http") || value.startsWith("data:")) return value; const filename = value.split("/").pop() ?? value; return Object.entries(assets).find(([path]) => path.endsWith(`/${filename}`))?.[1] ?? value; }
