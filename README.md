<h1 align="center">
  <br>
  <img
    src="./public/img/blog.png"
    width="300px"
    style="underline: none;"
  >
  <br>
  Markdown Blog
</h1>

<h5 align="center">
    A blog with rendered markdown text.</a>
</h5>

<h5 align="center">
<a href="https://nodejs.org">
    <img src="https://img.shields.io/badge/javascript-nodejs-green?style=plastic?&logo=nodedotjs">
</a>

<a href="https://www.npmjs.com/package/mongoose">
    <img src="https://img.shields.io/badge/database-mongodb-mongodb?style=plastic?&logo=mongodb">
</a>

<a href="https://www.npmjs.com/package/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=plastic&logo=prettier">
</a>

<a href="https://www.npmjs.com/package/eslint">
    <img src="https://img.shields.io/badge/lint-eslint-blueviolet?style=plastic&logo=eslint">
</a>

<a href="https://www.npmjs.com/package/dotenv">
    <img src="https://img.shields.io/badge/environment%20variables-.env-ECD53F?style=plastic?&logo=dotenv">
</a>

<a href="https://www.npmjs.com/package/express">
    <img src="https://img.shields.io/badge/template%20engine-express-white?style=plastic?&logo=express">
</a>

<a href="https://www.npmjs.com/package/marked">
    <img src="https://img.shields.io/badge/renderer-marked-white?style=plastic?&logo=markdown">
</a>
</h5>

---

## 📐 Setup

### 📅 Database Setup

You can choose between the two, you don't have to install or use both of them.
I recommend using MongoDB Atlas if you can because you don't need to install anything
and the database is already on the cloud and you can find free hosting services to deploy your website.

#### 🔻 Local

1. MongoDB Installation
Download MongoDB Shell using winget with this command
```powershell
winget install MongoDB.Shell
```

2. Enter to MongoDB using MongoDB Shell
This defaults to mongodb://127.0.0.1:27017
```powershell
mongosh
```

3. Use database 
```
use yourdatabase
```

4. Create a collection (tables)
```
db.createCollection("yourcollectionname")
```
Now you can just leave it like that

#### ☁ MongoDB Atlas

1. Create your MongoDB Atlas account
https://www.mongodb.com/cloud/atlas/register

2. After selecting your project, cluster, and server location, you can add your IP address in the **Network Access** tab under SECURITY. If you want, you can check for **Allow access from anywhere** so that you don't have to do this again.

3. Make sure you are on the right project, you can click on **Clusters** tab under DATABASE.

4. Here you can see your cluster's name. Then, you can click on connect.

5. Click on **Drivers**. Select your driver's version and copy your connection string

6. Replace `<db_password>` with your password that you've created earlier.

> [!NOTE]- Forgot password
> - Click on **Database Access** under SECURITY
> - Click **EDIT**
> - Click **Edit Password**
> - Click **Auto Regenerate Secure Password**
> - Click **Copy** 

> [!NOTE]- Problem Connecting
> ```
> Error: queryTxt ETIMEOUT cluster0-ghis2.mongodb.net
> at QueryReqWrap.onresolve [as oncomplete] (dns.js:202:19) {
> errno: 'ETIMEOUT',
>   code: 'ETIMEOUT',
>   syscall: 'queryTxt',
>   hostname: 'cluster0-ghis2.mongodb.net'
> }
> ```
> I was having an issue connecting to MongoDB Atlas because of a DNS record problem. Maybe you can try this steps :
> - Change your DNS to using google dns `8.8.8.8` or `8.8.4.4`
> - Or you can try changing the driver's version (Step 5) to `2.2.12 or later`

### 💻 Environment Setup

1. NodeJS Installation
Make sure that you have NodeJS installed on your system.
The simplest way to install NodeJS on your system is by using winget with this command.
```powershell
# For Windows Only
winget install OpenJS.NodeJS.LTS
```
More about NodeJS : https://nodejs.org/

2. Text editor installation
Make sure you have your text editor installed. In my case, I'm using Visual Studio Code, which you can install using winget with this command.
```powershell
# For windows only
winget install Microsoft.VisualStudioCode
```
More about Visual Studio Code : https://code.visualstudio.com/

### 📁 Project Setup

1. Clone project
```
git clone https://github.com/get543/Markdown-Blog.git
```

2. Install missing dependencies
```
npm install
```

3. Create a `.env` file and add this

This is just an example
```
SESSION_STATS=dev

MONGO_DEV_URI=mongodb://localhost:27017/yourdatabase

MONGO_PROD_URI=mongodb+srv://username:password@youcluster.z2g8s.mongodb.net/yourdatabase?retryWrites=true&w=majority&appName=Yourcluster
```
`MONGO_DEV_URI` : URI for connecting to local/remote server (in this case local server)
`MONGO_PROD_URI` : URI for cloud database (in this case MongoDB Atlas)
`SESSION_STATS` : 
- `prod` to use `MONGO_PROD_URI`
- `dev` to use `MONGO_DEV_URI`

4. Run the code
```
npm start
```

5. See the result on http://localhost:3000

## 📃 ToDo

- [x] Try to use TaildwindCSS
- [x] Markdown theme from Markdown-Website project
- [x] Implement some of the things in node-crash-course/using-ejs project
- [x] Website theme from portfolio-tailwindcss
- [x] Fix the css mess in input.css (markdown css) & fix font-family situation
- [ ] Create an admin page (edit, add articles) and viewer page (no edit & add button)
- [ ] Code highlight and format for code blocks
- [x] Clickable title from the card menu
- [x] Check if MongoDB Atlas still a viable option
- [x] Make that you can view this project on other machine when hosted locally
- [ ] Make a login page for admin only to add, delete, edit articles (yk those buttons) => broken login page
- [ ] User can add their own categories
- [ ] For example, if user create a note from category A, it suppose to show on category A
- [x] About page, show what this website really is
