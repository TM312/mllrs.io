<template>
    <div>
        Infobox<br />
        {{ series }}
        <br />
    </div>
</template>

<script>
    export default {
        name: "InfoBoxSeries",
        props: {
            series: {
                type: Object,
                required: false,
            },
        },
    };
</script>

<style>
</style>
