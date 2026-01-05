
import { db } from "./db";
import {
  services,
  gallery,
  bookings,
  type Service,
  type GalleryItem,
  type Booking,
  type InsertBooking
} from "@shared/schema";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getGalleryItems(): Promise<GalleryItem[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(gallery);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async seedData(): Promise<void> {
    const existingServices = await this.getServices();
    if (existingServices.length === 0) {
      await db.insert(services).values([
        { name: "Haircut & Shaving", price: 200, category: "Hair", description: "Precision cut and clean shave", imageUrl: "https://images.unsplash.com/photo-1599351431202-6e0000a758d6?w=800&q=80" },
        { name: "Beard Trimming", price: 80, category: "Beard", description: "Shape and style your beard", imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80" },
        { name: "Shaving", price: 70, category: "Beard", description: "Classic hot towel shave", imageUrl: "https://images.unsplash.com/photo-1503951914875-befbb7470d03?w=800&q=80" },
        { name: "Facial & Face Packs", price: 450, category: "Skin", description: "Rejuvenating facial treatment", imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80" },
        { name: "Hair Highlighting", price: 500, category: "Color", description: "Modern streaks and highlights", imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80" },
        { name: "Hair Coloring", price: 250, category: "Color", description: "Full head color application", imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80" },
      ]);

      await db.insert(gallery).values([
        { title: "Classic Fade", category: "Haircut", imageUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80" },
        { title: "Modern Pompadour", category: "Haircut", imageUrl: "https://images.unsplash.com/photo-1593487568720-92097fb460bf?w=800&q=80" },
        { title: "Beard Styling", category: "Beard", imageUrl: "https://images.unsplash.com/photo-1552960562-daf630e9278b?w=800&q=80" },
        { title: "Sharp Edges", category: "Haircut", imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80" },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
