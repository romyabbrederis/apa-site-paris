import galleries from "../../meta/galleries.yml";

export type GalleryContent = {
  readonly slug: string;
  readonly name: string;
  readonly address: string;
  readonly phone: string;
  readonly location: string;
  readonly email: string;
};

export function getGalleryInfos(gals: string[]): GalleryContent[] {
  const galleryInfo = gals.map(el => {
    const findGallery = galleries.galleries.find(item => item.name === el)
    return findGallery
  })
  console.log('galleryInfo', galleryInfo)
  return galleryInfo
} 