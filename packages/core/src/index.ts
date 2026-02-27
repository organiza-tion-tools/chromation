const HASH_SEED = 2166136261;
const HASH_PRIME = 16777619;

export function hash(input: string): number {
  let value = HASH_SEED;

  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, HASH_PRIME);
  }

  return value >>> 0;
}

export function hashToColor(hashValue: number): string {
  const normalizedHash = hashValue >>> 0;
  const hue = normalizedHash % 360;
  const saturation = 70;
  const lightness = 52;

  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

export function textToColor(input: string): string {
  return hashToColor(hash(input));
}
