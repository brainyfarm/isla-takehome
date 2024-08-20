# ISLA TakeHome - Patient Data Extractor

### How to Run with UI

**Step 1**

Run `git clone https://github.com/brainyfarm/isla-takehome.git`

**Step 2**

Install dependencies with `yarn`

Run `yarn start` or `yarn run dev` for hot reload with nodemon

To run test `yarn run test`


### Directory Structure
root
root

- [src](https://github.com/brainyfarm/isla-takehome/tree/main/src)
    - [**config**](https://github.com/brainyfarm/isla-takehome/tree/main/src/config)
        - [database.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/config/database.js)
    - [**controllers**](https://github.com/brainyfarm/isla-takehome/tree/main/src/controllers)
        - [extractController.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/controllers/extractController.js)
    - [**lib**](https://github.com/brainyfarm/isla-takehome/tree/main/src/lib)
        - [constants.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/lib/constants.js)
        - [extractor.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/lib/extractor.js)
    - [**models**](https://github.com/brainyfarm/isla-takehome/tree/main/src/models)
        - [index.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/models/index.js)
        - [patient.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/models/patient.js)
        - [processed.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/models/processed.js)
    - [**public**](https://github.com/brainyfarm/isla-takehome/tree/main/src/public)
        - [js/index.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/public/js/index.js)
    - [**routes**](https://github.com/brainyfarm/isla-takehome/tree/main/src/routes)
        - [extractRoutes.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/routes/extractRoutes.js)
    - [**services**](https://github.com/brainyfarm/isla-takehome/tree/main/src/services)
        - [patientService.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/services/patientService.js)
    - [**tests**](https://github.com/brainyfarm/isla-takehome/tree/main/src/tests)
        - [extractor.test.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/tests/extractor.test.js)
    - [**utils**](https://github.com/brainyfarm/isla-takehome/tree/main/src/utils)
        - [hashUtil.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/utils/hashUtil.js)
    - [**views**](https://github.com/brainyfarm/isla-takehome/tree/main/src/views)
        - [index.html](https://github.com/brainyfarm/isla-takehome/blob/main/src/views/index.html)
    - [app.js](https://github.com/brainyfarm/isla-takehome/blob/main/src/app.js)


