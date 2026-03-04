const WPM = 200;

export function calculateReadingTime(text: string): number {
  const stripped = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/[*_~`]/g, "")
    .replace(/>\s/g, "")
    .replace(/[-+*]\s/gm, "")
    .replace(/\d+\.\s/g, "")
    .replace(/---+/g, "")
    .trim();

  if (!stripped) return 0;

  const words = stripped.split(/\s+/).length;
  return Math.ceil(words / WPM);
}
