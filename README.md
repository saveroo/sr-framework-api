# SRFramework API 

> SR Framework API
#
## # Data Structure
#
1. SRFAuthor 
2. SRFContact 
3. SRFRepository 
4. SRFChangelog 
    - Date 5.1 
    - Version 
    - Type 
    - Title 
    - Description 
    - Changes 
5. SRFKnownBugs [] 
6. SRFTodos []
7. SRFSocial []
   - SocialIcon 
   - SocialName 
   - SocialAccount 
   - SocialLink 
8. SRFWebsite 
9. SRFStatus 
10. SRFMirrorList []
11. SRFName 
12. SRFDescription 
13. SRFIdentifier 
14. SRFVersion 
15. SRFRevision 
16. SRFDownloadLink []
17. SRFTags []
18. SRFSchema 
19. SRFHelp 
20. Games []
    - DisplayName 
    - ProcessName 
    - Versions 
    - GameVersion 
    - Availability 
    - Pointers [{}]
      - id 
      - name 
      - description 
      - category 
      - categoryScope []
      - offsetsList []
      - pointer 
    - Categories []
      - featureCount 
      - columnsVisibility 
      - features [{}]
        - pointerId 
        - displayName 
        - type 
        - value 
        - formattedValue 
        - format 
        - offset 
        - editable 
        - enabled 

## # TODOs
#
- **Client**
- [x] Splash Based Initialization  
- [x] Form Loader
- [x] Form Main 
- [x] Rest Consumer 
- [x] Feature Modularity 
- [x] Cryptography
- [x] Offline first 
##
- **Server**
- [x] API Consumption
  - [x] Update Checker
  - [x] Data Retriever
  - [x] Device Registeration
- [ ] Write UI to travese and manipulate
##
- **Data**
- [ ] Flatten features

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

#
MIT License
