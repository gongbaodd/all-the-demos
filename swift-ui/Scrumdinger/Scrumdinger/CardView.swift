//
//  CardView.swift
//  Scrumdinger
//
//  Created by gongbaodd on 2024/8/3.
//

import SwiftUI

struct CardView: View {
    let scrum: DailyScrum
    var body: some View {
        VStack(alignment: .leading) {
            Text(scrum.title)
                .font(.headline)
                .accessibilityAndTraits(.isHeader)
            Spacer()
            HStack {
                Label("\(scrum.attendees.count)", systemImage: "person.3")
                    .accessibilityLabel("\(scrum.attendees.count) attendees")
                Spacer()
                Label("\(scrum.lengthInMinutes)", systemImage: "clock")
                    .accessibilityLabel("\(scrum.lengthInMinutes) minute meeting")
                    .labelStyle(.trailingIcon)
            }
            .font(.caption)
        }
        .padding()
        .foregroundColor(scrum.theme.accentColor)
    }
}

#Preview {
    var scrum = DailyScrum.sampleData[0]
    var cardview = CardView(scrum: scrum)
        .background(scrum.theme.mainColor)
        .previewLayout(.fixed(width: 400, height: 60))
    return cardview
}
