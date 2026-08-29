# Explore BOM — single version source for Java/Spring across explore-ai / explore-iam.
# Import this platform in each service's build.gradle.kts:
#
#   dependencies {
#     implementation(platform(project(":explore-bom")))
#   }
#
# Or publish to GitHub Packages and use:
#   implementation(platform("com.explore:explore-bom:VERSION"))

group = "com.explore"
version = "0.1.0"

plugins {
    `java-platform`
}

javaPlatform {
    allowDependencies()
}

dependencies {
    // Align with explore-ai / explore-iam Spring Boot line (update in one place).
    constraints {
        api("org.springframework.boot:spring-boot-dependencies:4.1.0")
        api("org.springframework.ai:spring-ai-bom:2.0.0-M1")
    }
}
