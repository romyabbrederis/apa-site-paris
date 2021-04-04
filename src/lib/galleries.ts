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

export function getGalleryInfos(gals: any): any {
  console.log("gals", gals);
  console.log("galleries", galleries);
  if (gals && gals.length && galleries) {
    const galleryInfo = gals.map((el) => {
      const findGallery = galleries.galleries.find(
        (item) => item.name === el.galleries
      );
      return findGallery;
    });
    console.log("galleryInfo", galleryInfo);
    return galleryInfo || [];
  } else {
    return [];
  }
}

export function findEventDetails(gals: any): any {
  console.log("gals", gals);
  console.log("galleries", galleries);
  if (gals && gals.length && galleries) {
    const galleryInfo = gals.galleries.map((el) => {
      const findGallery = galleries.galleries.find(
        (item) => item.name === el.galleries
      );
      return findGallery;
    });
    console.log("galleryInfo", galleryInfo);
    return galleryInfo || [];
  } else {
    return [];
  }
}

const extractLink = (map) => {
  console.log("map", map);
  if (map) {
    const firstSplit = map.split('src="');
    const secondSplit = firstSplit[1].split('" width');
    return secondSplit[0];
  } else {
    return "";
  }
};

export function findMap(gallery: any): any {
  const preMap = galleries.galleries.find((item) => item.name === gallery).maps;
  console.log("preMap", preMap);
  const map = extractLink(preMap);
  return map;
}

export function getSlug(gallery: any): any {
  const gal = galleries.galleries.find((item) => item.name === gallery);
  return gal;
}

export function getGallery(gallery: any): any {
  const gal = galleries.galleries.find((item) => item.slug === gallery);
  return gal;
}
