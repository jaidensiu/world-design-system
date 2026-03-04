// swift-tools-version: 5.9

import PackageDescription

let package = Package(
    name: "WorldDesignSystem",
    platforms: [
        .iOS(.v15),
    ],
    products: [
        .library(
            name: "WorldDesignSystem",
            targets: ["WorldDesignSystem"]
        ),
    ],
    targets: [
        .target(
            name: "WorldDesignSystem",
            path: "Sources/WorldDesignSystem"
        ),
    ]
)
