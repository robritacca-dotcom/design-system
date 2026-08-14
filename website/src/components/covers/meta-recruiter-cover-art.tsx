/**
 * Vector art traced from the Figma source frame "Custom offer proposal"
 * (robr0-ds26, node 931:2105). The recruiter tool predates the offer-summary
 * product and shares none of its components, so this is its own set.
 *
 * Facebook's icon set exports each glyph as several separate fills and
 * strokes, each positioned by a percentage inset inside its box. Those insets
 * are reproduced exactly rather than re-derived, which is why the parts are
 * absolutely positioned rather than merged into one path. Their colours run
 * through currentColor so a single colour on the wrapper drives the glyph.
 */

/** app-facebook-circle. 1 part, 17.863px box. */
export function AppFacebookCircle() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "17.863px",
        height: "17.863px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: 0 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 17.8633 17.8633"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M8.93164 0C4.00696 0 0 4.00696 0 8.93164C0 13.8563 4.00696 17.8633 8.93164 17.8633V12.281H6.69873V10.0481H8.93164V7.81519C8.93164 5.70397 10.2111 4.35306 12.1091 4.35306C13.0179 4.35306 13.7157 4.43568 13.9434 4.46582V6.70878L12.8504 6.7099C11.8177 6.7099 11.1646 7.25696 11.1646 7.97149V10.0481H13.6766L13.3975 12.281H11.1646V17.5685C15.0096 16.5738 17.8633 13.0849 17.8633 8.93164C17.8633 4.00696 13.8563 0 8.93164 0" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** Navigation / more. 1 part, 18.914px box. */
export function NavigationMore() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "18.914px",
        height: "18.914px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "27.78% 19.44%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 11.5586 8.40625"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
            <path d="M0.656738 0C0.294032 0 0 0.294032 0 0.656738C0 1.01944 0.294032 1.31348 0.656738 1.31348H10.9019C11.2646 1.31348 11.5586 1.01944 11.5586 0.656738C11.5586 0.294032 11.2646 0 10.9019 0H0.656738Z" fill="currentColor"/>
            <path d="M0 4.20312C0 3.84042 0.294032 3.54639 0.656738 3.54639H10.9019C11.2646 3.54639 11.5586 3.84042 11.5586 4.20312C11.5586 4.56583 11.2646 4.85986 10.9019 4.85986H0.656738C0.294032 4.85986 0 4.56583 0 4.20312Z" fill="currentColor"/>
            <path d="M0 7.74951C0 7.38681 0.294032 7.09277 0.656738 7.09277H10.9019C11.2646 7.09277 11.5586 7.38681 11.5586 7.74951C11.5586 8.11222 11.2646 8.40625 10.9019 8.40625H0.656738C0.294032 8.40625 0 8.11222 0 7.74951Z" fill="currentColor"/>
            </g>
          </svg>
        </span>
    </span>
  );
}

