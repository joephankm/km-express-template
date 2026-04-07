import type { LogFormat, TextStyle } from '../constants/loggingTypes';
import type { PrettierOptions } from '../constants/prettierTypes';
import type { TransportTarget, LoggerOptions } from '../constants/loggerTypes';

export type LogPrettierOptions<
  Level extends string,
  FormatParams extends Record<string, unknown> = Record<string, unknown>,
> = Omit<PrettierOptions<Level>, 'ignore' | 'formatParams' | 'customLevels'> & {
  nameLabels?: Record<string, string>;
  formatFile: string;
  timeSimpleFormat?: boolean;
  timeUtc?: boolean;
  logFormat: LogFormat;
  ignore?: string[];
  formatParams?: FormatParams;
};

export default <Level extends string, FormatParams extends Record<string, unknown> = Record<string, unknown>>(
  {
    formatFile,
    timeSimpleFormat,
    timeUtc,
    ignore = [],
    logFormat,
    nameLabels,
    customColors,
    formatParams,
    ...opts
  }: LogPrettierOptions<Level, FormatParams>,
  { customLevels }: LoggerOptions<Level>
): TransportTarget | undefined => {
  if (logFormat === 'raw') {
    return;
  }

  if (!formatFile.includes('/')) {
    formatFile = `./formats/${formatFile}`;
  }

  ignore.push('context');

  const levelCodeColors = (Object.keys(customLevels) as Level[]).reduce(
    (acc, level) => {
      acc[customLevels[level]] = customColors[level]!;
      return acc;
    },
    {} as Record<number, TextStyle>
  );

  const options: PrettierOptions<Level, FormatParams> = {
    colorize: logFormat === 'pretty',
    useOnlyCustomProps: true,
    translateTime: `${timeUtc ? 'UTC' : 'SYS'}:${timeSimpleFormat ? 'HH:MM:ss' : 'yy-mm-dd HH:MM:ss'}`,
    ignore: ignore.join(','),
    customLevels,
    customColors,
    ...opts,
    formatParams: {
      logFormat,
      nameLabels: nameLabels,
      levelCodeColors,
      ...formatParams!,
    },
  };

  return { target: formatFile, options: options };
};
