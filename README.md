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

    ### Available areas for Improvement
    - Better separation inside the controller as some of the error statuses and hardcoded things can be moved out
    - Handling route validation using something like Joi
    - Add logging to the codebase to track errors and failure

#### Screenshots
<img width="1202" alt="Screenshot 2024-08-20 at 16 13 52" src="https://github.com/user-attachments/assets/b6c6ad80-7e4b-4612-a97f-d621b0d68193">
<img width="718" alt="Screenshot 2024-08-20 at 16 14 12" src="https://github.com/user-attachments/assets/ca66ba3f-aff5-4346-8cff-128ea6e0e4d9">
<img width="1001" alt="Screenshot 2024-08-20 at 16 14 26" src="https://github.com/user-attachments/assets/7f9f86a5-a541-441c-878f-1c62b66f3d4d">