/** ⚠ beaker (Deprecated). 3 parts, 16.813px box. */
export function BeakerDeprecated() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "55.02% 21.88% 27.52% 28.13%" }}><span style={{ position: "absolute", inset: "-17.9% -6.25% -17.92% -6.23%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 9.45564 3.98833"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.791894 0.525523C-0.299868 3.00116 2.16421 4.44809 4.23005 2.67857C6.74457 0.525523 8.71163 1.81693 8.9302 2.14057" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "3.13% 9.37% 3.12% 9.38%" }}><span style={{ position: "absolute", inset: "-3.33% -3.85%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 14.7113 16.8125"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M13.7978 13.0339L9.36241 7.21992C9.0829 6.8532 8.93159 6.40451 8.93159 5.94532V1.57617H9.45698C9.74699 1.57617 9.98237 1.33975 9.98237 1.05078C9.98237 0.760766 9.74699 0.525391 9.45698 0.525391H5.25385C4.96489 0.525391 4.72846 0.760766 4.72846 1.05078C4.72846 1.33975 4.96489 1.57617 5.25385 1.57617H5.77924V5.94532C5.77924 6.40451 5.62898 6.8532 5.34842 7.21992L0.913073 13.0339C-0.110388 14.4314 1.01185 16.2871 2.88224 16.2871H11.8286C13.699 16.2871 14.8223 14.4314 13.7978 13.0339Z" stroke="currentColor" strokeWidth="1.05078"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "55.02% 8.98% 4.17% 8.72%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 13.8356 6.8616"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M11.6679 1.61505C11.4493 1.29141 9.48225 0 6.96773 2.15305C4.90189 3.92257 2.43781 2.47564 3.52957 0L0 4.69489L1.26934 6.8616L12.456 6.70924L13.8356 4.60768L11.6679 1.61505Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** ⚠ bell (Deprecated). 3 parts, 16.813px box. */
export function BellDeprecated() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "87.77% 37.07% 0 34.06%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 4.85396 2.0563"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.236892 0.736515C0.129712 0.754378 0.0435478 0.831085 0.0120244 0.933011C-0.0184482 1.03599 0.00992285 1.14737 0.0866299 1.22198C0.629884 1.74211 1.36333 2.0563 2.15142 2.0563C2.32164 2.0563 2.49397 2.04158 2.66735 2.01216C3.46069 1.87451 4.14895 1.44054 4.60499 0.789054C4.69115 0.667163 4.76471 0.538968 4.8267 0.406569C4.87189 0.309897 4.86033 0.196413 4.79623 0.112351C4.73213 0.0272372 4.62706 -0.0137432 4.52198 0.00412005L0.236892 0.736515Z" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "12.5% 0 12.5% 12.5%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 14.7109 12.6098"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M12.857 10.2561H12.8675H12.857ZM1.96882 12.6098C0.641681 12.6098 0.133103 11.5506 0.0458878 11.0956C-0.157964 10.0386 0.356919 9.14013 0.811907 8.34995C1.12714 7.80039 1.42451 7.28235 1.35411 6.89566L1.19544 5.69252C0.953763 2.95313 2.84727 0.549997 5.59927 0.0781961C8.34391 -0.383097 10.9667 1.23721 11.697 3.86521L11.9744 5.04209C12.05 5.4582 12.5155 5.84699 13.0073 6.25994C13.7113 6.85153 14.5099 7.52088 14.6917 8.58112C14.7043 8.65677 14.8062 9.33873 14.3722 9.95449C14.0654 10.3885 13.5852 10.6648 12.9453 10.7741L2.44692 12.5678C2.27775 12.5972 2.11698 12.6098 1.96882 12.6098V12.6098Z" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "0 43.75% 80.38% 31.25%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 4.20395 3.29764"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.424225 3.29764C0.226678 3.0423 0.0911269 2.73758 0.0333339 2.41814C-0.0643887 1.88329 0.0543495 1.34319 0.368533 0.894507C0.691123 0.433214 1.17763 0.126386 1.7398 0.0307647C2.86624 -0.16363 3.96746 0.583476 4.17026 1.69941C4.23015 2.0241 4.21019 2.35089 4.11037 2.66507L3.10897 2.34984C3.15626 2.19853 3.16466 2.04406 3.13629 1.88644C3.03647 1.33689 2.49426 0.962808 1.91633 1.06684C1.63367 1.11517 1.38989 1.26753 1.23017 1.4966C1.07781 1.71307 1.02002 1.97366 1.0673 2.23005C1.09567 2.38557 1.15977 2.53162 1.25539 2.65562L0.424225 3.29764Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** ⚠ question-circle (Deprecated). 1 part, 16.813px box. */
export function QuestionCircleDeprecated() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: 0 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 16.8125 16.8125"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M10.7884 8.50397C10.3281 8.96737 9.69871 9.2868 8.99784 9.42341V10.0423C8.99784 10.4773 8.64478 10.8304 8.20975 10.8304C7.77473 10.8304 7.42167 10.4773 7.42167 10.0423V8.71098C7.42167 8.27595 7.77473 7.92289 8.20975 7.92289C8.80345 7.92289 9.33619 7.7306 9.67139 7.39225C9.93934 7.12325 10.0738 6.76388 10.0717 6.32465C10.0717 5.42413 9.32463 4.69594 8.40625 4.69594C7.48787 4.69594 6.74076 5.42413 6.74076 6.32045C6.74076 6.75547 6.38875 7.10854 5.95268 7.10854C5.51765 7.10854 5.16459 6.75547 5.16459 6.32045C5.16459 4.55514 6.61887 3.11977 8.40625 3.11977C10.1947 3.11977 11.6479 4.55514 11.6479 6.32045C11.6532 7.17684 11.3558 7.9334 10.7884 8.50397M8.14355 14.112C7.46055 14.112 6.90468 13.5561 6.90468 12.8721C6.90468 12.1891 7.46055 11.6332 8.14355 11.6332C8.82761 11.6332 9.38243 12.1891 9.38243 12.8721C9.38243 13.5561 8.82761 14.112 8.14355 14.112M8.40625 0C3.77125 0 0 3.77125 0 8.40625C0 13.0412 3.77125 16.8125 8.40625 16.8125C13.0423 16.8125 16.8125 13.0412 16.8125 8.40625C16.8125 3.77125 13.0423 0 8.40625 0" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** ⚠ bug (Deprecated). 3 parts, 16.813px box. */
export function BugDeprecated() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "28.13% 56.25% 6.88% 3.13%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 6.83051 10.9267"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M3.05085 1.39123C2.97414 1.63817 2.90269 1.89141 2.84595 2.152C2.7787 2.12048 2.70619 2.10156 2.62738 2.10156C2.62003 2.10156 2.5843 2.09841 2.53702 2.09105C2.35103 2.06479 1.92651 1.93134 1.709 1.3429C1.63019 1.13169 1.5766 0.872148 1.5766 0.525391C1.5766 0.234324 1.34123 0 1.05121 0C0.760145 0 0.525821 0.234324 0.525821 0.525391C0.525821 2.60279 1.90024 3.15234 2.62738 3.15234C2.64945 3.15234 2.66836 3.14184 2.69043 3.13973C2.6526 3.48649 2.62738 3.84061 2.62738 4.20312C2.62738 4.22099 2.62949 4.2399 2.62949 4.25882C2.62738 4.25882 2.62633 4.25777 2.62528 4.25777C2.55698 4.25777 0.967149 4.26932 0.119169 5.30329C-0.0647178 5.52816 -0.0321436 5.85916 0.191673 6.04304C0.290446 6.1229 0.408134 6.16178 0.525821 6.16178C0.677134 6.16178 0.828446 6.09663 0.931423 5.96949C1.46207 5.32221 2.61477 5.30855 2.62738 5.30855C2.6505 5.30855 2.67047 5.29804 2.69253 5.29489C2.75348 5.82973 2.85225 6.34567 2.99201 6.83218C2.04 6.90363 0.525821 7.50573 0.525821 9.45703C0.525821 9.74705 0.760145 9.98242 1.05121 9.98242C1.34123 9.98242 1.5766 9.74705 1.5766 9.45703C1.5766 7.96282 2.92265 7.8714 3.19375 7.86825C3.25155 7.86825 3.30514 7.85144 3.35768 7.83462C4.05119 9.42236 5.18183 10.5698 6.50477 10.9187C6.66869 10.9617 6.83051 10.8262 6.83051 10.656V0.818559C6.83051 0.668297 6.69916 0.545355 6.54785 0.552711C4.90863 0.638875 3.66766 0.98143 3.05085 1.39123" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "6.25% 21.88% 72.01% 15.63%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 10.5078 3.65462"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M5.25286 3.05357H5.25391H5.25496C6.53481 3.05567 7.88506 3.30366 8.96106 3.65462C8.65844 3.10086 8.29907 2.61224 7.89347 2.2161C8.07 1.91873 8.69521 1.05078 9.98242 1.05078C10.2724 1.05078 10.5078 0.815406 10.5078 0.525391C10.5078 0.234324 10.2724 0 9.98242 0C8.30748 0 7.41116 1.03502 7.05915 1.56987C6.50118 1.23677 5.89278 1.05078 5.25391 1.05078C4.61503 1.05078 4.00558 1.23677 3.44866 1.56987C3.09665 1.03502 2.20034 0 0.525391 0C0.235375 0 0 0.234324 0 0.525391C0 0.815406 0.235375 1.05078 0.525391 1.05078C1.80839 1.05078 2.43256 1.91032 2.61539 2.2161C2.20979 2.61014 1.85253 3.09665 1.5499 3.64831C2.64061 3.2963 4.00243 3.05357 5.2497 3.05357H5.25286Z" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "28.13% 9.38% 6.88% 50%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 6.82998 10.9277"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M4.20312 4.20312C4.20312 3.84061 4.17791 3.48649 4.13903 3.13973C4.16214 3.14184 4.18106 3.15234 4.20312 3.15234C4.92921 3.15234 6.30469 2.60384 6.30469 0.525391C6.30469 0.235375 6.06931 0 5.7793 0C5.48928 0 5.25391 0.235375 5.25391 0.525391C5.25391 0.899469 5.19611 1.18423 5.10785 1.40174C4.88508 1.95025 4.47212 2.07004 4.27563 2.09421C4.24411 2.09841 4.21573 2.10156 4.19682 2.10156C4.12116 2.10261 4.04971 2.12153 3.98456 2.15095C3.92887 1.89771 3.86057 1.65183 3.78596 1.41225C3.17546 0.991937 1.94289 0.64623 0.283711 0.555863C0.132398 0.547457 0 0.670398 0 0.82066V10.657C0 10.8262 0.16077 10.9628 0.325742 10.9197C1.64868 10.5709 2.77932 9.4213 3.47283 7.83357C3.52432 7.85249 3.57791 7.8672 3.63675 7.86825C3.9068 7.8714 5.25391 7.96177 5.25391 9.45703C5.25391 9.74705 5.48928 9.98242 5.7793 9.98242C6.06931 9.98242 6.30469 9.74705 6.30469 9.45703C6.30469 7.50678 4.78946 6.90363 3.83745 6.83218C3.98351 6.32991 4.08439 5.79611 4.14218 5.2413C4.1632 5.2434 4.18106 5.25391 4.20312 5.25391C4.21468 5.25391 5.33797 5.27597 5.86756 6.07036C5.96949 6.22273 6.13551 6.30469 6.30469 6.30469C6.40556 6.30469 6.50644 6.27632 6.59575 6.21642C6.83743 6.05565 6.90258 5.72886 6.74181 5.48823C5.89383 4.21784 4.27143 4.20312 4.20312 4.20312" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** ⚠ bar-chart (Deprecated). 8 parts, 16.813px box. */
export function BarChartDeprecated() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "9.38% 3.13% 9.38% 84.38%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 2.10156 13.6602"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.262695 0H1.83887C1.98387 0 2.10156 0.117688 2.10156 0.262695V13.3975C2.10156 13.5425 1.98387 13.6602 1.83887 13.6602H0.262695C0.117688 13.6602 0 13.5425 0 13.3975V0.262695C0 0.117688 0.117688 0 0.262695 0" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "9.38% 3.13% 9.38% 84.38%" }}><span style={{ position: "absolute", inset: "-3.85% -25%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 3.15234 14.7109"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.788086 0.525391H2.36426C2.50927 0.525391 2.62695 0.643078 2.62695 0.788086V13.9229C2.62695 14.0679 2.50927 14.1855 2.36426 14.1855H0.788086C0.643078 14.1855 0.525391 14.0679 0.525391 13.9229V0.788086C0.525391 0.643078 0.643078 0.525391 0.788086 0.525391Z" stroke="currentColor" strokeWidth="1.05078"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "46.88% 28.13% 9.38% 59.38%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 2.10156 7.35547"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.262695 0H1.83887C1.98387 0 2.10156 0.117688 2.10156 0.262695V7.09277C2.10156 7.23778 1.98387 7.35547 1.83887 7.35547H0.262695C0.117688 7.35547 0 7.23778 0 7.09277V0.262695C0 0.117688 0.117688 0 0.262695 0" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "46.88% 28.13% 9.38% 59.38%" }}><span style={{ position: "absolute", inset: "-7.14% -25%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 3.15234 8.40625"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.788086 0.525391H2.36426C2.50927 0.525391 2.62695 0.643078 2.62695 0.788086V7.61816C2.62695 7.76317 2.50927 7.88086 2.36426 7.88086H0.788086C0.643078 7.88086 0.525391 7.76317 0.525391 7.61816V0.788086C0.525391 0.643078 0.643078 0.525391 0.788086 0.525391Z" stroke="currentColor" strokeWidth="1.05078"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "28.13% 53.13% 9.38% 34.38%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 2.10156 10.5078"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.262695 0H1.83887C1.98387 0 2.10156 0.117688 2.10156 0.262695V10.2451C2.10156 10.3901 1.98387 10.5078 1.83887 10.5078H0.262695C0.117688 10.5078 0 10.3901 0 10.2451V0.262695C0 0.117688 0.117688 0 0.262695 0" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "28.13% 53.13% 9.38% 34.38%" }}><span style={{ position: "absolute", inset: "-5% -25%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 3.15234 11.5586"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.788086 0.525391H2.36426C2.50927 0.525391 2.62695 0.643078 2.62695 0.788086V10.7705C2.62695 10.9155 2.50927 11.0332 2.36426 11.0332H0.788086C0.643078 11.0332 0.525391 10.9155 0.525391 10.7705V0.788086C0.525391 0.643078 0.643078 0.525391 0.788086 0.525391Z" stroke="currentColor" strokeWidth="1.05078"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "65.63% 78.13% 9.38% 9.38%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 2.10156 4.20312"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.262695 0H1.83887C1.98387 0 2.10156 0.117688 2.10156 0.262695V3.94043C2.10156 4.08544 1.98387 4.20312 1.83887 4.20312H0.262695C0.117688 4.20312 0 4.08544 0 3.94043V0.262695C0 0.117688 0.117688 0 0.262695 0" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "65.63% 78.13% 9.38% 9.38%" }}><span style={{ position: "absolute", inset: "-12.5% -25%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 3.15234 5.25391"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.788086 0.525391H2.36426C2.50927 0.525391 2.62695 0.643078 2.62695 0.788086V4.46582C2.62695 4.61083 2.50927 4.72852 2.36426 4.72852H0.788086C0.643078 4.72852 0.525391 4.61083 0.525391 4.46582V0.788086C0.525391 0.643078 0.643078 0.525391 0.788086 0.525391Z" stroke="currentColor" strokeWidth="1.05078"/>
          </svg>
        </span></span>
    </span>
  );
}

