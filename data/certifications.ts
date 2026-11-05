export type Certification = {
  id: string;
  kind: "rera" | "iso" | "credai" | "igbc";
  title: string;
  issuer: string;
  number: string;
  validTill: string;
  scope: string;
};

export const certifications: Certification[] = [
  {
    id: "rera-mh",
    kind: "rera",
    title: "MahaRERA — Real Estate Agent",
    issuer: "Maharashtra Real Estate Regulatory Authority",
    number: "A51800004104",
    validTill: "2029-08-31",
    scope: "Mumbai, Pune, Nashik and Lonavala",
  },
  {
    id: "rera-ka",
    kind: "rera",
    title: "K-RERA — Real Estate Agent",
    issuer: "Karnataka Real Estate Regulatory Authority",
    number: "PRM/KA/RERA/1251/310/AG/190412/002104",
    validTill: "2029-04-11",
    scope: "Bengaluru",
  },
  {
    id: "rera-ts",
    kind: "rera",
    title: "TS-RERA — Real Estate Agent",
    issuer: "Telangana State Real Estate Regulatory Authority",
    number: "A02500001904",
    validTill: "2028-12-15",
    scope: "Hyderabad",
  },
  {
    id: "rera-hr",
    kind: "rera",
    title: "HRERA — Real Estate Agent",
    issuer: "Haryana Real Estate Regulatory Authority, Gurugram",
    number: "RC/HARERA/GGM/2019/1104",
    validTill: "2029-06-30",
    scope: "Gurugram",
  },
  {
    id: "rera-gj",
    kind: "rera",
    title: "GujRERA — Real Estate Agent",
    issuer: "Gujarat Real Estate Regulatory Authority",
    number: "AG/GJ/AHMEDABAD/AHMEDABAD CITY/AA01104/280229",
    validTill: "2029-02-28",
    scope: "Ahmedabad",
  },
  {
    id: "iso",
    kind: "iso",
    title: "ISO 9001:2015 — Quality Management",
    issuer: "Accredited certification body (demo)",
    number: "QMS/IN/26/04104",
    validTill: "2028-03-31",
    scope: "Property advisory, title diligence and transaction management",
  },
  {
    id: "credai",
    kind: "credai",
    title: "CREDAI — Associate Member",
    issuer: "Confederation of Real Estate Developers' Associations of India (demo)",
    number: "CREDAI-MCHI/ASSOC/2014/0412",
    validTill: "2027-03-31",
    scope: "MCHI chapter, Mumbai Metropolitan Region",
  },
  {
    id: "igbc",
    kind: "igbc",
    title: "IGBC Accredited Professional",
    issuer: "Indian Green Building Council (demo)",
    number: "IGBC-AP/2022/11804",
    validTill: "2027-11-30",
    scope: "Green-rated project advisory, held by 4 in-house advisors",
  },
];
