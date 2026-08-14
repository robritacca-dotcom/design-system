import { AvatarGlyph, SpotUpload } from "./turbotax-cover-art";
import { CoverFrame } from "./CoverFrame";
import styles from "./TurboTaxClaudeCover.module.css";

/*
 * Literal redraws of two Figma frames from TurboTax in AI Apps: the desktop
 * "Interface" (node 3026:3298, 1440 x 972) and the mobile "Filing options"
 * (node 3026:3234, 440 x 972). Each is wrapped in an SVG viewBox so it scales
 * to any container without a raster step.
 *
 * Everything is hard-coded: no design-system tokens, no design-system
 * components, no behaviour. Geometry, copy and path data come straight from
 * the Figma file. The one departure the file forces is type: Anthropic Sans
 * and Anthropic Serif are not licensed here, so the stack falls through to
 * the platform UI face.
 *
 * Content below each frame's 972px cut line (the desktop "Filing options"
 * card, Claude's reply) is not drawn — the frame clips it, so it is invisible.
 */

/** A 20 x 20 icon box holding one path placed at its Figma offset. */
function Icon({
  x,
  y,
  d,
  fill,
  size = 20,
}: {
  x: number;
  y: number;
  d: string;
  fill: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={d} fill={fill} transform={`translate(${x} ${y})`} />
    </svg>
  );
}

/** The Intuit TurboTax product mark. */
function TurboTaxMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10.0005C0 4.47746 4.47769 0 10 0C15.5233 0 20 4.47746 20 10.0005C20 15.5225 15.5233 20 10 20C4.47669 20 0 15.5225 0 10.0005Z"
        fill="#D52B1E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.76926 13.6671C6.62223 12.8388 5.5172 11.9539 4.45827 11.0156C4.0689 11.8722 3.71932 12.7463 3.41064 13.6351C5.09866 15.0669 7.35301 16.7058 8.90094 17.6273C10.9081 12.4324 14.038 9.04355 17.0358 6.67925C16.6526 5.86931 16.1327 5.13145 15.4989 4.49805C12.2904 6.96038 9.65341 10.0884 7.76926 13.6671V13.6671Z"
        fill="white"
      />
    </svg>
  );
}

/* Path data, verbatim from the Figma export. */

const SIDEBAR_D =
  "M14.5 0C15.3284 0 16 0.671573 16 1.5V10.5C16 11.3284 15.3284 12 14.5 12H1.5C0.671573 12 1.61064e-08 11.3284 0 10.5V1.5C0 0.671573 0.671573 2.81862e-08 1.5 0H14.5ZM5 11H14.5C14.7761 11 15 10.7761 15 10.5V1.5C15 1.22386 14.7761 1 14.5 1H5V11ZM1.5 1C1.22386 1 1 1.22386 1 1.5V10.5C1 10.7761 1.22386 11 1.5 11H4V1H1.5Z";

const CHAT_ADD_D =
  "M7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15H0.5C0.297792 15 0.115492 14.8782 0.0380859 14.6914C-0.0393046 14.5046 0.00348538 14.2895 0.146484 14.1465L1.85547 12.4365C0.701238 11.1175 0 9.39057 0 7.5C0 3.35786 3.35786 0 7.5 0ZM7.5 1C3.91015 1 1 3.91015 1 7.5C1 9.29518 1.72659 10.9199 2.90332 12.0967L2.96582 12.1729C3.02017 12.2544 3.0498 12.3508 3.0498 12.4502C3.0498 12.5828 2.99709 12.7099 2.90332 12.8037L1.70703 14H7.5C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1ZM7.5 4.5C7.77614 4.5 8 4.72386 8 5V7H10C10.2761 7 10.5 7.22386 10.5 7.5C10.5 7.77614 10.2761 8 10 8H8V10C8 10.2761 7.77614 10.5 7.5 10.5C7.22386 10.5 7 10.2761 7 10V8H5C4.72386 8 4.5 7.77614 4.5 7.5C4.5 7.22386 4.72386 7 5 7H7V5C7 4.72386 7.22386 4.5 7.5 4.5Z";

