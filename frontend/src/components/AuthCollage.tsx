import { animationDelay } from "@/lib/utils";

export type Polaroid = {
  image: string;
  caption: string;
  date?: string;
  left: number;
  top: number;
  rotate: number;
  width: number;
  imageHeight: number;
};

export type BoardingPass = {
  from: string;
  to: string;
  gate?: string;
  boarding?: string;
  seat?: string;
  left: number;
  top: number;
  rotate: number;
};

type AuthCollageProps = {
  polaroids: Polaroid[];
  boardingPass: BoardingPass;
  size?: "lg" | "sm";
};

const BARCODE_BARS: [number, number][] = [
  [0, 3], [6, 1.5], [10, 4], [17, 1.5], [21, 2.5], [27, 5], [35, 1.5],
  [39, 3], [45, 1.5], [49, 4], [56, 2], [61, 1.5], [65, 5], [73, 2],
  [78, 1.5], [82, 3.5], [89, 1.5], [93, 3],
];

function Barcode({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 34 96" className={className} aria-hidden="true">
      {BARCODE_BARS.map(([y, height]) => (
        <rect key={y} x="0" y={y} width="34" height={height} fill="#1A1A1A" />
      ))}
    </svg>
  );
}

function PlaneArrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M2 4l20 8-20 8 5-8z" fill="#FFFFFF" />
    </svg>
  );
}

function AuthCollage({ polaroids, boardingPass, size = "lg" }: AuthCollageProps) {
  const large = size === "lg";
  const details = [
    { label: "PORTÃO", value: boardingPass.gate },
    { label: "EMBARQUE", value: boardingPass.boarding },
    { label: "ASSENTO", value: boardingPass.seat },
  ].filter((detail) => detail.value);

  return (
    <div aria-hidden="true" className="relative size-full">
      {polaroids.map((polaroid, index) => (
        <figure
          key={polaroid.caption}
          className={`animate-drop absolute flex origin-top-left flex-col bg-white ${large ? "rounded-md px-3 pt-3 shadow-[0_22px_40px_-14px_#1A1A1A59,0_2px_6px_#1A1A1A1F]" : "rounded px-[7px] pt-[7px] shadow-[0_16px_30px_-12px_#1A1A1A59,0_2px_6px_#1A1A1A1F]"}`}
          style={{
            left: polaroid.left,
            top: polaroid.top,
            width: polaroid.width,
            rotate: `${polaroid.rotate}deg`,
            ...animationDelay(200 + index * 150),
          }}
        >
          <img
            src={polaroid.image}
            alt=""
            className="w-full shrink-0 rounded-[2px] object-cover"
            style={{ height: polaroid.imageHeight }}
          />
          <figcaption
            className={`flex shrink-0 items-center justify-between ${large ? "h-[52px] px-1" : "h-[30px] px-0.5"}`}
          >
            <span
              className={`font-bold text-[#1A1A1A] ${large ? "text-[15px] leading-5" : "text-xs leading-4"}`}
            >
              {polaroid.caption}
            </span>
            {large && polaroid.date && (
              <span className="text-xs leading-4 font-semibold tracking-[0.08em] text-[#8F8F8A]">
                {polaroid.date}
              </span>
            )}
          </figcaption>
        </figure>
      ))}

      <div
        className={`animate-drop-float absolute flex origin-top-left bg-[#E8480C] ${large ? "w-[360px] rounded-[14px] shadow-[0_24px_44px_-14px_#B8360A73,0_2px_6px_#1A1A1A26]" : "w-[220px] rounded-xl shadow-[0_18px_32px_-12px_#B8360A73,0_2px_6px_#1A1A1A26]"}`}
        style={{
          left: boardingPass.left,
          top: boardingPass.top,
          rotate: `${boardingPass.rotate}deg`,
          ...animationDelay(200 + polaroids.length * 150),
        }}
      >
        <div
          className={`flex flex-1 flex-col ${large ? "gap-3.5 px-[22px] py-5" : "gap-2 px-3.5 py-3"}`}
        >
          <span
            className={`font-bold tracking-[0.14em] text-[#FFEDE4] ${large ? "text-[11px] leading-[14px]" : "text-[9px] leading-3"}`}
          >
            CARTÃO DE EMBARQUE
          </span>
          <div className={`flex items-center ${large ? "gap-3" : "gap-2"}`}>
            <span
              className={`font-extrabold tracking-[-0.03em] text-white ${large ? "text-[34px] leading-9" : "text-2xl leading-[26px]"}`}
            >
              {boardingPass.from}
            </span>
            <PlaneArrow className={large ? "size-[22px]" : "size-3.5"} />
            <span
              className={`font-extrabold tracking-[-0.03em] text-white ${large ? "text-[34px] leading-9" : "text-2xl leading-[26px]"}`}
            >
              {boardingPass.to}
            </span>
          </div>
          {large && details.length > 0 && (
            <div className="flex gap-[22px]">
              {details.map((detail) => (
                <div key={detail.label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] leading-3 font-semibold tracking-[0.1em] text-[#FFEDE4]">
                    {detail.label}
                  </span>
                  <span className="text-sm leading-[18px] font-bold text-white">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={`flex shrink-0 items-center justify-center border-l-2 border-dashed border-[#FFEDE4]/55 ${large ? "w-[76px]" : "w-12"}`}
        >
          <Barcode className={large ? "h-24 w-[34px]" : "h-[52px] w-[22px]"} />
        </div>
      </div>
    </div>
  );
}

export default AuthCollage;
