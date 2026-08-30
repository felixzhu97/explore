// Explore BOM — single version source for Java/Spring across explore-ai / explore-iam.
// Import this platform in each service's build.gradle.kts:
//
//   dependencies {
//     implementation(platform(project(":explore-bom")))
//   }
//
// Or publish to GitHub Packages and use:
//   implementation(platform("com.explore:explore-bom:VERSION"))

group = "com.explore"
version = "0.1.0"

plugins {
    `java-platform`
    `maven-publish`
}

javaPlatform {
    allowDependencies()
}

repositories {
    mavenCentral()
    maven { url = uri("https://repo.spring.io/milestone") }
}

dependencies {
    api(platform("org.springframework.boot:spring-boot-dependencies:4.1.0"))
    api(platform("org.springframework.ai:spring-ai-bom:2.0.1"))
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            from(components["javaPlatform"])
        }
    }
}