const CHATS_BACK_D =
  "M6.99962 0C10.3133 0 12.9996 2.68629 12.9996 6C12.9996 9.31371 10.3133 12 6.99962 12H0.499615C0.301055 11.9998 0.121132 11.8821 0.0416072 11.7002C-0.037758 11.5181 -0.00164759 11.3058 0.133404 11.1602L1.93516 9.21777C1.34317 8.28779 0.999615 7.18343 0.999615 6C0.999615 2.68643 3.68609 0.000219747 6.99962 0ZM6.99962 1C4.23838 1.00022 1.99961 3.23871 1.99961 6C1.99961 7.11212 2.36265 8.13856 2.97618 8.96875C3.11884 9.16209 3.1035 9.42933 2.94004 9.60547L1.64512 11H6.99962C9.76104 11 11.9996 8.76142 11.9996 6C11.9996 3.23858 9.76104 1 6.99962 1Z";

const CHATS_FRONT_D =
  "M10.2869 0.227658C10.1605 0.0327822 9.91018 -0.0533942 9.68535 0.034299C9.46062 0.122267 9.33555 0.355146 9.3748 0.584104L9.47929 0.895627C9.64964 1.39873 9.74297 1.93813 9.74297 2.50012C9.74296 3.6124 9.38001 4.63868 8.7664 5.46887C8.62346 5.66224 8.63799 5.93032 8.80156 6.10656L10.0955 7.50012H4.74297C3.28756 7.50012 1.97764 6.87828 1.06328 5.88488L0.81328 5.61047C0.632332 5.46458 0.367721 5.46074 0.181444 5.61438C-0.0049544 5.76832 -0.050952 6.02908 0.0583972 6.23449L0.326952 6.56262C1.42285 7.75309 2.99614 8.50012 4.74297 8.50012H11.243C11.4415 8.4999 11.6215 8.38227 11.701 8.20031C11.7803 8.01821 11.7442 7.80597 11.6092 7.66028L9.80547 5.71789C10.3978 4.78769 10.743 3.68385 10.743 2.50012C10.743 1.82724 10.6315 1.17935 10.4266 0.574338L10.2869 0.227658Z";

const PROJECTS_BODY_D =
  "M13.1389 0C14.0077 0.000247478 14.6816 0.731577 14.637 1.57617L14.6184 1.74707L13.4524 8.74707C13.3318 9.46985 12.7057 9.99957 11.9729 10H2.66629C1.93338 9.99978 1.30752 9.46996 1.1868 8.74707L0.0207827 1.74707C-0.1316 0.832773 0.573366 0 1.50028 0H13.1389ZM1.50028 1C1.19135 1 0.956402 1.27731 1.00711 1.58203L2.17313 8.58203C2.21331 8.82294 2.42209 8.99978 2.66629 9H11.9729C12.217 8.99957 12.426 8.82283 12.4661 8.58203L13.6321 1.58203L13.638 1.46973C13.6228 1.21259 13.4091 1.00023 13.1389 1H1.50028Z";

const PROJECTS_MID_D =
  "M12 0.5C12 0.224005 11.7759 0.000237942 11.5 0H0.5C0.223858 0 0 0.223858 0 0.5C0 0.776142 0.223858 1 0.5 1H11.5C11.7759 0.999762 12 0.775995 12 0.5Z";

const PROJECTS_TOP_D =
  "M9 0.5C9 0.224005 8.77594 0.000237965 8.5 0H0.5C0.223858 0 0 0.223858 0 0.5C0 0.776142 0.223858 1 0.5 1H8.5C8.77594 0.999762 9 0.775995 9 0.5Z";

