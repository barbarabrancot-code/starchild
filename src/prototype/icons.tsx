type IconProps = { className?: string };
export type IconComponent = (props: IconProps) => JSX.Element;

/**
 * Google Material Symbols, "outlined" style at weight 400 — the whole file,
 * LogoMark and RunDotIcon aside. Every glyph below is the real path data from
 * @material-symbols/svg-400 (Apache-2.0), not redrawn: the same component
 * shape (`{ className }`, one default size class per icon, `fill="currentColor"`)
 * as the hand-drawn set this replaces, so nothing that imports these had to
 * change — only what is inside each `<svg>` did. The 960-unit, negative-Y
 * viewBox (`0 -960 960 960`) is Google's own coordinate space for this set;
 * it is not a typo.
 */

// The real symbol, replacing the CSS stand-in that used to be here — a rounded
// square with an orange polygon clipped across it, which at 15px read as the mark
// cut in half. Every window chrome in the prototype draws this one component, so
// the asset lands in all of them at once.
export function LogoMark({ className }: IconProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/starchild-symbol.svg`}
      alt=""
      width={32}
      height={32}
      className={className ?? "size-6"}
    />
  );
}

// Material's "tune" glyph — sliders, not a gear, which is the same call this
// icon made by hand before: a ring with spokes turns to mud at 14px, and two
// rails with a knob each says "adjust these" the way the control behind it does.
export function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M427-120v-225h60v83h353v60H487v82h-60Zm-307-82v-60h247v60H120Zm187-166v-82H120v-60h187v-84h60v226h-60Zm120-82v-60h413v60H427Zm166-165v-225h60v82h187v60H653v83h-60Zm-473-83v-60h413v60H120Z" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-5"}>
      <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
    </svg>
  );
}

export function MicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M408-453.92q-29-30.91-29-75.08v-251q0-41.67 29.44-70.83Q437.88-880 479.94-880t71.56 29.17Q581-821.67 581-780v251q0 44.17-29 75.08Q523-423 480-423t-72-30.92ZM480-651Zm-30 531v-136q-106-11-178-89t-72-184h60q0 91 64.29 153t155.5 62q91.21 0 155.71-62Q700-438 700-529h60q0 106-72 184t-178 89v136h-60Zm59.5-376.5Q521-510 521-529v-251q0-17-11.79-28.5T480-820q-17.42 0-29.21 11.5T439-780v251q0 19 11.5 32.5T480-483q18 0 29.5-13.5Z" />
    </svg>
  );
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M450-160v-526L202-438l-42-42 320-320 320 320-42 42-248-248v526h-60Z" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
    </svg>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M320-242 80-482l242-242 43 43-199 199 197 197-43 43Zm318 2-43-43 199-199-197-197 43-43 240 240-242 242Z" />
    </svg>
  );
}

// "stars" — Material's own auto_awesome glyph is not in this release of the
// set; stars is the same register (a small marker for something generated or
// noticed) and was the closer sibling of the two available.
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="m320-240 160-122 160 122-64-197 160-113H541l-61-203-62 203H223l160 113-63 197ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
    </svg>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z" />
    </svg>
  );
}

export function GradCapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M479-120 189-279v-240L40-600l439-240 441 240v317h-60v-282l-91 46v240L479-120Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127v-168L479-360 249-485v170l230 127Zm1-240Zm-1 74Zm0 0Z" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M220-80q-24.75 0-42.37-17.63Q160-115.25 160-140v-434q0-24.75 17.63-42.38Q195.25-634 220-634h70v-96q0-78.85 55.61-134.42Q401.21-920 480.11-920q78.89 0 134.39 55.58Q670-808.85 670-730v96h70q24.75 0 42.38 17.62Q800-598.75 800-574v434q0 24.75-17.62 42.37Q764.75-80 740-80H220Zm0-60h520v-434H220v434Zm314.5-162.03Q557-324.06 557-355q0-30-22.67-54.5t-54.5-24.5q-31.83 0-54.33 24.5t-22.5 55q0 30.5 22.67 52.5t54.5 22q31.83 0 54.33-22.03ZM350-634h260v-96q0-54.17-37.88-92.08-37.88-37.92-92-37.92T388-822.08q-38 37.91-38 92.08v96ZM220-140v-434 434Z" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M796-121 533-384q-30 26-70 40.5T378-329q-108 0-183-75t-75-181q0-106 75-181t182-75q106 0 180.5 75T632-585q0 43-14 83t-42 75l264 262-44 44ZM377-389q81 0 138-57.5T572-585q0-81-57-138.5T377-781q-82 0-139.5 57.5T180-585q0 81 57.5 138.5T377-389Z" />
    </svg>
  );
}

export function TrendingUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="m123-240-43-43 292-291 167 167 241-241H653v-60h227v227h-59v-123L538-321 371-488 123-240Z" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="m393-165 279-335H492l36-286-253 366h154l-36 255Zm-73 85 40-280H160l360-520h80l-40 320h240L400-80h-80Zm154-396Z" />
    </svg>
  );
}

// "approval_delegation" — a checkmark handed off, for the Handled nav item:
// work that ran and was signed off, not work still in flight (that's BoltIcon).
export function ApprovalDelegationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M570-531 406-695l43-43 121 122 234-233 42 41-276 277ZM295-200l307 90 248-78q0-20-15.5-33.5T798-235H589q-16 0-31.5-2.5T527-245l-96-29 19-61 94 32q11 4 22.5 6t22.5 2h56q0-21-14-36.5T597-355l-218-83h-84v238ZM80-80v-418h298q5 0 10.5 1t10.5 3l218 82q38 14 64.5 45t26.5 72h90q51 0 86.5 37t35.5 88v26L607-48l-312-89v57H80Zm60-60h94v-298h-94v298Z" />
    </svg>
  );
}

// The brand dot, small enough to sit in a chip. Same orange and the same soft
// halo the hero dot carries, so "Run for me" reads as the thing that is already
// alive and moving on the page rather than as one more outlined glyph. Colour is
// set explicitly on purpose — it must not inherit the chip's text colour. The
// breath and the hover lift are in index.css, next to the other .sd-* motion.
// Bespoke, not a Material Symbol: nothing in the set is this glyph plus a
// gradient halo plus the presence-orb colour, and approximating it with a
// generic dot icon would lose the one thing this element exists to carry.
export function RunDotIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <defs>
        <radialGradient id="run-dot-halo">
          <stop offset="35%" stopColor="#f84600" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f84600" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="run-dot">
        <circle className="run-dot-glow" cx="12" cy="12" r="9" fill="url(#run-dot-halo)" />
        <circle className="run-dot-core" cx="12" cy="12" r="3.4" fill="var(--color-orange-400)" />
      </g>
    </svg>
  );
}

// "monitoring" — Material's line-chart-with-a-spike glyph, standing in for the
// hand-drawn heartbeat line this used to be.
export function ActivityIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M120-120v-76l60-60v136h-60Zm165 0v-236l60-60v296h-60Zm165 0v-296l60 61v235h-60Zm165 0v-235l60-60v295h-60Zm165 0v-396l60-60v456h-60ZM120-356v-85l280-278 160 160 280-281v85L560-474 400-634 120-356Z" />
    </svg>
  );
}

export function DollarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M451-120v-84q-57-10-93.5-43.5T305-332l56-23q17 48 49 71.5t77 23.5q48 0 79-24t31-66q0-44-27.5-68T466-467q-72-23-107.5-61T323-623q0-55 35.5-92t92.5-42v-83h60v83q45 5 77.5 29.5T638-665l-56 24q-14-32-37.5-46.5T483-702q-46 0-73 21t-27 57q0 38 30 61.5T524-514q68 21 100.5 60.5T657-354q0 63-37 101.5T511-203v83h-60Z" />
    </svg>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M140-120q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h180v-100q0-24 18-42t42-18h200q24 0 42 18t18 42v100h180q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680v-480H140v480Zm240-540h200v-100H380v100ZM140-180v-480 480Z" />
    </svg>
  );
}

// "groups_3" — a roster of people, standing in for the briefcase Agents used
// to wear. BriefcaseIcon stays above for the unrelated "Work" intent on the
// landing page, which is actually about a briefcase's worth of tasks.
export function GroupsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="m150-400 82-80-82-82-80 82 80 80Zm573-10 87-140 88 140H723Zm-243-70q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm.35-180q-25.35 0-42.85 17.15t-17.5 42.5q0 25.35 17.35 42.85t43 17.5Q506-540 523-557.35t17-43Q540-626 522.85-643t-42.5-17Zm-.35 60ZM0-240v-53q0-39.46 42-63.23Q84-380 150.4-380q12.16 0 23.38.5 11.22.5 22.22 2.23-8 17.27-12 34.84-4 17.57-4 37.43v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm570-140q67.5 0 108.75 23.77T960-293v53H780v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5Zm-330.2-10Q400-390 350-366q-50 24-50 61v5h360v-6q0-36-49.5-60t-130.7-24Zm.2 90Z" />
    </svg>
  );
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M80-120v-60h370v-484q-26-9-46.5-29.5T374-740H215l125 302q-1 45-38.5 76.5T210-330q-54 0-91.5-31.5T80-438l125-302h-85v-60h254q12-35 41-57.5t65-22.5q36 0 65 22.5t41 57.5h254v60h-85l125 302q-1 45-38.5 76.5T750-330q-54 0-91.5-31.5T620-438l125-302H586q-9 26-29.5 46.5T510-664v484h370v60H80Zm595-320h150l-75-184-75 184Zm-540 0h150l-75-184-75 184Zm345-280q21 0 35.5-15t14.5-35q0-21-14.5-35.5T480-820q-20 0-35 14.5T430-770q0 20 15 35t35 15Z" />
    </svg>
  );
}

export function FolderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-3.5"}>
      <path d="M140-160q-24 0-42-18.5T80-220v-520q0-23 18-41.5t42-18.5h281l60 60h339q23 0 41.5 18.5T880-680v460q0 23-18.5 41.5T820-160H140Zm0-60h680v-460H456l-60-60H140v520Zm0 0v-520 520Z" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M453-280h60v-240h-60v240Zm50.5-323.2q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
    </svg>
  );
}

// —— the authenticated product shell ——

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-5"}>
      <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
    </svg>
  );
}

export function ChatBubbleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-5"}>
      <path d="M80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240L80-80Zm134-220h606v-520H140v600l74-80Zm-74 0v-520 520Z" />
    </svg>
  );
}

export function PuzzleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-5"}>
      <path d="M180-180h560v-192l41-19q19-8 30.5-27t11.5-40q0-21.43-11.5-39.72Q800-516 781-525l-41-19v-196H539l-9-51q-5-27-24.67-45.5-19.68-18.5-45.91-18.5Q432-855 412-836.5T387-791l-9 51H181v110q55 20 89 66.78t34 105.5q0 59.72-34 107.22T180-287v107Zm11 60q-29 0-50-21t-21-51v-139q52-3 88-39t36-88q0-52-36-88.5t-87-38.4V-729q0-30 20.5-50.5T192-800h136q6.63-48.88 43.58-81.94Q408.53-915 458.74-915q49.26 0 86.45 33.06Q582.37-848.88 590-800h139q30 0 50.5 20.5T800-729v147q38 18 60.5 49.5T883-458q0 43-22.5 75T800-334v142q0 30-20.5 51T729-120H191Zm311-338Z" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-5"}>
      <path d="M120-510v-330h330v330H120Zm0 390v-330h330v330H120Zm390-390v-330h330v330H510Zm0 390v-330h330v330H510ZM180-570h210v-210H180v210Zm390 0h210v-210H570v210Zm0 390h210v-210H570v210Zm-390 0h210v-210H180v210Zm390-390Zm0 180Zm-180 0Zm0-180Z" />
    </svg>
  );
}

export function StoreIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-5"}>
      <path d="M840-519v339q0 24-18 42t-42 18H179q-24 0-42-18t-18-42v-339q-28-24-37-59t2-70l43-135q8-27 28-42t46-15h553q28 0 49 15.5t29 41.5l44 135q11 35 1.5 70T840-519Zm-270-31q29 0 49-19t16-46l-25-165H510v165q0 26 17 45.5t43 19.5Zm-187 0q28 0 47.5-19t19.5-46v-165H350l-25 165q-4 26 14 45.5t44 19.5Zm-182 0q24 0 41.5-16.5T263-607l26-173H189l-46 146q-10 31 8 57.5t50 26.5Zm557 0q32 0 50.5-26t8.5-58l-46-146H671l26 173q3 24 20.5 40.5T758-550ZM179-180h601v-311q1 1-6.5 1H758q-25 0-47.5-10.5T666-533q-16 20-40 31.5T573-490q-30 0-51.5-8.5T480-527q-15 18-38 27.5t-52 9.5q-31 0-55-11t-41-32q-24 21-47 32t-46 11h-13.5q-6.5 0-8.5-1v311Zm601 0H179h601Z" />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-5"}>
      <path d="M298-120v-60h152v-148q-54-11-96-46.5T296-463q-74-8-125-60t-51-125v-44q0-25 17.5-42.5T180-752h104v-88h392v88h104q25 0 42.5 17.5T840-692v44q0 73-51 125t-125 60q-16 53-58 88.5T510-328v148h152v60H298Zm-14-406v-166H180v44q0 45 29.5 78.5T284-526Zm292.5 101q39.5-40 39.5-97v-258H344v258q0 57 39.5 97t96.5 40q57 0 96.5-40ZM676-526q45-10 74.5-43.5T780-648v-44H676v166Zm-196-57Z" />
    </svg>
  );
}

export function EllipsisIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-5"}>
      <path d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z" />
    </svg>
  );
}

export function WalletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M180-233v53-600 547Zm0 113q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h600q24.75 0 42.38 17.62Q840-804.75 840-780v134h-60v-134H180v600h600v-133h60v133q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm358-173q-30.52 0-52.26-21.44Q464-335.89 464-366v-227q0-30.11 21.74-51.56Q507.48-666 538-666h270q30.53 0 52.26 21.44Q882-623.11 882-593v227q0 30.11-21.74 51.56Q838.53-293 808-293H538Zm284-60v-253H524v253h298Zm-124.5-81.96Q716-453.92 716-481q0-26.25-19-44.63Q678-544 652-544t-45 18.37q-19 18.38-19 44.63 0 27.08 18.74 46.04Q625.47-416 652.24-416q26.76 0 45.26-18.96Z" />
    </svg>
  );
}

export function PanelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M140-160q-24.75 0-42.37-17.63Q80-195.25 80-220v-520q0-24.75 17.63-42.38Q115.25-800 140-800h680q24.75 0 42.38 17.62Q880-764.75 880-740v520q0 24.75-17.62 42.37Q844.75-160 820-160H140Zm543-443h137v-137H683v137Zm0 186h137v-126H683v126ZM140-220h483v-520H140v520Zm543 0h137v-137H683v137Z" />
    </svg>
  );
}

// "data_object" — the { } glyph, standing in for the hand-drawn < > this used
// to be. Kept apart from CodeIcon (Material's own "code" glyph, the actual
// < > chevrons) because the two components are used for different things
// where they appear side by side.
export function BracketsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M570-160v-60h120q21 0 35.5-14.38Q740-248.75 740-270v-100q0-37 22.5-66t57.5-40v-8q-35-10-57.5-39.5T740-590v-100q0-21.25-14.37-35.63Q711.25-740 690-740H570v-60h120q46 0 78 32.08 32 32.09 32 77.92v100q0 21.25 14.38 35.62Q828.75-540 850-540h30v120h-30q-21.25 0-35.62 14.37Q800-391.25 800-370v100q0 45.83-32.08 77.92Q735.83-160 690-160H570Zm-300 0q-46 0-78-32.08-32-32.09-32-77.92v-100q0-21.25-14.37-35.63Q131.25-420 110-420H80v-120h30q21.25 0 35.63-14.38Q160-568.75 160-590v-100q0-45.83 32.08-77.92Q224.17-800 270-800h120v60H270q-21 0-35.5 14.37Q220-711.25 220-690v100q0 37-22.5 66.5T140-484v8q35 11 57.5 40t22.5 66v100q0 21.25 14.38 35.62Q248.75-220 270-220h120v60H270Z" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className ?? "size-4"}>
      <path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z" />
    </svg>
  );
}
