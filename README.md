# waiver-app-react-native

Checkin/Waiver mobile app created in React Native. 

Users are prompted through several screens where they can select their checkin time, enter their information, and agree to a waiver. Upon completion, cloud functions will generate a customer entry for them based on their email address and notify the business via email using SendGrid. If a user checks in twice using the same email address, the cloud functions will update their customer entry automatically.
