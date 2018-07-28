export abstract class Action {
  constructor(protected playbackDir: string) {}

  public abstract start(): void;
  public abstract finish(): void;
}
