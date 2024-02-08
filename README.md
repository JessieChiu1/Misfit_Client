# Misfit Client

The client is hosted via Vercel. I will be using branches to work on new features before merging with the main branch.

You can check out the deployed website so far [here](https://www.misfit.fashion/).


## Setting up .env file 
Your `.env.local` file should look something like this:

```
NEXT_PUBLIC_SERVER_API_URL=server endpoint beginning URL
NEXT_PUBLIC_API_URL=client endpoint beginning URL, should be domain in the future
```

## File structures and file you will need to create
    public                              # static file and logos

    src
    ├── components                      # database connection configuration
    │   └── layout                      # components associated with the header and footer
    │       └── filter.js               # take the 3 filterMenu.js component to have all 3 styles in the nav bar
    │       └── filterMenu.js           # Dropdown filter for Masculine/Feminine/Androgynous
    │       └── footer.js               # the whole footer at the bottom
    │       └── header.js               # the whole header that compromise of the filter/toggleMenu/userHeader
    │       └── toggleMenu.js           # hamburger dropdown menu
    │       └── userHeader.js           # login/signup button at the top of the header
    │   └── providers                   # all providers (useContext)
    │       └── AuthProvider.js         # useContext for storing the user/token information
    │   └── editPostForm.js             
    │   └── newPostForm.js        
    │   └── postCard.js        
    │
    ├── hooks                           
    │   ├── usePost.js                  # useEffect hook to fetch posts from backend for rendering
    │
    ├── pages                           # actual pages 
    ├── services                        # functions that fetch data from backend
    │   ├── auth-service.js
    │   ├── photo-service.js
    │   └── post-service.js
    │   
    └── styles                          # default css file from next.js starter file

    .env.local
    .gitignore


## libraries and what they are
- `next` - this is the react framework we are using
- `@fluentui/react-components` - UI component library for styling my components
- `@fluentui/react-icons` - common UI icon library for styling
- `@tiptap/starter-kit` - rich text editor that translate the textarea to HTML text to be stored.
    - more extension related to tiptap can be added

## Running the files:
1. `npm run dev`
2. make sure your backend is also up and running
You should see something like this:
    ```
    > my-app@0.1.0 dev
    > next dev

   ▲ Next.js 14.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local
    ```

## TODOs
- TODOs for soft launch
    - ~~Edit post~~
    - ~~Commenting on posts and replying to comments~~
        - **Allowing OP to self moderate their posts by allowing them to delete any comments**
    - **Adding hashtags to the posts**
        - **Thinking about promoting designated hashtags to target specific problems the transgender community faced**
            - Example: narrow shoulder, wide shoulder, big feet, small feet, sleeves length
    - ~~**Flesh out the postCard component**~~
    - **Consult the transgender community on the language of the website, make sure it is not offensive and is the right terminology that people are comfortable with**
- TODOs for after soft launch
    - **Creating a email address with our domain name**
    - **Allowing users to send bug report to our designated email**
    - **Switching the authentication feature to "Sign in with Gmail" and use email instead of username to sign in**
        - **Allowing user to reset password by sending them an email**
    - **Need to look into privacy notice and terms & condition**
    - **Fill in the footer's links information**
    - **Making sure the website is secured**
    - **Further Optimizations to make sure the website runs smoothly**

## Note
- I am aware that the sizing of comment component and the postCard component is not the same size. I am looking into the best way to resolve this issue.