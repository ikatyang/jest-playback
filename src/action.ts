export interface ActionOptions {
  playbacks: string;
  debug: boolean;
}

export abstract class Action {
  public options: ActionOptions;
  public setup(options: ActionOptions): this {
    this.options = options;
    this.debug(`init with ${JSON.stringify(options, null, 2)}`);
    return this;
  }
  public debug(message: string) {
    if (this.options.debug) {
      console.log(message); // tslint:disable-line:no-console
    }
  }

  public abstract start(): void;
  public abstract finish(): void;
}