/** ⚠ magnifying-glass (Deprecated). 4 parts, 16.813px box. */
export function MagnifyingGlassDeprecated() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "4.16% 23.22% 23.23% 4.17%" }}><span style={{ position: "absolute", inset: "-6.46%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 13.7839 13.7839"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M11.2076 2.57625C13.5919 4.96048 13.5919 8.8242 11.2076 11.2084C8.82341 13.5916 4.95969 13.5916 2.57546 11.2084C0.192293 8.8242 0.192293 4.96048 2.57546 2.57625C4.95969 0.19203 8.82341 0.19203 11.2076 2.57625Z" stroke="currentColor" strokeWidth="1.57617" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "59.11% 24.03% 28.39% 69.72%" }}><span style={{ position: "absolute", inset: "-37.53% -10.48% -37.52% -74.94%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1.94828 3.67681"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.1045 0.788217C1.1045 0.788217 0.355291 2.08383 1.16019 2.88873" stroke="currentColor" strokeWidth="1.57617" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "69.7% 28.39% 24.05% 59.11%" }}><span style={{ position: "absolute", inset: "-74.94% -37.52% -10.44% -37.52%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 3.67681 1.94785"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.788215 1.10722C0.788215 1.10722 2.08383 0.353814 2.88873 1.15976" stroke="currentColor" strokeWidth="1.57617" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "67.57% 4.22% 4.22% 67.57%" }}><span style={{ position: "absolute", inset: "-16.61% -16.61% -16.6% -16.61%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 6.31967 6.32013"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M4.71066 5.38946L0.788089 0.788089L5.38946 4.71066C5.38946 4.71066 5.70995 5.03114 5.38946 5.38946C5.03114 5.711 4.71066 5.38946 4.71066 5.38946Z" stroke="currentColor" strokeWidth="1.57617" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
    </span>
  );
}

