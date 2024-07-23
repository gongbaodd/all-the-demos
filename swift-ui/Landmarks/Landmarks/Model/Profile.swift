//
//  Profile.swift
//  Landmarks
//
//  Created by gongbaodd on 2024/7/23.
//

import Foundation

struct Profile {
    var username: String
    var prefersNotifications = true
    var goalDate = Date()
    var seasonalPhoto = Season.winter
    
    static let `default` = Profile(username: "gongbaodd")
    
    enum Season: String, CaseIterable, Identifiable {
        case spring = "🌷"
        case summer = "🌞"
        case autumn = "🍂"
        case winter = "☃️"
        
        var id: String { rawValue }
    }
}
