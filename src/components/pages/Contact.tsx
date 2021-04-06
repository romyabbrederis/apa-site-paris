import { ContactContent } from "../../lib/contacts";
import { COLOR_GREY } from "../../../public/styles/general";
import Link from "next/link";

type Props = {
  data: ContactContent;
};

export default function Contact({ data }: Props) {
  const { title, subtitle, photo, files, emails } = data;

  return (
    <div className={"layout-container"} style={{ backgroundColor: COLOR_GREY }}>
      <div className={"inner-container"}>
        <div className={"contact-container"}>
          <div>
            <h1 className={"extreme-title"}>{title}</h1>
            {emails.map((item) => (
              <div key={item.name}>
                <p>{item.name}</p>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </div>
            ))}
            <div className={"press-section"}>
              <h3>{subtitle}</h3>
              {files.map((item) => (
                <div key={item.name}>
                  <p>{item.name}</p>
                  <a href={item.file} download>
                    Telechargez
                  </a>
                </div>
              ))}
            </div>
          </div>
          <img className={"photo"} src={photo} />
        </div>
        <div className={"legales"}>
          <Link href={"/protection-donnees-personnelles"}>
            <a>Protection des donnees personelles</a>
          </Link>

          <Link href={"/legales"}>
            <a>Mentiones legales</a>
          </Link>
        </div>
        <style jsx>{`
          .press-section {
            margin-top: 40px;
          }

          .legales {
            margin-top: 300px;
            display: flex;
            flex-direction: column;
            text-align: right;
            font-size: 12px;
          }

          .legales a {
            margin: 10px 0;
            font-style: italic;
          }

          @media (max-width: 769px) {
            .contact-container {
            }
            .photo {
              width: 100%;
              margin-top: 50px;
            }
          }

          @media (min-width: 769px) {
            .contact-container {
              display: flex;
              justify-content: space-between;
            }
            .photo {
              width: 400px;
              object-fit: contain;
              margin0right: 10px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
