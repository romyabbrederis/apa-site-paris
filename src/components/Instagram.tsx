import React from "react";
import Instagram from "instagram-web-api";
import ActionButton from "./ActionButton";

export default function InstagramFeed({ instagramPosts }: any): any {
  return instagramPosts ? (
    <div className={"layout-container"} style={{ backgroundColor: "#E5E5E5" }}>
      <div className={"inner-container"}>
        <div className={"action-button"}>
          <ActionButton
            title={"Suivez - nous sur Instagram !"}
            url={"https://www.instagram.com/residence.vaduz/?hl=en"}
            type="external"
          />
        </div>
        <div className={"image-container"}>
          {instagramPosts.map(({ node }, i) => (
            <a
              href={`https://www.instagram.com/p/${node.shortcode}`}
              key={i}
              aria-label="view image on Instagram"
            >
              <img
                className={"insta-images"}
                src={node.thumbnail_src}
                alt={
                  // the caption with hashtags removed
                  node.edge_media_to_caption.edges[0].node.text
                    .replace(/(#\w+)+/g, "")
                    .trim()
                }
              />
            </a>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 769px) {
          .image-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px;
          }

          .insta-images {
            max-width: 100%;
          }

          .action-button {
            margin: 0 auto;
            width: max-content;
            padding: 20px 0;
          }
        }

        @media (min-width: 769px) {
          .insta-images {
            width: 300px;
            margin: 10px;
          }
          .image-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
          }

          .action-button {
            margin: 0 auto;
            width: max-content;
            padding: 20px 0;
          }
        }
      `}</style>
    </div>
  ) : null;
}
