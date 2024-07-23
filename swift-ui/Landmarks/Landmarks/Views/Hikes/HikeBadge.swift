//
//  HikeBadge.swift
//  Landmarks
//
//  Created by gongbaodd on 2024/7/23.
//

import SwiftUI

struct HikeBadge: View {
    var name: String
    
    var body: some View {
        VStack(alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/, content: {
            Badge()
                .frame(width: 300, height: 300)
                .scaleEffect(1.0/3.0)
                .frame(width: 100, height: 100)
            Text(name)
                .font(.caption)
                .accessibilityLabel("Badge for \(name).")
        })
    }
}

#Preview {
    HikeBadge(name: "Preview Testing")
}
