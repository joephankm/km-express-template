import pinoPretty, { type PrettyOptions } from 'pino-pretty';

// CONSTANTS
import type { PrettierOptions } from '../constants/prettierTypes';
import type { HttpLogObj, HttpMethod, HttpLogLevel, HttpFormatParams } from '../constants/httpConstants';

export default ({
  formatParams: { logFormat, levelCodeColors, nameLabels, methodColors, includeHost },
  ...opts
}: PrettierOptions<HttpLogLevel, HttpFormatParams>) => {
  if (logFormat !== 'pretty') {
    return pinoPretty(opts);
  }

  const parseRequest = (req: HttpLogObj['req']) =>
    req.method + ' ' + (includeHost ? 'http://' + req.headers.host : '') + req.url;

  const parseResponse = (res: HttpLogObj['res'], responseTime: number) =>
    res.statusCode + ' (' + responseTime + ' ms - ' + res.contentLength + ' b)';

  const getIcon = (level: number): string => {
    if (level === 60) return '🛬☠️ ';
    if (level === 50) return '🛬❌ ';
    if (level === 40) return '🛬🟡 ';

    return '🛬 ';
  };

  return pinoPretty({
    messageFormat: ((log: HttpLogObj, _messageKey, _levelLabel, { colors }) => {
      const levelColor = colors[levelCodeColors[log.level]];
      const methodColor = colors[methodColors[log.req.method as HttpMethod] ?? methodColors.default];

      return (
        getIcon(log.level) +
        colors.italic(levelColor(methodColor(parseRequest(log.req)) + ' ' + parseResponse(log.res, log.responseTime))) +
        '\n'
      );
    }) as PrettyOptions['messageFormat'],
    customPrettifiers: {
      // @ts-expect-error -- Name always be string
      name: (val: string) => nameLabels[val],
    },
    ...opts,
  } as PrettyOptions);
};
