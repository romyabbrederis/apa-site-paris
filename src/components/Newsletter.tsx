import React, { useEffect, useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Head from "next/head";
import { COLOR_YELLOW } from "../../public/styles/general";
import { NONAME } from "dns";
import Image from "next/image";

const Newsletter = ({ mailchimp }): any => {
  const [email, setEmail] = useState("");
  const [openNewsletter, setOpenNewsletter] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpenNewsletter(true);
    }, 2000);
  }, []);

  return openNewsletter ? (
    <div className={"newsletter-container"}>
      <Head>
        <link
          href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>

      <div id="mc_embed_signup">
        <div className="close-icon">
          <Image
            src={"/icons/close.png"}
            alt="close icon"
            onClick={() => setOpenNewsletter(false)}
            width={30}
            height={30}
            layout="intrinsic"
            objectFit="contain"
          />
        </div>
        <form
          action={process.env.mailchimp}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <label style={{ fontFamily: "Montserrat" }}>
              <h1>S'ABONNER</h1>
            </label>
            <input
              type="email"
              value={email}
              name="EMAIL"
              className="email"
              id="mce-EMAIL"
              placeholder="email address"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                border: "none",
                borderBottom: `1px solid ${COLOR_YELLOW}`,
                width: "300px",
                fontFamily: "Montserrat",
              }}
            />
            <div>
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button"
                style={{ margin: "20px 0", fontFamily: "Montserrat" }}
              />
            </div>
          </div>
        </form>
      </div>
      <style jsx>{`
        @-webkit-keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.95;
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.95;
          }
        }
        .newsletter-container {
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.95;
          -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1)
            0.3s both;
          animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s both;
        }

        input:focus {
          outline: none;
          border-bottom: 1px solid black;
        }

        @media (max-width: 769px) {
          .close-icon {
            width: 30px;
            position: absolute;
            right: 10px;
            cursor: pointer;
          }
        }

        @media (min-width: 769px) {
          .close-icon {
            width: 30px;
            position: absolute;
            right: 30%;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  ) : null;
};

export default Newsletter;
