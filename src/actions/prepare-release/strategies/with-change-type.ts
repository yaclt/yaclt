import { compileTemplate } from "../../../utils/template-utils";
import { PrepareReleaseStrategy } from "./prepare-release-strategy";

export interface EntryGroup {
  label: string;
  items: string[];
}

export class WithChangeTypeStrategy implements PrepareReleaseStrategy {
  private entryGroups: EntryGroup[] = [];
  private changeTypeTemplate: HandlebarsTemplateDelegate<
    Record<string, unknown>
  >;
  private changeTypes: string[];

  constructor(
    changeTypeTemplate: HandlebarsTemplateDelegate<Record<string, unknown>>,
    changeTypes: string[]
  ) {
    this.changeTypeTemplate = changeTypeTemplate;
    this.changeTypes = changeTypes;
  }

  public processLine(line: string): void {
    const lineChangeType: string | undefined = this.changeTypes.find(
      (changeType: string) =>
        line.includes(this.changeTypeTemplate({ changeType }))
    );

    if (!lineChangeType) {
      throw new Error("unable to parse change type");
    }

    const existingGroup = this.entryGroups.find(
      (group: EntryGroup) => group.label === lineChangeType
    );
    if (existingGroup) {
      existingGroup.items.push(line);
    } else {
      this.entryGroups.push({ label: lineChangeType, items: [line] });
    }
  }

  public generate(template: string, releaseNumber: string): string {
    const handlebarsTemplate = compileTemplate(template);
    return handlebarsTemplate({
      releaseNumber,
      entryGroups: this.entryGroups,
    });
  }
}
