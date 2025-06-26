import prisma from './src/lib/prisma';
import { titleToSlug } from './utils/slugify';

async function populateSlugs() {
  try {
    const publications = await prisma.publication.findMany();

    for (const pub of publications) {
      // @ts-ignore
      if (!pub.slug) {
        const slug = titleToSlug(pub.title);
        await prisma.publication.update({
          where: { id: pub.id },
          data: { slug },
        });
        console.log(`Updated publication id=${pub.id} with slug='${slug}'`);
      }
    }

    console.log('Slug population complete.');
  } catch (error) {
    console.error('Error populating slugs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateSlugs();