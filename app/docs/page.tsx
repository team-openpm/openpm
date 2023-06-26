import {MainTemplate} from '@/components/main-template'

export default async function AiPluginPage() {
  return (
    <MainTemplate>
      <article className="prose prose-slate max-w-prose dark:prose-invert prose-headings:text-xl prose-headings:font-medium prose-a:text-blue-500 prose-a:no-underline dark:prose-p:text-white/70">
        <p>
          There are currently two ways of integrating APIs into OpenAI&apos;s GPT: through
          chat functions, or through ChatGPT. Here are some resources on both approaches.
        </p>

        <h2>ChatGPT integration</h2>

        <p>
          To integrate an API into ChatGPT you are going to need: an ai-plugin.json file,
          an OpenAPI file, and a ChatGPT developer account.
        </p>

        <ol>
          <li>
            Read ChatGPT&apos;s{' '}
            <a href="https://platform.openai.com/docs/plugins/introduction">
              official docs
            </a>
            .
          </li>
          <li>
            See example OpenAPI files, and{' '}
            <a href="/openapi">learn how to generate your own</a>.
          </li>
          <li>
            Clone our{' '}
            <a href="https://github.com/team-openpm/cloudflare-basics-ai-plugin">
              Cloudflare worker
            </a>{' '}
            to easily boot up your own AI plugin.
          </li>
        </ol>

        <h2>Function calling from GPT3 and GPT4</h2>
        <p>
          OpenAI have recently released a fine-tuned model and API specifically for
          exposing a set of functions for the LLM to call. This is a powerful way of
          mixing in AI into your existing app.
        </p>

        <ol>
          <li>
            Read OpenAI&apos;s official docs on{' '}
            <a href="https://platform.openai.com/docs/guides/gpt/function-calling">
              function calling
            </a>
            .
          </li>
          <li>
            We have created a framework called{' '}
            <a href="https://github.com/team-openpm/workgpt">WorkGPT</a>, which you can
            use to expose your APIs to GPT 3.5 and 4.
          </li>
        </ol>
      </article>
    </MainTemplate>
  )
}