/** checkmark-circle. 1 part, 16.813px box. */
export function CheckmarkCircle() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: 0 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 16.8125 16.812"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M12.6567 6.32045L7.69172 11.5744C7.54356 11.732 7.33655 11.8213 7.11904 11.8213C6.90258 11.8213 6.69558 11.732 6.54742 11.5754L4.15584 9.04618C3.85742 8.72884 3.87108 8.22972 4.18631 7.9313C4.50365 7.63287 5.00277 7.64864 5.30119 7.96177L7.11904 9.8868L11.5113 5.2392C11.8097 4.92291 12.3089 4.9082 12.6251 5.20662C12.9414 5.50609 12.9561 6.00416 12.6567 6.32045M8.40625 0C3.77125 0 0 3.77114 0 8.40599C0 13.0408 3.77125 16.812 8.40625 16.812C13.0412 16.812 16.8125 13.0408 16.8125 8.40599C16.8125 3.77114 13.0412 0 8.40625 0" fill="var(--fbr-positive)"/>
          </svg>
        </span>
    </span>
  );
}

/** triangle-down. 1 part, 16.813px box. */
export function TriangleDown() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "31.25% 18.71% 31.25% 18.7%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 10.5225 6.30451"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.25541 0C10.2993 0.000249726 10.9353 1.21772 10.2144 2.02637L10.1402 2.10352L6.1431 5.95312C5.65563 6.42251 4.871 6.42077 4.38333 5.95312H4.38236L0.381382 2.09961C-0.452978 1.29555 0.190115 0.000149444 1.26517 0H9.25541Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** event_available. 1 part, 25.219px box. */
export function EventAvailable() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "25.219px",
        height: "25.219px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "8.33% 12.5%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 18.9141 21.0156"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.8125 2.10156H15.7617V0H13.6602V2.10156H5.25391V0H3.15234V2.10156H2.10156C0.945703 2.10156 0 3.04727 0 4.20312V18.9141C0 20.0699 0.945703 21.0156 2.10156 21.0156H16.8125C17.9684 21.0156 18.9141 20.0699 18.9141 18.9141V4.20312C18.9141 3.04727 17.9684 2.10156 16.8125 2.10156ZM16.8125 18.9141H2.10156V8.40625H16.8125V18.9141ZM2.10156 6.30469V4.20312H16.8125V6.30469H2.10156ZM7.94391 17.2959L14.175 11.0647L13.0612 9.9509L7.94391 15.0682L5.72676 12.8511L4.61293 13.9649L7.94391 17.2959Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** add_comment. 1 part, 25.219px box. */
