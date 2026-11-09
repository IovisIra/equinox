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
            // 1. Ordner auf der obersten Ebene sortieren
            if (!a.file && !b.file) {
              const nameA = a.name.toLowerCase()
              const nameB = b.name.toLowerCase()
              if (nameA === "vogelbeobachtungen" && nameB === "vogelarten") return -1
              if (nameA === "vogelarten" && nameB === "vogelbeobachtungen") return 1
            }

            // 2. Umgekehrte Sortierung (Z-A) für Dateien in "vogelbeobachtungen"
            const slugA = a.file?.slug?.toLowerCase() || ""
            const slugB = b.file?.slug?.toLowerCase() || ""

            if (slugA.includes("vogelbeobachtungen") && slugB.includes("vogelbeobachtungen")) {
              const titleA = a.displayName || a.name
              const titleB = b.displayName || b.name
              return titleB.localeCompare(titleA) // b vergleicht mit a = rückwärts
            }

            // 3. Standard-Sortierung für alles andere
            // Zuerst Ordner vor Dateien
            if (a.file && !b.file) return 1
            if (!a.file && b.file) return -1

            // Dann alphabetisch A-Z
            const titleA = a.displayName || a.name
            const titleB = b.displayName || b.name
            return titleA.localeCompare(titleB)
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
