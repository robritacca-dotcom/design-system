import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import {
  AugmentaDesignRulesCover,
  AugmentaSolutionCover,
  AugmentaSolutionListCover,
} from "../../components/covers/AugmentaCover";
import {
  IntuitAgentChatCover,
  IntuitAgentChatCoverMobile,
} from "../../components/covers/IntuitAgentChatCover";
import { MetaOfferDraftCover } from "../../components/covers/MetaOfferDraftCover";
import { MetaOfferSummaryCover } from "../../components/covers/MetaOfferSummaryCover";
import {
  SiteHomeCover,
  SitePlaygroundCover,
} from "../../components/covers/SiteCovers";
import { openSans } from "./fonts";
import {
  TurboTaxChatGptCover,
  TurboTaxChatGptCoverMobile,
} from "../../components/covers/TurboTaxChatGptCover";
import {
  TurboTaxClaudeCover,
  TurboTaxClaudeCoverMobile,
} from "../../components/covers/TurboTaxClaudeCover";
import styles from "./page.module.css";

export const metadata = {
  title: "Cover mocks",
  description: "Vector redraws of source frames, staged for review.",
  robots: { index: false, follow: false },
};

/** Every cover, in the order the case studies run. */
const COVERS: { label: string; cover: React.ReactNode }[] = [
  { label: "TurboTax in Claude — desktop", cover: <TurboTaxClaudeCover /> },
  { label: "TurboTax in Claude — mobile", cover: <TurboTaxClaudeCoverMobile /> },
  { label: "TurboTax in ChatGPT — desktop", cover: <TurboTaxChatGptCover /> },
  {
    label: "TurboTax in ChatGPT — mobile",
    cover: <TurboTaxChatGptCoverMobile />,
  },
  { label: "Intuit Agent Chat — immersive", cover: <IntuitAgentChatCover /> },
  { label: "Intuit Agent Chat — panel", cover: <IntuitAgentChatCoverMobile /> },
  { label: "Augmenta — design rules", cover: <AugmentaDesignRulesCover /> },
  { label: "Augmenta — solution list", cover: <AugmentaSolutionListCover /> },
  { label: "Augmenta — solution viewer", cover: <AugmentaSolutionCover /> },
  { label: "Meta — offer summary", cover: <MetaOfferSummaryCover /> },
  { label: "Meta — offer draft", cover: <MetaOfferDraftCover /> },
  { label: "robertritacca.com — home", cover: <SiteHomeCover /> },
  {
    label: "robertritacca.com — playground chat",
    cover: <SitePlaygroundCover />,
  },
];

/**
 * A blank staging page for the vector cover mocks. No site chrome, no layout
 * opinions — every cover renders into the same 16:10 frame, so the grid shows
 * them at the size and shape they would take in a card. The theme toggle
 * floats over the top so the light/dark cross-fade is one click away.
 */
export default function CoverMocksPage() {
  return (
    <main className={`${styles.page} ${openSans.variable}`}>
      <div className={styles.toggle}>
        <ThemeToggle />
      </div>

      <p className={styles.note}>
        Every cover shares one 16:10 frame, so they read as a set at any size.
        Toggle the theme to see them cross-fade.
      </p>

      <div className={styles.grid}>
        {COVERS.map(({ label, cover }) => (
          <section key={label} className={styles.mock}>
            <div className={styles.frame}>{cover}</div>
            <p className={styles.label}>{label}</p>
          </section>
        ))}
      </div>

      <p className={styles.note}>At full width:</p>
      <div className={styles.full}>
        <SiteHomeCover />
      </div>
    </main>
  );
}
