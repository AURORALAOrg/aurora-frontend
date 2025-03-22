/**
 * Truncates an address to show only the first 6 and last 4 characters
 * @param address The address to truncate
 * @returns The truncated address string
 */
export const truncateAddress = (address: string | null | undefined): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Options for formatting an address
 */
interface FormatAddressOptions {
  /** Number of characters to show at the start of the address */
  start?: number;
  /** Number of characters to show at the end of the address */
  end?: number;
  /** Separator string to use between start and end portions */
  separator?: string;
  /** Fallback string to return if address is too short */
  fallback?: string;
}

/**
 * Formats an address with customizable options
 * @param address The address to format
 * @param options Formatting options
 * @returns The formatted address string
 */
export const formatAddress = (
  address: string | null | undefined,
  options: FormatAddressOptions = {}
): string => {
  if (!address) return "";

  const {
    start = 6,
    end = 4,
    separator = "...",
    fallback = "Invalid address",
  } = options;

  return address.length > start + end
    ? `${address.slice(0, start)}${separator}${address.slice(-end)}`
    : fallback;
};
