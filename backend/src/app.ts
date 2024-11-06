import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req: express.Request, res: express.Response) => {
    // console.log("Hello world");
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
