import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed başlatılıyor...");

  // Admin kullanıcı
  const adminEmail = "admin@dijitalmankenim.com";
  const adminPassword = "Admin123!";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
      photoTokens: 9999,
      videoTokens: 9999,
    },
  });
  console.log(`✅ Admin oluşturuldu: ${admin.email}`);

  // Örnek kıyafet kütüphanesi
  const clothingItems = [
    {
      name: "Beyaz Basic T-Shirt",
      description: "Yüksek kaliteli pamuklu beyaz basic t-shirt",
      category: "ust-giyim",
      gender: "unisex",
      thumbnailUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
      tags: JSON.stringify(["basic", "casual", "beyaz"]),
      sortOrder: 1,
    },
    {
      name: "Siyah Slim Fit Pantolon",
      description: "Klasik kesim siyah slim fit pantolon",
      category: "alt-giyim",
      gender: "erkek",
      thumbnailUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop",
      tags: JSON.stringify(["slim", "klasik", "siyah"]),
      sortOrder: 2,
    },
    {
      name: "Çiçekli Midi Elbise",
      description: "Yazlık çiçekli midi boy elbise",
      category: "elbise",
      gender: "kadin",
      thumbnailUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
      tags: JSON.stringify(["yazlık", "çiçekli", "midi"]),
      sortOrder: 3,
    },
    {
      name: "Lacivert Blazer Ceket",
      description: "Resmi ve günlük kullanım için lacivert blazer",
      category: "ust-giyim",
      gender: "kadin",
      thumbnailUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop",
      tags: JSON.stringify(["blazer", "resmi", "lacivert"]),
      sortOrder: 4,
    },
    {
      name: "Deri Ceket",
      description: "Gerçek deri klasik motosiklet ceketi",
      category: "ust-giyim",
      gender: "erkek",
      thumbnailUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
      tags: JSON.stringify(["deri", "ceket", "trend"]),
      sortOrder: 5,
    },
    {
      name: "Yüksek Bel Jean",
      description: "Vintage fit yüksek bel açık mavi jean",
      category: "alt-giyim",
      gender: "kadin",
      thumbnailUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop",
      tags: JSON.stringify(["jean", "vintage"]),
      sortOrder: 6,
    },
    {
      name: "Bej Trençkot",
      description: "Klasik bej rengi İngiliz usulü trençkot",
      category: "ust-giyim",
      gender: "kadin",
      thumbnailUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
      tags: JSON.stringify(["trençkot", "bej", "klasik"]),
      sortOrder: 7,
    },
    {
      name: "Spor Eşofman Takımı",
      description: "Konforlu günlük spor eşofman takımı",
      category: "takim",
      gender: "unisex",
      thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
      tags: JSON.stringify(["spor", "eşofman"]),
      sortOrder: 8,
    },
  ];

  for (const item of clothingItems) {
    await prisma.clothingItem.create({ data: item }).catch(() => {});
  }
  console.log(`✅ ${clothingItems.length} kıyafet eklendi`);

  // 3. Manken Sablonlari (Models)
  const mankenTemplates = [
    {
      name: "Studio Kadin - Zarif",
      category: "one-pieces",
      gender: "kadin",
      pose: "standing",
      thumbnailUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&auto=format&fit=crop",
      tags: "studio,woman,dress,elegant",
      active: true,
      sortOrder: 1,
    },
    {
      name: "Sokak Tarzi - Erkek",
      category: "tops",
      gender: "erkek",
      pose: "walking",
      thumbnailUrl: "https://images.unsplash.com/photo-1488161628813-04466f3539b5?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1488161628813-04466f3539b5?w=1200&auto=format&fit=crop",
      tags: "streetwear,man,casual",
      active: true,
      sortOrder: 2,
    },
    {
      name: "Modern Kadin - Jean",
      category: "bottoms",
      gender: "kadin",
      pose: "sitting",
      thumbnailUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&auto=format&fit=crop",
      tags: "denim,woman,casual",
      active: true,
      sortOrder: 3,
    },
    {
      name: "Video - Yuruyus",
      category: "tops",
      gender: "kadin",
      pose: "walking",
      thumbnailUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&auto=format&fit=crop",
      fullImageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      isVideo: true,
      tags: "video,walking",
      active: true,
      sortOrder: 4,
    }
  ];

  for (const template of mankenTemplates) {
    await prisma.mankenTemplate.create({ data: template }).catch(() => {});
  }
  console.log(`✅ ${mankenTemplates.length} manken şablonu eklendi`);

  // 4. Token Paketleri
  const tokenPackages = [
    {
      name: "Baslangic Paketi",
      description: "Yeni baslayanlar icin ideal",
      photoTokens: 50,
      videoTokens: 0,
      priceTRY: 99,
      priceUSD: 4.99,
      popular: false,
    },
    {
      name: "Standart Paket",
      description: "En cok tercih edilen",
      photoTokens: 200,
      videoTokens: 5,
      priceTRY: 349,
      priceUSD: 14.99,
      popular: true,
    },
    {
      name: "Pro Paket",
      description: "Profesyonel saticilar icin",
      photoTokens: 500,
      videoTokens: 15,
      priceTRY: 749,
      priceUSD: 29.99,
      popular: false,
    },
    {
      name: "Enterprise",
      description: "Buyuk markalar icin",
      photoTokens: 1000,
      videoTokens: 50,
      priceTRY: 1299,
      priceUSD: 49.99,
      popular: false,
    }
  ];

  for (const pkg of tokenPackages) {
    await prisma.tokenPackage.create({ data: pkg }).catch(() => {});
  }
  console.log(`✅ ${tokenPackages.length} token paketi eklendi`);

  console.log("\n🎉 Seed tamamlandı!");
  console.log("📧 Admin:", adminEmail);
  console.log("🔑 Şifre:", adminPassword);
  console.log("🔗 Admin panel: http://localhost:3000/admin");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
