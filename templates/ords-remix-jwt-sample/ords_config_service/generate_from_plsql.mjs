import fs from 'node:fs';
import path from 'node:path';

const sourceFile = process.argv[2] || 'Database/Modules/CONCERT_SAMPLE_APP.sql';
const outDir = process.argv[3] || 'ords_config_service';
const sql = fs.readFileSync(sourceFile, 'utf8');

function parseParenContent(text, openParenIdx) {
  let depth = 0;
  let inQuote = false;
  for (let i = openParenIdx; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuote) {
      if (ch === "'" && next === "'") {
        i += 1;
        continue;
      }
      if (ch === "'") {
        inQuote = false;
      }
      continue;
    }

    if (ch === "'") {
      inQuote = true;
      continue;
    }

    if (ch === '(') {
      depth += 1;
      continue;
    }

    if (ch === ')') {
      depth -= 1;
      if (depth === 0) {
        return {
          content: text.slice(openParenIdx + 1, i),
          end: i,
        };
      }
    }
  }

  throw new Error(`Unterminated call at index ${openParenIdx}`);
}

function findCalls(text, callName) {
  const found = [];
  let pos = 0;

  while (pos < text.length) {
    const idx = text.indexOf(callName, pos);
    if (idx === -1) break;

    const before = idx > 0 ? text[idx - 1] : ' ';
    if (/[A-Za-z0-9_$.]/.test(before)) {
      pos = idx + 1;
      continue;
    }

    let i = idx + callName.length;
    while (i < text.length && /\s/.test(text[i])) i += 1;

    if (text[i] !== '(') {
      pos = idx + 1;
      continue;
    }

    const parsed = parseParenContent(text, i);
    found.push({
      name: callName,
      index: idx,
      argsText: parsed.content,
    });

    pos = parsed.end + 1;
  }

  return found;
}

function splitTopLevelArgs(argsText) {
  const parts = [];
  let buf = '';
  let depth = 0;
  let inQuote = false;

  for (let i = 0; i < argsText.length; i += 1) {
    const ch = argsText[i];
    const next = argsText[i + 1];

    if (inQuote) {
      buf += ch;
      if (ch === "'" && next === "'") {
        buf += next;
        i += 1;
        continue;
      }
      if (ch === "'") inQuote = false;
      continue;
    }

    if (ch === "'") {
      inQuote = true;
      buf += ch;
      continue;
    }

    if (ch === '(') {
      depth += 1;
      buf += ch;
      continue;
    }

    if (ch === ')') {
      depth -= 1;
      buf += ch;
      continue;
    }

    if (ch === ',' && depth === 0) {
      if (buf.trim()) parts.push(buf.trim());
      buf = '';
      continue;
    }

    buf += ch;
  }

  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function parseSqlStringLiteral(raw) {
  const trimmed = raw.trim();
  if (!(trimmed.startsWith("'") && trimmed.endsWith("'"))) return null;
  return trimmed.slice(1, -1).replace(/''/g, "'");
}

function parseValue(raw) {
  const trimmed = raw.trim();

  const sqlString = parseSqlStringLiteral(trimmed);
  if (sqlString !== null) return sqlString;

  if (/^NULL$/i.test(trimmed)) return null;
  if (/^TRUE$/i.test(trimmed)) return true;
  if (/^FALSE$/i.test(trimmed)) return false;
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);

  return trimmed;
}

function parseArgs(argsText) {
  const args = {};
  for (const part of splitTopLevelArgs(argsText)) {
    const marker = part.indexOf('=>');
    if (marker === -1) continue;

    const key = part.slice(0, marker).trim().toLowerCase();
    const valueRaw = part.slice(marker + 2).trim();
    args[key] = parseValue(valueRaw);
  }
  return args;
}

const callNames = [
  'ORDS.DEFINE_MODULE',
  'ORDS.DEFINE_TEMPLATE',
  'ORDS.DEFINE_HANDLER',
  'ORDS.DEFINE_PARAMETER',
  'ORDS.DEFINE_PRIVILEGE',
  'ORDS.DEFINE_ROLE',
  'ORDS.ENABLE_OBJECT',
  'ORDS_METADATA.ORDS.ENABLE_OBJECT',
];

const calls = callNames
  .flatMap((name) => findCalls(sql, name))
  .map((call) => ({ ...call, args: parseArgs(call.argsText) }))
  .sort((a, b) => a.index - b.index);

const modules = new Map();
for (const call of calls) {
  if (call.name !== 'ORDS.DEFINE_MODULE') continue;
  const moduleName = call.args.p_module_name;
  if (!moduleName) continue;

  modules.set(moduleName, {
    moduleName,
    basePath: call.args.p_base_path || '/',
    itemsPerPage: Number.isInteger(call.args.p_items_per_page) ? call.args.p_items_per_page : 0,
    status: typeof call.args.p_status === 'string' ? call.args.p_status : 'PUBLISHED',
  });
}