const ARTIFACT_DIAMOND_D =
  "M3.85352 0.142512L6.85352 3.14253C6.93935 3.24714 7 3.35614 7 3.49702C6.9998 3.62931 6.94704 3.75599 6.85352 3.84956L3.85352 6.84958C3.64584 7.05701 3.35611 7.02038 3.14648 6.84958L0.146484 3.84956C0.0529618 3.75599 0.000204583 3.62931 0 3.49702C-7.44628e-09 3.36452 0.0528508 3.23628 0.146484 3.14253L3.14648 0.142512C3.3552 -0.0296768 3.64635 -0.0645339 3.85352 0.142512ZM3.5 5.78805L1.20703 3.49605L3.5 1.20307L5.79297 3.49605L3.5 5.78805Z";

const ARTIFACT_HOURGLASS_D =
  "M5.93373 0.250977C6.02334 0.406389 6.0218 0.598335 5.93078 0.75293L4.60649 3L5.93078 5.24707C6.02186 5.40164 6.02328 5.59359 5.93373 5.74902C5.84406 5.9044 5.67676 6 5.49655 6H0.502968C0.321754 6 0.154098 5.90285 0.0648139 5.74609C-0.0241009 5.58953 -0.0212659 5.3974 0.0716908 5.24316L1.42545 3L0.0716908 0.756836C-0.0212064 0.602572 -0.0241623 0.410442 0.0648139 0.253906C0.15412 0.0972439 0.321815 0 0.502968 0H5.49655C5.67668 0.0131657 5.84027 0.0891649 5.93373 0.250977ZM2.44323 2.74316C2.53025 2.91076 2.5317 3.08644 2.44323 3.25684L1.39107 5H4.61926L3.5897 3.25293C3.49783 3.09689 3.49777 2.90309 3.5897 2.74707L4.61926 1H1.39107L2.44323 2.74316Z";

const ARTIFACT_STAR_D =
  "M4.75293 0.0650488C4.90708 -0.0224389 5.09647 -0.0215663 5.25 0.067002C5.40356 0.155659 5.49869 0.319392 5.5 0.496692L5.51074 1.93713L6.80762 2.70374C6.92811 2.79766 6.99994 2.94309 7 3.09827C7 3.27562 6.90587 3.44013 6.75293 3.52991L5.51074 4.25843L5.49512 5.76528C5.47406 5.9167 5.38446 6.05187 5.25 6.12954C5.09642 6.21817 4.90713 6.21904 4.75293 6.13149L3.5 5.41859L2.24707 6.13149C2.09287 6.21904 1.90358 6.21817 1.75 6.12954C1.59643 6.04083 1.50124 5.87719 1.5 5.69985L1.49023 4.25843L0.24707 3.52991C0.0941307 3.44013 0 3.27562 0 3.09827C6.37849e-05 2.94309 0.0718848 2.79766 0.192383 2.70374L1.49023 1.93713L1.5 0.496692C1.50131 0.319392 1.59644 0.155659 1.75 0.067002C1.90353 -0.0215663 2.09292 -0.0224393 2.24707 0.0650488L3.5 0.776967L4.75293 0.0650488ZM2.49512 1.3551L3.25293 1.78674C3.40608 1.87374 3.59392 1.87374 3.74707 1.78674L4.50586 1.3551L4.51172 2.22912C4.51308 2.40506 4.60706 2.56777 4.75879 2.65686L5.51172 3.09827L4.75879 3.53968C4.60706 3.62872 4.51315 3.79152 4.51172 3.96742L4.50586 4.84047L3.74707 4.4098C3.59397 4.32287 3.40603 4.32287 3.25293 4.4098L2.49512 4.84047L2.48828 3.96742C2.48703 3.81346 2.41459 3.66989 2.29492 3.57679L1.48926 3.09827L2.24121 2.65686C2.37421 2.57877 2.46267 2.44404 2.4834 2.29358L2.49512 1.3551Z";

