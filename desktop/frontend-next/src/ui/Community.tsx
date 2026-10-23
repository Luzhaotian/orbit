import { useState } from "react";
import { t } from "../i18n";
import type { AgentPort } from "../port/port";
import { COMMUNITY } from "./communityLinks";

export function Community({ port }: { port: Pick<AgentPort, "openExternal">; logins?: string[] }) {
  const [failed, setFailed] = useState("");

  const open = (url: string) =>
    void port.openExternal(url).then(() => setFailed(""), () => setFailed(t("无法打开浏览器，请手动访问 {at}", { at: url })));

  return (
    <div className="comm">
      <p className="comm-how">{t("本应用基于上游开源项目二次开发；问题与讨论可到上游仓库查看。")}</p>
      <span className="comm-acts">
        <button type="button" className="btn" data-primary data-action="community.upstream" onClick={() => open(COMMUNITY.upstream)}>
          {t("打开上游仓库")}
        </button>
        <button type="button" className="btn" data-action="community.issues" onClick={() => open(COMMUNITY.issues)}>
          GitHub issues
        </button>
      </span>
      {failed && <p className="comm-fail" role="alert">{failed}</p>}
    </div>
  );
}
