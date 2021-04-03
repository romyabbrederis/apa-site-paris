import galleries from "../../meta/galleries.yml";

export type GalleryContent = {
  readonly slug: string;
  readonly name: string;
  readonly addressAdd: string;
  readonly street: string;
  readonly city: string;
  readonly country: string;
  readonly phone: string;
  readonly email: string;
  readonly map: string;
};

export function getGalleryInfos(gals: any): GalleryContent[] {
  if (gals && gals.length && galleries) {
    const galleryInfo = gals.map((el) => {
      const findGallery = galleries.galleries.find(
        (item) => item.name === el.galleries
      );
      return findGallery;
    });
    console.log("galleryInfo", galleryInfo);
    return galleryInfo;
  } else {
    return [];
  }
}
