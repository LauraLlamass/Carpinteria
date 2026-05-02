type DaedalusMarkProps = {
  className?: string;
};

export function DaedalusMark({ className = "" }: DaedalusMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={className}
      fill="none"
    >
      <path
        d="M32 9v46M21 14c-7 2-12 7-15 15 7 0 13 2 18 7M43 14c7 2 12 7 15 15-7 0-13 2-18 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 44h24v-8H28v-8h16v-8H20v24Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
