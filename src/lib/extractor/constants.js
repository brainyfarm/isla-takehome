export default {
    ERRORS: {
        MISSING_PRS_SEGMENT: 'Missing PRS line in message',
        MISSING_DET_SEGMENT: 'Missing DET line in message',
        MISSING_NAME_FORMAT: 'Missing or invalid name format in PRS line',
        MISSING_DATE_FORMAT: 'Missing or Invalid date format in PRS line',
        MISSING_CONDITION_FORMAT: 'Missing primary condition in DET line',
        EMPTY_MESSAGE: 'Message is empty',
    },

    MESSAGES: {
        PRS: 'PRS',
        DET: 'DET',
    },

    REGEX :{
        NAME: /\|([a-z]+)\^+([a-z]+)(?:\^*([a-z]*))\|/i,
        DATE: /\|+((19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01]))(?:[\s\|]+|$)/,
        PRIMARY_CONDITION: /\|(([^\^|^\|])([a-z0-9 ]+))(?:[\s\|]+|$)/i,
        DATE_MATCH: /(\d{4})(\d{2})(\d{2})/,
    },

}