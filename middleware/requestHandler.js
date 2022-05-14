//i added express-async-errors package to the app.js to handle this async wraper
/*
export default  (fn)=>{
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}
*/