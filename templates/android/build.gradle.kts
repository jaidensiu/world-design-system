plugins {
    kotlin("jvm") version "1.9.22"
    `maven-publish`
}

group = "com.worldcoin"
version = System.getenv("VERSION") ?: "0.0.1-SNAPSHOT"

val artifactId = "design-system"

repositories {
    mavenCentral()
    google()
}

dependencies {
    compileOnly("androidx.compose.ui:ui:1.6.1")
    compileOnly("androidx.compose.ui:ui-text:1.6.1")
    compileOnly("androidx.compose.runtime:runtime:1.6.1")
    compileOnly("androidx.compose.ui:ui-unit:1.6.1")
    compileOnly("androidx.compose.ui:ui-graphics:1.6.1")
}

kotlin {
    jvmToolchain(17)
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            groupId = "com.worldcoin"
            this.artifactId = artifactId
            this.version = project.version.toString()
            from(components["java"])
        }
    }
    repositories {
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/worldcoin/world-design-system")
            credentials {
                username = System.getenv("GITHUB_ACTOR")
                password = System.getenv("GITHUB_TOKEN")
            }
        }
    }
}
