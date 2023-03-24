<template>
    <div
        class="text-gray-200 lg:grid grid-cols-3 gap-x-20 font-mono justify-items-end">
        <div
            class="max-w-lg col-span-2 lg:pr-8 lg:h-5/6 lg:overflow-y-auto">
            <h1
                class="text-gray-200 font-semibold leading-3 text-lg sticky top-0 bg-black pb-5">
                Experience</h1>
            <div v-for="project, j in experience" :key="j"
                class="mt-5">
                <h3
                    class="text-gray-300 font-medium leading-1 flex gap-x-2 truncate">
                    <span v-text="project.institution" />
                    <span>|</span>
                    <span v-text="project.countryCode" />
                </h3>
                <p
                    class="text-gray-400 font-extralight flex gap-x-2 text-sm">
                    <span v-text="project.role" />
                    <span>|</span>
                    <span v-text="project.timeSpan" />
                </p>
                <ul
                    class="text-gray-500 font-regular text-sm text-justify">
                    <li v-for="item, k in project.description"
                        class="mt-2" :key="k" v-text="item" />
                </ul>
            </div>
        </div>
        <div class="max-w-sm w-full col-span-1 mt-20 lg:mt-0">
            <h1 class="text-gray-200 font-semibold text-lg leading-3 sticky top-0 bg-black pb-5">
                Education</h1>
            <div v-for="station, i in education" :key="i"
                class="mt-5">
                <h3
                    class="text-gray-300 font-medium leading-1 flex gap-x-2">
                    <span v-text="station.institution" />
                    <span>|</span>
                    <span v-text="station.countryCode" />
                </h3>
                <p
                    class="text-gray-400 font-extralight flex gap-x-2 text-sm">
                    <span v-text="station.degree" />
                    <span>|</span>
                    <span v-text="station.timeSpan" />
                </p>
                <p class="text-gray-500 font-regular text-sm font-mono"
                    v-text="station.description" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const education = [
    {
        institution: "University of St. Gallen",
        countryCode: "CH",
        degree: "Dr. oec.",
        timeSpan: "2015 - 2019",
        description: "Research on business model innovation under Prof. Dr. Oliver Gassman"
    },
    {
        institution: "Stanford University",
        countryCode: "US",
        degree: "Visiting Scholar",
        timeSpan: "2018",
        description: "Research on business model innovation under Prof. Dr. Larry Leifer"
    },
    {
        institution: "Korea University",
        countryCode: "KR",
        degree: "Visiting Student",
        timeSpan: "2013",
        description: ""
    },
    {
        institution: "RWTH Aachen University",
        countryCode: "DE",
        degree: "B.Sc. & M.Sc",
        timeSpan: "2008 - 2014",
        description: "Major in Industrial Engineering"
    }
]

const experience = [
    {
        institution: "Squirro",
        countryCode: "SG",
        role: "Solutions Engineer",
        timeSpan: "since 2021",
        description: [
            "Building software solutions around textual data analysis and search at financial institutions and news aggregators.",
            "Developed a document handling solution at a leading bank in the APAC region from demo, to MVP, to roll-out with a 7-digit dollar contract value and multiple follow-up projects. In the course of this my role shifted from single developer to product owner in a team of 8.",
        ]
    },
    {
        institution: "BMW / Institute of Technology Management",
        countryCode: "CH",
        role: "Project Lead HSG",
        timeSpan: "2015 – 2017",
        description: [
            "Developed a methodology for the use of simulations in strategic decision making at BMW. Initiated the collaboration with BMW’s Swiss national subsidiary that turned into a major customer. Within the project timeframe the methodology was used for 20 projects, presented to all BMW country CEOs at the annual C-level conference, and published in peer-reviewed outlets.",
        ]
    },
    {
        institution: "Institute of Technology Management",
        countryCode: "CH",
        role: "Program Manager",
        timeSpan: "2015 – 2019",
        description: ["Designed, launched, and managed an advanced studies program on business model innovation across the University of St. Gallen and in the Bay Area for top-level executives. The program generated close to a 7-digit dollar value in revenue across 3 seasons."]
    },
]
</script>