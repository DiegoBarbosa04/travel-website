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
    <div className="w-full h-32 relative flex items-center overflow-hidden">
      <div className="bg-linear-to-r from-[#FAFBFC] to-transparent w-25 h-32 absolute left-0 z-10"></div>

      <div className="flex animate-scroll">
        <div className="flex items-center gap-16 shrink-0 px-8">
          {logos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="w-42 h-14 flex items-center justify-center shrink-0"
            >
              <img
                src={logo}
                className="max-w-full max-h-full object-contain"
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
              className="w-42 h-14 flex items-center justify-center shrink-0"
            >
              <img
                src={logo}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-l from-[#FAFBFC] to-transparent w-25 h-32 absolute right-0 z-10"></div>
    </div>
  );
}

export default PartnerCompanies;
