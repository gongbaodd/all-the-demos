//
//  FriendsFavoriteMoviesApp.swift
//  FriendsFavoriteMovies
//
//  Created by gongbaodd on 2024/7/30.
//

import SwiftData
import SwiftUI

@main
struct FriendsFavoriteMoviesApp: App {
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Movie.self,
            Friend.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(sharedModelContainer)
    }
}
