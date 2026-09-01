const shakerPearls = [
  [112, 318], [148, 324], [184, 316], [128, 350], [166, 352], [202, 346],
  [104, 380], [145, 384], [188, 380], [218, 374],
];

export function Shaker() {
  return (
    <div className="story-object shaker" data-shaker aria-hidden="true">
      <svg viewBox="0 0 320 460" role="presentation">
        <defs>
          <clipPath id="shaker-liquid-clip">
            <path d="M62 102h196l-20 286c-2 26-19 42-44 42h-68c-25 0-42-16-44-42z" />
          </clipPath>
        </defs>
        <ellipse cx="160" cy="430" rx="98" ry="13" fill="rgba(21,22,24,.18)" />
        <path
          d="M62 102h196l-20 286c-2 26-19 42-44 42h-68c-25 0-42-16-44-42z"
          fill="rgba(255,255,255,.16)"
          stroke="rgba(255,255,255,.76)"
          strokeWidth="5"
        />
        <g clipPath="url(#shaker-liquid-clip)">
          <rect
            data-shaker-liquid
            x="55"
            y="142"
            width="210"
            height="292"
            fill="#704128"
          />
          <g data-shaker-pearls>
            {shakerPearls.map(([cx, cy], index) => (
              <circle key={index} cx={cx} cy={cy} r="13" fill="#25211e" />
            ))}
          </g>
        </g>
        <path d="M51 87h218l-8 22H59z" fill="rgba(255,255,255,.82)" />
        <rect x="43" y="78" width="234" height="12" rx="6" fill="#fff" />
        <path d="M83 122h14l22 220h-13z" fill="rgba(255,255,255,.42)" />
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
