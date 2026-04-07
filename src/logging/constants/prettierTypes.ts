import type { PrettyOptions } from 'pino-pretty';
import type { LogFormat, LevelColors, TextStyle } from './loggingTypes';

export type PrettierOptions<
  Level extends string = string,
  FormatParams extends Record<string, unknown> = Record<string, unknown>,
> = Omit<
  PrettyOptions,
  'messageKey' | 'levelKey' | 'messageFormat' | 'customPrettifiers' | 'customLevels' | 'customColors'
> & {
  customColors: LevelColors<string>;
  customLevels: Record<Level, number>;

  /**
   * Non `pino-pretty` options which pass to prettier files in "prettiers" folder
   */
  formatParams: {
    /** Log format level */
    logFormat: LogFormat;

    /** Customized labels for context */
    nameLabels?: Record<string, string>;

    /** Pre-transformed colors for levels */
    levelCodeColors: Record<number, TextStyle>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  } & FormatParams;
};
