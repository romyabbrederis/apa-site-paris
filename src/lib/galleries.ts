import galleries from "../../meta/galleries.yml"

export type GalleryContent = {
  readonly slug: string;
  readonly name: string;
  readonly address: string;
  readonly phone: string;
  readonly location: object;
  readonly email: string;
}

const galleryMap: { [key: string]: GalleryContent } = generateGalleryMap();

function generateGalleryMap(): { [key: string]: GalleryContent } {
  console.log('galleries', galleries)
  // return result;
}

function getGalleryContent(slug: string) {
  console.log('galleries', slug)
  return  galleryMap[slug]
} 