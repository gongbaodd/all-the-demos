//
//  LandmarksApp.swift
//  Landmarks
//
//  Created by gongbaodd on 2024/7/19.
//

import SwiftUI

@main
struct LandmarksApp: App {
    @State private var modelData = ModelData()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(modelData)
        }
    }
}
