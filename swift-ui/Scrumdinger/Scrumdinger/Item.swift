//
//  Item.swift
//  Scrumdinger
//
//  Created by gongbaodd on 2024/8/3.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