export function AddComment() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "25.219px",
        height: "25.219px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "8.33%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 21.0156 21.0156"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.0156 2.10156C21.0156 0.945703 20.0699 0 18.9141 0H2.10156C0.945703 0 0 0.945703 0 2.10156V14.7109C0 15.8668 0.945703 16.8125 2.10156 16.8125H16.8125L21.0156 21.0156V2.10156ZM18.9141 15.9404L17.6846 14.7109H2.10156V2.10156H18.9141V15.9404ZM11.5586 3.15234H9.45703V7.35547H5.25391V9.45703H9.45703V13.6602H11.5586V9.45703H15.7617V7.35547H11.5586V3.15234Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** notes. 1 part, 25.219px box. */
export function Notes() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "25.219px",
        height: "25.219px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "25% 12.5% 25% 12.5%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 18.9141 12.6094"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.9141 5.26441L0 5.25391V7.35547H18.9141V5.26441ZM0 10.5078H12.6094V12.6094H0V10.5078ZM18.9141 0H0V2.11207L18.9141 2.10156V0Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** Icon. 1 part, 16.813px box. */
export function Icon() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "13.02%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 12.4351 12.4351"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.09 0.230647C11.3976 -0.0766377 11.8966 -0.0764762 12.2043 0.230647C12.512 0.538414 12.512 1.03811 12.2043 1.34588L7.33221 6.21698L12.2043 11.09C12.5119 11.3978 12.512 11.8966 12.2043 12.2043C11.8966 12.512 11.3978 12.5119 11.09 12.2043L6.21698 7.33221L1.34588 12.2043C1.03811 12.512 0.538414 12.512 0.230647 12.2043C-0.0764762 11.8966 -0.0766377 11.3976 0.230647 11.09L5.10272 6.21698L0.230647 1.34588C-0.0767636 1.03809 -0.077001 0.538295 0.230647 0.230647C0.538295 -0.077001 1.03809 -0.0767636 1.34588 0.230647L6.21698 5.10272L11.09 0.230647Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** document. 4 parts, 16.813px box. */
export function Document() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "21.88% 31.25% 71.88% 31.25%" }}><span style={{ position: "absolute", inset: "-50% -8.33% 50% -8.33%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 7.35547 1.05078"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.525391 0.525391H6.83008" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "40.63% 31.25% 53.13% 31.25%" }}><span style={{ position: "absolute", inset: "-50% -8.33% 50% -8.33%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 7.35547 1.05078"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.525391 0.525391H6.83008" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "59.38% 47.32% 34.38% 31.25%" }}><span style={{ position: "absolute", inset: "-50% -14.58% 50% -14.58%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 4.65391 1.05078"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.525391 0.525391H4.12852" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "3.13% 15.63%" }}><span style={{ position: "absolute", inset: "-3.33% -4.55%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 12.6094 16.8125"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M10.6833 16.2871H1.92608C1.15586 16.2871 0.525391 15.6566 0.525391 14.8864V1.92608C0.525391 1.15586 1.15586 0.525391 1.92608 0.525391H10.6833C11.4535 0.525391 12.084 1.15586 12.084 1.92608V14.8864C12.084 15.6566 11.4535 16.2871 10.6833 16.2871Z" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
    </span>
  );
}

