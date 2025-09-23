<template>
    <h2>{{headingText}}</h2>
</template>

<script>
    export default {

        name: 'Heading',


        props: {
            headingText:{
                type: String,
                required: true,
            }
        }
    }
</script>