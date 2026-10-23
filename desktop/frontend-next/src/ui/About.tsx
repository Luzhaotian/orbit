import { t } from "../i18n";
import type { AgentPort } from "../port/port";
import { AuthorLine } from "./AuthorLine";
import { Community } from "./Community";
import { Group } from "./Group";
import { Logs } from "./Logs";
import { UpdateMode } from "./UpdateMode";
import { Versions } from "./Versions";

export function About({ port }: { port: AgentPort }) {
  return (
    <>
      <Group id="versions"
        title={t("版本")}
        hint={t("当前安装的版本、可用更新，以及出现问题时如何回退。更新下载好后由你决定何时重启；回退后会固定在所选版本，不再提示新版本。")}
      >
        <Versions port={port} />
      </Group>
      <Group id="update-mode"
        title={t("更新方式")}
        hint={t("决定窗口自己做不做事：两种方式都不会替你安装新版本，重启始终由你决定。")}
      >
        <UpdateMode port={port} />
      </Group>
      <Group id="logs"
        title={t("日志与异常退出记录")}
        hint={t("出现问题或闪退后，反馈时附上这个目录里的文件会更容易查清原因；这里只显示位置，不会上传任何内容。")}
      >
        <Logs port={port} />
      </Group>
      <AuthorLine port={port} />
      <Group id="community"
        title={t("上游项目")}
        hint={t("本仓库基于上游开源项目二次开发；可打开上游仓库查看说明与 issue。")}
      >
        <Community port={port} />
      </Group>
    </>
  );
}
