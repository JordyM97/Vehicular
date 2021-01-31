
# GRUPO VEHICULAR

-----INSTALAR ------------
===
- https://ionicframework.com/docs/v3/intro/installation/
-  instalar version LTS de NodeJS 
-     npm install -g ionic cordova

- para revisar version instalada de todo usar el comando
        Ionic info

-       npm audit fix            chequea el estado del proyecto y dependencias
-       npm audit fix -force       instala dependencias faltantes del proyecto 

-  de ahi correr el programa con:  
        ionic serve


-ionic cordova plugin add cordova-plugin-nativegeocoder
npm install @ionic-native/native-geocoder
ionic cordova plugin add cordova-plugin-geolocation
npm install @ionic-native/geolocation
ionic cordova plugin add cordova-plugin-advanced-http
npm install @ionic-native/http
npm i --save @codetrix-studio/capacitor-google-auth
npm i @capacitor-community/facebook-login


cambios para commit de google

-----BUILD APP---------
--ANDROID---

ionic build
npx cap copy
npx cap sync android
npx cap open android      <--- para abrir el android studio


---IOS----


------REQUISITOS-----
===
Ionic:

 -  Ionic CLI                     : 5.4.16 
 -  Ionic Framework               : @ionic/angular 5.3.1
 - @angular-devkit/build-angular : 0.901.12
 -  @angular-devkit/schematics    : 9.1.12
 -   @angular/cli                  : 9.1.12
 -  @ionic/angular-toolkit        : 2.3.0

Utility:

 -  cordova-res : not installed
 - native-run  : not installed

System:

 -  NodeJS : v12.18.3 
 - npm    : 6.14.6
 - OS     : Windows 10

-Jordy Medina
-Leonardo Gomez
-Gustavo Matamoros
-Axel Auza