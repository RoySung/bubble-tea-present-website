export function Shaker() {
  return (
    <div className="story-object shaker" data-shaker aria-hidden="true">
      <svg viewBox="0 0 320 460" role="presentation">
        <defs>
          <linearGradient id="shaker-body-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#666b6e" />
            <stop offset="0.12" stopColor="#b9bdbe" />
            <stop offset="0.27" stopColor="#f6f7f7" />
            <stop offset="0.42" stopColor="#b4b8ba" />
            <stop offset="0.61" stopColor="#e7e8e8" />
            <stop offset="0.8" stopColor="#a0a5a7" />
            <stop offset="1" stopColor="#5b6063" />
          </linearGradient>
          <linearGradient id="shaker-dome-metal" x1="0.08" y1="0.05" x2="0.9" y2="0.95">
            <stop offset="0" stopColor="#fafafa" />
            <stop offset="0.28" stopColor="#c8cbcc" />
            <stop offset="0.52" stopColor="#8d9294" />
            <stop offset="0.73" stopColor="#dedfdf" />
            <stop offset="1" stopColor="#656a6d" />
          </linearGradient>
          <linearGradient id="shaker-cap-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#707578" />
            <stop offset="0.2" stopColor="#d9dbdc" />
            <stop offset="0.38" stopColor="#fbfbfb" />
            <stop offset="0.58" stopColor="#a8adaf" />
            <stop offset="0.82" stopColor="#e1e2e2" />
            <stop offset="1" stopColor="#62676a" />
          </linearGradient>
          <linearGradient id="shaker-ring-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#858a8c" />
            <stop offset="0.18" stopColor="#f4f5f5" />
            <stop offset="0.46" stopColor="#a4a9ab" />
            <stop offset="0.7" stopColor="#f7f7f7" />
            <stop offset="1" stopColor="#777c7f" />
          </linearGradient>
        </defs>

        <ellipse cx="160" cy="432" rx="92" ry="13" fill="rgba(21,22,24,.22)" />

        <path
          d="M69 153h182l-18 235c-2 27-18 42-42 42h-62c-24 0-40-15-42-42z"
          fill="url(#shaker-body-metal)"
          stroke="#f2f3f3"
          strokeWidth="4"
        />
        <path
          d="M68 143c9-53 46-86 92-86s83 33 92 86z"
          fill="url(#shaker-dome-metal)"
          stroke="#f2f3f3"
          strokeWidth="4"
        />
        <path
          d="M116 31c1-12 10-19 23-20h42c13 1 22 8 23 20l5 60h-98z"
          fill="url(#shaker-cap-metal)"
          stroke="#f2f3f3"
          strokeWidth="4"
        />

        <path d="M112 76h96l1 15h-98z" fill="rgba(72,77,80,.24)" />
        <path d="M114 78h93" fill="none" stroke="#f8f8f8" strokeWidth="2.5" opacity="0.72" />
        <path d="M115 83h93" fill="none" stroke="#6c7174" strokeWidth="2" opacity="0.6" />

        <rect
          x="58"
          y="138"
          width="204"
          height="27"
          rx="13.5"
          fill="url(#shaker-ring-metal)"
          stroke="#f4f5f5"
          strokeWidth="4"
        />
        <path d="M65 157h190" fill="none" stroke="#62676a" strokeWidth="2" opacity="0.38" />

        <path
          d="M92 177l13 207c1 18 8 28 21 36"
          fill="none"
          stroke="#fff"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.25"
        />
        <path
          d="M225 178l-13 205c-1 17-7 27-18 35"
          fill="none"
          stroke="#353a3d"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.16"
        />
        <path d="M101 214h123" fill="none" stroke="#fff" strokeWidth="1" opacity="0.13" />
        <path d="M97 331h126" fill="none" stroke="#4d5255" strokeWidth="1" opacity="0.12" />

        <text
          x="159"
          y="291"
          fill="#f5f6f6"
          fontSize="25"
          fontWeight="900"
          textAnchor="middle"
          letterSpacing="2.4"
          opacity="0.44"
        >
          SHAKE
        </text>
        <text
          x="160"
          y="292"
          fill="#8c9193"
          fontSize="25"
          fontWeight="900"
          textAnchor="middle"
          letterSpacing="2.4"
          opacity="0.68"
        >
          SHAKE
        </text>

        <ellipse data-shaker-mouth cx="160" cy="13" rx="47" ry="8" fill="transparent" />
      </svg>
    </div>
  );
}

export function TeaPour() {
  return (
    <div className="ingredient-layer tea-layer" aria-hidden="true">
      <div className="ingredient-vessel tea-vessel" data-tea-vessel>
        <svg viewBox="0 0 260 180" role="presentation">
          <path d="M36 54h154v88c0 18-14 30-33 30H72c-20 0-36-13-36-32z" fill="#f9f2e9" />
          <path d="M190 72c45 0 57 16 57 35s-16 32-49 31" fill="none" stroke="#f9f2e9" strokeWidth="19" />
          <path d="M34 52l-28 22 33 8" fill="#f9f2e9" />
          <path d="M56 83h112v59c0 7-5 11-13 11H69c-8 0-13-5-13-12z" fill="#714229" />
        </svg>
      </div>
      <div className="pour-stream tea-stream" data-tea-stream />
    </div>
  );
}

export function MilkPour() {
  return (
    <div className="ingredient-layer milk-layer" aria-hidden="true">
      <div className="ingredient-vessel milk-vessel" data-milk-vessel>
        <svg viewBox="0 0 220 210" role="presentation">
          <path d="M36 36h130l30 30-22 112c-3 15-15 24-30 24H72c-18 0-30-10-32-28z" fill="#fff" />
          <path d="M42 78h137l-19 91c-2 8-8 13-17 13H75c-9 0-15-5-17-14z" fill="#ead7c7" />
          <path d="M166 36l45 14-31 27z" fill="#fff" />
          <path d="M61 49h15l12 114H73z" fill="rgba(255,255,255,.72)" />
        </svg>
      </div>
      <div className="pour-stream milk-stream" data-milk-stream />
    </div>
  );
}

export function ServingPourStream() {
  return <div className="pour-stream serving-stream" data-serving-stream aria-hidden="true" />;
}

export function SealFilm() {
  return (
    <div className="seal-film" data-seal-film aria-hidden="true">
      <span className="film-roll" />
      <span className="film-sheet" />
      <span className="film-mark">FRESH · SEALED · FRESH · SEALED</span>
    </div>
  );
}
