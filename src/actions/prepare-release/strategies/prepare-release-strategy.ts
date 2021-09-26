export interface PrepareReleaseStrategy {
  processLine(line: string): void;
  generate(template: string, releaseNumber: string): string;
}