const parameterMap = new Map();
for (const call of calls) {
  if (call.name !== 'ORDS.DEFINE_PARAMETER') continue;

  const moduleName = call.args.p_module_name;
  const pattern = call.args.p_pattern;
  const method = String(call.args.p_method || '').toUpperCase();
  if (!moduleName || !pattern || !method) continue;

  const key = `${moduleName}||${pattern}||${method}`;
  if (!parameterMap.has(key)) parameterMap.set(key, []);

  parameterMap.get(key).push({
    name: String(call.args.p_name || '').trim(),
    bindVariable: String(call.args.p_bind_variable_name || '').trim(),
    sourceType: call.args.p_source_type,
    parameterType: call.args.p_param_type,
    accessMethod: call.args.p_access_method,
    description: call.args.p_comments || '',
  });
}

function splitPath(rawPath) {
  return String(rawPath)
    .split('/')
    .map((seg) => seg.trim())
    .filter(Boolean);
}

function normalizePatternSegment(segment) {
  if (segment.startsWith(':')) {
    return `{${segment.slice(1)}}`;
  }
  return segment;
}

function buildPath(basePath, pattern) {
  const segments = [
    ...splitPath(basePath),
    ...splitPath(pattern).map(normalizePatternSegment),
  ];

  const built = `/${segments.join('/')}`;
  return built === '/' ? built : built.replace(/\/+$/g, '');
}

function extractPlaceholders(pattern) {
  const placeholders = [];
  for (const seg of splitPath(pattern)) {
    if (seg.startsWith(':')) placeholders.push(seg.slice(1));
  }
  return placeholders;
}

const privilegeScopes = {};
for (const call of calls) {
  if (call.name !== 'ORDS.DEFINE_PRIVILEGE') continue;
  const scope = call.args.p_privilege_name;
  if (typeof scope !== 'string') continue;
  if (!scope.startsWith('concert_app_')) continue;

  privilegeScopes[scope] =
    (typeof call.args.p_description === 'string' && call.args.p_description) ||
    (typeof call.args.p_label === 'string' && call.args.p_label) ||
    scope;
}

const securitySchemeScopes = Object.keys(privilegeScopes).length
  ? privilegeScopes
  : {
      concert_app_admin: 'Provides access to the concert app admin endpoints',
      concert_app_authuser: 'Provides access to the user specific endpoints',
      concert_app_euser: 'Provides limited access to the concert app endpoints',
    };

function operationSecurity(moduleName) {
  if (moduleName.includes('.authuser.')) return [{ BEARER: ['concert_app_authuser'] }];
  if (moduleName.includes('.adminuser.')) return [{ BEARER: ['concert_app_admin'] }];
  return [];
}

function responseSchema(sourceType) {
  if (String(sourceType || '').toLowerCase().includes('collection')) {
    return {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: true,
      },
    };
  }

  return {
    type: 'object',
    additionalProperties: true,
  };
}

