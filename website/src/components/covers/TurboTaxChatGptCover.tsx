import {
  ArrowUpRight,
  ChatTempIcon,
  CheckCircle,
  ChevronDown,
  EllipsisIcon,
  MenuIcon,
  MicIcon,
  OpenAiLogo,
  PlusIcon,
  ShareIcon,
  SidebarLibrary,
  SidebarNewChat,
  SidebarSearch,
  TurboTaxMark,
  VoiceIcon,
} from "./chatgpt-cover-art";
import { SpotUpload } from "./turbotax-cover-art";
import { CoverFrame } from "./CoverFrame";
import styles from "./TurboTaxChatGptCover.module.css";

/*
 * Literal redraws of two Figma frames from TurboTax in AI Apps: the desktop
 * "ChatGPT ChecklIst Desktop" (node 3030:12155, 1440 x 1024) and the mobile
 * "ChatGPT ChecklIst Mobile" (node 3030:14557, 440 x 972). Each is wrapped in
 * an SVG viewBox so it scales to any container without a raster step.
 *
 * Everything is hard-coded: no design-system tokens, no design-system
 * components, no behaviour. Geometry, copy and path data come straight from
 * the Figma file. Two departures the file forces: SF Pro is not licensed here,
 * so the stack falls through to the platform UI face (which is SF Pro on a
 * Mac); and the rail's photographic avatar is drawn as a flat disc rather than
 * embedding a raster into a vector cover.
 *
 * Below each frame's cut line the reply text and its action row are clipped,
 * so only the paragraph is drawn — the seven action glyphs it carries would
 * never be visible.
 */

/** The upload drop zone. Identical in both frames. */
function DropZone() {
  return (
    <div className={styles.dropzone}>
      <div className={styles.spot}>
        <div className={styles.spotArt}>
          <SpotUpload />
        </div>
      </div>
      <div className={styles.dropText}>
        <p className={styles.dropTitle}>Drag and drop your documents</p>
        <p className={styles.dropHint}>PDF, JPG, PNG up to 10 MB</p>
      </div>
      <div className={styles.pillButton}>Upload now</div>
    </div>
  );
}

/**
 * The TurboTax checklist card. Identical in both frames — only the width it
 * takes differs (768 on desktop, 408 on mobile), which is what makes the
 * mobile subtitle wrap onto a second line.
 */
function ChecklistCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={[styles.card, mobile ? styles.cardMobile : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.cardInner}>
        <div className={styles.heading}>
          <p className={styles.checklistTitle}>2025 Tax Year Checklist</p>
          <p className={styles.checklistSub}>
            Review your list, add what&rsquo;s missing, and head to TurboTax
            when ready.
          </p>
          <DropZone />
        </div>

        <div className={styles.progress}>
          <p className={styles.progressLabel}>
            <span className={styles.progressCount}>2</span> / 2 docs added
          </p>
          <div className={styles.track}>
            <div className={styles.trackFill} />
          </div>
        </div>

        <div className={styles.category}>
          <div className={styles.category}>
            <p className={styles.categoryTitle}>Wages and salaries</p>
            <div className={styles.document}>
              <CheckCircle />
              <div className={styles.documentBody}>
                <div className={styles.documentDescription}>
                  <p className={styles.documentTitle}>
                    Employment income (Form W-2)
                  </p>
                  <p className={styles.documentFile}>W2_BrightPixel_2025.pdf</p>
                </div>
              </div>
              <div className={styles.trailingSlot} />
            </div>
          </div>

          <div className={styles.rule} />

          <div className={styles.category}>
            <p className={styles.categoryTitle}>Investments and savings</p>
            <div className={styles.document}>
              <CheckCircle />
              <div
                className={`${styles.documentDescription} ${styles.documentDescriptionFlex}`}
              >
                <p className={styles.documentTitle}>
                  Bank account interest (1099-INT)
                </p>
                <p className={styles.documentFile}>1099INT_Chase_2025.pdf</p>
              </div>
              <div className={styles.trailingSlot} />
            </div>
          </div>

          <div className={styles.entityFooter}>
            <div className={styles.ctaButton}>
              <span className={styles.ctaMark}>
                <TurboTaxMark />
              </span>
              Continue in Intuit TurboTax
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The user's message. 408px wide in both frames. */
function UserBubble() {
  return (
    <div className={styles.messageTo}>
      <div className={styles.bubble}>
        <p className={styles.bubbleText}>
          Help me gather the documents I need for my taxes
        </p>
      </div>
    </div>
  );
}

/** The reply that follows the card. Clipped by the frame in both sizes. */
function ReplyText() {
  return (
    <div className={styles.messageContent}>
      <p className={styles.messageText}>Hello! How can I help you today?</p>
    </div>
  );
}

/** The composer and its disclaimer. */
function ComposeFooter({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={[
        styles.composeFooter,
        mobile ? styles.composeFooterMobile : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.composer}>
        <div className={styles.composerContent}>
          <p className={styles.placeholder}>Ask anything</p>
        </div>
        <div className={styles.actionBar}>
          <div className={styles.actionBarSide}>
            <div className={styles.roundAction}>
              <PlusIcon />
            </div>
            <div className={styles.appChipRow}>
              <div className={styles.appChip}>
                <span className={styles.appChipIcon}>
                  <TurboTaxMark />
                </span>
                Intuit TurboTax
              </div>
            </div>
          </div>
          <div className={styles.actionBarRight}>
            <div className={styles.roundAction}>
              <MicIcon />
            </div>
            <div className={styles.voiceAction}>
              <VoiceIcon />
            </div>
          </div>
        </div>
      </div>
      <p className={styles.disclaimer}>
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
}

/** The desktop frame: 1440 x 1024, node 3030:12155. */
export function TurboTaxChatGptCover({ className }: { className?: string }) {
  return (
    <CoverFrame
      width={1440}
      height={1024}
      ground="white"
      tone="openai"
      className={className}
      label="The TurboTax tax-document checklist running as an app inside the ChatGPT desktop interface."
    >
      <div className={styles.stage}>
        <div className={styles.rail}>
          <div className={styles.railBrand}>
            <OpenAiLogo />
          </div>
          <div className={styles.railBody}>
            <div className={styles.railSections}>
              <div className={styles.railItems}>
                <div className={styles.railItem}>
                  <SidebarNewChat />
                </div>
                <div className={styles.railItem}>
                  <SidebarSearch />
                </div>
                <div className={styles.railItem}>
                  <SidebarLibrary />
                </div>
              </div>
            </div>
            <div className={styles.railAvatar} />
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.modelSelect}>
              <p className={styles.modelName}>
                ChatGPT <span className={styles.modelVersion}>5</span>
              </p>
              <ChevronDown />
            </div>
            <div className={styles.headerRight}>
              <div className={styles.shareButton}>
                <ShareIcon />
                Share
              </div>
              <div className={styles.headerIconButton}>
                <EllipsisIcon />
              </div>
            </div>
          </div>

          <div className={styles.chatBody}>
            <div className={styles.conversation}>
              <UserBubble />
              <div className={styles.response}>
                <div className={styles.appRow}>
                  <TurboTaxMark />
                  <p className={styles.appName}>Intuit TurboTax</p>
                </div>
                <ChecklistCard />
                <ReplyText />
              </div>
            </div>
          </div>

          <ComposeFooter />
        </div>
      </div>
    </CoverFrame>
  );
}

/** The mobile frame: 440 x 972, node 3030:14557. */
export function TurboTaxChatGptCoverMobile({
  className,
}: {
  className?: string;
}) {
  return (
    <CoverFrame
      width={440}
      height={972}
      ground="white"
      tone="openai"
      className={className}
      label="The TurboTax tax-document checklist running as an app inside the ChatGPT mobile interface."
    >
      <div className={styles.stageMobile}>
        <div className={styles.navBar}>
          <div className={styles.navBarLeading}>
            <MenuIcon />
          </div>
          <div className={styles.navBarTitle}>
            <div className={styles.modelSelect}>
              <p className={styles.modelName}>
                ChatGPT{" "}
                <span
                  className={`${styles.modelVersion} ${styles.modelVersionMobile}`}
                >
                  5
                </span>
              </p>
              <ChevronDown />
            </div>
          </div>
          <div className={styles.navBarTrailing}>
            <ChatTempIcon />
          </div>
        </div>

        <div className={`${styles.chatBody} ${styles.chatBodyMobile}`}>
          <div className={styles.conversation}>
            <UserBubble />
            <div className={styles.response}>
              <div className={styles.appRow}>
                <TurboTaxMark />
                <p className={styles.appName}>Intuit TurboTax</p>
              </div>
              <ChecklistCard mobile />
              <ReplyText />
            </div>
          </div>
        </div>

        <ComposeFooter mobile />
      </div>
    </CoverFrame>
  );
}
