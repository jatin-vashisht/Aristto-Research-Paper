## Getting Started

## 1. Install Dependencies

To get started, first install the project dependencies. You can use one of the following commands depending on your package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## 2. Configure Environment Variables

Create a .env.local file in the root directory of your project if it doesn't already exist. Add your MongoDB connection URL to this file:

```
MONGODB_URL=your_mongodb_connection_url_here
```

## 3. Start the Server

Start the development server using one of the following commands:

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 4. Adding Demo Data to the Database

In one of your components, there's commented-out code to add demo data to the database. To use this feature:

#### 1. Uncomment the code in the component to add demo data.

<details>
<summary><code>page.tsx</code></summary>

```typescript
      const handleAdd = async () => {
        for(let i=0 ; i<demoPapers.length ; i++) {
          const {title, authors, description, publicationYear, citationsCount} = demoPapers[i]
          await addPaper({title, authors, description, publicationYear, citationsCount});
          console.log(`Added paper ${demoPapers[i].title}`)
        }
      }
      handleAdd()
```

</details>

#### 2. Run the server to execute the data addition.
#### 3. Comment the code again to prevent adding duplicate data on subsequent reloads.

Make sure to re-comment the code after the demo data has been successfully added to avoid unnecessary duplicates.
