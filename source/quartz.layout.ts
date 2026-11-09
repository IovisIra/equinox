import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
        Component.Explorer({
          title: "", // Entfernt die Hauptüberschrift ("Explorer")
          folderDefaultState: "open", // Hält die Ordner immer geöffnet
          sortFn: (a, b) => {
            // 1. Ordner auf der obersten Ebene sortieren: "vogelbeobachtungen" VOR "vogelarten"
            if (!a.file && !b.file) {
              if (a.name === "vogelbeobachtungen" && b.name === "vogelarten") return -1
              if (a.name === "vogelarten" && b.name === "vogelbeobachtungen") return 1
            }

            // 2. Umgekehrte Sortierung (Z-A) nur für Dateien im Ordner "vogelbeobachtungen"
            const slugA = a.file?.slug || ""
            const slugB = b.file?.slug || ""

            if (slugA.startsWith("vogelbeobachtungen/") && slugB.startsWith("vogelbeobachtungen/")) {
              return b.displayName.localeCompare(a.displayName) // b vergleicht mit a = rückwärts
            }

            // 3. Standard-Sortierung für "vogelarten" und alles andere
            // Zuerst Ordner vor Dateien
            if (a.file && !b.file) return 1
            if (!a.file && b.file) return -1

            // Dann alphabetisch A-Z
            return a.displayName.localeCompare(b.displayName)
          },
        })
    ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
