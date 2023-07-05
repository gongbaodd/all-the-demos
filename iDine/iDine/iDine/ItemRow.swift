//
//  ItemRow.swift
//  iDine
//
//  Created by gongbaodd on 2023/7/5.
//

import SwiftUI

struct ItemRow: View {
    let item: MenuItem

    var body: some View {
        HStack {
            Image(item.thumbnailImage)
            Text(item.name)
            Text("$\(item.price)")
        }
    }
}

struct ItemRow_Previews: PreviewProvider {
    static var previews: some View {
        ItemRow(item: MenuItem.example)
    }
}
