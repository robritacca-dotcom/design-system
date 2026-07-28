import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const LOGO_MARK_PATH =
  "M18.0309 14.98C18.6612 14.8653 19.2184 14.6623 19.7208 14.3712C20.214 14.08 20.6343 13.7358 20.9814 13.3211C21.3285 12.9063 21.5934 12.4387 21.776 11.9269C21.9587 11.4062 22.05 10.8592 22.05 10.2856C22.05 9.22672 21.8034 8.35314 21.3011 7.67368C20.8078 6.99423 20.1775 6.45596 19.4103 6.05889C18.6429 5.6618 17.7935 5.37943 16.8618 5.22942C15.9301 5.07059 15.0258 5 14.158 5L0 5C0 5 1.7355 8.8561 6.49444 8.8561C11.2534 8.8561 14.5417 8.8561 14.5417 8.8561C15.3638 8.8561 16.0123 8.99729 16.4691 9.28849C16.9257 9.57968 17.1541 10.0121 17.1541 10.5856C17.1541 11.1062 16.8983 11.5122 16.3959 11.8033C15.8936 12.1033 15.2725 12.2445 14.5417 12.2445C14.5417 12.2445 7.84631 12.2445 4.28395 12.2445C0.876885 12.2445 1.18745 15.5535 1.18745 15.5535L1.18745 19.8244C1.18745 19.8244 5.93725 19.8068 5.93725 15.9065H13.2263C16.9714 21.2627 23 19.8244 23 19.8244L18.0309 14.98Z";

/**
 * Renders a 1200x630 OG image with the logo mark, a title, and a byline of
 * "Robert Ritacca — <kicker>". Used for every dynamic social card on the site.
 */
export function buildOgImage(title: string, kicker = "Portfolio") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#050505",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d={LOGO_MARK_PATH} fill="url(#paint0_linear)" />
          <defs>
            <linearGradient id="paint0_linear" x1="3.83825" y1="15.8618" x2="13.4908" y2="5.78849" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2980B9" />
              <stop offset="0.5484" stopColor="#2980B9" />
              <stop offset="1" stopColor="#34495E" />
            </linearGradient>
          </defs>
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", fontSize: 28, fontWeight: 400, color: "#118AB2" }}>
          Robert Ritacca · {kicker}
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}

/** Case-study OG image — the byline reads "Robert Ritacca — Case Study". */
export function buildCaseStudyOgImage(title: string) {
  return buildOgImage(title, "Case Study");
}
