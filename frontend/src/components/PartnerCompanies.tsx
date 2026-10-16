import AerLingusLogo from "@/assets/Aer-Lingus-Logo.svg";
import AirFranceLogo from "@/assets/Air-France-Logo.svg";
import BritishAirwaysLogo from "@/assets/British-Airways-Logo.svg";
import EasyJetLogo from "@/assets/EasyJet-Logo.svg";
import ItaAirwaysLogo from "@/assets/ITA-Airways-Logo.svg";
import TapPortugalLogo from "@/assets/TAP-Portugal-Logo.svg";

const logos = [
  AerLingusLogo,
  AirFranceLogo,
  BritishAirwaysLogo,
  EasyJetLogo,
  ItaAirwaysLogo,
  TapPortugalLogo,
];

function PartnerCompanies() {
  return (
    <div className="relative flex h-32 w-full items-center overflow-hidden">
      <div className="absolute left-0 z-10 h-full w-24 bg-linear-to-r from-[#FAFBFC] to-transparent" />

      <div className="flex animate-scroll">
        <div className="flex items-center gap-16 shrink-0 px-8">
          {logos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="flex h-14 w-42 shrink-0 items-center justify-center"
            >
              <img
                src={logo}
                alt="Empresa aérea parceira"
                className="max-h-full max-w-full object-contain grayscale opacity-25 transition duration-300"
              />
            </div>
          ))}
        </div>
        <div
          className="flex items-center gap-16 shrink-0 px-8"
          aria-hidden="true"
        >
          {logos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="flex h-14 w-42 shrink-0 items-center justify-center"
            >
              <img
                src={logo}
                alt=""
                className="max-h-full max-w-full object-contain grayscale opacity-25 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 z-10 h-full w-24 bg-linear-to-l from-[#FAFBFC] to-transparent" />
    </div>
  );
}

export default PartnerCompanies;
