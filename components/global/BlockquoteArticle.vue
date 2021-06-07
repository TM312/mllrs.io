<template>
    <section class="bg-gray-100 rounded-lg">
        <div class="py-4 px-4">
            <div class="md:flex-shrink-0">
                <img class="h-12" :src="imgSrc(imgOrg)" :alt="imgOrgAlt" />
            </div>
            <div class="mt-4">
                <div class="relative text-lg font-medium text-indigo-600">
                    <svg
                        class="
                            absolute
                            top-0
                            left-0
                            transform
                            -translate-x-3 -translate-y-2
                            h-8
                            w-8
                            text-indigo-600
                        "
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                    >
                        <path
                            d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                        />
                    </svg>
                    <p class="relative">
                        <slot></slot>
                    </p>
                </div>
                <footer v-if="role && name && image" class="mt-8">
                    <div class="flex items-start">
                        <div
                            class="
                                flex-shrink-0
                                inline-flex
                                rounded-full
                                border-2 border-white
                            "
                        >
                            <img
                                v-if="image"
                                class="h-12 w-12 rounded-full"
                                :src="imgSrc(image)"
                                alt=""
                            />
                        </div>
                        <div v-if="role && name" class="ml-4">
                            <div
                                v-if="name"
                                class="text-base font-medium text-white"
                            >
                                {{ name }}
                            </div>
                            <div
                                v-if="role"
                                class="text-base font-medium text-indigo-200"
                            >
                                {{ role }}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "BlockquoteArticle",
        props: {
            imgOrg: {
                type: String,
                required: false,
                default: null,
            },
            imgOrgAlt: {
                type: String,
                required: false,
                default: null,
            },
            articleSlug: {
                type: String,
                required: false,
                default: null,
            },
            role: {
                type: String,
                required: false,
                default: null,
            },
            name: {
                type: String,
                required: false,
                default: null,
            },
            image: {
                type: String,
                required: false,
                default: null,
            },
        },
        methods: {
            imgSrc(filename) {
                try {
                    return require(`~/assets/images/${this.articleSlug}/${filename}`);
                } catch (error) {
                    return null;
                }
            },
        },
    };
</script>

<style>
</style>