function sanitizeForId(value) {
  return value
    .replace(/[:{}]/g, '_')
    .replace(/[^A-Za-z0-9_]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

const operationIds = new Set();
function nextOperationId(method, moduleName, pattern) {
  const baseId = sanitizeForId(`${method}_${moduleName}_${pattern}`);
  if (!operationIds.has(baseId)) {
    operationIds.add(baseId);
    return baseId;
  }

  let idx = 2;
  while (operationIds.has(`${baseId}_${idx}`)) idx += 1;
  const id = `${baseId}_${idx}`;
  operationIds.add(id);
  return id;
}

const paths = {};

for (const call of calls) {
  if (call.name !== 'ORDS.DEFINE_HANDLER') continue;

  const moduleName = call.args.p_module_name;
  const pattern = call.args.p_pattern;
  const method = String(call.args.p_method || '').toUpperCase();
  const sourceType = call.args.p_source_type;
  const source = call.args.p_source;

  if (!moduleName || !pattern || !method) continue;
  if (!modules.has(moduleName)) continue;

  if (typeof source !== 'string' || source.trim().length === 0) {
    throw new Error(`Empty p_source for ${moduleName} ${method} ${pattern}`);
  }

  const openApiPath = buildPath(modules.get(moduleName).basePath, pattern);
  const pathParamNames = extractPlaceholders(pattern);

  const paramsKey = `${moduleName}||${pattern}||${method}`;
  const declaredParams = parameterMap.get(paramsKey) || [];

  const pathParameters = pathParamNames.map((name) => ({
    name,
    in: 'path',
    required: true,
    schema: { type: 'string' },
  }));

  const xDbParams = pathParamNames.map((name) => {
    const matched = declaredParams.find((param) => {
      if (!param) return false;
      const byName = String(param.name || '').trim();
      const byBind = String(param.bindVariable || '').trim();
      return byName.toLowerCase() === name.toLowerCase() || byBind.toLowerCase() === name.toLowerCase();
    });

    return {
      name,
      bindVariable: matched?.bindVariable || name,
      sourceType: matched?.sourceType || 'URI',
      parameterType: matched?.parameterType || 'STRING',
      accessMethod: matched?.accessMethod || 'IN',
      description: matched?.description || '',
    };
  });

  // Strict placeholder/parameter parity.
  const pathParamSet = new Set(pathParameters.map((p) => p.name));
  if (pathParamSet.size !== pathParamNames.length) {
    throw new Error(`Duplicate path placeholder in ${moduleName} ${pattern}`);
  }

  const op = {
    operationId: nextOperationId(method, moduleName, pattern),
    tags: [moduleName],
    parameters: pathParameters,
    responses: {
      '200': {
        description: 'Response',
        content: {
          'application/json': {
            schema: responseSchema(sourceType),
          },
        },
      },
    },
    security: operationSecurity(moduleName),
    'x-dbtools-operation': {
      moduleName,
      pattern,
      method,
      sourceType,
      source,
      parameters: xDbParams,
    },
  };

  if (!paths[openApiPath]) paths[openApiPath] = {};
  paths[openApiPath][method.toLowerCase()] = op;
}

const moduleItemsPerPage = [...modules.values()].map((moduleDef) => moduleDef.itemsPerPage || 0);
const itemsPerPage = Math.max(1, ...moduleItemsPerPage, 1);
const anyPublished = [...modules.values()].some((moduleDef) => String(moduleDef.status).toUpperCase() === 'PUBLISHED');

const apiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'Concert App API Spec',
    version: '1.0.0',
  },
  paths,
  components: {
    securitySchemes: {
      BEARER: {
        type: 'oauth2',
        flows: {
          clientCredentials: {
            tokenUrl: 'https://<IDENTITY_DOMAIN_URL>:443/oauth2/v1/token',
            scopes: securitySchemeScopes,
          },
        },
      },
    },
  },
  'x-dbtools-properties': {
    itemsPerPage,
    published: anyPublished ? 'PUBLISHED' : 'UNPUBLISHED',
  },
};

const enableObjects = calls
  .filter((call) => call.name === 'ORDS.ENABLE_OBJECT' || call.name === 'ORDS_METADATA.ORDS.ENABLE_OBJECT')
  .filter((call) => call.args.p_enabled === true && call.args.p_auto_rest_auth === true)
  .map((call) => ({
    objectName: String(call.args.p_object || '').trim(),
    objectType: String(call.args.p_object_type || '').trim(),
    alias: String(call.args.p_object_alias || '').trim(),
  }))
  .filter((obj) => obj.objectName && obj.objectType && obj.alias);

const uniqueEnableObjects = [];
const seenAuto = new Set();
for (const obj of enableObjects) {
  const key = `${obj.objectType}::${obj.objectName}`;
  if (seenAuto.has(key)) continue;
  seenAuto.add(key);
  uniqueEnableObjects.push(obj);
}

const ociLines = [];
ociLines.push('CONTENT=$(jq -c . ords_config_service/apispec.json)');
ociLines.push('');
ociLines.push('oci dbtools-runtime database-api-gateway-config-pool-api-spec create default \\\n  --database-api-gateway-config-id $CONFIG_OCID \\\n  --pool-key $POOL_KEY \\\n  --display-name concert_sample_app_apispec \\\n  --content "$CONTENT"');

for (const obj of uniqueEnableObjects) {
  ociLines.push('');
  ociLines.push(`oci dbtools-runtime database-api-gateway-config-pool-auto-api-spec create default \\
  --database-api-gateway-config-id $CONFIG_OCID \\
  --pool-key $POOL_KEY\\
  --display-name "The ${obj.objectName} ${obj.objectType}" \\
  --database-object-name ${obj.objectName} \\
  --database-object-type ${obj.objectType} \\
  --description "This is a rest API of ${obj.objectName}" \\
  --alias "${obj.alias}" \\
  --from-json '{"operations":["READ"]}'`);
}
ociLines.push('');

fs.mkdirSync(outDir, { recursive: true });
const apiSpecPath = path.join(outDir, 'apispec.json');
const ociRequestsPath = path.join(outDir, 'oci_requests.sh');

fs.writeFileSync(apiSpecPath, `${JSON.stringify(apiSpec, null, 2)}\n`);
fs.writeFileSync(ociRequestsPath, `${ociLines.join('\n')}`);

const apiLen = fs.readFileSync(apiSpecPath, 'utf8').length;
if (apiLen < 2 || apiLen > 102400) {
  throw new Error(`apispec.json size must be 2..102400 chars, got ${apiLen}`);
}

console.log(`Generated ${apiSpecPath}`);
console.log(`Generated ${ociRequestsPath}`);
console.log(`Paths: ${Object.keys(paths).length}, auto objects: ${uniqueEnableObjects.length}`);
