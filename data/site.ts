export const site = {
  name: "Sukh Corporation",
  shortName: "Sukh",
  url: "https://sukhcorporation.example",
  tagline: "Homes, offices and land — chosen with care.",
  description:
    "Sukh Corporation is an RERA-registered real estate firm helping families and businesses buy, rent and lease verified homes, offices and farmland across 12 Indian cities since 2004.",
  founded: 2004,
  phone: { display: "+91 97133 91199", tel: "+919713391199" },
  whatsapp: { display: "+91 97133 91199", number: "919713391199" },
  email: "advisors@sukhcorporation.example",
  hours: "Mon–Sat, 9:30 am to 7:30 pm IST",
  responsePromise: "An advisor will call you within 2 working hours.",
  offices: [
    {
      city: "Mumbai",
      label: "Head office",
      address: "4th Floor, Sukh House, 18 Waterfield Road, Bandra West, Mumbai 400050",
      phone: "+91 97133 91199",
    },
    {
      city: "Pune",
      label: "West regional office",
      address: "Office 602, Balewadi High Street, Baner, Pune 411045",
      phone: "+91 97133 91199",
    },
    {
      city: "Bengaluru",
      label: "South regional office",
      address: "2nd Floor, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
      phone: "+91 97133 91199",
    },
    {
      city: "Gurugram",
      label: "North regional office",
      address: "Tower B, 11th Floor, Golf Course Road, Sector 54, Gurugram 122002",
      phone: "+91 97133 91199",
    },
  ],
  socials: [
    { name: "Instagram", href: "https://instagram.com/" },
    { name: "LinkedIn", href: "https://linkedin.com/" },
    { name: "YouTube", href: "https://youtube.com/" },
  ],
  stats: [
    { value: "2,400+", label: "families housed" },
    { value: "₹1,800 Cr", label: "transacted since 2004" },
    { value: "RERA", label: "registered in 6 states" },
    { value: "22", label: "years in practice" },
  ],
  disclaimer: "Demo website. All listings and data are fictional.",
} as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
