export type ListingType = "מכירה" | "השכרה";

export interface Property {
  id: string;
  name: string;
  type: "דירה" | "פנטהאוז" | "בית פרטי" | "דו משפחתי" | "דירת גן";
  listingType?: ListingType;
  price: number;
  rooms: number;
  size: number;
  location: string;
  address: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  features: string[];
  isNew?: boolean;
  isHot?: boolean;
  isActive?: boolean;
  featuredWeek?: boolean;
  videoUrl?: string;
}

export function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/);
  return match ? match[1] : null;
}

export function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)\//.test(url);
}

export function getInstagramEmbedUrl(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/);
  if (match) return `https://www.instagram.com/reel/${match[1]}/embed/`;
  return null;
}

export function isInstagramUrl(url: string): boolean {
  return /instagram\.com\/(?:reel|p)\//.test(url);
}

export function isDrivePreviewUrl(url: string): boolean {
  return /drive\.google\.com\/file\/d\/.*\/preview/.test(url);
}

export function isEmbedVideo(url: string): boolean {
  return isYouTubeUrl(url) || isInstagramUrl(url) || isDrivePreviewUrl(url);
}

export function getEmbedUrl(url: string, muted = true): string {
  const ytId = getYouTubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&enablejsapi=1`;
  const instaUrl = getInstagramEmbedUrl(url);
  if (instaUrl) return instaUrl;
  return url;
}

export function getEmbedThumbnail(url: string): string | null {
  const ytId = getYouTubeId(url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return null;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(price);
};

export const generateWhatsAppLink = (property: Property): string => {
  const message = encodeURIComponent(
    `שלום ליה,\n\nאני מתעניין/ת בנכס הבא:\n\nנכס: ${property.name}\nעיר: ${property.location}\nמחיר: ${formatPrice(property.price)}\nחדרים: ${property.rooms}\n\nאשמח לקבל פרטים נוספים.`
  );
  return `https://wa.me/972546739422?text=${message}`;
};
