//
//  Movie.swift
//  FriendsFavoriteMovies
//
//  Created by gongbaodd on 2024/7/30.
//

import Foundation
import SwiftData

@Model
final class Movie {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
