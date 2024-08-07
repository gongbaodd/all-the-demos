//
//  HistoryView.swift
//  Scrumdinger
//
//  Created by gongbaodd on 2024/8/7.
//

import SwiftUI

struct HistoryView: View {
    let history: History
    var body: some View {
        ScrollView {
            VStack(alignment: .leading) {
                Divider().padding(.bottom)
                Text("Attendees")
                    .font(.headline)
                Text(history.attendeeString)
                if let transcript = history.transcript {
                    Text("Transcript")
                        .font(.headline)
                        .padding(.top)
                    Text(transcript)
                }
            }
        }
        .navigationTitle(Text(history.date, style: .date))
        .padding()
    }
}

extension History {
    var attendeeString: String {
        ListFormatter.localizedString(byJoining: attendees.map { $0.name })
    }
}

#Preview {
    var history = History(attendees: [
        DailyScrum.Attendee(name: "Jon"),
        DailyScrum.Attendee(name: "Darla"),
        DailyScrum.Attendee(name: "Luis"),
    ], transcript: "Darla, would you like to start today?")
    return HistoryView(history: history)
}