const ARTIFACT_CIRCLE_D =
  "M3 0C4.65679 0 5.99989 1.34325 6 3.00002C6 4.65688 4.65685 6.00003 3 6.00003C1.34315 6.00003 0 4.65688 0 3.00002C0.00011158 1.34325 1.34321 0 3 0ZM1 3.00002C1.00011 1.89554 1.8955 1.00001 3 1.00001C4.1045 1.00001 4.99989 1.89554 5 3.00002C5 4.10459 4.10457 5.00003 3 5.00003C1.89543 5.00003 1 4.10459 1 3.00002Z";

const CODE_D =
  "M9.63184 0.0177211C9.89805 0.0904679 10.055 0.365698 9.98242 0.63198L6.98242 11.632C6.90966 11.8983 6.63449 12.0552 6.36816 11.9826C6.10193 11.9098 5.94495 11.6346 6.01758 11.3683L9.01758 0.368308C9.0904 0.102152 9.36557 -0.0548727 9.63184 0.0177211ZM11.124 2.17105C11.3059 1.96341 11.6213 1.94245 11.8291 2.12417L15.8291 5.62418L15.9014 5.7023C15.9647 5.7877 16 5.89197 16 6.00015C16 6.14427 15.9375 6.28119 15.8291 6.37613L11.8291 9.87614L11.7471 9.93473C11.5449 10.05 11.2833 10.0112 11.124 9.82926C10.9649 9.64734 10.9606 9.38253 11.1016 9.19743L11.1709 9.12418L14.7412 6.00015L11.1709 2.87612C10.9632 2.69426 10.9422 2.37881 11.124 2.17105ZM4.25293 2.06558C4.45509 1.9504 4.71675 1.98923 4.87598 2.17105C5.03513 2.35294 5.03933 2.61775 4.89844 2.80288L4.8291 2.87612L1.25879 6.00015L4.8291 9.12418C5.03682 9.30601 5.05771 9.62147 4.87598 9.82926C4.69413 10.037 4.37869 10.058 4.1709 9.87614L0.170898 6.37613L0.0986328 6.29801C0.0352841 6.21259 3.63995e-08 6.10835 0 6.00015C4.85771e-05 5.85606 0.0624748 5.71908 0.170898 5.62418L4.1709 2.12417L4.25293 2.06558Z";

const CARET_DOWN_D =
  "M9.12822 0.165249C9.31287 -0.0397415 9.63005 -0.056212 9.83527 0.128138C10.0404 0.312848 10.057 0.629948 9.87238 0.835196L5.37228 5.83538L5.29415 5.9057C5.2095 5.96709 5.10653 6.00043 5.0002 6.00043C4.85857 6.00035 4.72288 5.94065 4.62812 5.83538L0.12802 0.835196L0.0684488 0.753161C-0.0490368 0.55268 -0.0143111 0.289684 0.165131 0.128138C0.344689 -0.0334063 0.609935 -0.0401876 0.796981 0.0978635L0.872178 0.165249L5.0002 4.75233L9.12822 0.165249Z";

const UPLOAD_D =
  "M13.5 10C13.7761 10 14 10.2239 14 10.5V12.5C14 13.3284 13.3284 14 12.5 14H1.5C0.671573 14 1.61064e-08 13.3284 0 12.5V10.5C0 10.2239 0.223858 10 0.5 10C0.776142 10 1 10.2239 1 10.5V12.5C1 12.7761 1.22386 13 1.5 13H12.5C12.7761 13 13 12.7761 13 12.5V10.5C13 10.2239 13.2239 10 13.5 10ZM7 0C7.14282 0 7.27914 0.0612246 7.37402 0.167969L11.374 4.66797L11.4326 4.75C11.5492 4.95128 11.5127 5.21347 11.332 5.37402C11.1515 5.53433 10.8873 5.53961 10.7012 5.40039L10.626 5.33203L7.5 1.81445V10.5C7.5 10.7761 7.27614 11 7 11C6.72386 11 6.5 10.7761 6.5 10.5V1.81445L3.37402 5.33203C3.19064 5.53834 2.87437 5.55725 2.66797 5.37402C2.46166 5.19064 2.44275 4.87437 2.62598 4.66797L6.62598 0.167969L6.70508 0.0966797C6.79001 0.0345788 6.89298 0 7 0Z";

