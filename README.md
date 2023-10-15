# Dii-2023-hackaton
 **Repository for hackation.**
 
 **Discord**:https://discord.gg/JVHkgDfq

 **Topic**: Emergency alert apps

 **IDE**:Vs code or your choice
 
 **Browser**:Chrome version 16 or above

 **java**:Java 11 or above

 **Dead Line**: 9 November 2023
# Repository overview
 **Have 4 branch**
 
    1.main(defult)

    2.backend(for backend dev)

    3.frontend(for frontend dev)

    4.deploy(for deploy)
# Repository main Computer language
 **For frontend**: React.js, Javascript, Css

 **For backend**: java-springboot

# Library In use
 ***Make sure to initiate path by***

    cd path\...\react-app> 

    npm install
    
  1.React

    1.1 React Router Dom

      npm install react-router-dom --save

    1.2 Redux tools

      npm install react-redux @reduxjs/toolkit --save

    1.3 Styled Component

      npm install styled-components --save

    1.4 Axios

      npm install axios --save

    1.5 react-dom leaflet

      npm install react react-dom leaflet --save
      npm install react-leaflet --save

    1.6 react-native

      npx create-expo-app react-native-app (already installed)

      cd into ...\react-native-app

      npx expo start

      1.6.1 react-native-package

        cd into ...\react-native-app

        Notification library
          Document: https://docs.expo.dev/versions/latest/sdk/notifications/

          Document: https://expo.dev/notifications

          npx expo install expo-notifications

          npm install expo-device --save

          npm install @react-navigation/native @react-navigation/stack

        Map library
        
          npx expo install react-native-maps
          Document: https://docs.expo.dev/versions/latest/sdk/map-view/

          npx expo install expo-location
          Document: https://docs.expo.dev/versions/latest/sdk/location/

        Input library

          npx expo install react-native-picker-select

          npm install react-native-modal-dropdown --save

  2.Tailwind Css

      npm install -D tailwindcss

 # Coding Rule
    1.*Class* and *Component* start with *Uppercase*

     example: Navbar.js , Profile.js, AccountController.java, etc..

     1.1 folder start with *lowercase*

     example: img, resource, pictur, etc..

     1.2 Do not use camel case use - between word

     example: account-delete-btn , profile-edit-btn , history-service

    2.Always write some simple comment on top of function/method.

     example:   // Get all account
                @GetMapping("/accounts")
                public Collection<Account> getAllAccounts() {
                    return accountRepository.findAll();
                }
              
    3. Be careful and "pull" code form github everytime before start coding or everytime you re-open program

      3.1 Write commit* every time before push Make sure your commit are readable and have meaning

    4. Always communicate with your friend

  



