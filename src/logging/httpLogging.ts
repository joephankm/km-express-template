/* eslint @typescript-eslint/no-unsafe-assignment: off -- needed for dynamic property assignment */

import type { Request, Response, RequestHandler } from 'express';
import pinoHttp from 'pino-http';

// CORE
import { createLogger } from './logger';

// CONSTANTS
import config from '#configs/loggerConfig';
import type { LogDetail } from './constants/loggingTypes';
import {
  type HttpLogLevel,
  type RequestObj,
  type ResponseObj,
  type HttpFormatParams,
  HTTP_LEVELS,
  HTTP_COLORS,
  METHOD_COLORS,
  LOG_LEVEL_MAP,
} from './constants/httpConstants';

export default () => {
  if (!config.http.detail) {
    throw new Error('HTTP logger detail is not defined');
  }

  if (config.http.detail === 'none') {
    throw new Error('HTTP logger detail is not defined');
  }

  if (config.level === 'silent') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return (() => {}) as RequestHandler;
  }

  const httpIgnores: string[] = ['responseTime'];

  switch (config.http.detail) {
    case 'simple':
      httpIgnores.push('req', 'res');
      break;

    case 'middle':
      httpIgnores.push('req', 'res');
      break;
  }

  const httpLogger = createLogger<HttpLogLevel, HttpFormatParams>(
    {
      name: 'http',
      level: LOG_LEVEL_MAP[config.level],
      ignore: httpIgnores,
      customLevels: HTTP_LEVELS,
      customColors: HTTP_COLORS,
    },
    {
      methodColors: METHOD_COLORS,
      includeHost: config.http.includeHost,
    }
  );

  const INVALID_STATUES = [400, 401, 404, 422];

  return pinoHttp({
    logger: httpLogger,

    serializers: httpSerializersFactory(config.http.detail),

    wrapSerializers: false,

    // Define a custom logger level
    customLogLevel: (_req, { statusCode }): HttpLogLevel => {
      if (statusCode < 400) return 'success';
      if (statusCode < 500) return INVALID_STATUES.includes(statusCode) ? 'invalid' : 'failed';
      return 'critical';
    },
  });
};

/* ════════════════════════════════════════════════════════╗
 ║                     CONFIG FACTORY                      ║
 ╚════════════════════════════════════════════════════════ */

type HttpSerializers = {
  req: (req: Request) => Partial<RequestObj>;
  res: (res: Response) => Partial<ResponseObj>;
};

function httpSerializersFactory(logDetail: LogDetail): HttpSerializers {
  const baseReqSerializer = (req: Request) => {
    return { id: req.id, method: req.method, url: req.url, query: req.query, params: req.params };
  };

  const baseResSerializer = (res: Response) => {
    return { statusCode: res.statusCode, contentLength: res.getHeader('content-length') as number };
  };

  if (logDetail === 'simple') {
    return {
      req: baseReqSerializer,
      res: baseResSerializer,
    };
  }

  if (logDetail === 'middle') {
    return {
      req: req => {
        return Object.assign(baseReqSerializer(req), { body: req.body });
      },
      res: baseResSerializer,
    };
  }

  return {
    req: req => {
      return Object.assign(baseReqSerializer(req), {
        body: req.body,
        headers: req.headers,
        remoteAddress: req.socket.remoteAddress,
        remotePort: req.socket.remotePort,
      });
    },
    res: res => {
      // todo: add response body, which need to add a middleware to parse the response body before logging
      return Object.assign(baseResSerializer(res), { headers: res.getHeaders() });
    },
  };
}
