<template>
    <div
        class="text-gray-200 grid grid-cols-3 gap-x-20  font-mono justify-items-end">
        <div class="max-w-lg col-span-2">
            <h1 class="text-gray-200 font-semibold leading-3">
                Experience</h1>
            <div v-for="project, j in experience" :key="j"
                class="mt-5">
                <h3
                    class="text-gray-300 font-medium leading-1 flex gap-x-2">
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
                <ul class="text-gray-700 hover:text-gray-400 font-regular text-sm text-justify">
                    <li v-for="item, k in project.description"
                        class="mt-2"
                        :key="k"
                        v-text="item" />
                </ul>
            </div>
        </div>
        <div class="max-w-sm w-full col-span-1">
            <h1 class="text-gray-200 font-semibold leading-3">
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
        description: ["Implemented software solutions around textual and video data analysis at financial institutions and news aggregators. Deployed solutions both on premise (Linux/CentOS) and cloud. Responsible for project/stakeholder management."]
    },
    {
        institution: "BMW / Institute of Technology Management",
        countryCode: "CH",
        role: "Project Lead HSG",
        timeSpan: "2015 – 2017",
        description: ["Led team of 4 to develop methodology for the use of simulations in strategic decision making at BMW. Managed annual budget of US$95,000. Acquired BMW’s Swiss national subsidiary as customer. Within project timeframe methodology was used for 20 projects and presented to all BMW country CEOs at annual C-level conference.", "Coordinated stakeholders from HSG, FHS, BMW in organising a hackathon with 200 participants. Initiated and led a HSG-internal communication team and the development of a supporting web communication platform."]
    },
    {
        institution: "Institute of Technology Management",
        countryCode: "CH",
        role: "Program Manager",
        timeSpan: "2015 – 2019",
        description: ["Developed and launched advanced studies program for top-level executives. Guided contractors and full-time personnel in marketing and organisation activities. Responsible for financial planning. Acquired partnerships with 30 entrepreneurs and scholars across CH and Bay Area. Program generated US$700,000 in revenue across 3 seasons."]
    },
]
</script>