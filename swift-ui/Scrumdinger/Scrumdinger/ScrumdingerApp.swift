//
//  ScrumdingerApp.swift
//  Scrumdinger
//
//  Created by gongbaodd on 2024/8/3.
//

import SwiftData
import SwiftUI

@main
struct ScrumdingerApp: App {
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Item.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    @State private var scrums = DailyScrum.sampleData

    var body: some Scene {
        WindowGroup {
            ScrumsView(scrums: $scrums)
        }
        .modelContainer(sharedModelContainer)
    }
}
