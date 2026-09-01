export function Shaker() {
  return (
    <div className="story-object shaker" data-shaker aria-hidden="true">
      <svg viewBox="0 0 320 460" role="presentation">
        <ellipse cx="160" cy="430" rx="98" ry="13" fill="rgba(21,22,24,.18)" />
        <path
          d="M62 102h196l-20 286c-2 26-19 42-44 42h-68c-25 0-42-16-44-42z"
          fill="#ead7c7"
          stroke="#fff"
          strokeWidth="5"
        />
        <path d="M64 106h34l18 281c2 24 13 36 31 43h-21c-25 0-42-16-44-42z" fill="#d8bea8" />
        <path d="M229 111h17l-19 274c-2 20-13 32-31 39l12-29z" fill="rgba(255,255,255,.34)" />
        <ellipse data-shaker-mouth cx="160" cy="88" rx="108" ry="18" fill="#9b7459" stroke="#fff" strokeWidth="5" />
        <path d="M51 87h218l-8 22H59z" fill="rgba(255,255,255,.82)" />
        <rect x="43" y="78" width="234" height="12" rx="6" fill="#fff" />
        <path d="M89 124h13l18 218h-12z" fill="rgba(255,255,255,.38)" />
        <rect x="105" y="245" width="110" height="48" rx="24" fill="#704128" />
        <text x="160" y="277" fill="#fff" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="2">SHAKE</text>
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