/** profile-circle. 3 parts, 16.813px box. */
export function ProfileCircle() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "3.13%" }}><span style={{ position: "absolute", inset: "-3.33%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 16.8125 16.8125"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M16.2871 8.40625C16.2871 12.7596 12.7596 16.2871 8.40625 16.2871C4.05286 16.2871 0.525391 12.7596 0.525391 8.40625C0.525391 4.05286 4.05286 0.525391 8.40625 0.525391C12.7596 0.525391 16.2871 4.05286 16.2871 8.40625Z" stroke="currentColor" strokeWidth="1.05078"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "15.63% 34.37% 46.88% 34.48%" }}><span style={{ position: "absolute", inset: "-8.33% -10.03%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 6.28682 7.35547"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M3.14289 6.83008C1.52573 6.83008 0.525391 5.41888 0.525391 3.67773C0.525391 1.6098 1.52573 0.525391 3.14289 0.525391C4.76109 0.525391 5.76143 1.6098 5.76143 3.67773C5.76143 5.41888 4.76109 6.83008 3.14289 6.83008Z" stroke="currentColor" strokeWidth="1.05078"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "65.63% 18.75% 3.13% 18.75%" }}><span style={{ position: "absolute", inset: "-10% -5.38%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 11.6387 6.30469"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81945 0.525391C3.71683 0.525391 1.35783 0.936246 0.747325 2.94324C0.669567 3.19858 0.611774 3.46653 0.56554 3.74183C1.95362 5.00802 3.79249 5.7793 5.81104 5.7793C7.83695 5.7793 9.68317 5.00172 11.0734 3.72607C11.0282 3.45707 10.9693 3.19438 10.8937 2.94324C10.2832 0.936246 7.92206 0.525391 5.81945 0.525391Z" stroke="currentColor" strokeWidth="1.05078"/>
          </svg>
        </span></span>
    </span>
  );
}

/** card-person. 4 parts, 16.813px box. */
export function CardPerson() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "24.24% 3.12% 3.12% 44.02%" }}><span style={{ position: "absolute", inset: "-4.3% -5.91%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 9.93761 13.2623"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.525422 12.1313L7.50891 12.7334C8.00909 12.7765 8.44936 12.415 8.4935 11.9253L9.40873 1.62349C9.45181 1.13487 9.08298 0.704054 8.58386 0.662023L6.99928 0.525422" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "9.38% 25% 15.62% 3.13%" }}><span style={{ position: "absolute", inset: "-4.17% -4.35%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 13.1353 13.6606"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M2.37082 13.1318L11.8068 12.3133C12.2902 12.2713 12.6485 11.8509 12.6065 11.3739L11.7186 1.31791C11.6765 0.84086 11.2489 0.486747 10.7645 0.528778L1.32845 1.34734C0.84509 1.38937 0.486774 1.80968 0.528805 2.28674L1.41672 12.3427C1.45875 12.8198 1.88641 13.1739 2.37082 13.1318Z" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "28.13% 49.13% 46.87% 27.26%" }}><span style={{ position: "absolute", inset: "-11.25% -11.91%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 4.91568 5.14898"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.486641 2.74478C0.36475 1.37246 1.05406 0.587524 2.27297 0.483496C3.49082 0.379469 4.31043 1.03411 4.43232 2.40643C4.53635 3.56123 3.8649 4.56263 2.64705 4.66771C1.42814 4.77173 0.590668 3.90064 0.486641 2.74478Z" stroke="currentColor" strokeWidth="0.945703" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "65.63% 37.55% 15.62% 21.92%" }}><span style={{ position: "absolute", inset: "-16.67% -7.64% -0.83% -7.71%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 7.85871 3.70404"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.33803 3.05791C7.28339 2.65231 7.19197 2.26667 7.05221 1.91781C6.55099 0.67894 5.02 0.43621 3.68446 0.550745C2.35102 0.66528 0.885178 1.16335 0.613026 2.46947C0.532116 2.8488 0.512151 3.25651 0.533167 3.67787" stroke="currentColor" strokeWidth="1.05078" strokeLinejoin="round"/>
          </svg>
        </span></span>
    </span>
  );
}

