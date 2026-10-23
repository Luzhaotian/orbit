import { t } from "../i18n";
import type { AgentPort } from "../port/port";
import { COMMUNITY } from "./communityLinks";

export function AuthorLine({ port }: { port: Pick<AgentPort, "openExternal"> }) {
  return (
    <div className="comm-author">
      <span className="comm-k">{t("基于上游项目")}</span>
      <a
        href={COMMUNITY.upstream}
        data-action="community.author"
        onClick={(e) => {
          e.preventDefault();
          void port.openExternal(COMMUNITY.upstream).catch(() => {});
        }}
      >
        {COMMUNITY.upstreamLabel}
      </a>
    </div>
  );
}
