# ISLA TakeHome - Patient Data Extractor

### How to Run with UI

**Step 1**

Run `git clone https://github.com/brainyfarm/isla-takehome.git`

**Step 2**

Install dependencies with `yarn`

Run `yarn start` or `yarn run dev` for hot reload with nodemon

To run test `yarn run test`

You can also use the UI via the browser @ `http://localhost:3000/extract`

Posting to the endpoint `/extract` and sending a form field `text` - the text to extract from alongside for direct access. 


### Directory Structure
root
- [src](https://github.com/brainyfarm/isla-takehome/tree/main/src)
    - [config](https://github.com/brainyfarm/isla-takehome/tree/main/src/config)
        - [database.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/config/database.js)
    - [controllers](https://github.com/brainyfarm/isla-takehome/tree/main/src/controllers)
        - [extract/extract.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/controllers/extract/extract.js)
    - [lib](https://github.com/brainyfarm/isla-takehome/tree/main/src/lib)
        - [constants.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/lib/constants.js)
        - [extractor.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/lib/extractor.js): *Holding the logic to perform the extraction*
    - [models](https://github.com/brainyfarm/isla-takehome/tree/main/src/models)
        - [index.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/models/index.js)
        - [patient.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/models/patient.js)
        - [processed.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/models/processed.js)
    - [public](https://github.com/brainyfarm/isla-takehome/tree/main/src/public)
        - [js/index.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/public/js/index.js)
    - [routes](https://github.com/brainyfarm/isla-takehome/tree/main/src/routes)
        - [extract.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/routes/extract.js)
    - [services](https://github.com/brainyfarm/isla-takehome/tree/main/src/services)
        - [patientService.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/services/patientService.js)
    - [tests](https://github.com/brainyfarm/isla-takehome/tree/main/src/tests)
        - [extractor.test.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/tests/extractor.test.js)
    - [utils](https://github.com/brainyfarm/isla-takehome/tree/main/src/utils)
        - [hashUtil.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/utils/hashUtil.js)
    - [views](https://github.com/brainyfarm/isla-takehome/tree/main/src/views)
        - [index.html](https://github.com/brainyfarm/isla-takehome/blob/main/src/views/index.html)
    - [app.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/app.js)


