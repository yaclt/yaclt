import { compileTemplate } from "../../../utils/template-utils";
import { PrepareReleaseStrategy } from "./prepare-release-strategy";

export class WithoutChangeTypeStrategy implements PrepareReleaseStrategy {
  private lines: string[] = [];

  public processLine(line: string): void {
    this.lines.push(line);
  }

  public generate(template: string, releaseNumber: string): string {
    const handlebarsTemplate = compileTemplate(template);
    return handlebarsTemplate({
      releaseNumber,
      entries: this.lines,
    });
  }
}
