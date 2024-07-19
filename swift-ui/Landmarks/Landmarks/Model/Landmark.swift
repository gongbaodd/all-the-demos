//
//  Landmark.swift
//  Landmarks
//
//  Created by gongbaodd on 2024/7/19.
//

import Foundation
import SwiftUI
import CoreLocation

struct Landmark: Hashable, Codable {
    var id: Int
    var name: String
    var park: String
    var state: String
    var description: String
    
    private var imageName: String
    var image: Image {
        Image(imageName)
    }
    
    private var coordinates: Coordinates
    var locationCoordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(
            latitude: coordinates.latitude, longitude: coordinates.longtitude
        )
    }
    struct Coordinates: Hashable, Codable {
        var latitude: Double
        var longtitude: Double
    }
}