const ADD_D =
  "M7 0C7.27614 0 7.5 0.223858 7.5 0.5V6.5H13.5L13.6006 6.50977C13.8286 6.55629 14 6.75829 14 7C14 7.24171 13.8286 7.44371 13.6006 7.49023L13.5 7.5H7.5V13.5C7.5 13.7761 7.27614 14 7 14C6.72386 14 6.5 13.7761 6.5 13.5V7.5H0.5C0.223858 7.5 2.57485e-07 7.27614 0 7C1.01288e-08 6.72386 0.223858 6.5 0.5 6.5H6.5V0.5C6.5 0.223858 6.72386 0 7 0Z";

const ARROW_UP_D =
  "M10.2826 5.78309C10.2129 5.85301 10.1301 5.90849 10.0389 5.94634C9.94775 5.9842 9.85001 6.00368 9.7513 6.00368C9.65259 6.00368 9.55485 5.9842 9.46369 5.94634C9.37252 5.90849 9.28973 5.85301 9.22005 5.78309L6.00193 2.56497V11.7525C6.00193 11.9514 5.92291 12.1421 5.78226 12.2828C5.6416 12.4234 5.45084 12.5025 5.25193 12.5025C5.05301 12.5025 4.86225 12.4234 4.7216 12.2828C4.58094 12.1421 4.50193 11.9514 4.50193 11.7525V2.56497L1.28255 5.78309C1.14165 5.92399 0.950558 6.00314 0.751301 6.00314C0.552044 6.00314 0.360947 5.92399 0.220051 5.78309C0.0791548 5.6422 0 5.4511 0 5.25184C0 5.05258 0.0791548 4.86149 0.220051 4.72059L4.72005 0.220591C4.78973 0.150671 4.87252 0.0951938 4.96369 0.0573398C5.05485 0.0194858 5.15259 0 5.2513 0C5.35001 0 5.44775 0.0194858 5.53892 0.0573398C5.63008 0.0951938 5.71287 0.150671 5.78255 0.220591L10.2826 4.72059C10.3525 4.79027 10.4079 4.87306 10.4458 4.96423C10.4837 5.05539 10.5031 5.15313 10.5031 5.25184C10.5031 5.35055 10.4837 5.44829 10.4458 5.53946C10.4079 5.63062 10.3525 5.71341 10.2826 5.78309Z";

const ARROW_UP_RIGHT_D =
  "M9.49986 0C9.77601 0 9.99986 0.223858 9.99986 0.5V7.5C9.99977 7.77607 9.77595 8 9.49986 8C9.22387 7.99989 8.99995 7.776 8.99986 7.5V1.70703L0.853378 9.85352C0.658101 10.0486 0.341548 10.0487 0.146347 9.85352C-0.0488375 9.65831 -0.048727 9.34176 0.146347 9.14648L8.29283 1H2.49986C2.22387 0.999892 1.99995 0.776 1.99986 0.5C1.99986 0.223924 2.22381 0.000107981 2.49986 0H9.49986Z";

const CHECK_D =
  "M11.1887 0.108901C11.3703 -0.0362069 11.6349 -0.0386567 11.8205 0.115737C12.006 0.270486 12.0507 0.531066 11.9407 0.735863L11.884 0.819848L4.38391 9.81997C4.29398 9.92772 4.16279 9.99232 4.02257 9.99868C3.8824 10.0049 3.74582 9.9524 3.64659 9.85317L0.146539 6.35313L0.0820853 6.275C-0.0457977 6.08095 -0.0242138 5.81684 0.146539 5.64608C0.317297 5.47535 0.581418 5.45375 0.775455 5.58163L0.853581 5.64608L3.96593 8.75843L11.1164 0.179215L11.1887 0.108901Z";

