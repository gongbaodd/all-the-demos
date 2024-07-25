//
//  SwiftUIView.swift
//  MacLandmarks
//
//  Created by gongbaodd on 2024/7/25.
//

import SwiftUI

struct LandmarkSettings: View {
    @AppStorage("MapView.zoom")
    private var zoom: MapView.Zoom = .medium
    var body: some View {
        Form {
            Picker("Map Zoom:", selection: $zoom) {
                ForEach(MapView.Zoom.allCases, content: { level in
                    Text(level.rawValue)
                })
            }
            .pickerStyle(.inline)
        }
        .frame(width: 300)
        .navigationTitle("Landmark Settings")
        .padding(80)
    }
}

#Preview {
    LandmarkSettings()
}
