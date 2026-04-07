import pinoPretty, { type PrettyOptions } from 'pino-pretty';

// CONSTANTS
import type { PrettierOptions } from '../constants/prettierTypes';
import type { LogObj } from '../constants/logConstants';

export default ({ formatParams: { logFormat, levelCodeColors, nameLabels }, ...opts }: PrettierOptions) => {
  if (logFormat !== 'pretty') {
    return pinoPretty(opts);
  }

  return pinoPretty({
    messageFormat: ((log: LogObj, _messageKey, _levelLabel, { colors }) =>
      colors.italic(colors[levelCodeColors[log.level]](log.msg))) as PrettyOptions['messageFormat'],
    customPrettifiers: {
      // @ts-expect-error -- Name always be string
      name: (val: string) => nameLabels[val],
    },
    ...opts,
  } as PrettyOptions);
};
