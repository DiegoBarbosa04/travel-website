import { Button } from "./ui/button";

const fadeMask =
  "radial-gradient(ellipse at 80% 20%, #000 20%, transparent 75%)";

function PatternUnit() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-white/25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="pattern-newsletter"
          width="84"
          height="76"
          patternUnits="userSpaceOnUse"
        >
          <g transform="translate(10 9.5) scale(0.95)">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              d="M49.9208 40L12 57C19.4996 41.5881 18.7148 40.1002 36.0433 40.0447L49.9208 40Z"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              d="M0 0L8.077 0.0458265C14.1066 0.0794605 16.6068 0.215678 21.216 4.50528L28.9413 12.8057L35.5245 19.3858L44.4055 27.0989L48.4933 30.1025C53.3417 33.3612 58.6072 35.7038 64 37.9522L39.8124 37.9051C35.5436 37.8972 29.2691 38.3907 25.0928 37.2014C22.0387 36.3319 19.3748 34.6595 17.2689 32.3551C13.7142 28.4653 10.8316 21.8592 8.45991 17.0731L0 0Z"
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-newsletter)" />
    </svg>
  );
}

function Newsletter() {
  return (
    <div className="relative isolate w-full overflow-hidden rounded-2xl bg-blue-primary px-8 py-9 text-white shadow-sm sm:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ WebkitMaskImage: fadeMask, maskImage: fadeMask }}
      >
        <PatternUnit />
      </div>
      <div className="relative max-w-xl">
        <h2 className="fs-titulo-sm max-w-[14ch]">
          Se inscreva na nossa newsletter
        </h2>
        <div className="fs-corpo mt-4 space-y-1">
          <p className="fs-descricao">
            Fique por dentro das últimas novidades e ofertas
          </p>
          <p>
            Receba as últimas notícias e ofertas diretamente na sua caixa de
            entrada.
          </p>
        </div>
        <div className="mt-4 flex max-w-[31rem] flex-col gap-3 sm:flex-row">
          <input
            className="h-12 min-w-0 flex-1 rounded-md border-0 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-500"
            placeholder="Seu melhor e-mail"
            type="email"
          />
          <Button className="h-12 bg-white px-5 text-xs text-blue-primary hover:bg-white/90">
            Inscreva-se
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
