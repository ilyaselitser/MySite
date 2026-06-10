import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "math" },
      update: {},
      create: { slug: "math", nameBg: "Математика", nameRu: "Математика", nameEn: "Mathematics", image: "🔢" },
    }),
    prisma.category.upsert({
      where: { slug: "science" },
      update: {},
      create: { slug: "science", nameBg: "Наука", nameRu: "Наука", nameEn: "Science", image: "🔬" },
    }),
    prisma.category.upsert({
      where: { slug: "language" },
      update: {},
      create: { slug: "language", nameBg: "Езици", nameRu: "Языки", nameEn: "Languages", image: "📚" },
    }),
    prisma.category.upsert({
      where: { slug: "art" },
      update: {},
      create: { slug: "art", nameBg: "Изкуство", nameRu: "Искусство", nameEn: "Art & Creativity", image: "🎨" },
    }),
    prisma.category.upsert({
      where: { slug: "coding" },
      update: {},
      create: { slug: "coding", nameBg: "Програмиране", nameRu: "Программирование", nameEn: "Coding", image: "💻" },
    }),
    prisma.category.upsert({
      where: { slug: "geography" },
      update: {},
      create: { slug: "geography", nameBg: "География", nameRu: "География", nameEn: "Geography", image: "🌍" },
    }),
  ]);

  const [math, science, language, art, coding, geography] = categories;

  const products = [
    {
      slug: "math-explorer-3-6",
      nameBg: "Математически Изследовател 3-6",
      nameRu: "Математический Исследователь 3-6",
      nameEn: "Math Explorer 3-6",
      descriptionBg: "Забавен комплект за запознаване с числата и основните математически операции. Включва цветни блокчета, карти с числа и игрална дъска. Идеален за деца 3-6 години, развиващ логическото мислене.",
      descriptionRu: "Веселый набор для знакомства с числами и основными математическими операциями. Включает цветные блоки, карточки с числами и игровую доску. Идеален для детей 3-6 лет.",
      descriptionEn: "A fun kit for introducing numbers and basic math operations. Includes colorful blocks, number cards, and a game board. Perfect for children aged 3-6, developing logical thinking.",
      priceBgn: 49.90,
      priceEur: 25.50,
      images: JSON.stringify(["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80"]),
      ageMin: 3,
      ageMax: 6,
      stock: 15,
      featured: true,
      categoryId: math.id,
    },
    {
      slug: "science-lab-junior",
      nameBg: "Детска Научна Лаборатория",
      nameRu: "Детская Научная Лаборатория",
      nameEn: "Junior Science Lab",
      descriptionBg: "Вълнуващи научни експерименти у дома! Комплектът включва епруветки, цветни вещества и ръководство с 20 безопасни опита. Развива любопитство и научно мислене при деца 6-10 години.",
      descriptionRu: "Захватывающие научные эксперименты дома! Набор включает пробирки, цветные вещества и руководство с 20 безопасными опытами. Развивает любопытство и научное мышление у детей 6-10 лет.",
      descriptionEn: "Exciting science experiments at home! Includes test tubes, safe chemicals, and a guide with 20 experiments. Develops curiosity and scientific thinking for children aged 6-10.",
      priceBgn: 69.90,
      priceEur: 35.70,
      images: JSON.stringify(["https://images.unsplash.com/photo-1532094349884-543559b26c93?w=600&q=80"]),
      ageMin: 6,
      ageMax: 10,
      stock: 8,
      featured: true,
      categoryId: science.id,
    },
    {
      slug: "alphabet-adventure",
      nameBg: "Азбучно Приключение",
      nameRu: "Азбучное Приключение",
      nameEn: "Alphabet Adventure",
      descriptionBg: "Интерактивен комплект за изучаване на азбуката с картинки, пъзели и стикери. Подходящ за деца 3-5 години, правещ ученето на четенето забавно и лесно.",
      descriptionRu: "Интерактивный набор для изучения алфавита с картинками, пазлами и наклейками. Подходит для детей 3-5 лет, делая обучение чтению веселым и легким.",
      descriptionEn: "Interactive alphabet learning kit with pictures, puzzles, and stickers. Suitable for children aged 3-5, making learning to read fun and easy.",
      priceBgn: 39.90,
      priceEur: 20.40,
      images: JSON.stringify(["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80"]),
      ageMin: 3,
      ageMax: 5,
      stock: 20,
      featured: true,
      categoryId: language.id,
    },
    {
      slug: "creative-art-studio",
      nameBg: "Творческо Арт Студио",
      nameRu: "Творческая Арт-Студия",
      nameEn: "Creative Art Studio",
      descriptionBg: "Пълен комплект за рисуване и творчество: акварели, пастели, моливи и специална хартия. За деца 5-12 години, развиващ художествен усет и фина моторика.",
      descriptionRu: "Полный набор для рисования и творчества: акварели, пастели, карандаши и специальная бумага. Для детей 5-12 лет, развивающий художественный вкус и мелкую моторику.",
      descriptionEn: "Complete art kit with watercolors, pastels, pencils, and special paper. For children aged 5-12, developing artistic sense and fine motor skills.",
      priceBgn: 54.90,
      priceEur: 28.10,
      images: JSON.stringify(["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80"]),
      ageMin: 5,
      ageMax: 12,
      stock: 12,
      featured: false,
      categoryId: art.id,
    },
    {
      slug: "coding-for-kids",
      nameBg: "Програмиране за Деца",
      nameRu: "Программирование для Детей",
      nameEn: "Coding for Kids",
      descriptionBg: "Въведение в света на програмирането без компютър! Карти с алгоритми, логически пъзели и ръководство. За деца 7-12 години, развиващ компютърно мислене.",
      descriptionRu: "Введение в мир программирования без компьютера! Карточки с алгоритмами, логические пазлы и руководство. Для детей 7-12 лет, развивающий компьютерное мышление.",
      descriptionEn: "Introduction to programming without a computer! Algorithm cards, logic puzzles, and guide. For children aged 7-12, developing computational thinking.",
      priceBgn: 79.90,
      priceEur: 40.90,
      images: JSON.stringify(["https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80"]),
      ageMin: 7,
      ageMax: 12,
      stock: 6,
      featured: true,
      categoryId: coding.id,
    },
    {
      slug: "world-explorer-map",
      nameBg: "Световен Изследовател",
      nameRu: "Исследователь Мира",
      nameEn: "World Explorer Map Kit",
      descriptionBg: "Голяма интерактивна карта на света с флагчета, карти на страни и забавни факти. За деца 6-14 години, изучаващи география по увлекателен начин.",
      descriptionRu: "Большая интерактивная карта мира с флажками, карточками стран и интересными фактами. Для детей 6-14 лет, изучающих географию увлекательным способом.",
      descriptionEn: "Large interactive world map with flags, country cards, and fun facts. For children aged 6-14, learning geography in an engaging way.",
      priceBgn: 59.90,
      priceEur: 30.60,
      images: JSON.stringify(["https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"]),
      ageMin: 6,
      ageMax: 14,
      stock: 10,
      featured: false,
      categoryId: geography.id,
    },
    {
      slug: "math-games-advanced",
      nameBg: "Математически Игри – Напреднали",
      nameRu: "Математические Игры – Продвинутый",
      nameEn: "Math Games Advanced",
      descriptionBg: "Предизвикателни математически игри за по-големи деца: дроби, геометрия, уравнения. 50+ карти с задачи и решения. За деца 9-14 години.",
      descriptionRu: "Сложные математические игры для детей постарше: дроби, геометрия, уравнения. 50+ карточек с задачами и решениями. Для детей 9-14 лет.",
      descriptionEn: "Challenging math games for older children: fractions, geometry, equations. 50+ task cards with solutions. For children aged 9-14.",
      priceBgn: 44.90,
      priceEur: 22.90,
      images: JSON.stringify(["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80"]),
      ageMin: 9,
      ageMax: 14,
      stock: 14,
      featured: false,
      categoryId: math.id,
    },
    {
      slug: "nature-explorer",
      nameBg: "Природен Изследовател",
      nameRu: "Исследователь Природы",
      nameEn: "Nature Explorer Kit",
      descriptionBg: "Открий природата с лупа, пинсети, контейнери за проби и полево ръководство. Идеален за разходки навън. За деца 5-10 години.",
      descriptionRu: "Исследуй природу с лупой, пинцетами, контейнерами для образцов и полевым руководством. Идеален для прогулок на свежем воздухе. Для детей 5-10 лет.",
      descriptionEn: "Explore nature with a magnifying glass, tweezers, sample containers, and a field guide. Perfect for outdoor adventures. For children aged 5-10.",
      priceBgn: 34.90,
      priceEur: 17.80,
      images: JSON.stringify(["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"]),
      ageMin: 5,
      ageMax: 10,
      stock: 18,
      featured: false,
      categoryId: science.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log("✅ Seeded", products.length, "products and", categories.length, "categories");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
