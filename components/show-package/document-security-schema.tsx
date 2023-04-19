import {MarkdownDynamic} from '@/components/markdown/markdown-dynamic'
import {OpenAPI} from '@/lib/openapi/types'

export function DocumentSecurityScheme({scheme}: {scheme: OpenAPI.SecuritySchemeObject}) {
  if (isHttpSecurityScheme(scheme)) {
    return <HttpSecurityScheme scheme={scheme} />
  }

  if (isApiKeySecurityScheme(scheme)) {
    return <ApiKeySecurityScheme scheme={scheme} />
  }

  if (isOAuth2SecurityScheme(scheme)) {
    return <OAuth2SecurityScheme scheme={scheme} />
  }

  return null
}

function HttpSecurityScheme({scheme}: {scheme: OpenAPI.HttpSecurityScheme}) {
  return (
    <div className="max-w-sm space-y-2 text-sm">
      <h3 className="text-sm font-semibold">HTTP Authentication</h3>

      <div className="font-semibold capitalize">{scheme.scheme}</div>

      {scheme.description && (
        <div className="prose prose-sm prose-slate dark:prose-invert">
          <MarkdownDynamic text={scheme.description} />
        </div>
      )}

      {scheme.bearerFormat && (
        <div className="grid grid-cols-2 gap-1">
          <div className="font-medium">Bearer format</div>
          <div>{scheme.bearerFormat}</div>
        </div>
      )}
    </div>
  )
}

function ApiKeySecurityScheme({scheme}: {scheme: OpenAPI.ApiKeySecurityScheme}) {
  return (
    <div className="max-w-sm space-y-2 text-sm">
      <h3 className="text-sm font-semibold">API Key Authentication</h3>

      {scheme.description && (
        <div className="prose prose-sm prose-slate dark:prose-invert">
          <MarkdownDynamic text={scheme.description} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-1">
        <div className="">Name</div>
        <div>{scheme.name}</div>
        <div className="">In</div>
        <div className="">{scheme.in}</div>
      </div>
    </div>
  )
}

function OAuth2SecurityScheme({scheme}: {scheme: OpenAPI.OAuth2SecurityScheme}) {
  return (
    <div className="max-w-sm space-y-2 text-sm">
      <h3 className="text-sm font-semibold">OAuth2 Authentication</h3>

      {scheme.description && (
        <div className="prose prose-sm prose-slate dark:prose-invert">
          <MarkdownDynamic text={scheme.description} />
        </div>
      )}

      <div className="">
        <div className="pace-y-1">
          <div className="grid grid-cols-2 gap-1">
            <div className="">Type</div>
            <div>oauth2</div>
          </div>

          {scheme.flows.implicit && (
            <div className="grid grid-cols-2 gap-1">
              <div className="">Authorization URL:</div>
              <div>
                <code className="font-mono">
                  {scheme.flows.implicit.authorizationUrl}
                </code>
              </div>
              <div className="">Refresh URL:</div>
              <div>
                <code className="font-mono">{scheme.flows.implicit.refreshUrl}</code>
              </div>
              <div className="">Scopes:</div>
              <div>
                <Scopes scopes={scheme.flows.implicit.scopes} />
              </div>
            </div>
          )}

          {scheme.flows.password && (
            <div className="grid grid-cols-2 gap-1">
              <div className="">Token URL:</div>
              <div>{scheme.flows.password.tokenUrl}</div>
              <div className="">Refresh URL:</div>
              <div>{scheme.flows.password.refreshUrl}</div>
              <div className="">Scopes:</div>
              <div>
                <Scopes scopes={scheme.flows.password.scopes} />
              </div>
            </div>
          )}

          {scheme.flows.clientCredentials && (
            <div className="grid grid-cols-2 gap-1">
              <div className="">Token URL:</div>
              <div>{scheme.flows.clientCredentials.tokenUrl}</div>
              <div className="">Refresh URL:</div>
              <div>{scheme.flows.clientCredentials.refreshUrl}</div>
              <div className="">Scopes:</div>
              <div>
                <Scopes scopes={scheme.flows.clientCredentials.scopes} />
              </div>
            </div>
          )}

          {scheme.flows.authorizationCode && (
            <div className="grid grid-cols-2 gap-1">
              <div className="">Authorization URL:</div>
              <div>
                <code className="font-mono text-xs">
                  {scheme.flows.authorizationCode.authorizationUrl}
                </code>
              </div>
              <div className="">Token URL:</div>
              <div>
                <code className="font-mono text-xs">
                  {scheme.flows.authorizationCode.tokenUrl}
                </code>
              </div>
              <div className="">Refresh URL:</div>
              <div>
                <code className="font-mono text-xs">
                  {scheme.flows.authorizationCode.refreshUrl}
                </code>
              </div>
              <div className="">Scopes:</div>
              <div>
                <Scopes scopes={scheme.flows.authorizationCode.scopes} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Scopes({scopes}: {scopes: Record<string, string>}) {
  return (
    <div className="space-y-2">
      {Object.entries(scopes).map(([scope, description]) => (
        <div key={scope} className="space-y-1">
          <div className="font-medium">{scope}</div>
          <div className="leading-snug">{description}</div>
        </div>
      ))}
    </div>
  )
}

function isHttpSecurityScheme(
  scheme: OpenAPI.SecuritySchemeObject,
): scheme is OpenAPI.HttpSecurityScheme {
  return scheme.type === 'http'
}

function isApiKeySecurityScheme(
  scheme: OpenAPI.SecuritySchemeObject,
): scheme is OpenAPI.ApiKeySecurityScheme {
  return scheme.type === 'apiKey'
}

function isOAuth2SecurityScheme(
  scheme: OpenAPI.SecuritySchemeObject,
): scheme is OpenAPI.OAuth2SecurityScheme {
  return scheme.type === 'oauth2'
}
