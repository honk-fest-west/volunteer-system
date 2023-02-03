## Setup

### Install asdf

asdf is a tool version manager used to install versions of nodejs and java required by this application.

1. Follow instructions on asdf's [getting started](https://asdf-vm.com/guide/getting-started.html)
2. Run the asdf install instruction from the root directory of this project

```
asdf install
```

### Install the Local Emulator Suite

Before installing the Emulator Suite you will need:

- Node.js version 8.0 or higher.
- Java JDK version 11 or higher.

To install the Emulator Suite:

1. Install the Firebase CLI. If you don't already have the Firebase CLI installed, install it now. You will need CLI version 8.14.0 or higher to use the Emulator Suite. You can check which version you have installed using the following command:

```
firebase --version
```

or

```
npm install -g firebase-tools
firebase login
```

2. If you haven't already done so, initialize the current working directory as a Firebase project, following the onscreen prompts and select **Emulators: Set up local emulators for Firebase products**:

```
firebase init
```

3. Select **Firestore Emulator** and **Authentication Emulator**

### Set Environment Variables

1. Copy the `.env-template` to an new `.env` file.
2. Look up current environment variables from the Netlify volunteer-system dashboard.

## Hosting

Default hosting setup for [Netlify](https://netlify.com/).
