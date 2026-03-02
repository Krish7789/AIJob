export type Course = {
  _id: string;
  platform: string;
  category: string;
  title: string;
  subtitle?: string;
  rating: number;
  durationMonths: number;
  price: number;
  imageUrl: string;
  viewUrl: string;
  tags: string[];
  level: string;
};
