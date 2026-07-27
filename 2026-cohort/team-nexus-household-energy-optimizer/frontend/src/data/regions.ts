export interface Region {
  id: string;
  label: string;
  /** In the region's own local currency. */
  ratePerKwh: number;
  carbonLbsPerKwh: number;
  /** ISO 4217 currency code, used with locale to format cost via Intl.NumberFormat. */
  currency: string;
  /** BCP 47 locale for currency formatting. */
  locale: string;
}

/**
 * Illustrative regional and national averages modeled loosely on EIA.gov,
 * IEA, and national utility retail price data, plus rough grid-mix carbon
 * intensity (EPA eGRID-style for the US, generation-mix estimates
 * elsewhere). Standing in for a live rate lookup, not a real-time feed,
 * rates vary by generation mix (coal/gas vs. hydro/nuclear) as much as by
 * price.
 */
export const REGIONS: Region[] = [
  {
    id: "us-national",
    label: "United States, National average",
    ratePerKwh: 0.16,
    carbonLbsPerKwh: 0.855,
    currency: "USD",
    locale: "en-US",
  },
  {
    id: "us-california",
    label: "United States, California",
    ratePerKwh: 0.3,
    carbonLbsPerKwh: 0.65,
    currency: "USD",
    locale: "en-US",
  },
  {
    id: "us-texas",
    label: "United States, Texas",
    ratePerKwh: 0.14,
    carbonLbsPerKwh: 1.1,
    currency: "USD",
    locale: "en-US",
  },
  {
    id: "us-new-york",
    label: "United States, New York",
    ratePerKwh: 0.22,
    carbonLbsPerKwh: 0.65,
    currency: "USD",
    locale: "en-US",
  },
  {
    id: "us-pacific-northwest",
    label: "United States, Pacific Northwest (hydro-heavy)",
    ratePerKwh: 0.11,
    carbonLbsPerKwh: 0.2,
    currency: "USD",
    locale: "en-US",
  },
  {
    id: "us-midwest",
    label: "United States, Midwest (coal-heavy)",
    ratePerKwh: 0.13,
    carbonLbsPerKwh: 1.4,
    currency: "USD",
    locale: "en-US",
  },
  {
    id: "canada",
    label: "Canada",
    ratePerKwh: 0.13,
    carbonLbsPerKwh: 0.3,
    currency: "CAD",
    locale: "en-CA",
  },
  {
    id: "brazil",
    label: "Brazil (hydro-heavy)",
    ratePerKwh: 0.9,
    carbonLbsPerKwh: 0.15,
    currency: "BRL",
    locale: "pt-BR",
  },
  {
    id: "south-africa",
    label: "South Africa (coal-heavy)",
    ratePerKwh: 2.5,
    carbonLbsPerKwh: 2.2,
    currency: "ZAR",
    locale: "en-ZA",
  },
  {
    id: "germany",
    label: "Germany",
    ratePerKwh: 0.4,
    carbonLbsPerKwh: 0.75,
    currency: "EUR",
    locale: "de-DE",
  },
  {
    id: "united-kingdom",
    label: "United Kingdom",
    ratePerKwh: 0.28,
    carbonLbsPerKwh: 0.45,
    currency: "GBP",
    locale: "en-GB",
  },
  {
    id: "norway",
    label: "Norway (hydro-heavy)",
    ratePerKwh: 1.5,
    carbonLbsPerKwh: 0.05,
    currency: "NOK",
    locale: "nb-NO",
  },
  {
    id: "india",
    label: "India",
    ratePerKwh: 8,
    carbonLbsPerKwh: 1.8,
    currency: "INR",
    locale: "en-IN",
  },
  {
    id: "japan",
    label: "Japan",
    ratePerKwh: 35,
    carbonLbsPerKwh: 0.9,
    currency: "JPY",
    locale: "ja-JP",
  },
  {
    id: "australia",
    label: "Australia",
    ratePerKwh: 0.35,
    carbonLbsPerKwh: 1.5,
    currency: "AUD",
    locale: "en-AU",
  },
];
