export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function splitWords(text: string): string[] {
  return text.split(" ");
}

export function splitChars(text: string): string[] {
  return text.split("");
}