/** The green circle with a tick, used on both completed documents. */
function CheckCircle() {
  return (
    <div className={styles.check}>
      <svg
        width="12"
        height="9.999"
        viewBox="0 0 12 9.99918"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={CHECK_D} fill="var(--check-mark)" />
      </svg>
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

/**
 * The TurboTax app card. Identical in both frames — only the width it
 * inherits differs (720 on desktop, 408 on mobile), which is what makes the
 * mobile subtitle wrap onto a second line.
 */
function ChecklistCard() {
  return (
    <div className={styles.card}>
      <div className={styles.appHeader}>
        <div className={styles.appName}>
          <div className={styles.appIcon}>
            <TurboTaxMark />
          </div>
          <p className={styles.appNameText}>Intuit TurboTax</p>
        </div>
        <div className={styles.headerActions} />
      </div>

      <div className={styles.checklist}>
        <div className={styles.heading}>
          <p className={styles.checklistTitle}>2025 Tax Year Checklist</p>
          <p className={styles.checklistSub}>
            Review your list, add what&rsquo;s missing, and head to TurboTax
            when ready.
          </p>
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
            <div className={styles.ghostButton}>Upload now</div>
          </div>
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
          <p className={styles.categoryTitle}>Wages and salaries</p>
          <div className={styles.document}>
            <CheckCircle />
            <div className={styles.documentBody}>
              <div className={styles.documentDescription}>
                <p className={styles.documentTitle}>
                  Employment income (Form W-2)
                </p>
                <p className={styles.documentFileLarge}>
                  W2_BrightPixel_2025.pdf
                </p>
              </div>
            </div>
          </div>

          <div className={styles.rule} />

          <div className={styles.category}>
            <p className={styles.categoryTitle}>Investments and savings</p>
            <div className={styles.document}>
              <CheckCircle />
              <div className={styles.documentBody}>
                <div className={styles.documentDescription}>
                  <p className={styles.documentTitle}>
                    Bank account interest (1099-INT)
                  </p>
                  <p className={styles.documentFileSmall}>
                    1099INT_Chase_2025.pdf
                  </p>
                </div>
              </div>
              <div className={styles.iconButton28}>
                <Icon x={3} y={3} d={UPLOAD_D} fill="var(--icon)" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.entityFooter}>
          <div className={styles.ctaButton}>
            <span className={styles.ctaLeftIcon}>
              <TurboTaxMark />
            </span>
            Continue in Intuit TurboTax
            <span className={styles.ctaRightIcon}>
              <Icon
                x={5}
                y={5}
                d={ARROW_UP_RIGHT_D}
                fill="var(--inverse-text)"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The composer. 768px wide on desktop, 408px on mobile. */
function ChatInput({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={styles.composer}>
      <div
        className={[styles.chatInput, mobile ? styles.chatInputMobile : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.composerRow}>
          <div className={styles.composerField}>
            <p className={styles.placeholder}>Reply to Claude</p>
            <div className={styles.caret} />
          </div>
        </div>
        <div className={styles.composerToolbar}>
          <div className={styles.composerToolbarLeft}>
            <div className={styles.iconButton32}>
              <Icon x={3} y={3} d={ADD_D} fill="var(--icon)" />
            </div>
          </div>
          <div className={styles.composerToolbarRight}>
            <div className={styles.modelRow}>
              <p className={styles.modelName}>Sonnet 4.5</p>
              <Icon x={5} y={7} d={CARET_DOWN_D} fill="var(--caret-muted)" />
            </div>
            <div className={styles.sendButton}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d={ARROW_UP_D}
                  fill="var(--send-mark)"
                  transform="translate(2.7488 1.7472)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The collapsed rail down the left edge of the desktop frame. */
function CollapsedSidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItems}>
        <div className={styles.sidebarToggle}>
          <Icon x={2} y={4} d={SIDEBAR_D} fill="var(--icon-muted)" />
        </div>
        <div className={styles.sidebarButtons}>
          <div className={styles.navIcon}>
            <Icon x={2.5} y={2.5} d={CHAT_ADD_D} fill="var(--icon)" />
          </div>
          <div className={styles.navIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d={CHATS_BACK_D}
                fill="var(--icon)"
                transform="translate(2 2)"
              />
              <path
                d={CHATS_FRONT_D}
                fill="var(--icon)"
                transform="translate(6.258 9.5)"
              />
            </svg>
          </div>
          <div className={styles.navIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d={PROJECTS_BODY_D}
                fill="var(--icon)"
                transform="translate(2.68 7)"
              />
              <path
                d={PROJECTS_MID_D}
                fill="var(--icon)"
                transform="translate(4 5)"
              />
              <path
                d={PROJECTS_TOP_D}
                fill="var(--icon)"
                transform="translate(5.5 3)"
              />
            </svg>
          </div>
          <div className={styles.navIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d={ARTIFACT_DIAMOND_D}
                fill="var(--icon)"
                transform="translate(2.5 3.004)"
              />
              <path
                d={ARTIFACT_HOURGLASS_D}
                fill="var(--icon)"
                transform="translate(11 3.5)"
              />
              <path
                d={ARTIFACT_STAR_D}
                fill="var(--icon)"
                transform="translate(2.5 10.902)"
              />
              <path
                d={ARTIFACT_CIRCLE_D}
                fill="var(--icon)"
                transform="translate(11 11)"
              />
            </svg>
          </div>
          <div className={styles.navIcon}>
            <Icon x={2} y={4} d={CODE_D} fill="var(--icon)" />
          </div>
        </div>
      </div>
      <div className={styles.accountSwitcher}>
        <div className={styles.avatar}>
          <AvatarGlyph />
        </div>
      </div>
    </div>
  );
}

/** The desktop frame: 1440 x 972, node 3026:3298. */
export function TurboTaxClaudeCover({ className }: { className?: string }) {
  return (
    <CoverFrame
      width={1440}
      height={972}
      ground="warm"
      className={className}
      label="The TurboTax tax-document checklist running as an app inside the Claude desktop chat interface."
    >
      <div className={styles.stage}>
        <CollapsedSidebar />

        <div className={styles.main}>
          <div className={styles.titlebar}>
            <div className={styles.titleRow}>
              <p className={styles.titleText}>Help me with my taxes</p>
              <Icon x={5} y={7} d={CARET_DOWN_D} fill="var(--icon)" />
            </div>
            <div className={styles.shareButton}>Share</div>
          </div>

          <div className={styles.chatBody}>
            <div className={styles.conversation}>
              <UserBubble />
              <ChecklistCard />
            </div>
          </div>

          <ChatInput />
        </div>
      </div>
    </CoverFrame>
  );
}

/** The mobile frame: 440 x 972, node 3026:3234. */
export function TurboTaxClaudeCoverMobile({
  className,
}: {
  className?: string;
}) {
  return (
    <CoverFrame
      width={440}
      height={972}
      ground="warm"
      className={className}
      label="The TurboTax tax-document checklist running as an app inside the Claude mobile chat interface."
    >
      <div className={styles.stageMobile}>
        <div className={styles.navBar}>
          <div className={styles.navBarLeading}>
            <Icon x={2} y={4} d={SIDEBAR_D} fill="var(--icon-muted)" />
          </div>
          <div className={styles.navBarTrailing}>
            <Icon x={3} y={3} d={ADD_D} fill="var(--icon)" />
          </div>
        </div>

        <div className={`${styles.chatBody} ${styles.chatBodyMobile}`}>
          <div
            className={`${styles.conversation} ${styles.conversationMobile}`}
          >
            <UserBubble />
            <ChecklistCard />
          </div>
        </div>

        <ChatInput mobile />
      </div>
    </CoverFrame>
  );
}