/** XDSRadio. 1 part, 25.219px box. */
export function XDSRadio() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "25.219px",
        height: "25.219px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "6.3px 0 0 6.3px" }}><span style={{ position: "absolute", inset: "4.17%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 11.5586 11.5586"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.7793 0C8.97052 0 11.5586 2.58807 11.5586 5.7793C11.5586 8.97052 8.97052 11.5586 5.7793 11.5586C2.58807 11.5586 0 8.97052 0 5.7793C0 2.58807 2.58807 0 5.7793 0Z" fill="var(--fbr-accent)"/>
          </svg>
        </span></span>
    </span>
  );
}

/** dollar-circle. 3 parts, 16.813px box. */
export function DollarCircle() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: 0 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 16.8125 16.8125"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M8.40625 0C3.7639 0 0 3.7639 0 8.40625C0 13.0486 3.7639 16.8125 8.40625 16.8125C13.0486 16.8125 16.8125 13.0486 16.8125 8.40625C16.8125 3.7639 13.0486 0 8.40625 0M8.40625 1.05078C12.4612 1.05078 15.7617 4.35129 15.7617 8.40625C15.7617 12.4612 12.4612 15.7617 8.40625 15.7617C4.35129 15.7617 1.05078 12.4612 1.05078 8.40625C1.05078 4.35129 4.35129 1.05078 8.40625 1.05078" fill="currentColor"/>
          </svg>
        </span>
        <span style={{ position: "absolute", inset: "25% 34.38% 25% 34.37%" }}><span style={{ position: "absolute", inset: "-6.25% -10%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 6.30469 9.45703"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.48193 2.46513C5.48193 1.39334 4.511 0.525391 3.31416 0.525391H2.6942C1.49631 0.525391 0.525391 1.39334 0.525391 2.46513V2.78982C0.525391 3.86057 1.49631 4.72852 2.6942 4.72852H3.31416C4.511 4.72852 5.7793 5.59646 5.7793 6.66826V6.99295C5.7793 8.0637 4.511 8.93164 3.31416 8.93164H2.71417C1.51733 8.93164 0.546406 8.0637 0.546406 6.99295" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "15.63% 43.75% 15.63% 50%" }}><span style={{ position: "absolute", inset: "-4.55% 50% -4.55% -50%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1.05078 12.6094"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.525391 12.084V0.525391" stroke="currentColor" strokeWidth="1.05078" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
    </span>
  );
}

