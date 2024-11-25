# Censys Takehome

<span style="color:#ffae5f; font-weight:bold;">Follow these instructions to set up and run the project locally.</span>

### 1. Clone the Repository

Clone this repository and navigate into the project directory:

```bash
git clone https://github.com/cheyjax116/censys-takehome.git
cd censys-takehome
```

### 2. Download Dependencies 
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Create .env.local file and add your auth tokens
Create the .env.local in the root and add the authentication tokens needed to fetch the api.

```

CENSYS_API_ID=your_api_id_here
CENSYS_API_SECRET=your_api_secret_here

```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 5. View and test the application 

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

- **Search Bar**: At the top of the page, you'll find a search bar where you can enter queries to interact with the hosts API. Type in your desired search term and click the **Search** button or press **Enter** on your keyboard to see results.

- **Navigating Results**: After performing a search, results will be displayed in a paginated format. Use the **Previous** and **Next** buttons located at the bottom of the results list to navigate through additional pages of results.

![censys-takehome-walkthrough](https://github.com/user-attachments/assets/537a395c-bc4c-449f-98f7-cb346fb3d549)