/** Account switcher in the top nav. */
export function AccountSwitcher() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "0" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 16.8126 16.8125"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.085 11.5586C14.4723 11.5586 16.1053 12.3986 16.5645 13.8623C16.7031 14.3045 16.7863 14.8107 16.8115 15.3652C16.8283 15.7161 16.6422 16.0429 16.3135 16.2373C15.6746 16.6187 13.8311 16.8125 12.0059 16.8125C10.2366 16.8125 8.48557 16.6313 7.86133 16.2646C7.53669 16.0745 7.34285 15.7482 7.35645 15.4141C7.37851 14.8394 7.46271 14.3172 7.60449 13.8623C8.06473 12.3986 9.69763 11.5586 12.085 11.5586ZM0.525391 12.6094C0.815556 12.6094 1.05078 12.8446 1.05078 13.1348C1.05078 14.0047 1.75706 14.7109 2.62695 14.7109H4.20312V14.1855C4.20312 13.9731 4.33108 13.7815 4.52734 13.7002C4.72367 13.6189 4.94935 13.6642 5.09961 13.8145L6.15039 14.8652C6.35557 15.0704 6.35557 15.4022 6.15039 15.6074L5.09961 16.6582C4.94935 16.8085 4.72367 16.8538 4.52734 16.7725C4.33108 16.6911 4.20312 16.4996 4.20312 16.2871V15.7617H2.62695C1.17673 15.7617 0 14.585 0 13.1348C0 12.8446 0.235225 12.6094 0.525391 12.6094ZM4.72949 6.30469C6.38342 6.30469 7.66489 6.71668 8.45508 7.45117C8.43091 7.64766 8.40625 7.84544 8.40625 8.05664C8.40632 9.06842 8.75302 9.9555 9.31934 10.6279C9.23428 10.7685 9.11436 10.891 8.95801 10.9834C8.31913 11.3648 6.4756 11.5586 4.65039 11.5586C2.88114 11.5586 1.1301 11.3774 0.505859 11.0107C0.181242 10.8206 -0.0125859 10.4943 0.000976562 10.1592C0.023037 9.58561 0.107238 9.0633 0.249023 8.6084C0.70926 7.14468 2.34216 6.30471 4.72949 6.30469ZM12.084 5.25391C13.7285 5.25391 14.7109 6.30184 14.7109 8.05664C14.7108 9.67994 13.6054 10.8584 12.084 10.8584C10.5625 10.8584 9.45717 9.67994 9.45703 8.05664C9.45703 6.30184 10.4395 5.25391 12.084 5.25391ZM4.72852 0C6.37299 0 7.35547 1.04793 7.35547 2.80273C7.35533 4.42604 6.24995 5.60352 4.72852 5.60352C3.20708 5.60352 2.1017 4.42604 2.10156 2.80273C2.10156 1.04793 3.08404 0 4.72852 0ZM11.7129 0.154297C11.8632 0.00403625 12.0888 -0.0412815 12.2852 0.0400391C12.4814 0.121386 12.6094 0.312931 12.6094 0.525391V1.05078H14.1855C15.6358 1.05078 16.8125 2.22751 16.8125 3.67773V4.72852C16.8125 5.01868 16.5773 5.25391 16.2871 5.25391C15.9969 5.25391 15.7617 5.01868 15.7617 4.72852V3.67773C15.7617 2.80784 15.0554 2.10156 14.1855 2.10156H12.6094V2.62695C12.6094 2.83941 12.4814 3.03096 12.2852 3.1123C12.0888 3.19363 11.8632 3.14831 11.7129 2.99805L10.6621 1.94727C10.4569 1.74209 10.4569 1.41026 10.6621 1.20508L11.7129 0.154297Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** The Offer Draft panel close control. */
export function CloseX() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "13.02%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 12.4351 12.4351"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.09 0.230647C11.3976 -0.0766377 11.8966 -0.0764762 12.2043 0.230647C12.512 0.538414 12.512 1.03811 12.2043 1.34588L7.33221 6.21698L12.2043 11.09C12.5119 11.3978 12.512 11.8966 12.2043 12.2043C11.8966 12.512 11.3978 12.5119 11.09 12.2043L6.21698 7.33221L1.34588 12.2043C1.03811 12.512 0.538414 12.512 0.230647 12.2043C-0.0764762 11.8966 -0.0766377 11.3976 0.230647 11.09L5.10272 6.21698L0.230647 1.34588C-0.0767636 1.03809 -0.077001 0.538295 0.230647 0.230647C0.538295 -0.077001 1.03809 -0.0767636 1.34588 0.230647L6.21698 5.10272L11.09 0.230647Z" fill="currentColor"/>
          </svg>
        </span>
    </span>
  );
}

/** The Compensation tab glyph. Two parts. */
export function CompensationTabIcon() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "3.13%" }}><span style={{ position: "absolute", inset: "-3.33%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 16.8125 16.8125"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M16.2871 8.40625C16.2871 12.7596 12.7596 16.2871 8.40625 16.2871C4.05286 16.2871 0.525391 12.7596 0.525391 8.40625C0.525391 4.05286 4.05286 0.525391 8.40625 0.525391C12.7596 0.525391 16.2871 4.05286 16.2871 8.40625Z" stroke="var(--fbr-accent)" strokeWidth="1.05078"/>
          </svg>
        </span></span>
        <span style={{ position: "absolute", inset: "3.13% 3.13% 3.13% 50%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 7.88086 15.7617"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0C4.35339 0 7.88086 3.52747 7.88086 7.88086C7.88086 12.2342 4.35339 15.7617 0 15.7617" fill="var(--fbr-accent)"/>
          </svg>
        </span>
    </span>
  );
}

/** The Offer Extension and Offer Acceptance tab glyph. */
export function OfferStepIcon() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "16.813px",
        height: "16.813px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "4.69%" }}><span style={{ position: "absolute", inset: "-5.17%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 16.8125 16.8125"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M16.0244 8.40625C16.0244 12.6136 12.6136 16.0244 8.40625 16.0244C4.19892 16.0244 0.788086 12.6136 0.788086 8.40625C0.788086 4.19892 4.19892 0.788086 8.40625 0.788086C12.6136 0.788086 16.0244 4.19892 16.0244 8.40625Z" stroke="currentColor" strokeWidth="1.57617" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span></span>
    </span>
  );
}

/** The filled dot inside a selected radio. */
export function RadioDot() {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "12.609px",
        height: "12.609px",
        flexShrink: 0,
      }}
    >
        <span style={{ position: "absolute", inset: "4.17%" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 11.5586 11.5586"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.7793 0C8.97052 0 11.5586 2.58807 11.5586 5.7793C11.5586 8.97052 8.97052 11.5586 5.7793 11.5586C2.58807 11.5586 0 8.97052 0 5.7793C0 2.58807 2.58807 0 5.7793 0Z" fill="var(--fbr-accent)"/>
          </svg>
        </span>
    </span>
  );
}
